(function() {
  var app = angular.module('myApp')
  app.controller('homeCtrl', function($scope, $location, $anchorScroll, $document, $timeout,
    AppManager, $window, auth, eventHandler, $http, $state, $mdDialog, md5, $filter, $stateParams) {
    var token = auth.getToken()
    $scope.isLoggedIn = (token != undefined)
      // $scope.userName = SharedService.sharedObject
    if ($scope.isLoggedIn) {
      $scope.user_id = auth.getToken().user_id
      $scope.access_token = auth.getToken().access_token
    }
    if ($stateParams.lat != undefined && $stateParams.long != undefined) {
      $scope.lat = $stateParams.lat
      $scope.lng = $stateParams.long
      $scope.address = $stateParams.address
      // console.log($scope.address)

      findEvents($scope.lat, $scope.lng, 0)
    }
    $scope.posts = {
      data: []
    };
    $scope.posts.data = eventHandler.getEvents()  
    console.log($scope.posts.data)
    console.log($scope.posts)
    if ($scope.posts.data != undefined) {
      if ($scope.posts.data.length != 0) {
        $scope.slickConfig1Loaded = true;
        var address = eventHandler.getAddress()
        $scope.lat = address.lat;
        $scope.lng = address.lng;
        $scope.offset = address.offset;
        $scope.address = address.address;
        $scope.data = $scope.posts.data;
        // AppManager.getEventAddress($scope.lat, $scope.lng)
        // .then(function(result){
        //   console.log(result[0].formatted_address)
        //   $scope.address = result[0].formatted_address
        // })
      }
    }
    // $scope.isEventStored = eventHandler.getEvents()
    // if($scope.isEventStored){
    //   $scope.posts.data = eventHandler.getEvents()
    // }
    $scope.$on('gmPlacesAutocomplete::placeChanged', function() {
      var location = $scope.autocomplete.getPlace().geometry.location;
      // console.log
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

    $scope.search = function(lat, long, offset) {
      $scope.slickConfig1Loaded = false;
      $scope.noDataResult = false;
      // console.log($scope)
      var temp = 1;
      AppManager.getEventsByLocation(lat, long, temp)
        .then(function(result) {
          console.log("---------")
          console.log(result)
          $scope.offset = result.data.offset
          $scope.data = result.data.nearby
          console.log($scope.data)
          if ($scope.data !== undefined && $scope.data !== null && $scope.data.length != 0) {
            // $scope.getEvents(result.data.nearby)
            $scope.getEvents($scope.data)
          } else {
            console.log('no data')
            $scope.noDataResult = true;
          }
          var someElement = angular.element(document.getElementById('demo'));
          // console.log(someElement)
          $document.scrollToElement(someElement, 30, 2000);
        })
    }

    function findEvents() {
      $scope.noDataResult = false;
      AppManager.getEventsByLocation($scope.lat, $scope.lng, 1)
        .then(function(result) {
          $scope.offset = result.data.offset
          $scope.data = result.data.nearby
          if ($scope.data !== undefined && $scope.data !== null && $scope.data.length != 0) {
            $scope.getEvents($scope.data)
          } else {
            console.log('no data')
            $scope.noDataResult = true;
          }
          var someElement = angular.element(document.getElementById('demo'));
          $document.scrollToElement(someElement, 30, 2000);
        })
    }

    $scope.goToUser = function(user_id, date) {
      // console.log(event)
      // event.user_id = $scope.user_id
      $location.path('/calendar/' + user_id + '/' + date)

      // $state.go('calendar', { user_id: user_id });
    }

    $scope.baseurl = 'https://api.gotimenote.com/'

    $scope.getEvents = function(data) {
      console.log("Get Events Running")
      $scope.slickConfig1Loaded = true;
      var l = $scope.data.length
      // var l = data.length
      console.log($scope.posts.data)      
      // $scope.posts.data = {};

      console.log(l)
      // console.log($scope.posts.data)
      if ($scope.posts.data != undefined) {
        if($scope.posts.data.length !== 0)
        {
          $scope.posts.data = []
          console.log("loaded")
          console.log($scope.posts.data)

        }
      }
      for (var i = 0; i < l; i++) {
        // console.log(data[i])
        var temp = $scope.data[i].link
        temp = temp.split('.')
        $scope.data[i].link = $scope.baseurl + temp[0] + '_large.jpg'
        $scope.posts.data.push($scope.data[i])
      }
      console.log($scope.posts.data)
      eventHandler.setEvents($scope.posts.data, $scope.lat, $scope.lng, $scope.offset, $scope.address)
      // $scope.updateEvents()
    }

    $scope.updateEvents = function() {
      AppManager.getEventsByLocation($scope.lat, $scope.lng, $scope.offset)
        .then(function(result) {
          console.log(result)
          $scope.offset = result.data.offset
          console.log($scope.offset)
          console.log($scope.data)
          var old_length = $scope.data.length
          for(var j=0; j < result.data.nearby.length; j++){
            $scope.data.push(result.data.nearby[j])
          }          
          console.log($scope.data)      
          var new_length = $scope.data.length    
          // data = $scope.data = result.data.nearby
          // console.log(data[0])          
          if ($scope.data !== undefined && $scope.data !== null && $scope.data.length != 0) {
            // $scope.getEvents(result.data.nearby)
            // $scope.getEvents($scope.data)
            for (var i = old_length; i < new_length; i++) {
              var temp = $scope.data[i].link            
              temp = temp.split('.')
              $scope.data[i].link = $scope.baseurl + temp[0] + '_large.jpg'
              console.log($)
                // $scope.slickConfig2.method.slickAdd('<div style=' + 'color:black' + '>'+ data[i].user_id +'</div>')
                // ng-click="goToUser('+data[i].user_id+')"
              // $scope.slickConfig2.method.slickAdd(
              //     '<div class="item"><a href="/calendar/' + data[i].user_id + '"><img class="cro-image" src="' + data[i].link + '"' + 'onerror="this.src=\'http://placehold.it/350x150\'" height="200px" width="300px" alt="" ></a>' + '<img class="img-responsive user-img img-circle" src="' + $scope.baseurl + data[i].avatar + '" height="50px" width="50px" alt="">' + '<div class="data">' + '<h4 class="h4-cls">' + data[i].fullname + ' </h4>' + '<h4 class="h4-cls"> ' + date + ' ' + shortTime + '</h4>' + '</div>' + '<div>{{$index}}</div>' + '</div></div>'
              //   )
                // $scope.posts.data.push(data[i])
            }
          } else {
            console.log('no data')
            $scope.noDataResult = true;
          }
          $scope.posts.data = $scope.data
          eventHandler.setEvents($scope.posts.data, $scope.lat, $scope.lng, $scope.offset, $scope.address)          
        })
        // $scope.slickConfig1Loaded = false;
        // var count = $scope.data.length
        // var off = $scope.posts.data.length;
        // var n = count;
        // var data = [];

      // for (i = off; i < off + count, n > 0; ++i, n--) {
      //   // console.log(count - n)

      //   $scope.slickConfig2.method.slickAdd('<div style=' + 'color:black' + '>New</div>')
      //     // data.push($scope.data[count - n]);
      // }
      // $scope.posts.data = $scope.posts.data.concat(data)
      // console.log($scope.posts.data.length)
      // $timeout(function() {
      //   $scope.slickConfig1Loaded = true;
      // }, 5);
    }
    $scope.currentIndex = 0;
    
    $scope.slickConfig2 = {
      centerMode: true,
      centerPadding: '60px',
      speed: 100,
      lazyLoad: 'ondemand',
      // infinite: true,
      slidesToShow: 3,
      responsive: [
        // {
        //   breakpoint: 768,
        //   settings: {
        //     arrows: true,
        //     centerMode: true,
        //     speed: 100,
        //     centerPadding: '30px',
        //     slidesToShow: 3,
        //     swipeToSlide: true,
        //     infinite: false
        //   }
        // }, {
        //   breakpoint: 480,
        //   settings: {
        //     arrows: true,
        //     speed: 100,
        //     centerMode: false,
        //     slidesToShow: 1,
        //     infinite: false,
        //     swipeToSlide: true

        //   }
        // }
        {
          breakpoint: 1024,
          settings: {
            arrows: true,
            centerMode: true,
            speed: 100,
            centerPadding: '30px',
            slidesToShow: 3,
            swipeToSlide: true,
            infinite: false
          }
        }, {
          breakpoint: 600,
          settings: {
            arrows: true,
            centerMode: false,
            speed: 100,
            // centerPadding: '30px',
            slidesToShow: 1,
            swipeToSlide: true,
            infinite: false
          }
        }, {
          breakpoint: 480,
          settings: {
            arrows: true,
            centerMode: false,
            speed: 100,
            // centerPadding: '30px',
            slidesToShow: 1,
            swipeToSlide: true,
            infinite: false
          }
        }
      ],
      // method : function(event, slick){
      //   console.log("<div>New</div>")
      //   return slick.slickAdd("<div>New</div>")
      // }
      // ,
      method: {}
      // event: {
      //   afterChange: function(event, slick, currentSlide, nextSlide) {
      //     $scope.currentIndex = currentSlide; // save current index each time
      //     console.log($scope.currentIndex)
      //   }
      //   // ,
      // init: function(event, slick) {
      //   // console.log(event)
      //   return slick.slickGoTo($scope.currentIndex, false); // slide to correct index when init
      // }

      // }
    };

    $scope.nextIndex = function() {
      $scope.currentIndex++;
      var a = $scope.currentIndex + 3
      if (a % 9 == 0) {
        $scope.updateEvents()
      }
      // console.log($scope.currentIndex)
    }
    $scope.prevIndex = function() {
      $scope.currentIndex--;
      // console.log($scope.currentIndex)
    }

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
          // console.log($scope.status)
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
            console.log("userName "+user)
            var result = result
            if (result.success === "true") {
              var access_token = result.data.access_token
              var user_id = result.data.user_id
              var token = {
                access_token: access_token,
                user_id: user_id,
                username: user
              }
              return auth.setToken(token)
            } else {
              console.log('Invalid username/password')
            }
            // return result
          })
          .then(function(result) {
            $scope.answer(JSON.stringify(result))
          })
      }


    }

  });

})()
