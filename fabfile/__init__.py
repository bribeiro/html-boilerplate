from fabric.api import env

import staging, dev, local, production


env.roldefs = {
	'staging': [''],
	'production': ['']
}

env.use_ssh_config = True


