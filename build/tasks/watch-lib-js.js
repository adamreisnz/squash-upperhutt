'use strict';

/**
 * Dependencies
 */
const gulp = require('gulp');
const buildLibJs = require('./build-lib-js');
const config = require('../config');

/**
 * Configuration
 */
const SRC_LIB = config.SRC_LIB;

/**
 * Export task
 */
module.exports = function watchLibJs() {
  gulp.watch(SRC_LIB, gulp.series(buildLibJs));
};
