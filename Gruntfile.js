module.exports = function (grunt) {
   grunt.initConfig({
      browserify: {
         js: {
            src: ["./javascripts/main.js"],
            dest: "./dist/app.js"
         }
      },
      jshint: {
         files: ["./javascripts/**/*.js"],
         options: {
            predef: ["document", "console"],
            esnext: true,
            globalstrict: true,
            globals: {},
            browserify: true
         }
      },
      sass: {
         dist: {
            files: {
               "./css/main.css": "./sass/main.scss"
            }
         }
      },
      watch: {
         javascripts: {
            files: ["./javascripts/**/*.js"],
            tasks: ["jshint", "browserify"]
         },
         sass: {
            files: ["./sass/**/*.scss"],
            tasks: ["sass"]
         }
      }
   });

   require("matchdep")
      .filter("grunt-*")
      .forEach(grunt.loadNpmTasks);
   grunt.registerTask("default", ["jshint", "browserify", "sass", "watch"]);
};