from fabric.api import local
from fabric.api import task
from fabric.colors import yellow


# ----------------------------------------------------------------------------#
# VARIABLES ------------------------------------------------------------------#
# ----------------------------------------------------------------------------#


# paths
base_path   = "./static"
css_path    = base_path + "/css/"
config_path = css_path + "config.rb"


# sass execs
exec_sass_watch   = "compass watch {} --poll -c {}"
#exec_sass_compile = "compass compile {} --output-style compressed -c {} --force"
exec_sass_compile = "compass compile {} -c {} --trace --force"


# ----------------------------------------------------------------------------#
# TASKS ----------------------------------------------------------------------#
# ----------------------------------------------------------------------------#


@task
def watch():
    """
    start a scss "watch" process
    """
    print(yellow("\n[CSS] Watching CSS\n", bold=True))
    local(exec_sass_watch.format(base_path, config_path))


@task
def compile():
    """
    compile desktop scss to css; returns an array of css file paths
    """
    print(yellow("\n[CSS] Compiling CSS\n", bold=True))
    local(exec_sass_compile.format(base_path, config_path))
    
