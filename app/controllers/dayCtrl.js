(function() {
    var app = angular.module('myApp')
    app.controller('dayCtrl', function($scope, $location, $anchorScroll, $document, AppManager, $http, $state, $rootScope, _, $filter, cfpLoadingBar, $stateParams, Data, auth, $mdDialog) {
        $scope.user_id = $stateParams.id
        $scope.events = []
        // return false;
        $scope.userName = {}
        var token = auth.getToken()
        if (token != undefined) {
            $scope.current_user_id = token.user_id
            $scope.token = token.access_token
        }else{
          $scope.current_user_id = ""
        }
        function DialogController($scope, $mdDialog) {
          $scope.cancel = function() {
              $mdDialog.cancel();
          };
        }
        $scope.likeEvent = function(event) {
            if($scope.isLoggedIn){
                AppManager
                .likeEvent($scope.current_user_id, $scope.token, event.id)
                .then(function(result) {
                    if(event.type != null){
                      event.likes = parseInt(event.likes) - 1
                      event.type = null
                    }else{
                      event.likes = parseInt(event.likes) + 1
                      event.type = 1
                    }
                })
            }else{
                $mdDialog.show({   
                    controller: DialogController,    
                    templateUrl: 'loginerror.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose: true,
                    fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                })
                .then(function(answer) {
                }, function() {
                });
            }

        }

        function getEventsforTwoMonths(current_user_id, user_id, max_date, min_date) {
            AppManager.getEventsforTwoMonths($scope.current_user_id, user_id, max_date, min_date)
                .then(function(result) {
                  $("#BodyField").fadeOut();
                  $scope.events = []
                  // cfpLoadingBar.complete()
                  // $scope.userName = { value: result.timers[0].user_username }
                  // Data.setdata({key: $scope.userName});
                  var events = result.timers
                  if (events.length != 0) {
                      var count = 0
                      angular.forEach(events, function(value, key) {
                          if (events[key].link != null) {
                              var ev = events[key].link.split('.')
                              events[key].link = $scope.baseurl + ev[0] + '_large.jpg'
                          }
                          //
                          else {
                              events[key].link = 'https://www.justpro.co/img/no-image.png'
                          }
                      })
                      $scope.eventsList = events;
                  } else {
                      $scope.events = []
                  }
                  return events
                })
                .then(function(events) {
                    if (events.length != 0) {

                        $scope.EventsList = getEvents($scope.eventsList)
                        $scope.assignDate()
                    }
                })
        }
        $scope.newMinDate = Date.parse($rootScope.data.minDate) / 1000
        $scope.newMaxDate = Date.parse($rootScope.data.maxDate) / 1000
        getEventsforTwoMonths($scope.current_user_id, $scope.user_id, $scope.newMaxDate, $scope.newMinDate)
        // 

        $scope.baseurl = 'https://api.gotimenote.com/'
        var dateEvents = []

        $scope.imgheart = '../../assets/images/ic_heart.png'
        $scope.imgheart_change = '../../assets/images/ic_heart_change.png'
        $scope.imgcomment = '../../assets/images/ic_comments.png'

        function getEvents(events) {
            var id = events.length;

            for (var i = 0; i < events.length; i++) {
                var date = new Date(events[i].time * 1000);
                var temp = $filter("date")(date, "yyyy-MM-dd")
                var time = $filter("date")(date, "shortTime")
                var data = {
                    date: temp,
                    time: time,
                    name: events[i].name,
                    id: events[i].id,
                    likes: events[i].likes,
                    comments: events[i].comments,
                    link: events[i].link,
                    description: events[i].description,
                    location: events[i].location_infos,
                    type: events[i].type
                }
                dateEvents.push(data)
            }

            return _.groupBy(dateEvents, 'date');
        }

        // $rootScope.$watch(function() {
        //   return $rootScope.data;
        // }, function() {
        //   $scope.assignDate();
        // });

        $rootScope.$watchCollection('data', function(newVal, oldVal) {
            $scope.events = []
            var minDate = $scope.minDate = Date.parse(oldVal.minDate) / 1000
            var newMinDate = $scope.newMinDate = Date.parse(newVal.minDate) / 1000
            var maxDate = $scope.maxDate = Date.parse(oldVal.maxDate) / 1000
            var newMaxDate = $scope.newMaxDate = Date.parse(newVal.maxDate) / 1000
            var selectedDate = Date.parse(newVal.selectedDate) / 1000
            if (selectedDate >= newMinDate && selectedDate <= newMaxDate) {
                $scope.date = selectedDate;
                // if($scope.EventsList.length == 0){
                //     getEventsforTwoMonths($scope.current_user_id, $scope.user_id, $scope.newMaxDate, $scope.newMinDate)
                //     .then(function(result){
                //         $scope.assignDate()                        
                //     })
                // }else{
                    $scope.assignDate()                    
                // }
            } else {
                $scope.events = []
                getEventsforTwoMonths($scope.current_user_id, $scope.user_id, $scope.newMaxDate, $scope.newMinDate)

            }
            // var newMonthVal = $filter("date")(newVal.selectedDate, "MM")
        })
        // $scope.$watch(function() {
        //   return $rootScope.data;
        // }, function() {
        //   // $scope.assignDate();
        // });
        $scope.assignDate = function() {
            var selectedDate = $rootScope.data.selectedDate
            var date = $filter("date")(selectedDate, "yyyy-MM-dd")
            var ddd = $filter("date")(selectedDate, "w")
            assignData($scope.EventsList, date)
        }

        function assignData(data, date) {
            // $scope.events = []
            var eventFlag = false
            angular.forEach(data, function(value, key) {
                if (key === date) {
                    eventFlag = true
                    var ev = data[key]
                    console.log(ev)
                    var a = parseInt(key.substring(5, 7)) - 1;
                    $rootScope.currentMonth = a;

                    if (ev.length != 0) {
                        $scope.events = ev
                    }
                }

                if(eventFlag == false){
                    var a = parseInt(date.substring(5, 7)) - 1;
                    $rootScope.currentMonth = a;
                }
            })
        }

        $scope.goToEvent = function(event) {
            // event.user_id = $scope.user_id
            var url = $location.absUrl()
            // $location.path('/calendar/'+$scope.user_id+ '/events/' +event.id)

            $state.go('calendar.event', { event: event, url: url, event_id: event.id });
        }

    });

})()