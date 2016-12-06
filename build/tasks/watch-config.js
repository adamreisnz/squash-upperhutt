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
const SRC_CONFIG = config.SRC_CONFIG;

/**
 * Export combined task
 */
module.exports = function watchConfig() {
  gulp.watch(SRC_CONFIG, gulp.series(buildAppJs, buildIndex));
};
