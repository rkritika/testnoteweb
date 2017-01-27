(function() {
  var app = angular.module('myApp')
  app.controller('homeCtrl', function($scope, $location, $anchorScroll, $document, $timeout,
    AppManager, $window, auth, $http, $state, $mdDialog, md5) {
    var token = auth.getToken()
    $scope.isLoggedIn = (token != undefined)

    if ($scope.isLoggedIn) {
      $scope.user_id = auth.getToken().user_id
      $scope.access_token = auth.getToken().access_token
    }

    $scope.posts = {
      data: []
    };
    $scope.lat = undefined;
    $scope.lng = undefined;

    $scope.$on('gmPlacesAutocomplete::placeChanged', function() {
      var location = $scope.autocomplete.getPlace().geometry.location;

      $scope.address = $scope.autocomplete.getPlace().formatted_address
      $scope.lat = location.lat();
      $scope.lng = location.lng();
      // $scope.lng = location.getPlace();
      console.log($scope.address)

      $scope.$apply();

    });

    $scope.show = function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onPositionUpdate);
      }
    }

    function onPositionUpdate(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      $scope.lat = lat
      $scope.lng = lng
      var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=true";
      $http.get(url)
        .then(function(result) {
          var address = result.data.results[2].formatted_address;
          $scope.autocomplete = address;
          $scope.address = address;
          console.log($scope.address)
        });
    }
    // $scope.show = function() {
    //     if (navigator.geolocation) {
    //       navigator.geolocation.getCurrentPosition(function(position) {
    //         $scope.pos = {
    //           lat: position.coords.latitude,
    //           lng: position.coords.longitude
    //         };
    //         var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + $scope.pos.lat + "," + $scope.pos.lng + "&sensor=true";
    //         $http.get(url)
    //           .then(function(result) {
    //             var address = result.data.results[2].formatted_address;
    //             $scope.autocomplete = address;
    //             $scope.address = address;
    //             console.log($scope.address)
    //           });
    //       })
    //     }
    //   }
    // $scope.myCalendar = function() {
    $scope.search = function(lat, long, offset) {
      $scope.slickConfig1Loaded = false;
      AppManager.getEventsByLocation(lat, long, offset)
        .then(function(result) {
          $scope.data = result.data.nearby
          console.log($scope.data)
          if ($scope.data !== undefined && $scope.data !== null && $scope.data.length != 0) {
            $scope.getEvents(result.data.nearby)

          } else {
            console.log('no data')
          }
          var someElement = angular.element(document.getElementById('demo'));
          console.log(someElement)
          $document.scrollToElement(someElement, 30, 2000);
        })
    }
    $scope.goToUser = function(user_id) {
      // console.log(event)
      // event.user_id = $scope.user_id
      $location.path('/calendar/' + user_id)

      // $state.go('calendar', { user_id: user_id });
    }

    //   // console.log(auth.getToken())
    // }
    // $scope.pos.lat = undefined;
    // $scope.pos.lng = undefined;

    // $scope.$on('gmPlacesAutocomplete::placeChanged', function() {
    //   // console.log( $scope.address.getPlace())
    //   var location = $scope.autocomplete.getPlace().autocomplete().geometry.location;
    //   $scope.address = $scope.autocomplete.getPlace()

    //   $scope.pos.lat = location.lat();
    //   $scope.pos.lng = location.lng();
    //   console.log(location)
    //   // $scope.address = $scope.autocomplete;
    //   $scope.$apply();
    // });
    $scope.baseurl = 'http://api.gotimenote.com/'

    $scope.getEvents = function(data) {
      $scope.slickConfig1Loaded = true;

      var l = data.length
      for (i = 0; i < l; i++) {
        console.log(data[i])
        var temp = data[i].link
        temp = temp.split('.')
        data[i].link = $scope.baseurl + temp[0] + '_medium.jpg'
        $scope.posts.data.push(data[i])
      }
      // $scope.updateEvents()
    }


    $scope.updateEvents = function() {
      $scope.slickConfig1Loaded = false;
      var count = $scope.data.length
      var off = $scope.posts.data.length;
      var n = count;
      var data = [];
      for (i = off; i < off + count, n > 0; ++i, n--) {
        data.push($scope.data[count - n]);
      }
      $scope.posts.data = $scope.posts.data.concat(data)
      console.log($scope.posts.data.length)
      $timeout(function() {
        $scope.slickConfig1Loaded = true;
      }, 5);
    }
    $scope.currentIndex = 0;
    $scope.slickConfig2 = {
      centerMode: true,
      centerPadding: '60px',
      speed: 100,
      lazyLoad: 'ondemand',
      infinite: true,
      slidesToShow: 3,
      responsive: [{
        breakpoint: 768,
        settings: {
          arrows: true,
          centerMode: true,
          speed: 100,
          centerPadding: '30px',
          slidesToShow: 3
        }
      }, {
        breakpoint: 480,
        settings: {
          arrows: true,
          speed: 100,

          centerMode: false,
          slidesToShow: 1
        }
      }],
      event: {
        afterChange: function(event, slick, currentSlide, nextSlide) {
          $scope.currentIndex = currentSlide; // save current index each time
          console.log($scope.currentIndex)
        },
        init: function(event, slick) {
          // console.log(event)
          return slick.slickGoTo($scope.currentIndex, false); // slide to correct index when init
        }

      }
    };

    $scope.$watch('currentIndex', function(newValue, oldValue) {
      var a = newValue + 3
      if (a % 9 == 0) {
        $scope.updateEvents()
      }
    })

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
