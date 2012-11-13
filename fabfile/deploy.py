import os
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

# paths
staging_root = ""
production_root = ""

# execs
exec_git_checkout = "git checkout {}"
exec_git_pull     = "git pull"

#misc
staging_branch = "staging"
production_branch = "master"


# ----------------------------------------------------------------------------#
# PRODUCTION DEPLOMENT -------------------------------------------------------#
# ----------------------------------------------------------------------------#


@roles('production')
@task
def production():
    """
    deploy production
    """
    execute('css.compile')
    execute('deploy.production_css')
    execute('deploy.production_git')


@roles('production')
@task
def production_git():
    """
    deploy only the git repository
    """

    check_branch = local_check_branch(production_branch)

    if(check_branch['result'] == 1):
        print(red("\n[GIT] You are not on the master branch!", bold=True))
        print(red("\n[GIT] Please checkout branch master before continuing!", bold=True))
        return

    with settings(forward_agent=True):
        with cd(production_root):
            print(green("\n[GIT] Checking out master branch", bold=True))
            run(exec_git_checkout.format(production_branch))
            print(green("\n[GIT] Updating to HEAD\n", bold=True))
            run(exec_git_pull)


@roles('production')
@task
def production_css():
    """
    deploy only the css files
    """

    import css
    css_files = []
    css_files.extend(css.list_desktop_css())

    with settings(forward_agent=True):
        with cd(production_root):
            print(green("\n[ACTION] Uploading stylesheets\n", bold=True))

            for css_file in css_files:
                put(css_file, css_file)


# ----------------------------------------------------------------------------#
# STAGING DEPLOMENT ----------------------------------------------------------#
# ----------------------------------------------------------------------------#

@roles('staging')
@task
def staging():
    """
    deploy staging
    """
    execute('css.compile_desktop')
    execute('deploy.staging_css')
    execute('deploy.staging_git')


@roles('staging')
@task
def staging_git():
    """
    deploy only the git repository
    """

    check_branch = local_check_branch(staging_branch)

    if(check_branch['result'] == 1):
        print(red("\n[GIT] You are not on the staging branch!", bold=True))
        print(red("\n[GIT] Please checkout branch staging before continuing!", bold=True))
        return

    with settings(forward_agent=True):
        with cd(staging_root):
            print(green("\n[GIT] Checking out staging branch", bold=True))
            run(exec_git_checkout.format(staging_branch))
            print(green("\n[GIT] Updating to HEAD\n", bold=True))
            run(exec_git_pull)


@roles('staging')
@task
def staging_css():
    """
    deploy only the css files
    """

    import css
    css_files = []
    css_files.extend(css.list_desktop_css())

    with settings(forward_agent=True):
        with cd(staging_root):
            print(green("\n[ACTION] Uploading stylesheets\n", bold=True))

            for css_file in css_files:
                put(css_file, css_file)


# --------------------------------------------------------------------------- #
# HELPERS --------------------------------------------------------------------#
# --------------------------------------------------------------------------- #


def local_check_branch(required_branch):
    """
    verifies user is on the correct git branch

    @param required_branch {string} the branch name you wish to check
    @returns {object}
        {
            result: 0, // 1 || 0 (success or fail)
            branch_name: "foo-branch" // the checked out branch name
        }
    """

    branches = str(local("git branch", capture=True))
    branch = ""

    for line in branches.split('\n'):
        if line.startswith("*"):
            branch = line[2:]
            break

    if branch != required_branch:
        return {'result': 1, 'branch_name': branch}
    else:
        return {'result': 0, 'branch_name': branch}
