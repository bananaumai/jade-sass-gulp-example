'use strict'

var gulp = require('gulp');
var jade = require('gulp-jade');
var notify = require('gulp-notify');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('build', ['template', 'sass']);

gulp.task('template', function() {
  gulp.src('./templates/*.jade')
      .pipe(jade({
        locals: {title: "test"}
      }))
      .pipe(gulp.dest('./dist'))
      .pipe(notify('Building templates succeed'));
});

gulp.task('sass', function() {
  gulp.src('./sass/**/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass({
        outputStyle: 'expanded'
      }).on('error', sass.logError))
      .pipe(sourcemaps.write('./maps'))
      .pipe(gulp.dest('./dist/css'))
      .pipe(notify('Building sass succeed'));
});

gulp.task('server', function() {
  gulp.src('dist')
      .pipe(webserver({
        livereload: true,
        open: true
      }));
});

gulp.task('watch', function() {
  gulp.watch('./templates/**/*.jade', ['template']);
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('default', ['server', 'build', 'watch']);
