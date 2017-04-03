
/**
 * Module definition and dependencies
 */
angular.module('Shared.DetectScrolling.Directive', [])

/**
 * Directive
 */
.directive('detectScrolling', function($window, $rootScope) {
  return {
    restrict: 'A',
    link: function(scope) {
      angular.element($window).on('scroll resize', () => {
        scope.$apply(() => {
          scope.isScrolling = ($window.pageYOffset > 0);
          $rootScope.$broadcast(
            'detectedScrolling', $window.pageYOffset, $window);
        });
      });
    },
  };
});
