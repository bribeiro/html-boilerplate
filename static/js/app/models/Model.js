/*
    Example Backbone model
*/
define(function(require, exports, module) {
    var Backbone = require('backbone');

    // Creates a new Backbone Model class object
    var Model = Backbone.Model.extend({
        initialize:function () {

        },

        // Default values for all of the Model attributes
        defaults:{

        }
    });

    return Model;

});
