
/**
 * Module definition and dependencies
 */
angular.module('Site.Component', [
  'Site.Header',
  'Site.Footer',
])

/**
 * Application configuration
 */
.config((
  $locationProvider, $urlServiceProvider, $httpProvider, $qProvider,
  $stateProvider, Config
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

  //Site base state
  $stateProvider.state('site', {
    url: '',
    abstract: true,
    component: 'siteRoute',
  });
})

/**
 * Run logic
 */
.run(($log, Config) => {
  $log.info(Config.ENV, 'v' + Config.APP_VERSION, Config.APP_REVISION);
})

/**
 * Component
 */
.component('siteRoute', {
  templateUrl: 'site/site.html',
  controller: 'SiteCtrl',
})

/**
 * Controller
 */
.controller('SiteCtrl', function($document, $timeout, smoothScroll) {

  //Get self
  const $ctrl = this;

  /**
   * On init
   */
  this.$onInit = function() {
    this.isAutoScrolling = false;
  };

  /**
   * Smooth scroll helper
   */
  this.smoothScrollTo = function($event) {

    //Get section and element
    const section = $event.section;
    const element = $document[0].getElementById(section);

    //Smooth scroll to it
    $timeout(() => {
      if (element) {
        smoothScroll(element, {
          offset: 48,
          callbackBefore() {
            $ctrl.isAutoScrolling = true;
          },
          callbackAfter() {
            $ctrl.isAutoScrolling = false;
          },
        });
      }
    }, 25);
  };
});
