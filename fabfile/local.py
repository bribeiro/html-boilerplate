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
# Project Compile ------------------------------------------------------------#
# ----------------------------------------------------------------------------#


@task
def compile(force_all=False):
    loc.css_compile();
    loc.clone_project();
    loc.js_compile()

