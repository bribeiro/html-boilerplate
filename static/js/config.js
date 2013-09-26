/*
    the projects require.js config,
    used in build process also
    see: http://requirejs.org/docs/api.html#config
*/

/*global requirejs*/
requirejs.config({

    baseUrl:"./static/js/app",

    // 3rd party script alias names
    paths: {
        // Core Libraries
        'jquery': 'libs/jquery',
        'underscore': 'libs/lodash.underscore',
        'backbone': 'libs/backbone',
        'marionette': 'libs/backbone.marionette',
        "handlebars": "libs/handlebars",
        'hbs': 'libs/hbs.js',
        'i18nprecompile': 'libs/i18nprecompile.js',

        // Plugins
        'text': 'libs/plugins/text',
        'domReady': 'libs/plugins/domReady',
        'modernizr': 'libs/modernizr'
    },

    // Sets the configuration for third party scripts that are not AMD compatible
    shim: {
        'backbone': {
            'deps': ['underscore', 'jquery'],
            'exports': 'Backbone'
        },
        'marionette':{
            'deps': ['underscore', 'backbone', 'jquery'],
            'exports': 'Marionette'
        },
        'modernizr': {
            'exports': 'Modernizr'
        },
        'handlebars':{
            'exports': 'Handlebars'
        }
    },

    // hbs config
    hbs : {
        templateExtension: "html",
        disableHelpers: true,
        i18nDirectory: "templates/i18n/"
    }

});
