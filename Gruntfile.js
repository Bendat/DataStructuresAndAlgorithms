module.exports = function(grunt) {

  grunt.initConfig({
    ts: {
      default : {
        src: ["**/*.ts", "!node_modules/**/*.ts", "!typings/**/*.ts"],
        dest: "build/"
      }
    },
  });
  grunt.loadNpmTasks("grunt-ts");
  grunt.registerTask("default", ["ts"]);

};