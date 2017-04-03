
/**
 * Module definition and dependencies
 */
angular.module('Site.Home.Contact', [])

/**
 * Component
 */
.component('homeContact', {
  templateUrl: 'home/contact/contact.html',
  controller: 'ContactFormCtrl',
})

/**
 * Config
 */
.config($stateProvider => {
  $stateProvider.state('home.contact', {
    url: 'contact',
  });
})

/**
 * Controller
 */
.controller('ContactFormCtrl', function($http, $timeout) {

  /**
   * On init
   */
  this.$onInit = function() {

    //Model
    this.contact = {};

    //Flags
    this.isSending = false;
    this.isSent = false;
  };

  /**
   * Submit contact form
   */
  this.submit = function() {

    //Must be validated
    if (this.form.$invalid) {
      return;
    }

    //Mark as sending
    this.isSending = true;
    this.isError = false;

    //Create data for request
    const data = {
      from: this.contact.name + '<' + this.contact.email + '>',
      to: 'upperhutt@bookingpro.nz',
      subject: 'Contact request through website',
      fields: this.contact,
    };

    //Send contact request
    $http
      .post('https://generic-form-handler.herokuapp.com/form', data)
      .then(() => {

        //Toggle flags
        this.isSending = false;
        this.isSent = true;

        //Reset model and mark form as pristine
        this.contact = {};
        this.form.$setPristine();
        this.form.$setUntouched();

        //Timeout sent flag
        $timeout(() => {
          this.isSent = false;
        }, 5000);
      })
      .catch(() => this.isError = true)
      .finally(() => this.isSending = false);
  };
});
