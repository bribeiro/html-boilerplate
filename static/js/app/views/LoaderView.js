define(function(require, exports, module) {
    var Marionette = require('marionette'),
        template = require('hbs!templates/loader');

    return Marionette.ItemView.extend({
        template: template,
        className: 'overlay',
        ui: {
            preloaderFill: '.preloader-fill'
        },
        events: {

        },
        initialize: function(options) {},
        setPercent: function(percent) {
            var output = Math.round(percent * 100);
            this.ui.preloaderFill.css('width', output + '%');
            if (percent === 1) {
                var self = this;
                $('body').removeClass('show-loader');
            }
        }
    });
});
