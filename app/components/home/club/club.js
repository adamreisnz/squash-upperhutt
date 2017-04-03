
/**
 * Module definition and dependencies
 */
angular.module('Site.Home.Club', [])

/**
 * Route component
 */
.component('homeClub', {
  templateUrl: 'home/club/club.html',
})

/**
 * Config
 */
.config($stateProvider => {
  $stateProvider.state('home.club', {
    url: 'club',
  });
});
