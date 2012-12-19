# Minimal Boilerplate for HTML / CSS / JS 

### Adapted from:
- [Twitter bootstrap](http://twitter.github.com/bootstrap)
- [Html5 Boilerplate](http://html5boilerplate.com)

### Requires:
- [sass](http://sass-lang.com)
- [fabric](http://docs.fabfile.org/en/1.5/)
- git

### Comes ready with:
- [Require.js](http://requirejs.org)
- [selectivizr](http://selectivizr.com/)

### Also packaged and available for use with Require.js:
- [jQuery](http://jquery.com)
- [modernizr](http://modernizr.com)
- [domReady](https://github.com/requirejs/domReady)
- [Underscore](http://underscorejs.org)
- [Backbone](http://backbonejs.org)

### Useful notes:
- compile css: ```fab css.compile```
- watch css: ```fab css.watch```
- deploy to staging: ```fab deploy.staging``` (requires setup)
- deploy to production: ```fab deploy.production``` (requires setup)


## How to start:
1. Edit your index.html file of course
1. By default your javascript starts at `/static/js/app/main.js`
1. JS configuration settings are at `/static/js/config.js`
1. run `fab css.compile` or `fab css.watch` to create your .css file


### Quick example using AMD modules

create file `/static/js/app/supportsCSS3.js`, wrap it in a "define()" function call:

	define(function( require ){
		var M = require('modernizr');
		//the returned function is the modules value
		return function( selector ){
			return M.cssgradients && M.csstransforms && M.csstransitions;
		};
	});

in file `/static/js/app/main.js`, require your new module:

	define(function( require ){
		var $ = require('jquery'),
			supportsCSS3 = require('./supportsCSS3');

		if( supportsCSS3() ){
			//do awesome things
			$('.things').css({
				transition: 'all 1s linear',
				transform: 'rotate(45deg)'
			});
		}
	});
