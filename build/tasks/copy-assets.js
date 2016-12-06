'use strict';

/**
 * Dependencies
 */
const gulp = require('gulp');
const config = require('../config');

/**
 * Configuration
 */
const SRC_ASSETS = config.SRC_ASSETS;
const DEST_ASSETS = config.DEST_ASSETS;

/**
 * Copy assets
 */
module.exports = function copyAssets() {
  return gulp.src(SRC_ASSETS).pipe(gulp.dest(DEST_ASSETS));
};
