define(function(require, exports, module) {
    var app = require('app/app'),
        Marionette = require('marionette'),
        vent = require('app/vent'),
        LoaderView = require('app/views/LoaderView');
        

    return Backbone.Marionette.Controller.extend({

        initialize: function(options) {
            this.loadmanager = new Loadmanager({
                timecodes: timecodes
            });
        },

        index: function() {
            console.log('showApp');
        },

        showApp: function() {
            
        },

        initGlobals: function() {

        }

    });

});
