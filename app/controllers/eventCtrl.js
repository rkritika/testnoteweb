(function() {
  var app = angular.module('myApp')
  app.controller('eventCtrl', function($scope, $location, AppManager, $http, $state, $filter, _, $rootScope, $stateParams) {

    // console.log($stateParams.eventId)
    // console.log($stateParams.id)
    $scope.imgheart = '../../assets/images/ic_heart.png'
    $scope.imgcomment = '../../assets/images/ic_comments.png'
    console.log($stateParams)
    $scope.data = $stateParams.event
    $scope.data.link = $scope.data.link.replace('_medium.', '_large.')
    // var data = $scope.data.time
    // // var time = $scope.data.time
    // // var date = new Date(date * 1000);
    // console.log(data)
    // var temp = $filter("date")(data, "yyyy-MM-dd")
    // var time = $filter("date")(data, "shortTime")
    // $scope.data.date = temp
    // $scope.data.time = time
    // console.log(data)

    // console.log(temp)
    // console.log(time)

      // var temp = $filter("date")(date, "yyyy-MM-dd")
      //     var time = $filter("date")(date, "shortTime")
      // var res = str.replace("Microsoft", "W3Schools");
      // console.log(JSON.stringify($stateParams.event) )


  });

})()
