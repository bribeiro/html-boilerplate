import os
import boto
import hashlib
from datetime import datetime
from boto.utils import parse_ts
from boto.s3.key import Key
from fabric.api import abort
from fabric.api import env
from fabric.api import settings
from fabric.api import local
from fabric.api import task
from fabric.api import cd
from fabric.api import lcd
from fabric.api import sudo
from fabric.api import roles
from fabric.api import run
from fabric.api import show
from fabric.api import get
from fabric.api import put
from fabric.api import sudo
from fabric.api import execute
from fabric.api import prompt
from fabric.colors import green
from fabric.colors import cyan
from fabric.colors import red

# @todo - repeated code; between prod / staging -> cleanup

# ----------------------------------------------------------------------------#
# VARIABLES ------------------------------------------------------------------#
# ----------------------------------------------------------------------------#

staging_branch = 'staging'
AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = '__BUCKET_NAME__' # Replace this with S3 bucket name
PUBLIC_READ = True

IGNORED_FILES = (
    '.md',
    '.out',
    '.py',
    '.rb',
    '.scss',
    '.git',
    '.gitignore',
    'fabfile',
    '.sass-cache',
    '.DS_Store',
)

REWRITE_FILES_RULES = {
    './bin/static/js': './static/js',
}


# ----------------------------------------------------------------------------#
# PRODUCTION DEPLOMENT -------------------------------------------------------#
# ----------------------------------------------------------------------------#


@task
def deploy(force_all=False):
    current_branch = local('git rev-parse --abbrev-ref HEAD', capture=True)
    if current_branch != staging_branch:
        print('not on the right branch, you are on %s', current_branch)
        return
    execute('local.css_compile')
    execute('local.clone_project')
    execute('local.js_compile')
    execute('staging._deploy_s3', force_all=force_all)
    execute('local.open')

def walkup_dir(dirname):
     cwd = os.path.realpath(os.path.join(__file__, '../..'))
     path = os.path.realpath(dirname)
     while path != cwd:
         path, dirname = os.path.split(path)
         yield dirname

def md5(filename, block_size=2**20):
    md5 = hashlib.md5()
    f = open(filename)
    while True:
        data = f.read(block_size)
        if not data:
            break
        md5.update(data)
    return md5.hexdigest()

def ignored_file(filename):
    if os.path.isfile(filename) and \
       (os.path.split(filename)[1] in IGNORED_FILES or \
        os.path.splitext(filename)[1] in IGNORED_FILES):
        return True
    elif os.path.isdir(filename) and \
         any(dirname for dirname in walkup_dir(filename) if dirname in IGNORED_FILES):
        return True
    else:
        return False

def upload_file(asset, pathname):
    asset.set_contents_from_filename(pathname)
    asset.set_acl(PUBLIC_READ and 'public-read' or 'private')

def parse_ts_extended(ts):
    RFC1123 = '%a, %d %b %Y %H:%M:%S %Z'
    rv = None
    try:
        rv = parse_ts(ts)
    except ValueError:
        rv = datetime.strptime(ts, RFC1123)
    return rv

@task
def _deploy_s3(force_all=False):
    conn = boto.connect_s3(AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)
    bucket = conn.get_bucket(AWS_STORAGE_BUCKET_NAME)

    for dirname, dirnames, filenames in os.walk('.'):
        if ignored_file(dirname) or any(dirname.startswith(path) for path
                                        in REWRITE_FILES_RULES.itervalues()):
            continue
        else:
            for origin, destination in REWRITE_FILES_RULES.iteritems():
                if dirname.startswith(origin):
                    destdir = dirname.replace(origin, destination)
                    break
            else:
                destdir = dirname

        for filename in filenames:
            actual_file = os.path.join(dirname, filename)
            pathname = os.path.join(dirname, filename)
            if not ignored_file(pathname):
                pathname = pathname[2:]
                asset = bucket.get_key(pathname)
                if not asset:
                    asset = Key(bucket)
                    asset.key = pathname
                    upload_file(asset, actual_file)
                    print('uploaded {0}'.format(pathname))
                elif force_all or asset.etag[1:-1] != md5(actual_file):
                    upload_file(asset, actual_file)
                    print('updated {0}'.format(pathname))
                else:
                    print('not modified {0}'.format(pathname))

@task
def create_website():
    branch = 'static'
    create_branch = True
    with settings(warn_only=True):
        ret = local('git show-ref --verify --quiet refs/heads/{}'.format(branch))
        if ret.succeeded:
            create_branch = False

    dirname      = os.path.join(__file__, '../..')
    app_name     = os.path.split(os.path.realpath(dirname))[1]

    bucket_name  = prompt('Enter S3 bucket name:', default=AWS_STORAGE_BUCKET_NAME)
    app_name     = prompt('Enter Heroku app name:', default=app_name)
    remote_name  = prompt('Enter Heroku remote name:', default=staging_branch)
    username     = prompt('Enter Basic auth username:')
    password     = prompt('Enter Basic auth password:')
    allowed_addr = prompt('Enter allowed IP addresses:')

    config_vars = {
        'BASIC_AUTH_USERNAME': username,
        'BASIC_AUTH_PASSWORD': password,
        'ALLOWED_ADDR': allowed_addr,
        'AWS_ACCESS_KEY_ID': AWS_ACCESS_KEY_ID,
        'AWS_SECRET_ACCESS_KEY': AWS_SECRET_ACCESS_KEY,
        'AWS_BUCKET_NAME': bucket_name,
    }

    if create_branch:
        local('git checkout --orphan {}'.format(branch))
        local('git rm -rf .')
        local('echo "-e git+https://github.com/rafacv/s3firewall.git#egg=s3firewall\ngunicorn" > requirements.txt')
        local('echo "web: gunicorn -w3 s3firewall:app" > Procfile')
        local('git add Procfile requirements.txt && git commit -m "Deploy static website"')
        local('git push origin {}'.format(branch))

    not_created = True
    while not_created:
        with settings(warn_only=True):
            ret = local('heroku apps:create {} -r {}'.format(app_name, remote_name))
            if ret.failed:
                app_name = prompt('Enter Heroku app name (blank to exit):')
                if not app_name:
                    abort('Heroku app not created.')
            else:
                not_created = False

    local('git push {} {}:master'.format(remote_name, branch))
    local('heroku config:set {} --app {}'.format(
        " ".join(["{}='{}'".format(key, value) for key, value in config_vars.iteritems() if value]),
        app_name,
    ))

@task
def test():
    execute('local.css_compile')
    execute('local.clone_project')
    execute('local.js_compile')
    local('open http://localhost:8080')
    with lcd('./bin'):
        execute('local.runserver')
