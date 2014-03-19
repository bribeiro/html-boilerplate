// Include gulp
var gulp = require('gulp'),

    // Include Our Plugins
    compass = require('gulp-compass'),
    rjs = require('gulp-requirejs'),
    imagemin = require('gulp-imagemin'),
    minifyCSS = require('gulp-minify-css'),
    htmlreplace = require('gulp-html-replace'),
    minifyHTML = require('gulp-minify-html'),
    uglify = require('gulp-uglify');


// Lint Task
gulp.task('lint', function() {
    return gulp.src('./src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('./'));
});


gulp.task('minify-html', function() {
    var opts = {
        comments: false,
        spare: false
    };

    gulp.src('./src/**/*.html')
        .pipe(htmlreplace({
            'styles': 'css/styles.css',
            'js': 'js/main-built.js'
        }))
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('./public/'));
});


gulp.task('requirejsBuild', function(a, b, c) {
    rjs({
        baseUrl: "./src/js",
        name: "main",
        include: "libs/require",
        wrap: true,
        inlineText: true,
        findNestedDependencies: true,
        preserveLicenseComments: false,
        skipModuleInsertion: false,
        optimize: "uglify2",
        optimizeCss: "standard",
        mainConfigFile: "./src/js/config.js",
        out: "main-built.js",

        /*
         * https://github.com/SlexAxton/require-handlebars-plugin
         */
        pragmasOnSave: {
            //removes Handlebars.Parser code (used to compile template strings) set
            //it to `false` if you need to parse template strings even after build
            excludeHbsParser: true,
            // kills the entire plugin set once it's built.
            excludeHbs: true,
            // removes i18n precompiler, handlebars and json2
            excludeAfterBuild: true
        },

        // Default i18n
        locale: "en_us",

        // options object which is passed to Handlebars compiler
        hbs: {
            templateExtension: "html",
            disableHelpers: false
        }
    }).pipe(uglify({
        outSourceMap: true
    })).pipe(gulp.dest('./public/js'));

});


gulp.task('images', function() {
    return gulp.src('./src/img/**/**')
    // Pass in options to the task
    .pipe(imagemin({
        optimizationLevel: 5
    }))
        .pipe(gulp.dest('./public/img'));
});


gulp.task('compass', function() {
    gulp.src('./src/css/styles.scss')
        .pipe(compass({
            config_file: './config.rb',
            css: 'public/css',
            sass: 'src/css'
        }))
        .pipe(gulp.dest('./public/css'));
});


// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('./src/css/source/**/*.scss', ['compass']);
    gulp.watch('./src/js/**/*.js', ['requirejsBuild']);
    gulp.watch('./src/**/*.html', ['minify-html']);
});



// Default Task
gulp.task('default', ['lint', 'compass', 'requirejsBuild', 'watch', 'images', 'minify-html']);
