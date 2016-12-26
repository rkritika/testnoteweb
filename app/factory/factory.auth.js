(function() {
  var app = angular.module('myApp')
  app
    .factory('auth', function($localStorage) {
      var _token;

      return {
        setToken: function(token) {
          _token = token || _token;
          $localStorage.token = _token;
        },

        getToken: function() {
          return _token || $localStorage.token;
        },

        isLoggedIn: function() {
          return !!this.getToken();
        },

        logout: function() {
          _token = undefined;
          delete $localStorage.token;
        }
      }
    });
})();
