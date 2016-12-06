'use strict';

/**
 * Dependencies
 */
const gulp = require('gulp');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const packageFilename = require('../utils/package-filename');
const config = require('../config');

/**
 * Configuration
 */
const SRC_INDEX_SCSS = config.SRC_INDEX_SCSS;
const DEST_CSS = config.DEST_CSS;
const BUNDLE_CSS = config.BUNDLE_CSS;
const AUTOPREFIXER = config.AUTOPREFIXER;

/**
 * Build application SCSS files
 */
module.exports = function buildAppScss() {

  //Create stream
  let stream = gulp.src(SRC_INDEX_SCSS)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(AUTOPREFIXER));

  //Bundling?
  if (BUNDLE_CSS) {
    stream = stream
      .pipe(csso())
      .pipe(rename(packageFilename('.min.css')));
  }

  //Write to destination folder
  return stream.pipe(gulp.dest(DEST_CSS));
};
