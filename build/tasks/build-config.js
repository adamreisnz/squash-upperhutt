/* eslint no-console: 'off' */
'use strict';

/**
 * Dependencies
 */
const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const file = require('gulp-file');
const packageFilename = require('../utils/package-filename');
const loadConfig = require('../utils/load-config');
const config = require('../config');

/**
 * Configuration
 */
const DEST_JS = config.DEST_JS;
const BUNDLE_JS = config.BUNDLE_JS;

/**
 * Config module stream
 */
module.exports = function buildConfig() {

  //Create file stream for configuration file
  let stream = file('app.config.js', JSON.stringify({}), {src: true})
    //loadConfig()
    .pipe(babel({
      compact: false,
    }))
    .on('error', error => {
      console.error(error);
    });

  //Minify
  if (BUNDLE_JS) {
    stream = stream
      .pipe(concat(packageFilename('.config.min.js')))
      .pipe(uglify());
  }

  //Write to destination folder and return
  return stream.pipe(gulp.dest(DEST_JS));
};
