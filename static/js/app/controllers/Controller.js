/*
    Example Controller, pulling in a Header and a Welcome view
*/
define(function(require, exports, module) {
    var app = require('app/app'),
        Backbone = require('backbone'),
        Marionette = require('marionette'),
        WelcomeView = require('app/views/WelcomeView'),
        HeaderView = require('app/views/HeaderView');

        return Backbone.Marionette.Controller.extend({
            initialize:function (options) {
                app.headerRegion.show(new HeaderView());
            },
            //gets mapped to in AppRouter's appRoutes
            index:function () {
                app.mainRegion.show(new WelcomeView());
            }
        });

});
