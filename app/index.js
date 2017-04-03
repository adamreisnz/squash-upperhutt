
/**
 * Module definition and dependencies
 */
angular.module('Site', [

  //Angular & 3rd party
  'ngMessages',
  'ui.router',
  'smoothScroll',

  //Core modules
  'Site.Config',
  'Site.Templates',
  'Site.Component',

  //Site modules
  'Site.Home',

  //Shared modules
  'Shared.DetectScrolling.Directive',
  'Shared.HasError.Directive',
]);
