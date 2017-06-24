(function() {
  var app = angular.module('myApp')
  app.controller('monthCtrl', function($scope, $state, $location, $anchorScroll, $document, AppManager, _, $timeout, $filter, $window, $http, $q, $rootScope, MaterialCalendarData, $stateParams) {
    console.log($stateParams)
    console.log($scope)
    console.log($rootScope)
    $scope.user_id = $stateParams.id
    console.log($scope.data.minDate)
    console.log("$state : ")
    console.log($state)
    //$scope.currentMonth = $rootScope.currentMonth
    console.log("Current Month"+ $rootScope.currentMonth)
    $scope.dayFormat = "d";
    $scope.abc = []
    var abc = []
    $scope.dd = {}
    $scope.size = 0
    function getEventsforTwoMonths(user_id, max_date, min_date) {
      console.log('user_id, max_date, min_date')
      var temp = {}
      console.log(user_id, max_date, min_date)
      return AppManager.getEventsforTwoMonths(user_id, max_date, min_date)
        .then(function(result) {
          var events = result.timers
          temp = getEvents(events)
          console.log(temp)
          $scope.dd = temp
          $scope.size  = _.keys($scope.dd).length
          console.log(_.keys($scope.dd).length)
          if($scope.size == 0){
            return {};
          }
          // assignData($scope.dd, min_date)
        })
    }

    // function changeMonth(user_id,max_date, min_date) {
    //   console.log('user_id, max_date, min_date')
    //   var temp = {}
    //   console.log(user_id, max_date, min_date)
    //   $scope.setDayContent(min_date)
    //   // return AppManager.getEventsforTwoMonths(user_id, max_date, min_date)
    //   //   .then(function(result) {
    //   //     var events = result.timers
    //   //     temp = getEvents(events)
    //   //     console.log(temp)
    //   //     $scope.dd = temp
    //   //     $scope.size  = _.keys($scope.dd).length
    //   //     console.log(_.keys($scope.dd).length)
    //   //     return temp;
    //   //   })
    //   if(min_date == max_date){
    //     return 0;
    //   }else{

    //     changeMonth(user_id, max_date, min_date)        
    //   }
    // }
    $scope.selectedDate = $rootScope.data.selectedDate
    $scope.newMinDate = Date.parse($rootScope.data.minDate) / 1000
    $scope.newMaxDate = Date.parse($rootScope.data.maxDate) / 1000
    abc = getEventsforTwoMonths($scope.user_id, $scope.newMaxDate, $scope.newMinDate)
    console.log("selectedDate "+ $scope.selectedDate)    
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
       
    $scope.dayClick = function(date) {
      console.log("day click running")
      // $rootScope.data.selectedDate = date
      console.log($rootScope.data.selectedDate)
    };

    $scope.tooltips = true; 

    $rootScope.$watchCollection('data', function(newVal, oldVal) {
      var minDate = $scope.minDate = Date.parse(oldVal.minDate) / 1000
      var newMinDate = $scope.newMinDate = Date.parse(newVal.minDate) / 1000
      var maxDate = $scope.maxDate = Date.parse(oldVal.maxDate) / 1000
      var newMaxDate = $scope.newMaxDate = Date.parse(newVal.maxDate) / 1000
      // $scope.maxDate = $scope.newMaxDate
      $scope.selectedDate = newVal.selectedDate
      console.log($scope.minDate + " " + $scope.newMinDate)
      console.log($scope.maxDate + " " + $scope.newMaxDate)
      console.log($scope.selectedDate)
      console.log(newVal.minDate)
      var selectedDate = Date.parse(newVal.selectedDate) / 1000
      console.log(selectedDate)
      if($scope.minDate != $scope.newMinDate){
        $state.go('calendar.month', {}, { reload: 'calendar.month' })
      }
      if (selectedDate >= minDate && selectedDate <= maxDate) {
        console.log('month')
        console.log( $rootScope.data)
        //abc = getEventsforTwoMonths($scope.user_id, $scope.newMaxDate, $scope.newMinDate)
      }else{
        console.log('getEventsforTwoMonths')
        abc = getEventsforTwoMonths($scope.user_id, $scope.newMaxDate, $scope.newMinDate)
      }
    })
    
    $scope.$watch(function() {
      // $scope.currentMonth = "2"
      console.log("watch is running")
      $rootScope.data.selectedDate; 
      // $scope.minDate;
    });
    // , function() {
    //   $scope.assignDate();
    // }
    // $scope.assignDate = function(){
    //   console.log($rootScope.data.selectedDate)
    //   // console.log($scope)
    //   $scope.minDate = $scope.newMinDate
    //   $scope.maxDate = $scope.newMaxDate
    //   $scope.selectedDate = undefined;
    //   console.log($scope.selectedDate)
    //   angular.forEach(data, function(value, key) {
    //         var ev = data[key]
    //         console.log(ev)
    //         if (ev.length != 0) {
    //           $scope.events = ev
    //         }
    //     })
    //   // changeMonth($scope.user_id, $rootScope.data.maxDate, $rootScope.data.minDate)

    //    //$rootScope.data.selectedDate
    //   // console.log("-------------------------")
    //   // console.log($rootScope.data.selectedDate)
    //   // console.log($rootScope.selectedDate)
    //   // getEventsforTwoMonths($scope.user_id, $scope.newMaxDate, $scope.newMinDate)
    //   // .then(function(result){
    //   //   getEvents(result)
    //   // })
      
    //   // var date = $filter("date")(selectedDate, "yyyy-MM-dd")
    //   // var ddd = $filter("date")(selectedDate, "w")
    //   // assignData($scope.EventsList, date)
    //     // console.log($filter("date")($scope.selectedDate, "MMM d, y h:mm:ss a Z"))
    // }
    $scope.assignDate = function() {
      var selectedDate = $rootScope.data.selectedDate
      // var date = $filter("date")(selectedDate, "yyyy-MM-dd")
      // var ddd = $filter("date")(selectedDate, "w")
      //var xyz = getEventsforTwoMonths($scope.user_id,$scope.newMaxDate, $scope.newMinDate)
      // assignData(xyz, date)
    }

    // function assignData(data, date) {
    //   console.log("assigning data")
    //   angular.forEach(data, function(value, key) {
    //         var ev = data[key]
    //         console.log(key)
    //         console.log(ev)
    //         console.log(ev[0].date)
    //         // $setDayContent(ev)
    //         if (ev.length != 0) {
    //           $scope.events = ev
    //         }
    //     })
    //     // console.log( $scope.events)
    // }


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
    $scope.setDayContent = function(date, abc) {
      console.log(date)
      var key = [date.getFullYear(), numFmt(date.getMonth() + 1), numFmt(date.getDate())].join("-");
      //console.log("=================")
      console.log(numFmt(date.getMonth()))
      var abc = $scope.dd
        // console.log(key)

      var deferred = $q.defer();
      $timeout(function() {
        var abc = $scope.dd
          // console.log($scope.dd)
        if (abc[key] != undefined) {
          // $rootScope.currentMonth = date.getMonth();
          // $scope.currentMonth = $rootScope.currentMonth
          console.log("Current Month"+ $rootScope.currentMonth)

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

    // $scope.prevMonth = function(data) {
      
    //   console.log("PRE MONTH")

    //   $scope.msg = "You clicked (prev) month " + data.month + ", " + data.year;
    // };

    // $scope.nextMonth = function(data) {
    //   console.log("NEXT MONTH")
    //   $scope.msg = "You clicked (next) month " + data.month + ", " + data.year;
    // };
  });
})()
