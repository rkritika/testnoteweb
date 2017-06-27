(function() {
  var app = angular.module('myApp')
  app.factory('AppManager', function($q, $http, auth) {

    return {
      getEventsforTwoMonths: function(user_id, max_date, min_date) {
        var deferred = $q.defer();
        var payload = new FormData();
        // console.log(user_id)
        // console.log(max_date)
        // console.log(min_date)
        payload.append('data', '{"user_id":"' + user_id + '","max_date":"' + max_date + '","min_date":"' + min_date + '"}');
        $http({
            url: 'https://api.gotimenote.com/user/get_profile_website',
            method: 'POST',
            data: payload,
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
          })
          .then(_success, _error)

        function _success(data) {
          console.log(data.data)
          deferred.resolve(data.data.data);
        }

        function _error(err) {
          deferred.reject(err);
        }

        return deferred.promise;
      },

      login: function(username, password) {
        var deferred = $q.defer();
        var payload = new FormData();

        payload.append('data', '{"username":"' + username + '","password":"' + password + '"}');

        $http({
            url: 'https://api.gotimenote.com/user/login',
            method: 'POST',
            data: payload,
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
          })
          .then(_success, _error)

        function _success(data) {
          console.log(data.data.data.access_token)
            // var access_token = data.data.data.access_token
          deferred.resolve(data.data);
        }

        function _error(err) {
          deferred.reject(err);
        }

        return deferred.promise;
      },
      saveEvent: function(username, user_id, event_id, access_token) {
        var deferred = $q.defer();
        var payload = new FormData();

        payload.append('data', '{"username":"' + username + '","user_id":"' + user_id + '","event_id":"' + event_id + '","access_token":"' + access_token + '"}');

        $http({
            url: 'https://api.gotimenote.com/user/keep_timenote_website',
            method: 'POST',
            data: payload,
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
          })
          .then(_success, _error)

        function _success(data) {
          console.log(data.data.data.access_token)
            // var access_token = data.data.data.access_token
          deferred.resolve(data.data);
        }

        function _error(err) {
          deferred.reject(err);
        }

        return deferred.promise;
      },
      getEventsByLocation: function(lat, long, offset) {
        console.log(lat, long, offset)
        var deferred = $q.defer();
        var payload = new FormData();

        payload.append('data', '{ "offset" : "' + offset + '" , "latitude" : "' + lat + '" , "longitude" : "' + long + '"}');

        $http({
            url: 'https://api.gotimenote.com/user/get_nearby_chatbot/',
            method: 'POST',
            data: payload,
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
          })
          .then(_success, _error)

        function _success(data) {
          console.log(data.data)
            // var access_token = data.data.data.access_token
          deferred.resolve(data.data);
        }

        function _error(err) {
          deferred.reject(err);
        }

        return deferred.promise;
      },
      getUserProfile: function(user_id) {
        var deferred = $q.defer();
        var payload = new FormData();

        payload.append('data', '{ "user_id" : "' + user_id + '"}');

        $http({
            url: 'https://api.gotimenote.com/user/get_user_website',
            method: 'POST',
            data: payload,
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
          })
          .then(_success, _error)

        function _success(data) {
          console.log(data.data)
            // var access_token = data.data.data.access_token
          deferred.resolve(data.data.data);
        }

        function _error(err) {
          deferred.reject(err);
        }

        return deferred.promise;
      },
      getEventsByEventId: function(event_id) {
        console.log(event_id)
        var deferred = $q.defer();
        var payload = new FormData();

        payload.append('data', '{ "timer_id" : "' + event_id + '"}');
        
        $http({
            url: 'https://api.gotimenote.com/user/get_timer_website',
            method: 'POST',
            data: payload,
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
          })
          .then(_success, _error)

        function _success(data) {
          console.log(data.data)
            // var access_token = data.data.data.access_token
          deferred.resolve(data.data.data);
        }

        function _error(err) {
          console.log(err)
          deferred.reject(err);
        }

        return deferred.promise;
      }
    }
  })
})();
