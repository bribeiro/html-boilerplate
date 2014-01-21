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
        'jquery': { exports: '$' },
        'jquery.parallax': { exports: '$', deps : ['jquery'] },
        'jquery.cookie' : {exports: '$',deps: ['jquery']},
        'jquery.easing' : { exports: '$',deps : ['jquery'] },
        'jquery.social' : { exports: '$',deps : ['jquery'] },
        'video': { exports: 'video' },
        'youtube' : {exports: 'YT'},
        'sly' : { exports: '$',deps : ['jquery'] }
    },
    //re-route libs to top-level
    paths: {
        'templates': './templates',
        'jquery': 'libs/jquery',
        'jquery.parallax': 'libs/jquery.parallax',
        'jquery.cookie': 'libs/jquery.cookie',
        'jquery.easing': 'libs/jquery.easing',
        'jquery.social': 'libs/jquery.social',
        'backbone': 'libs/backbone',
        'marionette' : 'libs/backbone.marionette',
        'backbone.wreqr' : 'libs/backbone.wreqr',
        'underscore': 'libs/lodash.underscore',
        'Handlebars': 'libs/handlebars',
        'i18nprecompile': 'libs/i18nprecompile',
        'i18n': 'libs/i18n',
        'hbs': 'libs/hbs',
        'json2': 'libs/json2',
        'tpl' : 'libs/tpl',
        'domReady': 'libs/domReady',
        'modernizr': 'libs/modernizr',
        'sly': 'libs/sly',
        'imagesLoaded': 'libs/imagesloaded.pkgd',
        'youtube': 'https://www.youtube.com/player_api?'
    },
    hbs : {
        templateExtension: "html",
        disableI18n: true,
        disableHelpers: false
    }
});
