'use strict';

/**
 * Get package info
 */
const pkg = require('../package.json');
const git = require('git-rev-sync');

/**
 * Environment configuration (base)
 */
module.exports = {

  //Application
  APP_NAME: pkg.name,
  APP_VERSION: pkg.version,
  APP_REVISION: git.short(),
  APP_TITLE: 'Squash @ Upper Hutt',
  APP_BASE_URL: '',
};
