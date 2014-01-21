define('templates/helpers/lowerCaseNoSpaces', ['Handlebars'], function ( Handlebars ) {
  function lowerCaseNoSpaces ( context, options ) {
    return context.replace(/\s+/g, '').toLowerCase();
  }
  Handlebars.registerHelper( 'lowerCaseNoSpaces', lowerCaseNoSpaces );
  return lowerCaseNoSpaces;
});