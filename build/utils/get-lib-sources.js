'use strict';

/**
 * Dependencies
 */
const path = require('path');
const gulp = require('gulp');
const config = require('../config');
const packageFilename = require('./package-filename');

/**
 * Configuration
 */
const SRC_LIB = config.SRC_LIB;
const DEST_LIB = config.DEST_LIB;
const BUNDLE_LIB = config.BUNDLE_LIB;

/**
 * Get app sources
 */
module.exports = function getLibSources() {
  let files = [];
  if (BUNDLE_LIB) {
    files.push(DEST_LIB + '/' + packageFilename('lib', '.min.js'));
  }
  else {
    files = SRC_LIB.map(file => {
      return DEST_LIB + '/' + path.basename(file);
    });
  }
  return gulp.src(files);
};
