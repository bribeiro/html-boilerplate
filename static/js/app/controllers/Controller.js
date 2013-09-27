/*
    Example Controller, pulling in a Header and a Welcome view
*/
define(function(require, exports, module) {
    var App = require('app'),
        Backbone = require('backbone'),
        Marionette = require('marionette'),
        WelcomeView = require('views/WelcomeView'),
        HeaderView = require('views/HeaderView');

        return Backbone.Marionette.Controller.extend({
            initialize:function (options) {
                App.headerRegion.show(new HeaderView());
            },
            //gets mapped to in AppRouter's appRoutes
            index:function () {
                App.mainRegion.show(new WelcomeView());
            }
        });

});
