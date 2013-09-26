/*
    vent.js

    Global event aggregator that doesn't explicitely
    depend on the application and can be depended
    on anywhere.
*/
define(['backbone.wreqr'],function(Wreqr){
  return new Wreqr.EventAggregator();
});
