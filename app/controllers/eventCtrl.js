(function() {
  var app = angular.module('myApp')
  app.controller('eventCtrl', function($scope, $location, AppManager, $http, $state, $filter, _, $rootScope, $stateParams) {

    // console.log($stateParams.eventId)
    // console.log($stateParams.id)
    $scope.imgheart = '../../assets/images/ic_heart.png'
    $scope.imgcomment = '../../assets/images/ic_comments.png'
    console.log($stateParams)
    $scope.data = $stateParams.event
    // console.log(JSON.stringify($stateParams.event) )
    

  });

})()
