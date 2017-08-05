(function() {
    var app = angular.module('myApp')
    app.controller('eventCtrl', function($timeout, $scope, ngMeta, $location, AppManager, $http, $state, auth, $window, $filter, _, $rootScope, $stateParams, $mdDialog) {
        $scope.data = {}
        $scope.imgheart = '../../assets/images/ic_heart.png'
        $scope.imgheart_change = '../../assets/images/ic_heart_change.png'

        $scope.imgcomment = '../../assets/images/ic_comments.png'
        console.log($stateParams)
        console.log($stateParams.event)
        console.log(auth)
        var token = auth.getToken()
        if(token != undefined)
        {
          $scope.user_id = token.user_id
          $scope.token = token.access_token
        }
        console.log(token)
        console.log($scope.user_id)
        $scope.likeEvent = function (event) {
            if($scope.isLoggedIn){
                console.log("logged in")
                AppManager
                    .likeEvent($scope.user_id, $scope.token, $stateParams.event_id)
                        .then(function(result){
                            console.log(result)
                            if(event.type != null){
                              event.type = null
                              event.likes = parseInt(event.likes) - 1
                            }else{
                              event.type = 1
                              event.likes = parseInt(event.likes) + 1

                            }
                        })
            }else{
                $mdDialog.show({    
                    controller: SaveController,                
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
        AppManager
            .getEventsByEventId($scope.user_id, $stateParams.event_id)
                .then(function(result) {
                    console.log(result)
                    console.log(result.list_images[0].link)
                    var ev = result.list_images[0].link.split('.')
                    result.list_images[0].link ="https://api.gotimenote.com/" + ev[0] + '_large.jpg'
                    // var temp =  + result.avatar
                    // result.avatar = temp
                    $scope.url = $location.absUrl();
                    $scope.data = result
                    console.log($scope.data)
                    $scope.quote = "Website Link: "+ $scope.url + "   |   Event Name: " + $scope.data.name + "   |   Event Description: " + $scope.data.description
                })
        console.log($scope.data)

        // $scope.data = $stateParams.event
        // $scope.url = $stateParams.url
        
        // $scope.url = "http://localhost:3000/?_escaped_fragment_=/calendar/21993/1498543200/event"
        // console.log($location.path())
        // $scope.url = "http://testnotewb.herokuapp.com/#/calendar/21993/1498543200"
        // $scope.url = "https:///#/calendar/19633/1497909600"
        // $scope.data.link = $scope.data.link.replace('_medium.', '_large.')
        // $scope.posts = [{id:1,title:"title1",content:"content1",caption:"caption1"},{id:2,title:"title2",content:"content2",caption:"caption2"}];
        ngMeta.setTitle($scope.data.name)
        ngMeta.setTag('image', $scope.data.link)
        ngMeta.setTag('description', $scope.data.description)
        ngMeta.setTag('url', $scope.url);

        if($scope.data == null){
            
        }

        $scope.showAdvanced = function(ev) {

            if($scope.isLoggedIn){
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
            }else{
                $mdDialog.show({
                    controller: SaveController,                    
                    templateUrl: 'loginerror.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                })
                .then(function(answer) {
                }, function() {
                });
            }
            
            
        };

        function SaveController($scope, $mdDialog, auth) {
            $scope.hide = function() {
                console.log("HIDE1")

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
                var event_id = $stateParams.event_id;
                console.log(event_id)
                AppManager.saveEvent(username, user_id, event_id, access_token)
                    .then(function(result) {
                        console.log(result)
                        var result = result
                        if (result.success === "true") {
                            // $mdDialog.cancel();
                            $scope.saveFlag = true
                            console.log("Successfully saved")
                        } else {
                            $scope.saveFlag = false
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
