from fabric.api import env

import css

"""
SSH CONFIG EXAMPLE

ForwardAgent yes

Host foo.com
    User foo
    HostName 127.0.0.1
    IdentityFile ~/.ssh/key.pem

"""

env.roldefs = {
	'staging': [''],
	'production': ['']
}

env.use_ssh_config = True