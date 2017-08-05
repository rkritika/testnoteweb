(function() {
  var app = angular.module('myApp')
  app.controller('monthCtrl', function($scope, $state, $location, $anchorScroll, $document, AppManager, _, $timeout, $filter, $window, $http, $q, $rootScope, MaterialCalendarData, $stateParams) {
    $scope.user_id = $stateParams.id
    //$scope.currentMonth = $rootScope.currentMonth
    $scope.dayFormat = "d";
    $scope.abc = []
    var abc = []
    $scope.dd = {}
    $scope.size = 0
    function getEventsforTwoMonths(user_id, max_date, min_date) {
      var temp = {}
      return AppManager.getEventsforTwoMonths("",user_id, max_date, min_date)
        .then(function(result) {
          var events = result.timers
          temp = getEvents(events)
          $scope.dd = temp
          $scope.size  = _.keys($scope.dd).length
          if($scope.size == 0){
            return {};
          }
          // assignData($scope.dd, min_date)
        })
    }

    $scope.selectedDate = $rootScope.data.selectedDate
    $scope.year = $rootScope.data.minDate.getFullYear()    
    $scope.newMinDate = Date.parse($rootScope.data.minDate) / 1000
    $scope.newMaxDate = Date.parse($rootScope.data.maxDate) / 1000
    
    abc = getEventsforTwoMonths($scope.user_id, $scope.newMaxDate, $scope.newMinDate)
    
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    $scope.month = monthNames[$rootScope.data.minDate.getMonth()]

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
      // $rootScope.data.selectedDate = date
    };

    $scope.tooltips = true; 

    $rootScope.$watchCollection('data', function(newVal, oldVal) {
      var minDate = $scope.minDate = Date.parse(oldVal.minDate) / 1000
      var newMinDate = $scope.newMinDate = Date.parse(newVal.minDate) / 1000
      var maxDate = $scope.maxDate = Date.parse(oldVal.maxDate) / 1000
      var newMaxDate = $scope.newMaxDate = Date.parse(newVal.maxDate) / 1000
      // $scope.maxDate = $scope.newMaxDate
      $scope.selectedDate = newVal.selectedDate
      var selectedDate = Date.parse(newVal.selectedDate) / 1000
      if($scope.minDate != $scope.newMinDate){
        $state.go('calendar.month', {}, { reload: 'calendar.month' })
      }
      if (selectedDate >= minDate && selectedDate <= maxDate) {
        //abc = getEventsforTwoMonths($scope.user_id, $scope.newMaxDate, $scope.newMinDate)
      }else{
        abc = getEventsforTwoMonths($scope.user_id, $scope.newMaxDate, $scope.newMinDate)
      }
    })
    $scope.changeMonth = function(selectedDate, currentMonth){
      $rootScope.data.selectedDate=selectedDate
      $rootScope.currentMonth = currentMonth
    }
    $scope.$watch(function() {
      // $scope.currentMonth = "2"
      $rootScope.data.selectedDate; 
      // $scope.minDate;
    });
    // , function() {
    //   $scope.assignDate();
    // }
    // $scope.assignDate = function(){
    //   $scope.minDate = $scope.newMinDate
    //   $scope.maxDate = $scope.newMaxDate
    //   $scope.selectedDate = undefined;
    //   angular.forEach(data, function(value, key) {
    //         var ev = data[key]
    //         if (ev.length != 0) {
    //           $scope.events = ev
    //         }
    //     })
    //   // changeMonth($scope.user_id, $rootScope.data.maxDate, $rootScope.data.minDate)

    //    //$rootScope.data.selectedDate
    //   // getEventsforTwoMonths($scope.user_id, $scope.newMaxDate, $scope.newMinDate)
    //   // .then(function(result){
    //   //   getEvents(result)
    //   // })
      
    //   // var date = $filter("date")(selectedDate, "yyyy-MM-dd")
    //   // var ddd = $filter("date")(selectedDate, "w")
    //   // assignData($scope.EventsList, date)
    // }
    $scope.assignDate = function() {
      var selectedDate = $rootScope.data.selectedDate
      // var date = $filter("date")(selectedDate, "yyyy-MM-dd")
      // var ddd = $filter("date")(selectedDate, "w")
      //var xyz = getEventsforTwoMonths($scope.user_id,$scope.newMaxDate, $scope.newMinDate)
      // assignData(xyz, date)
    }

    // function assignData(data, date) {
    //   angular.forEach(data, function(value, key) {
    //         var ev = data[key]
    //         // $setDayContent(ev)
    //         if (ev.length != 0) {
    //           $scope.events = ev
    //         }
    //     })
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

    };
    $scope.setDayContent = function(date, abc) {
      var key = [date.getFullYear(), numFmt(date.getMonth() + 1), numFmt(date.getDate())].join("-");
      var abc = $scope.dd

      var deferred = $q.defer();
      $timeout(function() {
        var abc = $scope.dd
        if (abc[key] != undefined) {
          // $rootScope.currentMonth = date.getMonth();
          // $scope.currentMonth = $rootScope.currentMonth
          var temp = abc[key]
          var data = ' ';
          var size = _.size(temp)
          for (i = 0; i < size; i++) {
            var a = '<p style="overflow: hidden; text-overflow: ellipsis; max-width:160px; white-space:nowrap; font-size: 13px;" ng-click="">' + temp[i].time + '<br>' + temp[i].name + '</p>'
            data = data.toString() + a.toString();
          }
        // }else{
        //     var a = '<p style="overflow: hidden; text-overflow: ellipsis; max-width:160px; white-space:nowrap; font-size: 13px;" ng-click="">' + '&nbsp;' + '<br>' + '&nbsp;' + '</p>'
        //     var data = a.toString();
        }
        deferred.resolve(data);
      }, 4000);
      // if (abc[key] != undefined) {
      //   var temp = abc[key]
      //   var data = ' '
      //   var size = _.size(temp)
      //   for (i = 0; i < size; i++) {
      //     var a = '<p style="overflow: hidden; text-overflow: ellipsis; max-width:160px; white-space:nowrap; font-size: 13px;" ng-click="">' + temp[i].time + '<br>' + temp[i].name + '</p>'
      //     data = data.toString() + a.toString();
      //   }
      //   return data
      // }

      // // if (temp != undefined) {
      // else return ''
      return deferred.promise;
    };

    // $scope.prevMonth = function(data) {
      

    //   $scope.msg = "You clicked (prev) month " + data.month + ", " + data.year;
    // };

    // $scope.nextMonth = function(data) {
    //   $scope.msg = "You clicked (next) month " + data.month + ", " + data.year;
    // };
  });
})()
