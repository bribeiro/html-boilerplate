/*
    Example Marionette Application
*/
define(function(require, exports, module) {
    var Backbone = require('backbone'),
        Marionette = require('marionette');

    var app = new Backbone.Marionette.Application();

    function isMobile() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        return ((/iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/).test(userAgent));
    }

    //Organize Application into regions corresponding to DOM elements
    //Regions can contain views, Layouts, or subregions nested as necessary
    app.addRegions({
        headerRegion:"header",
        mainRegion:"#main"
    });

    app.addInitializer(function () {

        // Init history goodness
        Backbone.history.start({
            pushState: true
        });
    });

    app.mobile = isMobile();

    return app;
});
