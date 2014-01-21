define(function(require, exports, module) {
    var app = require('app/app'),
        Marionette = require('marionette'),
        vent = require('app/vent');
        

    return Backbone.Marionette.Controller.extend({

        initialize: function(options) {
           console.log('init appController'); 
        },

        index: function() {
            console.log('showApp');
        }

    });

});
