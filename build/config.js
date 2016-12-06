/* eslint max-len: 'off' */
'use strict';

/**
 * Dependencies
 */
const path = require('path');
const argv = require('yargs').argv;
const pkg = require('../package.json');

//Environment
const ENV = argv.env || process.env.NODE_ENV || 'dev';
const VERSION = pkg.version;
const PORT = 8080;
const API_PROXY = 'http://localhost:8081';

//Paths
const PATH_ROOT = path.normalize(path.join(__dirname, '..'));
const PATH_CONFIG = path.join(PATH_ROOT, 'config');

//Source globs
const SRC_ASSETS = ['app/assets/**/*'];
const SRC_CONFIG = ['config/**/*.yml'];
const SRC_INDEX_HTML = 'app/index.html';
const SRC_INDEX_SCSS = 'app/index.scss';
const SRC_JS = ['app/**/*.js', 'app/components/**/*.js'];
const SRC_TESTS = ['app/**/*.spec.js'];
const SRC_SCSS = ['app/**/*.scss'];
const SRC_HTML = ['app/components/**/*.html'];

//Libraries
const SRC_LIB = [
  'node_modules/babel-polyfill/dist/polyfill.js',
  'node_modules/moment/moment.js',
  'node_modules/angular/angular.js',
  'node_modules/angular-animate/angular-animate.js',
  'node_modules/angular-cookies/angular-cookies.js',
  'node_modules/angular-touch/angular-touch.js',
  'node_modules/angular-messages/angular-messages.js',
  'node_modules/angular-sanitize/angular-sanitize.js',
  'node_modules/angular-ui-router/release/angular-ui-router.js',
  'node_modules/ng-file-upload/dist/ng-file-upload-shim.js',
  'node_modules/ng-file-upload/dist/ng-file-upload.js',
  'node_modules/meanie-angular-analytics/release/meanie-angular-analytics.js',
  'node_modules/meanie-angular-api/release/meanie-angular-api.js',
  'node_modules/meanie-angular-convert/release/meanie-angular-convert.js',
  'node_modules/meanie-angular-duplicate-requests-filter/release/meanie-angular-duplicate-requests-filter.js',
  'node_modules/meanie-angular-focus/release/meanie-angular-focus.js',
  'node_modules/meanie-angular-google-maps/release/meanie-angular-google-maps.js',
  'node_modules/meanie-angular-form-controls/release/meanie-angular-form-controls.js',
  'node_modules/meanie-angular-key-codes/release/meanie-angular-key-codes.js',
  'node_modules/meanie-angular-log/release/meanie-angular-log.js',
  'node_modules/meanie-angular-modal/release/meanie-angular-modal.js',
  'node_modules/meanie-angular-storage/release/meanie-angular-storage.js',
  'node_modules/meanie-angular-store/release/meanie-angular-store.js',
  'node_modules/meanie-angular-url/release/meanie-angular-url.js',
];
const SRC_LIB_TESTS = [
  'node_modules/angular-mocks/angular-mocks.js',
];

//Destination folders
let DEST_BUILD = `dist/${ENV}`;
let DEST_ASSETS = DEST_BUILD;
let DEST_JS = `${DEST_BUILD}/app`;
let DEST_CSS = `${DEST_BUILD}/css`;
let DEST_LIB = `${DEST_BUILD}/lib`;

//Build settings
let BUNDLE_JS = false;
let BUNDLE_CSS = false;
let BUNDLE_LIB = false;
let AUTOPREFIXER = {browsers: ['last 2 versions']};

/**
 * Non dev environment overrides
 */
if (ENV !== 'dev') {

  //Build settings
  BUNDLE_JS = true;
  BUNDLE_CSS = true;
  BUNDLE_LIB = true;

  //Destination folders
  DEST_JS =
  DEST_LIB =
  DEST_CSS = `${DEST_BUILD}/bundles`;
}

/**
 * Export config object
 */
module.exports = {

  //Environment
  ENV,
  VERSION,
  PORT,
  API_PROXY,

  //Core paths
  PATH_ROOT,
  PATH_CONFIG,

  //Destination paths
  DEST_BUILD,
  DEST_ASSETS,
  DEST_JS,
  DEST_LIB,
  DEST_CSS,

  //Sources (JS)
  SRC_JS,
  SRC_ASSETS,
  SRC_CONFIG,
  SRC_TESTS,
  SRC_LIB,
  SRC_LIB_TESTS,

  //Sources (CSS & HTML)
  SRC_INDEX_HTML,
  SRC_INDEX_SCSS,
  SRC_HTML,
  SRC_SCSS,

  //Other build settings
  BUNDLE_JS,
  BUNDLE_CSS,
  BUNDLE_LIB,
  AUTOPREFIXER,
};
