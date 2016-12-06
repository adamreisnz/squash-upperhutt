'use strict';

/**
 * Dependencies
 */
const path = require('path');
const browserSync = require('browser-sync').create();
const serveStatic = require('serve-static');
const proxy = require('http-proxy-middleware');
const config = require('./config');

/**
 * Constants
 */
const PORT = config.PORT;
const BASE_DIR = config.DEST_BUILD;
const API_PROXY = config.API_PROXY;

/**
 * Middleware
 */
const staticMiddleware = serveStatic(path.resolve(BASE_DIR));
const apiMiddleware = proxy('/api', {target: API_PROXY});
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
      apiMiddleware,
      spaMiddleware,
    ],
  },
});

/**
 * Create a stream of file-change events
 */
// Rx.Observable.create(observer => {
//   let watcher = chokidar
//     .watch([`${BASE_DIR}/**/*`], {ignoreInitial: true})
//     .on('all', (event, file) => {
//       observer.onNext({event, file});
//     });
//   return function() {
//     watcher.close();
//   };
// })
//   .debounce(1000)
//   .filter(x => (x.event === 'add' || x.event === 'change'))
//   .subscribe(x => {
//     if (x.file.match(/\.css$/)) {
//       browserSync.reload(x.file);
//     }
//     else {
//       browserSync.reload();
//     }
//   });
