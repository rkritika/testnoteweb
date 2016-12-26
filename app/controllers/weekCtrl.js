(function() {
  var app = angular.module('myApp')
  app.controller('weekCtrl', function($scope, $location, $anchorScroll, $document, AppManager, $http, $state, $filter, _, $rootScope, $stateParams) {
    $scope.user_id = $stateParams.id
    $scope.baseurl = 'http://api.gotimenote.com/'

    function getEventsforTwoMonths(user_id, max_date, min_date) {
      // console.log('user_id, max_date, min_date')
      $scope.EventsForWeek = []

      console.log(user_id, max_date, min_date)
      AppManager.getEventsforTwoMonths(user_id, max_date, min_date)
        .then(function(result) {
          $("#BodyField").fadeOut();
          var events = result.timers
          var count = 0
          angular.forEach(events, function(value, key) {
            var date = new Date(events[key].time * 1000);
            var shortDate = $filter("date")(date, "yyyy-MM-dd")
            var shortTime = $filter("date")(date, "shortTime")
            var week = $filter("date")(date, "w")
              // $scope.week = week
              // console.log($scope.week)
            var day = $filter("date")(date, "EEEE")
            events[key].shortDate = shortDate
            events[key].shortTime = shortTime
            events[key].week = week
            events[key].day = day
            if (events[key].link != null) {
              var ev = events[key].link.split('.')
              events[key].link = $scope.baseurl + ev[0] + '_medium.jpg'
            }
            //
            else {
              events[key].link = 'https://www.justpro.co/img/no-image.png'
            }
          })
          return _.groupBy(events, 'week');
        })
        .then(function(result) {
          var events = result;
          $scope.events = events
          var ev = getEvents(events, $scope.week)
            // console.log(ev)
            // console.log($scope.events)
            // $scope.EventsList = getEvents($scope.eventsList)
            // $scope.assignDate()
        })
    }
    $scope.newMinDate = Date.parse($rootScope.data.minDate) / 1000
    $scope.newMaxDate = Date.parse($rootScope.data.maxDate) / 1000
    getEventsforTwoMonths($scope.user_id, $scope.newMaxDate, $scope.newMinDate)

    // $scope.$watch(function() {
    //   return $rootScope.data.sele;
    // }, function() {
    //   var date = $rootScope.selectedDate
    //   var week = $filter("date")(date, "w")
    //   console.log(week)
    //   $scope.week = week
    //   getEvents($scope.events, week)
    // });


    $rootScope.$watchCollection('data', function(newVal, oldVal) {
      var minDate = $scope.minDate = Date.parse(oldVal.minDate) / 1000
      var newMinDate = $scope.newMinDate = Date.parse(newVal.minDate) / 1000
      var maxDate = $scope.maxDate = Date.parse(oldVal.maxDate) / 1000
      var newMaxDate = $scope.newMaxDate = Date.parse(newVal.maxDate) / 1000
      var selectedDate = Date.parse(newVal.selectedDate) / 1000
      var week = $scope.week = $filter("date")(newVal.selectedDate, "w")
      if (selectedDate >= minDate && selectedDate <= maxDate) {
        // console.log('assignDate')
        // console.log(minDate, maxDate, selectedDate)
        // $scope.assignDate()
        console.log(week)
        getEvents($scope.events, week)
      } else {
        console.log('getEventsforTwoMonths')
        getEventsforTwoMonths($scope.user_id, $scope.newMaxDate, $scope.newMinDate)
      }
    })

    function getEvents(events, week) {
      $scope.EventsForWeek = []
      angular.forEach(events, function(value, key) {
        // console.log(key)
        var weekday = {};
        if (key == week) {
          // console.log(key)
          // console.log(weekday)
          weekday = _.groupBy(events[key], 'day')
            // console.log(weekday)
          $scope.EventsForWeek = weekday

          console.log($scope.EventsForWeek.Sunday)
          console.log($scope.EventsForWeek.Monday)
          console.log($scope.EventsForWeek.Tuesday)
          console.log($scope.EventsForWeek.Wednesday)
          console.log($scope.EventsForWeek.Thursday)
          console.log($scope.EventsForWeek.Friday)
          console.log($scope.EventsForWeek.Saturday)
            // $scope.EventsForWeek.Sunday = $scope.EventsForWeek.Sunday.splice(0,2)

        }
        //
        else {

        }

        return weekday

      })
    }





  });

})()
