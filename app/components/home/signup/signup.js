
/**
 * Module definition and dependencies
 */
angular.module('Site.Home.Signup', [])

/**
 * Route component
 */
.component('homeSignup', {
  templateUrl: 'home/signup/signup.html',
})

/**
 * Config
 */
.config($stateProvider => {
  $stateProvider.state('home.signup', {
    url: 'signup',
  });
});
