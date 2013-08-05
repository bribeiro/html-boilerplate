import os
import boto
from boto.s3.key import Key
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
AWS_STORAGE_BUCKET_NAME = 'bucket-name' #replace this with your s3 bucket name


# ----------------------------------------------------------------------------#
# PRODUCTION DEPLOMENT -------------------------------------------------------#
# ----------------------------------------------------------------------------#


@task
def deploy():
    current_branch = local('git rev-parse --abbrev-ref HEAD', capture=True)
    if current_branch != staging_branch:
        print('not on the right branch, you are on %s', current_branch)
        return
    with settings(warn_only=True):
        local('rm -rf ./bin')
    execute('local.css_compile')
    execute('local.clone_project')
    execute('local.js_compile')
    execute('staging._deploy_s3')
    execute('local.open')

@task
def _deploy_s3():
    conn = boto.connect_s3(AWS_ACCESS_KEY_ID,AWS_SECRET_ACCESS_KEY)
    bucket = conn.get_bucket(AWS_STORAGE_BUCKET_NAME)
    for dirname, dirnames, filenames in os.walk('./bin'):
        for filename in filenames:
            upload_file = os.path.join(dirname, filename)
            destination = upload_file.replace('./bin', '')
            k = Key(bucket)
            k.key = destination
            k.set_contents_from_filename(upload_file)
            k.set_acl('public-read')
            print('uploaded {0}'.format(destination))

@task
def test():
    execute('local.css_compile')
    execute('local.clone_project')
    execute('local.js_compile')
    local('open http://localhost:8080')
    with lcd('./bin'):
        execute('local.runserver')
    