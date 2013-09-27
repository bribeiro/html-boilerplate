/*
	this is the javascript entry point
*/
require(['./config'], function(){
	require(['app/app', 'app/routers/AppRouter', 'app/controllers/Controller'], function( app, AppRouter, Controller ){
        // Attach the router and controller
        console.log(app);
        app.appRouter = new AppRouter({
            controller: new Controller()
        });
		app.start();
	});
});
