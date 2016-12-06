'use strict';

/**
 * Dependencies
 */
const path = require('path');
const karma = require('karma');
const config = require('../config');

/**
 * Configuration
 */
const PATH_ROOT = config.PATH_ROOT;
const SRC_LIB = config.SRC_LIB;
const SRC_LIB_TESTS = config.SRC_LIB_TESTS;
const SRC_JS = config.SRC_JS;
const SRC_TESTS = config.SRC_TESTS;

/**
 * Run tests
 */
module.exports = function test(done) {

  //Get files for testing
  let files = [].concat(
    SRC_LIB,
    SRC_LIB_TESTS,
    SRC_JS,
    SRC_TESTS
  );

  //Run karma server
  new karma.Server({
    configFile: path.join(PATH_ROOT, 'karma.conf.js'),
    singleRun: true,
    failOnEmptyTestSuite: false,
    files: files,
  }, done).start();
};
