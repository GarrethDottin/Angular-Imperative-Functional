var pkgjson = require('./package.json');
// require('load-grunt-tasks')(grunt);

var config = {
  pkg: pkgjson,
}
module.exports = function (grunt) {
  // Configuration
  grunt.initConfig({
    config: config,
    pkg: config.pkg,
    bower: grunt.file.readJSON('.bowerrc'),
    browserify: {
      dist: {
        files: {
          'immutable.js': ['scripts/immutable.js'],
        },
      }
    },
    karma: {
      options: {
        configFile: 'karma.conf.js',
      },
      unit: {
        singleRun: true,
        browsers: ['PhantomJS'],
      },
      debug: {
        singleRun: false,
        debug: true,
        browsers: ['Chrome']
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      browserify: {
        files: ['scripts/immutable.js'],
        tasks: ["browserify"]
      }
    },
  });

  grunt.registerTask('default', [
    'browserify'
    ]);
  grunt.registerTask('build', [
    'default'
    ]);

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-browserify');

};
