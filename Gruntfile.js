module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
        },
        karma: {
            test: {
                configFile: 'karma.conf.js'
            }
        },
        jsdoc : {
            dist: {
                src: ['README.md'],
                options: {
                    template: "node_modules/jaguarjs-jsdoc",
                    encoding: "utf8",
                    destination: "docs",
                    recurse: true,
                    private: true,
                    configure: 'jsdoc.conf.json'
                }
            }
        },
        concat : {
            dist : {
                src : [
                    'src/jindo.$Router.js',
                    'src/jindo.$Router.**.js',
                    'src/<%= pkg.name %>.js'
                ],
                dest: 'build/<%= pkg.name %>-<%= pkg.version %>.js'
            }
        },
        uglify : {
            dist : {
                files : {
                    'build/<%= pkg.name %>-<%= pkg.version %>.min.js' : [
                        'build/<%= pkg.name %>-<%= pkg.version %>.js'
                    ]
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Test task(s).
    grunt.registerTask('test', ['jshint', 'karma']);

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'karma', 'jsdoc', 'concat', 'uglify']);
};