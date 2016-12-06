/* eslint no-console: 'off' */
'use strict';

/**
 * Dependencies
 */
const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const packageFilename = require('../utils/package-filename');
const config = require('../config');

/**
 * Configuration
 */
const SRC_JS = config.SRC_JS;
const DEST_JS = config.DEST_JS;
const BUNDLE_JS = config.BUNDLE_JS;

/**
 * Build application JS
 */
module.exports = function buildAppJs() {

  //Create stream
  let stream = gulp.src(SRC_JS.concat([
    '!**/*.spec.js',
  ]));

  //Bundling?
  if (BUNDLE_JS) {
    stream = stream.pipe(sourcemaps.init());
  }

  //Babel, annotate and wrap with IIFE
  stream = stream
    .pipe(plumber())
    .pipe(babel({
      compact: false,
    }))
    .on('error', error => {
      console.error(error);
    });

  //Minify
  if (BUNDLE_JS) {
    stream = stream
      .pipe(concat(packageFilename('.min.js')))
      .pipe(uglify())
      .pipe(sourcemaps.write('./'));
  }

  //Write to destination folder and return
  return stream.pipe(gulp.dest(DEST_JS));
};
