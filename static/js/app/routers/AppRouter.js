/*
    Example Marionette AppRouter
*/
define(function(require, exports, module) {
    var Marionette = require('marionette'),
        AppController = require('app/controllers/AppController');

    return Marionette.AppRouter.extend({
        appRoutes: {
            "": "index"
        },
        controller: new AppController()

    });

});
