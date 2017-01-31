'use strict';

/**
 * Dependencies
 */
const path = require('path');
const browserSync = require('browser-sync').create();
const serveStatic = require('serve-static');
const build = require('./build');

/**
 * Build config
 */
const PORT = build.PORT;
const BASE_DIR = build.DEST_BUILD;
const WATCH_EXT = build.WATCH_EXT;

/**
 * Middleware
 */
const staticMiddleware = serveStatic(path.resolve(BASE_DIR));
const spaMiddleware = function(req, res, next) { //eslint-disable-line no-unused-vars
  req.url = '/index.html';
  next();
};

/**
 * Initialize browser sync
 */
browserSync.init({
  files: WATCH_EXT.map(ext => `${BASE_DIR}/**/*.${ext}`),
  reloadDebounce: 1500,
  ghostMode: false,
  port: PORT,
  server: {
    baseDir: BASE_DIR,
    middleware: [
      staticMiddleware,
      spaMiddleware,
    ],
  },
});
