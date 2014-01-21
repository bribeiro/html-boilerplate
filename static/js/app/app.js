define(function(require, exports, module) {
    var Marionette = require('marionette');

    var app = new Backbone.Marionette.Application();

    // app.addRegions({
    //     loader: '#loader'
    // });

    app.addInitializer(function() {
        Backbone.history.start({
            pushState: false
        });
    });

    return app;
});
