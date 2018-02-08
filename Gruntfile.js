module.exports = function (grunt) {
   grunt.initConfig({
      jshint: {
         files: ["./app/**/*.js"],
         options: {
            predef: ["document", "console", "firebase", "moment"],
            esnext: true,
            globalstrict: true,
            globals: { "angular": true }
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
            files: ["./app/**/*.js"],
            tasks: ["jshint"]
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
   grunt.registerTask("default", ["jshint", "sass", "watch"]);
};