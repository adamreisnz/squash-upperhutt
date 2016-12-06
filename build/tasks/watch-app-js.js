'use strict';

/**
 * Dependencies
 */
const gulp = require('gulp');
const buildAppJs = require('./build-app-js');
const buildIndex = require('./build-index');
const config = require('../config');

/**
 * Configuration
 */
const SRC_JS = config.SRC_JS;
const SRC_HTML = config.SRC_HTML;

/**
 * Watch client side code
 */
module.exports = function watchAppCode() {
  let files = [].concat(SRC_JS, SRC_HTML);
  gulp.watch(files, gulp.series(buildAppJs, buildIndex));
};
