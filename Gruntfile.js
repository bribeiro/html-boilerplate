module.exports = function (grunt) {

    // Watcher for sass compilation and js hinting

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        requirejs: {
            mainJS: {
                options: {
                    baseUrl: "static/js/app",
                    wrap: true,
                    preserveLicenseComments: false,
                    optimize: "uglify",
                    optimizeCss: "standard",
                    mainConfigFile: "static/js/config.js",
                    out: "static/js/main-built.js",

                    /*********
                     * https://github.com/SlexAxton/require-handlebars-plugin
                     */
                    pragmasOnSave: {
                        //removes Handlebars.Parser code (used to compile template strings) set
                        //it to `false` if you need to parse template strings even after build
                        excludeHbsParser : true,
                        // kills the entire plugin set once it's built.
                        excludeHbs: true,
                        // removes i18n precompiler, handlebars and json2
                        excludeAfterBuild: true
                    },

                    // Default i18n
                    locale: "en_us",

                    // options object which is passed to Handlebars compiler
                    hbs : {
                        templateExtension: "html",
                        disableHelpers: true,
                        i18nDirectory: "templates/i18n/"
                    }
                }
            }

        },

        jshint: {
            // don't be so strict
            options: {
                '-W008': true,
                '-W030': true
            },
            all: ['static/js/app/**.js']
        },

        compass: {
            dist: {
                options: {
                    basePath: 'static',
                    cssDir: 'css',
                    sassDir: 'css/src',
                    imagesDir: 'img',
                    require: 'sass-globbing'
                }
            }
        },

        watch: {
            css: {
                options: {
                    debounceDelay: 200,
                    interrupt: true
                },
                files: [
                    'static/css/src/**/*.{scss,sass}'
                ],
                tasks: ['compass']
            },

            js: {
                options: {
                    debounceDelay: 200,
                    interrupt: true
                },
                files: [
                    'static/js/app/*.js',
                    'static/js/app/**/*.js'
                ],
                tasks: ['jshint']
            }
        },

        connect: {
            server: {
                options: {
                    //protocol: 'https',
                    port: 8000,
                    base: './static'
                }
            }
        }
    });

    // on watch events configure jshint:all to only run on changed file
    grunt.event.on('watch', function (action, filepath) {
        grunt.config(['jshint', 'changed'], filepath);
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Default task
    grunt.registerTask('default', [ 'compass' ]);

    // JSHint task
    grunt.registerTask('dev', [ 'default', 'connect', 'watch' ]);

    // Build task
    grunt.registerTask('build', [ 'default', 'requirejs:mainJS' ]);


};
