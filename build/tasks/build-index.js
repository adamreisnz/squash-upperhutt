'use strict';

/**
 * Dependencies
 */
const gulp = require('gulp');
const injectInHtml = require('gulp-inject');
const preprocess = require('gulp-preprocess');
const removeEmptyLines = require('gulp-remove-empty-lines');
const removeHtmlComments = require('gulp-remove-html-comments');
const loadConfig = require('../utils/load-config');
const getAppSources = require('../utils/get-app-sources');
const getLibSources = require('../utils/get-lib-sources');
const config = require('../config');

/**
 * Configuration
 */
const ENV = config.ENV;
const DEST_BUILD = config.DEST_BUILD;
const SRC_INDEX_HTML = config.SRC_INDEX_HTML;

/**
 * Build index.html file
 */
module.exports = function buildIndex() {

  //Run task
  return gulp.src(SRC_INDEX_HTML)
    .pipe(injectInHtml(getAppSources(), {
      addRootSlash: false,
      ignorePath: DEST_BUILD,
      name: 'app',
    }))
    .pipe(injectInHtml(getLibSources(), {
      addRootSlash: false,
      ignorePath: DEST_BUILD,
      name: 'lib',
    }))
    .pipe(preprocess({
      context: {
        ENV: ENV,
        CFG: loadConfig(),
      },
    }))
    .pipe(removeHtmlComments())
    .pipe(removeEmptyLines())
    .pipe(gulp.dest(DEST_BUILD));
};
