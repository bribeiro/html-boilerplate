/*
    the projects require.js config,
    used in build process also
    see: http://requirejs.org/docs/api.html#config
*/

/*global requirejs*/
requirejs.config({
    waitSeconds: 30,
    shim: {
        'underscore': { exports: '_' },
        'backbone': { deps: ['underscore','jquery'], exports: 'Backbone' },
        'marionette' : { deps : ['backbone'], exports : 'Backbone.Marionette'},
        'modernizr': { exports: 'Modernizr' },
        'jquery': { exports: '$' }
    },
    //re-route libs to top-level
    paths: {
        'templates': './templates',
        'jquery': 'libs/jquery',
        'backbone': 'libs/backbone',
        'marionette' : 'libs/backbone.marionette',
        'backbone.wreqr' : 'libs/backbone.wreqr',
        'underscore': 'libs/lodash.underscore',
        'Handlebars': 'libs/handlebars',
        'hbs': 'libs/hbs',
        'domReady': 'libs/domReady',
        'modernizr': 'libs/modernizr'
    },
    hbs : {
        templateExtension: "html",
        disableI18n: true,
        disableHelpers: true
    }
});
