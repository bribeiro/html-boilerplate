import os
from fabric.api import local
from fabric.api import task
from fabric.api import settings
from fabric.api import run
from fabric.colors import yellow


# ----------------------------------------------------------------------------#
# VARIABLES ------------------------------------------------------------------#
# ----------------------------------------------------------------------------#

ignore_list = ('.git','.gitignore', 'fabfile', 'nohup.out', 'README.md', '.sass-cache', 'DS_Store', '.scss', 'bin', 'game', 'config.rb')

# paths
base_path   = "./static"
css_path    = base_path + "/css/"
config_path = css_path + "config.rb"
site_url = 'http://www.google.com' # replace this

# sass execs
exec_sass_watch   = "compass watch {} --poll -c {}"
exec_sass_compile = "compass compile {} -c {} --no-line-comments --trace --force -s compressed"


# ----------------------------------------------------------------------------#
# TASKS ----------------------------------------------------------------------#
# ----------------------------------------------------------------------------#


@task
def css_watch():
    """
    start a scss "watch" process
    """
    print(yellow("\n[CSS] Watching CSS\n", bold=True))
    local("ps ax | grep [c]ompass | awk '{ print $1 }' | xargs kill -9")
    local("ps ax | grep [s]ass | awk '{ print $1 }' | xargs kill -9")
    local(exec_sass_watch.format(base_path, config_path))


@task
def css_compile():
    """
    compile desktop scss to css; returns an array of css file paths
    """
    local("ps ax | grep [c]ompass | awk '{ print $1 }' | xargs kill -9")
    local("ps ax | grep [s]ass | awk '{ print $1 }' | xargs kill -9")
    print(yellow("\n[CSS] Compiling CSS\n", bold=True))
    local(exec_sass_compile.format(base_path, config_path))
    
@task
def js_compile():
    local('r.js -o ./static/js/app.build.js')

@task 
def clone_project():
    local('mkdir -p ./bin')
    
    for dirname, dirnames, filenames in os.walk('.'):
        if [x for x in ignore_list if x in dirname]:
            continue

        for filename in filenames:
            if [y for y in ignore_list if y in filename]:
                continue
            source = os.path.join(dirname, filename)
            dest_folder = os.path.join('./bin', dirname)
            dest_file = os.path.join('./bin', source)
            local('mkdir -p {2} && cp {0} {1}'.format(source.replace(' ','\ '), dest_file.replace(' ','\ '), dest_folder.replace(' ','\ ')))



@task
def runserver():
    local("ps ax | grep [S]impleHTTPServer | awk '{ print $1 }' | xargs kill -9")
    local('python -m SimpleHTTPServer 8080')

@task
def runall():
    local('touch nohup.out')
    local('nohup fab local.css_watch &')
    local('nohup fab local.runserver &')
    local('tail -f nohup.out')

@task
def killall():
    with settings(warn_only=True):
        local("ps ax | grep [S]impleHTTPServer | awk '{ print $1 }' | xargs kill -9")
        local("ps ax | grep [c]ompass | awk '{ print $1 }' | xargs kill -9")
        local("ps ax | grep [s]ass | awk '{ print $1 }' | xargs kill -9")

@task
def open():
    local('open {0}'.format(site_url))