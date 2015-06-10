'use strict';

var gulp = require('gulp'),
  plugins = require('gulp-load-plugins')();


gulp.task('serve', function () {
  return plugins.nodemon({
    watch: ['config','controllers', 'models', 'util', 'routes.js','server.js'],
    script: 'server.js'
  });
});

gulp.task('default', ['serve']);
