/*
	this is the javascript entry point
*/
require(['./config'], function(){
	require(['app/app'], function( app ){
		//if the module was a function execute it,
		//otherwise be do nothing
		if( typeof app === 'function' ){
			app();
		}
	});
});
