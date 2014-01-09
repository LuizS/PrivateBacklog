module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ember_handlebars: {
            compile: {
                options: {
                    processName: function(filePath) { // input:  templates/[xxxxxx].hbs
                        return filePath.replace("templates/","").replace(".hbs",""); // output: _header.hbs
                    }
                },
                files: {
                    "js/templates.js": ["templates/resource.hbs","templates/resource/learnings.hbs","templates/components/side-bar.hbs"]
                }
            }
        },

        // Include the templates in your app:
        concat: {
            all: {
                src: ['js/app.js',  'js/templates.js'],
                dest: 'js/compiled-app.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-ember-handlebars');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Default task(s).
    grunt.registerTask('default', ['ember_handlebars','concat']);

};