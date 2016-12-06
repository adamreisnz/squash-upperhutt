'use strict';

/**
 * Dependencies
 */
const path = require('path');
const browserSync = require('browser-sync').create();
const serveStatic = require('serve-static');
const config = require('./config');

/**
 * Constants
 */
const PORT = config.PORT;
const BASE_DIR = config.DEST_BUILD;

/**
 * Middleware
 */
const staticMiddleware = serveStatic(path.resolve(BASE_DIR));
const spaMiddleware = function(req, res, next) {
  req.url = '/index.html';
  next();
};

/**
 * Initialize browser sync
 */
browserSync.init({
  files: [
    `${BASE_DIR}/**/*.css`,
    `${BASE_DIR}/**/*.js`,
    `${BASE_DIR}/**/*.html`,
    `${BASE_DIR}/**/*.jpg`,
    `${BASE_DIR}/**/*.png`,
    `${BASE_DIR}/**/*.svg`,
    `${BASE_DIR}/**/*.woff`,
  ],
  reloadDebounce: 1000,
  port: PORT,
  server: {
    baseDir: BASE_DIR,
    middleware: [
      staticMiddleware,
      spaMiddleware,
    ],
  },
});
