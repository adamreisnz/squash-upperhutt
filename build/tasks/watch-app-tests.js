'use strict';

/**
 * Dependencies
 */
const gulp = require('gulp');
const test = require('./test');
const config = require('../config');

/**
 * Configuration
 */
const SRC_JS = config.SRC_JS;
const SRC_TESTS = config.SRC_TESTS;

/**
 * Watch client side tests
 */
module.exports = function watchAppTests() {
  let files = [].concat(SRC_JS, SRC_TESTS);
  gulp.watch(files, gulp.series(test));
};
