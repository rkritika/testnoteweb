(function() {
  var app = angular.module('myApp')
  app
    .factory('eventHandler', function($localStorage) {
      var _event = [];
      var _address = {
        "lat":"",
        "lng":"",
        "offset":""
      };
      return {
        setEvents: function(event, lat, lng, offset) {
          _event = event || _event;       
          $localStorage.event = _event;                    
          _address.lat = lat || lat;
          _address.lng = lng || lng;
          _address.offset = offset || offset;
          console.log(_address)
          $localStorage.address = _address
        },

        getEvents: function() {
          return _event || $localStorage.event;
        },
        getAddress: function() {
          console.log("AJSJSJ")
          console.log($localStorage.address)
          return _address || $localStorage.address;
        },

        isEventStored : function() {
          return !!this.getEvents();
        }
      }
    });
})();
