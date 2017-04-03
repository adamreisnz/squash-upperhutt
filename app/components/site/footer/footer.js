
/**
 * Module definition and dependencies
 */
angular.module('Site.Footer', [])

/**
 * Component
 */
.component('siteFooter', {
  templateUrl: 'site/footer/footer.html',
  controller: 'SiteFooterCtrl',
  bindings: {
    smoothScrollTo: '&',
  },
})

/**
 * Controller
 */
.controller('SiteFooterCtrl', function() {

  /**
   * Scroll to top
   */
  this.toTop = function() {
    this.smoothScrollTo({$event: {section: 'top'}});
  };
});
