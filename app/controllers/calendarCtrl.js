(function() { 
  var app = angular.module('myApp')
  app.controller('myCtrl', function($scope, $location, auth, $anchorScroll, $rootScope, $document, $window, AppManager, $http, $state, $stateParams) {
    var token = auth.getToken()
    if(token != undefined)
    {
      $scope.user_id = token.user_id
    }
    $scope.isLoggedIn = (token != undefined)
    // console.log($scope.isLoggedIn)
    // console.log($stateParams.id)
    $scope.id = $stateParams.id
    $scope.logout = function() {
        console.log('hi')
        auth.logout()
        $scope.isLoggedIn = false
        $location.path('/')
      }
      $scope.user= {}
      // console.log($stateParams)
      // console.log('myCtrl')
      $scope.baseUrl = 'http://api.gotimenote.com/'
    AppManager.getUserProfile($scope.id)
      .then(function(result) {
        $scope.user = {
          fullname: result.user.fullname,
          avatar: result.user.avatar,
          follow_count: result.user.follow_count,
          followers_count: result.user.followers_count
        }
        console.log($scope.user)
      })
    $scope.today = function() {
      var date = $rootScope.selectedDate = $scope.dt = new Date();
      var minDate = $scope.minDate = $rootScope.minDate = new Date(date.getFullYear(), date.getMonth(), 1);
      var maxDate = $scope.maxDate = $rootScope.maxDate = new Date(new Date(date.getFullYear(), date.getMonth() + 2, 0).setHours(23, 59, 59));

      $rootScope.data = { minDate: minDate, maxDate: maxDate, selectedDate: date }
    };
    $scope.today();

    $scope.clear = function() {
      $scope.dt = null;
    };

    $scope.options = {
      customClass: getDayClass,
      minDate: new Date(),
      showWeeks: false
    };

    // Disable weekend selection
    function disabled(data) {
      var date = data.date,
        mode = data.mode;
      return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function() {
      $scope.options.minDate = $scope.options.minDate ? null : new Date();
      // console.log($scope.dt)
    };

    $scope.toggleMin();

    $scope.setDate = function(year, month, day) {
      $scope.dt = new Date(year, month, day);
      console.log($scope.dt)

    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date(tomorrow);
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [{
      date: tomorrow,
      status: 'full'
    }, {
      date: afterTomorrow,
      status: 'partially'
    }];

    function getDayClass(data) {
      var date = data.date,
        mode = data.mode;
      if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

        for (var i = 0; i < $scope.events.length; i++) {
          var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);
          if (dayToCheck === currentDay) {
            return $scope.events[i].status;
          }
        }
      }
      return '';
    }

    // console.log($scope.dt)
    $scope.$watch('dt', function(newVal, oldVal) {
      var date = $scope.dt
        // console.log(date)
      $rootScope.data.selectedDate = date
      $rootScope.data.minDate = new Date(date.getFullYear(), date.getMonth(), 1);
      $rootScope.data.maxDate = new Date(new Date(date.getFullYear(), date.getMonth() + 2, 0).setHours(23, 59, 59));
    })

    $rootScope.$watch('selectedDate', function() {
      // $window.reload();
      var date = $rootScope.selectedDate
      $scope.dt = date
    })



  });
})()
