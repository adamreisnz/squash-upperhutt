'use strict';

/**
 * Dependencies
 */
const gulp = require('gulp');
const config = require('../config');
const packageFilename = require('./package-filename');

/**
 * Configuration
 */
const DEST_JS = config.DEST_JS;
const DEST_CSS = config.DEST_CSS;
const BUNDLE_JS = config.BUNDLE_JS;
const BUNDLE_CSS = config.BUNDLE_CSS;

/**
 * Get app sources
 */
module.exports = function getAppSources() {

  //Initialize files
  const files = [];

  //Add JS
  if (BUNDLE_JS) {
    files.push(DEST_JS + '/' + packageFilename('.min.js'));
    files.push(DEST_JS + '/' + packageFilename('.config.min.js'));
  }
  else {
    files.push(DEST_JS + '/' + '**/*.js');
  }

  //Add CSS
  if (BUNDLE_CSS) {
    files.push(DEST_CSS + '/' + packageFilename('.min.css'));
  }
  else {
    files.push(DEST_CSS + '/' + '**/*.css');
  }

  //Return sources
  return gulp.src(files, {read: false});
};
