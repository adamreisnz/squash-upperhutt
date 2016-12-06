'use strict';

/**
 * Dependencies
 */
const del = require('del');
const config = require('../config');

/**
 * Configuration
 */
const DEST_BUILD = config.DEST_BUILD;

/**
 * Clean the build destination folder
 */
module.exports = function clean() {
  return del(DEST_BUILD, {
    dot: true,
  });
};
