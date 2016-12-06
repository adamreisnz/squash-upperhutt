'use strict';

/**
 * Dependencies
 */
const gulp = require('gulp');
const copyAssets = require('./copy-assets');
const config = require('../config');

/**
 * Configuration
 */
const SRC_ASSETS = config.SRC_ASSETS;

/**
 * Export task
 */
module.exports = function watchAssets() {
  gulp.watch(SRC_ASSETS, gulp.series(copyAssets));
};
