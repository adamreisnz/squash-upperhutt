
/**
 * Module definition and dependencies
 */
angular.module('App', [

  //Angular & 3rd party
  'ui.router',

  //Meanie modules
  'Log.Service',

  //Core modules
  'App.Config',
  'App.Templates',
  'App.Component',
  'App.Error',

  //App components
  'App.Home',
]);
