(function() {
    var app = angular.module('myApp')
    app.controller('eventCtrl', function($scope, $location, AppManager, $http, $state, auth, $window, $filter, _, $rootScope, $stateParams, $mdDialog) {

        // Socialshare.share({
        //   'provider': 'facebook',
        //   "type":"share",
        //   'attrs': {
        //     'socialshareUrl': 'http://720kb.net',
        //     'socialshareHashtags': '720kb, angular, socialshare'
        //   }
        // });

        // console.log($stateParams.eventId)
        // console.log($stateParams.id)
        $scope.imgheart = '../../assets/images/ic_heart.png'
        $scope.imgcomment = '../../assets/images/ic_comments.png'
        console.log($stateParams)
        console.log(auth)
        $scope.data = $stateParams.event
        $scope.data.link = $scope.data.link.replace('_medium.', '_large.')
        // $scope.posts = [{id:1,title:"title1",content:"content1",caption:"caption1"},{id:2,title:"title2",content:"content2",caption:"caption2"}];
        $scope.share = function(post) {
            
          // FB.ui(
          // {
          //     method: 'feed',
          //     name: 'This is the content of the "name" field.',
          //     link: 'http://www.hyperarts.com/external-xfbml/'+post.id,
          //     picture: 'http://www.hyperarts.com/external-xfbml/share-image.gif',
          //     caption: post.caption,
          //     description: 'This is the content of the "description" field, below the caption.',
          //     message: ''
          // });
        }

        $scope.showAdvanced = function(ev) {

            $mdDialog.show({
                    controller: SaveController,
                    templateUrl: 'savedialog.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                })
                .then(function(answer) {
                    //$window.location.reload()
                    // $scope.status = 'You said the information was \n"' + answer;
                    // console.log($scope.status)
                }, function() {
                    //$scope.status = 'You cancelled the dialog.';
                    // console.log($scope.status)
                    //console.log($scope.status)

                });
        };

        function SaveController($scope, $mdDialog, auth) {
            $scope.hide = function() {
                $mdDialog.hide();
            };
            //console.log(auth.isLoggedIn())

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            // $scope.answer = function(answer) {
            //   $mdDialog.hide(answer);
            // };

            $scope.save = function(data) {
                // var pass = md5.createHash(password)
                var user_id = auth.getToken().user_id;
                var username = auth.getToken().username;
                console.log(auth)
                var access_token = auth.getToken().access_token;
                console.log(user_id)
                console.log(access_token)
                var auth1 = auth.getToken()
                console.log(auth1)
                var event_id = $stateParams.event.id;
                console.log(event_id)
                AppManager.saveEvent(username, user_id, event_id, access_token)
                    .then(function(result) {
                        console.log(result)
                        var result = result
                        if (result.success === "true") {
                            $mdDialog.cancel();
                            console.log("Successfully saved")
                        } else {
                            console.log('Not Logged In')
                        }
                        // return result
                    })
                    // .then(function(result) {
                    //$scope.answer(JSON.stringify(result))
                    // })
            }


        }
        // var addMyCalendar = function(data){

        // }
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
