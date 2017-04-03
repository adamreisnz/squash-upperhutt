'use strict';

/**
 * Dependencies
 */
const gulp = require('gulp');
const copyAssets = require('./copy-assets');
const build = require('../build');

/**
 * Export task
 */
module.exports = function watchAssets() {
  gulp.watch(build.SRC_ASSETS, gulp.series(copyAssets));
};
