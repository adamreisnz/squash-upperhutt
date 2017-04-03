
/**
 * Module definition and dependencies
 */
angular.module('Site.Header', [])

/**
 * Component
 */
.component('siteHeader', {
  templateUrl: 'site/header/header.html',
  controller: 'SiteHeaderCtrl',
  bindings: {
    isAutoScrolling: '<',
    smoothScrollTo: '&',
  },
})

/**
 * Controller
 */
.controller('SiteHeaderCtrl', function(
  $scope, $window, $state, $document, $transitions, $timeout
) {

  /**
   * On init
   */
  this.$onInit = function() {

    //Set menu items
    this.menu = [
      {sref: 'home', title: 'Home', section: 'home', abstract: true},
      {sref: 'home.club', title: 'Club', section: 'club'},
      {sref: 'home.about', title: 'About', section: 'about'},
      {sref: 'home.signup', title: 'Sign up', section: 'signup'},
      {sref: 'home.sponsors', title: 'Sponsors', section: 'sponsors'},
      {sref: 'home.contact', title: 'Contact', section: 'contact'},
    ];

    //Initialize vars
    this.menuItems = [];
    this.isAutoStateChanging = false;
    this.isMenuVisible = false;

    //Check other flags
    this.checkFlags();

    //Success hook for transitions
    this.deregisterHook = $transitions.onSuccess({}, transition => {

      //Get to state
      const to = transition.to();

      //If this was an automatic state change (due to scrolling),
      //then there is no no need to scroll
      if (this.isAutoStateChanging) {
        return (this.isAutoStateChanging = false);
      }

      //Scroll to section
      this.scrollTo(to.name);
    });

    //Scrolling event listener
    $scope.$on('detectedScrolling', this.onScroll.bind(this));

    //Hide menu and set mobile state on window resize
    //Necessary to prevent menu transitions
    angular.element($window).on('resize', this.onResize.bind(this));
  };

  /**
   * On destroy
   */
  this.$onDestroy = function() {

    //Deregister transition hook
    if (this.deregisterHook) {
      this.deregisterHook();
    }

    //Deregister scroll/resize event listeners
    $scope.$off('detectedScrolling', this.onScroll.bind(this));
    angular.element($window).off('resize', this.onResize.bind(this));
  };

  /**
   * On resize
   */
  this.onResize = function() {
    this.checkFlags();
    this.isMenuVisible = false;
  };

  /**
   * On scroll
   */
  this.onScroll = function(event, scrollOffset) {

		//Toggle has scrolled flag
    this.checkFlags();

		//Execute after a delay to allow other listeners to prevent the default
    $timeout(() => {

			//Auto scrolling or default prevented? Don't change state
      if (this.isAutoScrolling || event.defaultPrevented) {
        return;
      }

			//Transition state now
      this.transitionState(scrollOffset);
    });
  };

  /**
   * Check flags
   */
  this.checkFlags = function() {
    this.isMobile = ($window.innerWidth < 768);
    this.isScrolled = ($window.pageYOffset > ($window.innerWidth * 0.1));
  };

  /**
	 * Scrolling helper
	 */
  this.scrollTo = function(sref) {

		//Find corresponding menu item and scroll to proper section
    const item = this.menu.find(item => item.sref === sref);
    if (item && item.section) {
      this.smoothScrollTo({$event: {section: item.section}});
    }
  };

  /**
	 * Active state check (not checking child/parent state relation)
	 */
  this.isActiveState = function(sref) {
    return ($state.current.name === sref);
  };

	/**
	 * Menu toggle
	 */
  this.toggleMenu = function(show) {
    if (angular.isDefined(show)) {
      this.isMenuVisible = !!show;
    }
    else {
      this.isMenuVisible = !this.isMenuVisible;
    }
  };

	/**
	 * Navigation
	 */
  this.navigateTo = function(item) {
    if (item.sref) {
      $state.go(item.sref);
    }
  };

	/**
	 * State transitioning helper
	 */
  this.transitionState = function(scrollOffset) {

		//Loop menu items in reverse and toggle the proper state when in view
    for (let i = this.menu.length - 1; i >= 0; i--) {

      //Get item
      const item = this.menu[i];
      if (item.sref && item.section) {

				//Get element
        let element = $document[0].getElementById(item.section);
        if (!element) {
          continue;
        }

				//Reached this section?
        const innerHeight = Number($window.innerHeight);
        const sectionOffset = (element.offsetTop - innerHeight / 4);
        if (scrollOffset > sectionOffset) {

					//Already in this state? No need to do anything
          if (item.sref === $state.current.name) {
            break;
          }

					//If not in this state, block scrolling on state change and go to this state
          this.isAutoStateChanging = true;
          this.navigateTo(item);
          return;
        }
      }
    }
  };
});
