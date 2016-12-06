'use strict';

/**
 * Dependencies
 */
const gulp = require('gulp');
const buildAppCss = require('./build-app-css');
const config = require('../config');

/**
 * Configuration
 */
const SRC_SCSS = config.SRC_SCSS;

/**
 * Export task
 */
module.exports = function watchAppCss() {
  gulp.watch(SRC_SCSS, gulp.series(buildAppCss));
};
