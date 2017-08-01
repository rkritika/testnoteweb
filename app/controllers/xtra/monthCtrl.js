(function() {
  var app = angular.module('myApp')
  app.controller('monthCtrl', function($scope, $location, $anchorScroll, $document, AppManager, _, $timeout, $filter, $http, $q, $rootScope, MaterialCalendarData, $stateParams) {
    console.log($stateParams.id)
    $scope.user_id = $stateParams.id
    $scope.dayFormat = "d";
    $scope.abc = []
    var abc = []
    $scope.dd = {}
    $scope.size = 0
    function getEventsforTwoMonths(user_id, max_date, min_date) {
      console.log('user_id, max_date, min_date')
      var temp = {}
      console.log(user_id, max_date, min_date)
      return AppManager.getEventsforTwoMonths("",user_id, max_date, min_date)
        .then(function(result) {
          var events = result.timers
          temp = getEvents(events)
          console.log(temp)
          $scope.dd = temp
          $scope.size  = _.keys($scope.dd).length
          console.log(_.keys($scope.dd).length)
          return temp;
        })
    }
    $scope.selectedDate = $rootScope.data.selectedDate
    $scope.newMinDate = Date.parse($rootScope.data.minDate) / 1000
    $scope.newMaxDate = Date.parse($rootScope.data.maxDate) / 1000
    console.log("Get Events A")
    abc = getEventsforTwoMonths($scope.user_id, $scope.newMaxDate, $scope.newMinDate)

    function getEvents(events) {
      var dateEvents = []
      var id = events.length;
      for (var i = 0; i < events.length; i++) {
        var date = new Date(events[i].time * 1000);
        var temp = $filter("date")(date, "yyyy-MM-dd")
        var time = $filter("date")(date, "shortTime")
        var data = {
          date: temp,
          time: time,
          name: events[i].name,
          id: events[i].id
        }
        dateEvents.push(data)
      }
      return _.groupBy(dateEvents, 'date');
    }

    // $scope.dayClick = function(date) {
    //   // $rootScope.data.selectedDate = date
    //   console.log($rootScope.data.selectedDate)
    // };

    
    $scope.assignDate = function() {
      console.log($rootScope.selectedDate)
      $scope.selectedDate = $rootScope.data.selectedDate
      console.log("-------------------------")
      console.log($scope.selectedDate)
      // console.log($rootScope.data.selectedDate)
      // console.log($rootScope.selectedDate)
      //console.log("Get Events B")
      //abc = getEventsforTwoMonths($scope.user_id, $scope.newMaxDate, $scope.newMinDate)
      
      // var newMinDate = $scope.newMinDate = Date.parse(newVal.minDate) / 1000
      //-----------$scope.setDayContent($scope.selectedDate)
      
      // var date = $filter("date")(selectedDate, "yyyy-MM-dd")
      // var ddd = $filter("date")(selectedDate, "w")
      // assignData($scope.EventsList, date)
      // console.log($filter("date")($scope.selectedDate, "MMM d, y h:mm:ss a Z"))
    }



    $scope.selectedIndex = 0;
    var numFmt = function(num) {
      num = num.toString();
      if (num.length < 2) {
        num = "0" + num;
      }
      return num;
    };
    // $scope.tooltips = true;
    var loadContentAsync = true;
    $scope.dayClick = function(date) {
      // $scope.msg = "You clicked " + $filter("date")(date, "MMM d, y h:mm:ss a Z");
      $rootScope.data.selectedDate = date
      console.log( $rootScope.data.selectedDate)
    };
    $rootScope.$watchCollection('data', function(newVal, oldVal) {
      var minDate = $scope.minDate = Date.parse(oldVal.minDate) / 1000
      var newMinDate = $scope.newMinDate = Date.parse(newVal.minDate) / 1000
      var maxDate = $scope.maxDate = Date.parse(oldVal.maxDate) / 1000
      var newMaxDate = $scope.newMaxDate = Date.parse(newVal.maxDate) / 1000
      var selectedDate = Date.parse(newVal.selectedDate) / 1000
      if (selectedDate >= minDate && selectedDate <= maxDate) {
        console.log('month')
        console.log($rootScope.data)
        $scope.selectedDate = newVal.selectedDate
        //----------getEventsforTwoMonths($scope.user_id, $scope.newMaxDate, $scope.newMinDate)
        // .then(function(){
          // console.log($scope.size)
          // for(i=0;i<= $scope.size;i++)
          // $scope.setDayContent($scope.selectedDate)

        // })
        // getEvents(abc)
        // $scope.assignDate()
      } else {
        // console.log('getEventsforTwoMonths')
        // console.log("Get Events C")
        abc = getEventsforTwoMonths($scope.user_id, $scope.newMaxDate, $scope.newMinDate)
      }
    })
    $scope.$watch(function() {
      return $rootScope.data.selectedDate;
      // return 
    },function() {
      console.log("assign watch running")
      // abc = getEventsforTwoMonths($scope.user_id, $scope.newMaxDate, $scope.newMinDate)
      // getEvents(abc)
      // scope.init = function(){
      //   calendar.fullCalendar(options);
      //   window.calendar = calendar;
      // };
      //-----------$scope.assignDate();
    }); 
    $scope.setDayContent = function(date, abc) {
      console.log("set day content running")
      console.log(date)
      console.log(abc)
      var key = [date.getFullYear(), numFmt(date.getMonth() + 1), numFmt(date.getDate())].join("-");
      var abc = $scope.dd
      console.log("abc")
      console.log(abc)

      var deferred = $q.defer();
      $timeout(function() {
        var abc = $scope.dd
          // console.log($scope.dd)
        if (abc[key] != undefined) {
          var temp = abc[key]
          var data = ' ';
          var size = _.size(temp)

          console.log(key)
          console.log(size)
          for (i = 0; i < size; i++) {
            console.log(temp[i].name)
            var a = '<p style="overflow: hidden; text-overflow: ellipsis; max-width:160px; white-space:nowrap; font-size: 13px;" ng-click="">' + temp[i].time + '<br>' + temp[i].name + '</p>'
              // console.log(data)
            data = data.toString() + a.toString();
            // console.log(data)
          }
        }
        // console.log(data)
        deferred.resolve(data);
      }, 4000);
      // if (abc[key] != undefined) {
      //   var temp = abc[key]
      //   var data = ' '
      //   var size = _.size(temp)
      //     // console.log(size)
      //   for (i = 0; i < size; i++) {
      //     // console.log(temp[i].name)
      //     var a = '<p style="overflow: hidden; text-overflow: ellipsis; max-width:160px; white-space:nowrap; font-size: 13px;" ng-click="">' + temp[i].time + '<br>' + temp[i].name + '</p>'
      //       // console.log(data)
      //     data = data.toString() + a.toString();
      //     console.log(data)
      //   }
      //   // console.log(data)
      //   return data
      // }

      // // if (temp != undefined) {
      // else return ''
      return deferred.promise;
    };
  });
})()
