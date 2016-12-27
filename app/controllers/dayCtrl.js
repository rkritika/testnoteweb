(function() {
  var app = angular.module('myApp')
  app.controller('dayCtrl', function($scope, $location, $anchorScroll, $document, AppManager, $http, $state, $rootScope, _, $filter, cfpLoadingBar, $stateParams) {
    $scope.user_id = $stateParams.id
    console.log($stateParams.id)

    function getEventsforTwoMonths(user_id, max_date, min_date) {
      console.log('user_id, max_date, min_date')

      console.log(user_id, max_date, min_date)
      AppManager.getEventsforTwoMonths(user_id, max_date, min_date)
        .then(function(result) {
          $("#BodyField").fadeOut();
          $scope.events = []
            // cfpLoadingBar.complete()
          console.log(result)
          var events = result.timers
          if (events.length != 0) {
            var count = 0
            angular.forEach(events, function(value, key) {
              if (events[key].link != null) {
                var ev = events[key].link.split('.')
                events[key].link = $scope.baseurl + ev[0] + '_medium.jpg'
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
    // console.log($scope.minDate)
    $scope.newMinDate = Date.parse($rootScope.data.minDate) / 1000
    $scope.newMaxDate = Date.parse($rootScope.data.maxDate) / 1000
    getEventsforTwoMonths($scope.user_id, $scope.newMaxDate, $scope.newMinDate)
      // 

    $scope.baseurl = 'http://api.gotimenote.com/'
    var dateEvents = []

    $scope.imgheart = '../../assets/images/ic_heart.png'
    $scope.imgcomment = '../../assets/images/ic_comments.png'

    function getEvents(events) {
      var id = events.length;
      // console.log(id)

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
            location: events[i].location_infos
          }
          // console.log(data)
        dateEvents.push(data)
      }
      return _.groupBy(dateEvents, 'date');
    }

    // $rootScope.$watch(function() {
    //   return $rootScope.data;
    // }, function() {
    //   console.log($rootScope.data)
    //   $scope.assignDate();
    // });

    $rootScope.$watchCollection('data', function(newVal, oldVal) {
        var minDate = $scope.minDate = Date.parse(oldVal.minDate) / 1000
        var newMinDate = $scope.newMinDate = Date.parse(newVal.minDate) / 1000
        var maxDate = $scope.maxDate = Date.parse(oldVal.maxDate) / 1000
        var newMaxDate = $scope.newMaxDate = Date.parse(newVal.maxDate) / 1000
        var selectedDate = Date.parse(newVal.selectedDate) / 1000
        if (selectedDate >= minDate && selectedDate <= maxDate) {
          // console.log('assignDate')
          // console.log(minDate, maxDate, selectedDate)
          $scope.assignDate()
        } else {
          $scope.events = []
          // console.log('getEventsforTwoMonths')
          // console.log(selectedDate)
          getEventsforTwoMonths($scope.user_id, $scope.newMaxDate, $scope.newMinDate)

        }
        // var newMonthVal = $filter("date")(newVal.selectedDate, "MM")
      })
      // $scope.$watch(function() {
      //   return $rootScope.data;
      // }, function() {
      //   // $scope.assignDate();
      //   console.log($rootScope.days)
      // });
    $scope.assignDate = function() {
      var selectedDate = $rootScope.data.selectedDate
      var date = $filter("date")(selectedDate, "yyyy-MM-dd")
      var ddd = $filter("date")(selectedDate, "w")
      assignData($scope.EventsList, date)
    }

    function assignData(data, date) {
            console.log('hi')

      angular.forEach(data, function(value, key) {
        if (key === date) {
          var ev = data[key]
          console.log(ev)
          if (ev.length != 0) {
            $scope.events = ev
            // console.log(ev)
          }
        }
      })
      console.log( $scope.events)
    }

    $scope.goToEvent = function(event) {
      // console.log(event)
      // event.user_id = $scope.user_id
      // $location.path('/calendar/'+$scope.user_id+ '/events/' +event.id)

      $state.go('calendar.event', {event:event});
    }

  });

})()
