/*
    vent.js

    Global event aggregator that doesn't explicitely
    depend on the application and can be depended
    on anywhere.

    Usage:
    define(['vent'], function(vent) {
        vent.on('eventName', function(){});
        vent.trigger('eventName');
    });
*/
define(['backbone.wreqr'],function(Wreqr){
  return new Wreqr.EventAggregator();
});
