'use strict';

var gulp = require('gulp');
var zip = require('gulp-zip');

var files = ['manifest.json', 'save_url.css','save_url.html','save_url_try.js','save32.png','save48.png'];
var xpiName = 'VistoNelWeb.xpi';

gulp.task('default', function () {
  gulp.src(files)
    .pipe(zip(xpiName))
    .pipe(gulp.dest('.'));
});