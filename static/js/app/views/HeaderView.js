define(function(require, exports, module) {
    var Marionette = require('marionette'),
        template = require('hbs!templates/header.html');

    return Marionette.ItemView.extend({
        template: template
    });

});
