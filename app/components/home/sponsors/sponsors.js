
/**
 * Module definition and dependencies
 */
angular.module('Site.Home.Sponsors', [])

/**
 * Route component
 */
.component('homeSponsors', {
  templateUrl: 'home/sponsors/sponsors.html',
})

/**
 * Config
 */
.config($stateProvider => {
  $stateProvider.state('home.sponsors', {
    url: 'sponsors',
  });
});
