(function() {
  var app = angular.module('myApp')
  app.controller('homeCtrl', function($scope, $location, $anchorScroll, $document, AppManager, $window, auth, $http, $state, $mdDialog, md5) {
    var token = auth.getToken()
    $scope.isLoggedIn = (token != undefined)

    if ($scope.isLoggedIn) {
      $scope.user_id = auth.getToken().user_id
      $scope.access_token = auth.getToken().access_token
    }

    $scope.pos = {}
    $scope.show = function() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            $scope.pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            console.log($scope.pos.lat);
            console.log($scope.pos.lng);
            var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + $scope.pos.lat + "," + $scope.pos.lng + "&sensor=true";

            console.log(url)
            $http.get(url)
              .then(function(result) {
                var address = result.data.results[2].formatted_address;
                $scope.address = address;
                console.log($scope.address)
              });
          })
        }
      }
      // $scope.myCalendar = function() {


    //   // console.log(auth.getToken())
    // }
    $scope.pos.lat = undefined;
    $scope.pos.lng = undefined;

    $scope.$on('gmPlacesAutocomplete::placeChanged', function() {
      var location = $scope.autocomplete.getPlace().geometry.location;
      $scope.pos.lat = location.lat();
      $scope.pos.lng = location.lng();
      $scope.address = $scope.autocomplete;
      $scope.$apply();
    });

    $scope.logout = function() {
      auth.logout()
      $window.location.reload()
    }
    $scope.showAdvanced = function(ev) {
      $mdDialog.show({
          controller: DialogController,
          templateUrl: 'dialog1.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
        .then(function(answer) {
          $window.location.reload()
          $scope.status = 'You said the information was \n"' + answer;
          console.log($scope.status)
        }, function() {
          $scope.status = 'You cancelled the dialog.';
          console.log($scope.status)
          console.log($scope.status)

        });
    };

    function DialogController($scope, $mdDialog, auth) {
      $scope.hide = function() {
        $mdDialog.hide();
      };
      console.log(auth.isLoggedIn())

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };

      $scope.login = function(user, password) {
        var pass = md5.createHash(password)
        AppManager.login(user, pass)
          .then(function(result) {
            console.log(result)
            var result = result
            if (result.success === "true") {
              var access_token = result.data.access_token
              var user_id = result.data.user_id
              var token = {
                access_token: access_token,
                user_id: user_id
              }
              auth.setToken(token)
            } else {
              console.log('Invalid username/password')
            }
            return result
          })
          .then(function(result) {
            $scope.answer(JSON.stringify(result))
          })
      }


    }

  });

})()
