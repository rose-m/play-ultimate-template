module.exports = function (grunt) {

    // Matchdep - Use globule to filter npm module dependencies by name
    var matchdep = require('matchdep');

    // Filter devDependencies (with config string indicating file to be required)
    // Load the plugin that provides the task
    matchdep.filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Project configuration
    grunt.initConfig({

            // Run predefined tasks whenever watched file patterns are added, changed or deleted
            watch: {
                options: {
                    livereload: false,
                    spawn: false
                },

                html: {
                    files: ['src/views/{,*/}*.html'],
                    tasks: ['copy:html']
                },

                concat: {
                    files: ['src/stylesheets/*.css'],
                    tasks: ['concat']
                },

                autoprefixer: {
                    files: ['../public/stylesheets/*.css'],
                    tasks: ['autoprefixer']
                },

                // watch other files
                scripts: {
                    files: ['src/scripts/{,*/}*.js'],
                    tasks: ['requirejs:dev']
                },

                coffee: {
                    files: ['src/coffee/{,*/}*.coffee'],
                    tasks: ['coffee']
                },

                copyImages: {
                    files: ['src/images/{,*/}*.{png,gif,jpg,jpeg}'],
                    tasks: ['copy:devOnly']
                }
            },

            // Compass convert .scss to .css
            // https://github.com/gruntjs/grunt-contrib-compass
            compass: {
                options: {
                    sassDir: 'src/sass',
                    cssDir: 'src/stylesheets',
                    javascriptsDir: 'src/scripts',
                    imagesDir: 'assets/images',
                    outputStyle: 'nested',
                    relativeAssets: false,
                    importPath: 'src/bower_components',
                    debugInfo: false
                },
                dev: {
                    options: {
                        environment: 'development',
                        noLineComments: false,
                        watch: true,
                        debugInfo: true
                    },
                    files: [
                        {
                            expand: true,
                            cwd: 'src/sass/',
                            src: '{,*/}*.scss',
                            dest: 'src/stylesheets',
                            ext: '.css'
                        }
                    ]
                },
                build: {
                    options: {
                        environment: 'production',
                        noLineComments: true,
                        watch: false
                    },
                    files: [
                        {
                            expand: true,
                            cwd: 'src/sass/',
                            src: '{,*/}*.scss',
                            dest: 'src/stylesheets',
                            ext: '.css'
                        }
                    ]
                }
            },

            // Parse CSS and add vendor-prefixed CSS properties using the Can I Use database. Based on Autoprefixer.
            // https://github.com/nDmitry/grunt-autoprefixer
            autoprefixer: {
                css: {
                    files: [
                        {
                            expand: true,
                            cwd: '../public/stylesheets/',
                            src: '*.css',
                            dest: '../public/stylesheets/'
                        }
                    ]
                }
            },

            // Minify PNG, JPG and GIF images
            // https://github.com/gruntjs/grunt-contrib-imagemin
            imagemin: {
                options: {
                    optimizationLevel: 3
                },
                build: {
                    files: [
                        {
                            expand: true,
                            cwd: 'src/images',
                            src: ['**/*.{png,gif,jpg,jpeg}'],
                            dest: '../public/images'
                        }
                    ]
                }
            },

            // requireJS optimizer
            // https://github.com/gruntjs/grunt-contrib-requirejs
            requirejs: {
                dev: {
                    options: {
                        baseUrl: 'src/scripts',
                        mainConfigFile: 'src/scripts/main.js',
                        useStrict: true,
                        wrap: true,
                        name: '../bower_components/requirejs/require',
                        include: 'main',
                        out: '../public/javascripts/main.js',
                        optimize: 'none'
                    }
                },
                build: {
                    options: {
                        baseUrl: 'src/scripts',
                        mainConfigFile: 'src/scripts/main.js',
                        optimize: 'uglify2',
                        preserveLicenseComments: false,
                        useStrict: true,
                        wrap: true,
                        name: '../bower_components/requirejs/require',
                        include: 'main',
                        out: '../public/javascripts/main.js'
                    }
                }
            },

            concat: {
                stylesheets: {
                    src: 'src/stylesheets/*.css',
                    dest: '../public/stylesheets/main.css'
                }
            },

            cssmin: {
                minify: {
                    expand: true,
                    cwd: '../public/stylesheets/',
                    src: ['*.css', '!*.min.css'],
                    dest: '../public/stylesheets/'
                }
            },

            coffee: {
                options: {
                    bare: true,
                    join: true
                },
                build: {
                    expand: true,
                    cwd: 'src/coffee',
                    src: ['**/*.coffee'],
                    dest: '../public/javascripts',
                    ext: '.js'
                }
            },

            concurrent: {
                dev: ['compass:dev', 'watch']
            },

            // copy some files not handled by other tasks
            copy: {
                devOnly: {
                    files: [
                        {
                            expand: true,
                            cwd: 'src/images',
                            src: ['**/*.{png,gif,jpg,jpeg}'],
                            dest: '../public/images'
                        }
                    ]
                },
                html: {
                    files: [
                        {
                            expand: true,
                            cwd: 'src/views',
                            src: ['**/*.html'],
                            dest: '../public/views'
                        }
                    ]
                },
                build: {
                    files: [
                        {
                            expand: true,
                            cwd: 'src/bower_components',
                            src: ['sass-bootstrap/fonts/*'],
                            dest: '../public/bower_components'
                        }
                    ]
                }
            },

            // clean the build dir
            // https://github.com/gruntjs/grunt-contrib-clean
            clean: {
                options: {
                    force: true
                },
                beforebuild: ['../public'],
                afterBuild: ['.tmp']
            }
        }
    );

    // Default task(s).
    grunt.registerTask('default', [
        'requirejs:dev',
        'coffee',
        'copy',
        'concat',
        'concurrent:dev'
    ]);

    grunt.registerTask('run', [
        'default'
    ]);

    // building
    grunt.registerTask('build', [
        'clean:beforebuild',
        'newer:imagemin:build',
        'requirejs:build',
        'coffee',
        'compass:build',
        'concat',
        'autoprefixer',
        'cssmin',
        'copy:html',
        'copy:build',
        'clean:afterBuild'
    ]);
}
;