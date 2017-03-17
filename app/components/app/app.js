
/**
 * Module definition and dependencies
 */
angular.module('App.Component', [
  'App.Controller',
  'App.Header.Component',
])

/**
 * Application configuration
 */
.config((
  $locationProvider, $urlServiceProvider, $httpProvider,
  $logProvider, $qProvider, $stateProvider, Config
) => {

  //Determine app base url
  if (!Config.APP_BASE_URL) {
    let port = Config.APP_PORT || window.location.port;
    Config.APP_BASE_URL =
      window.location.protocol + '//' + window.location.hostname +
      ((port !== 80) ? (':' + port) : '') + (Config.APP_BASE_PATH || '');
  }

  //Disable unhandled rejection warnings
  $qProvider.errorOnUnhandledRejections(false);

  //Enable HTML 5 mode browsing and set default route
  $locationProvider.html5Mode(true);
  $urlServiceProvider.rules.otherwise('/error/page-not-found');

  //Disable legacy $http promise methods and set default headers
  $httpProvider.useLegacyPromiseExtensions = false;

  //Disable all console logging in production
  if (Config.ENV === 'production') {
    $logProvider.disable('all');
  }

  //App base state
  $stateProvider.state('app', {
    url: '',
    abstract: true,
    data: {
      auth: false,
    },
    component: 'appRoute',
  });
})

/**
 * Route component
 */
.component('appRoute', {
  templateUrl: 'app/app.html',
  controller: 'AppCtrl',
  bindings: {},
})

/**
 * Run logic
 */
.run(($log, $rootScope, $trace, $transitions, Config) => {

  //Log info to console
  $log.info(Config.ENV, 'v' + Config.APP_VERSION, Config.APP_REVISION);

  //Set config in prototype of scope
  const protoScope = Object.getPrototypeOf($rootScope);
  for (const key in Config) {
    if (Config.hasOwnProperty(key)) {
      protoScope[key] = Config[key];
    }
  }

  //Enable transition trace
  if (Config.ENV === 'dev') {
    $trace.enable('TRANSITION');
  }

  /**
   * Before hook for transitions
   */
  $transitions.onBefore({}, transition => {
    transition.addResolvable({
      token: 'transition',
      resolveFn: () => transition,
    });
  });
});
