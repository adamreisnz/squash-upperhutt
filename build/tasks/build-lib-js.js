'use strict';

/**
 * Dependencies
 */
const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const packageFilename = require('../utils/package-filename');
const config = require('../config');

/**
 * Configuration
 */
const SRC_LIB = config.SRC_LIB;
const DEST_LIB = config.DEST_LIB;
const BUNDLE_LIB = config.BUNDLE_LIB;

/**
 * Build lib javascript files
 */
module.exports = function buildLibJs() {

  //Create stream
  let stream = gulp.src(SRC_LIB);

  //Bundling?
  if (BUNDLE_LIB) {
    stream = stream
      .pipe(sourcemaps.init())
        .pipe(concat(packageFilename('lib', '.min.js')))
        .pipe(uglify())
      .pipe(sourcemaps.write('./'));
  }

  //Write to public folder and return
  return stream.pipe(gulp.dest(DEST_LIB));
};
