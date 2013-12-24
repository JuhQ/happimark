module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: ['Gruntfile.js', 'routes/*.js', 'public/**/*.js', '!public/js/libs/**/*.js', '!public/js/build.js'],
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        boss: true,
        browser: true,
        globals: {
          jQuery: true
        }
      }
    },
    coffee: {
      glob_to_multiple: {
        expand: true,
        cwd: 'coffeescript',
        src: ['**/*.coffee'],
        dest: '',
        ext: '.js'
      }
    },
    coffeelint: {
      app: ['coffeescript/**/*.coffee'],
      options: {
        "max_line_length": {
          "value": 140
        }
      }
    },
    less: {
      glob_to_multiple: 
        {
          expand: true,
          cwd: 'less',
          src: ['**/*.less', '!mixins.less'],
          dest: 'public/css/',
          ext: '.css'
        }
    },
    watch: {
      src: {
        files: ['coffeescript/**/*.coffee', 'less/*.less', 'Gruntfile.js'], // Remove Gruntfile.js if it's in coffeescript to avoid infinite loop
        tasks: ['default']
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['!public/js/libs/*.js', 'public/js/**/*.js', '!public/js/build.js'],
        dest: 'public/js/build.js'
      }
    },
    uglify: {
      build: {
        files: {
          'public/js/build.js': 'public/js/build.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-coffeelint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['less', 'coffeelint', 'coffee', 'jshint']);

  grunt.registerTask('build', ['concat', 'uglify']);

};