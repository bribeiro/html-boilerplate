define(function(require, exports, module) {
    var Marionette = require('marionette'),
        template = require('hbs!templates/welcome');

    //ItemView provides some default rendering logic
    return Marionette.ItemView.extend({

        // hbs plugin precompiles our template
        template: template,

        // View Event Handlers
        events: {

        }

    });
});
