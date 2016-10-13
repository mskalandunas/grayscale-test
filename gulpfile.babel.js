'use strict';

import gulp from 'gulp';
import cssNano from 'gulp-cssnano';
import concatCss from 'gulp-concat-css';
import webpack from 'webpack-stream';

const staticFiles = [
  'app/**/*.html',
  'app/**/*.ico',
  'app/**/*.jpg',
  'app/**/*.mp3',
  'app/**/*.png'
];

const styleSheets = [
  'app/css/bulma.css',
  'app/css/additional.css'
];

gulp.task('static:dev', () => {
  gulp.src(staticFiles)
  .pipe(gulp.dest(__dirname + '/build/'));
});

gulp.task('webpack:dev', () => {
  return gulp.src('app/js/entry.js')
  .pipe(webpack({
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('build/js/'));
});

gulp.task('css:dev', () => {
  return gulp.src(styleSheets)
  .pipe(concatCss('main.css'))
  .pipe(cssNano())
  .pipe(gulp.dest(__dirname + '/build/css'));
});

gulp.task('watch:build', () => {
  gulp.watch(staticFiles, ['static:dev']);
  gulp.watch(styleSheets, ['css:dev']);
  gulp.watch('app/**/*.js', ['webpack:dev']);
});

gulp.task('build', ['static:dev', 'webpack:dev', 'css:dev']);
gulp.task('default', ['build', 'watch:build']);
