/*
    Example Marionette AppRouter
*/
define(function(require, exports, module) {
    var Marionette = require('marionette'),
        Controller = require('app/controllers/Controller');

   return Marionette.AppRouter.extend({

       //"index" must be a method in AppRouter's controller
       appRoutes: {
           "": "index"
       }

   });

});
