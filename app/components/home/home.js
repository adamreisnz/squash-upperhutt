
/**
 * Module definition and dependencies
 */
angular.module('Site.Home', [
  'Site.Home.Hero',
  'Site.Home.Details',
  'Site.Home.Club',
  'Site.Home.About',
  'Site.Home.Signup',
  'Site.Home.Sponsors',
  'Site.Home.Contact',
])

/**
 * Config
 */
.config($stateProvider => {
  $stateProvider.state('home', {
    parent: 'site',
    url: '/',
    component: 'homeRoute',
  });
})

/**
 * Route component
 */
.component('homeRoute', {
  templateUrl: 'home/home.html',
});
