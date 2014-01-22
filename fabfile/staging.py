from datetime import datetime
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
from . import loc


# @todo - repeated code; between prod / staging -> cleanup

# ----------------------------------------------------------------------------#
# VARIABLES ------------------------------------------------------------------#
# ----------------------------------------------------------------------------#

BRANCH_NAME = 'staging'
AWS_ACCESS_KEY_ID = ''
AWS_SECRET_ACCESS_KEY = ''
AWS_STORAGE_BUCKET_NAME = ''
PUBLIC_READ = True

SLACK_URL = ''
SLACK_CHANNEL =''

# ----------------------------------------------------------------------------#
# PRODUCTION DEPLOMENT -------------------------------------------------------#
# ----------------------------------------------------------------------------#


@task
def deploy(force_all=False, gzip=False):
    current_branch = local('git rev-parse --abbrev-ref HEAD', capture=True)
    if current_branch != BRANCH_NAME:
        print('not on the right branch, you are on %s', current_branch)
        return
    loc.css_compile();
    loc.clone_project();
    loc.js_compile()
    loc._deploy_s3( force_all=force_all,
                    ID=AWS_ACCESS_KEY_ID,
                    key=AWS_SECRET_ACCESS_KEY,
                    bucket=AWS_STORAGE_BUCKET_NAME,
                    public_read=PUBLIC_READ,
                    gzip=gzip)
    loc.notify_slack(SLACK_URL, 'http://s3.amazonaws.com/{}/index.html'.format(AWS_STORAGE_BUCKET_NAME))

