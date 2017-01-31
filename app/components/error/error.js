
/**
 * Module definition and dependencies
 */
angular.module('App.Error', [
  'App.Error.Controller',
  'App.Error.Errors.Service',
  'App.Error.ErrorTypes.Service',
])

/**
 * Configuration
 */
.config(($provide, $stateProvider) => {

  //Exception handling
  $provide.decorator('$exceptionHandler', [
    '$log', '$injector',
    function($log) {
      return exception => {
        $log.error(exception);
      };
    }]);

  //State definition
  $stateProvider.state('error', {
    parent: 'app',
    url: '/error/:type',
    data: {
      auth: false,
    },
    component: 'errorRoute',
  });
})

/**
 * Component definition
 */
.component('errorRoute', {
  templateUrl: 'error/error.html',
  controller: 'ErrorCtrl',
  bindings: {
    transition: '<',
  },
})

/**
 * Run logic
 */
.run(($transitions, $state, Errors, BaseError) => {

  //Default error handler
  $state.defaultErrorHandler(error => {
    if (error instanceof BaseError) {
      Errors.show(error);
    }
  });

  //Remember last state
  $transitions.onSuccess({
    to(state) {
      return (state.name !== 'error');
    },
  }, transition => {
    Errors.setLastState(transition.targetState());
  });
});
