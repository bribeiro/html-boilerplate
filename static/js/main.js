require(['./config'], function() {
    require(['modernizr', 'app/app', 'app/routers/AppRouter'], function(Modernizr, app, AppRouter) {
        app.appRouter = new AppRouter();
        app.start();
    });
});
