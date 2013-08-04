from fabric.api import env

import local
from local import runall
from local import killall
import staging


env.roldefs = {
	'staging': [''],
	'production': ['']
}

env.use_ssh_config = True


