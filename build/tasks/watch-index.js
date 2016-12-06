'use strict';

/**
 * Dependencies
 */
const gulp = require('gulp');
const buildIndex = require('./build-index');
const config = require('../config');

/**
 * Configuration
 */
const SRC_INDEX_HTML = config.SRC_INDEX_HTML;

/**
 * Export task
 */
module.exports = function watchIndex() {
  gulp.watch(SRC_INDEX_HTML, gulp.series(buildIndex));
};
