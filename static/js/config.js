/*
    the projects require.js config,
    used in build process also
    see: http://requirejs.org/docs/api.html#config
*/

/*global requirejs*/
requirejs.config({

    // Makes referencing libs by their file name easy
    baseUrl:"./js/libs",

    // 3rd party script alias names
    paths: {

        // App code path
        'app': '../app',

        // Core libraries - aliases good
        'underscore': 'lodash.underscore',
        'marionette': 'backbone.marionette',

        // Plugins
        'text': 'plugins/text',
        'domReady': 'plugins/domReady',

        // Templates Folder
        'templates': '../../templates'
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
        i18nDirectory: "/templates/i18n/"
    }

});
