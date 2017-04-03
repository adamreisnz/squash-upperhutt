
/**
 * Module definition and dependencies
 */
angular.module('Site.Home.About', [])

/**
 * Route component
 */
.component('homeAbout', {
  templateUrl: 'home/about/about.html',
})

/**
 * Config
 */
.config($stateProvider => {
  $stateProvider.state('home.about', {
    url: 'about',
  });
});
