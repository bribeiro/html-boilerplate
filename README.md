# HAUS HTML Boilerplate

## Description


## Development Notes

### Editor Configuration
To unify coding styles (spacing, line-endings, etc) between different editors and IDEs, HAUS uses [EditorConfig](http://editorconfig.org/)

1. If you haven't already - [install a plugin for your editor](http://editorconfig.org/#download)
1. Thats it! The plugin will look for a .editorconfig file in your project directory and automatically format the file correctly on save.

### Local Dev

This project uses NodeJS, Grunt and [Compass Ceaser Easing](https://github.com/jhardy/compass-ceaser-easing) for local development. Install dependencies with:
    
    npm install
    gem install ceaser-easing
    

#### Running locally
This will start a local server at [0.0.0.0:8000](http://0.0.0.0:8000) as well as run Compass compilation and JSHinting

    grunt dev


### Deployment notes
For depoloying and building we use fab - [learn about it and install it here](http://docs.fabfile.org/en/1.8/). Compiled files **are not** in the git repository.

dev: ```fab dev.deploy```

staging: ```fab staging.deploy```

### Building
Deployments automatically compile CSS and JS - but if you need to do a build without deploying run:

    fab local.compile