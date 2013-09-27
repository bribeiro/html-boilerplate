/*
    Example Marionette Collection
*/
define(function(require, exports, module) {
    var Backbone = require('backbone'),
        Model = require('models/model');

    // Creates a new Backbone Collection class object
    var Collection = Backbone.Collection.extend({
        // Tells the Backbone Collection that all of it's models will be of type Model (listed up top as a dependency)
        model: Model
    });

    return Collection;
});


