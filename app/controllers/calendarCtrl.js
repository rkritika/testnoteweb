(function() {
    var app = angular.module('myApp')
    app.controller('myCtrl', function($scope, $mdDialog, md5, $location, auth, $anchorScroll, $rootScope, $document, $window, AppManager, $http, $state, $stateParams, eventHandler) {
        var token = auth.getToken()
        $scope.calCtrl = true
        console.log($scope.calCtrl)
        if (token != undefined) {
            $scope.user_id = token.user_id
        }
        $scope.isLoggedIn = (token != undefined)
        // console.log($scope.isLoggedIn)
        // console.log($stateParams.id)
        $scope.changeMonth = function(selection, month, year) {
            var tempDate = year + '-' + month + '-' + 15
            selection = getDayOfWeek(tempDate)+ ' ' + selection + ' 15 ' + year + ' 22:30:00 GMT+0530 (India Standard Time)'
            // $rootScope.data.selectedDate = 
            $rootScope.data.selectedDate = new Date(Date.parse(selection))
            var date = $rootScope.data.selectedDate
            $scope.month = date.getMonth()
            $rootScope.data.minDate = new Date(date.getFullYear(), date.getMonth(), 1);
            $rootScope.data.maxDate = new Date(new Date(date.getFullYear(), date.getMonth() + 2, 0).setHours(23, 59, 59));
        }

        function getDayOfWeek(date) {
            var dayOfWeek = new Date(date).getDay();
            return isNaN(dayOfWeek) ? null : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
        }

        $scope.$on('gmPlacesAutocomplete::placeChanged', function() {
            var location = $scope.autocomplete.getPlace().geometry.location;

            var address = $scope.address = $scope.autocomplete.getPlace().formatted_address
            var lat = $scope.lat = location.lat();
            var lng = $scope.lng = location.lng();
            // $scope.lng = location.getPlace();
            console.log($scope.address)
            eventHandler.setEvents('', lat, lng, '', $scope.address)
            $state.go('home', { lat: lat, long: lng, address: address });
            // $location.path('/'+ $scope.address)
            $scope.$apply();

        });

        $scope.show = function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(onPositionUpdate);
            }
        }

        $scope.showAdvanced = function(ev) {
            $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'dialog1.tmpl.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                })
                .then(function(answer) {
                    $window.location.reload()
                    $scope.status = 'You said the information was \n"' + answer;
                    console.log($scope.status)
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                    // console.log($scope.status)
                    console.log($scope.status)

                });
        };

        function DialogController($scope, $mdDialog, auth) {
            $scope.hide = function() {
                $mdDialog.hide();
            };
            console.log(auth.isLoggedIn())

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.answer = function(answer) {
                $mdDialog.hide(answer);
            };

            $scope.login = function(user, password) {
                var pass = md5.createHash(password)
                AppManager.login(user, pass)
                    .then(function(result) {
                        console.log(result)
                        console.log("userName " + user)
                        var result = result
                        if (result.success === "true") {
                            var access_token = result.data.access_token
                            var user_id = result.data.user_id
                            var token = {
                                access_token: access_token,
                                user_id: user_id,
                                username: user
                            }
                            return auth.setToken(token)
                        } else {
                            console.log('Invalid username/password')
                        }
                        // return result
                    })
                    .then(function(result) {
                        $scope.answer(JSON.stringify(result))
                    })
            }


        }
        
        function onPositionUpdate(position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            $scope.lat = lat
            $scope.lng = lng
            var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=true";
            $http.get(url)
                .then(function(result) {
                    var address = result.data.results[2].formatted_address;
                    $scope.autocomplete = address;
                    $scope.address = address;
                    console.log($scope.address)
                });
        }

        $scope.id = $stateParams.id
        $scope.logout = function() {
            console.log('hi')
            auth.logout()
            $scope.isLoggedIn = false
            $location.path('/')
        }
        $scope.user = {}
        // console.log($stateParams)
        // console.log('myCtrl')
        $scope.baseUrl = 'https://api.gotimenote.com/'
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
            var date = $rootScope.selectedDate = $scope.dt = new Date($stateParams.date * 1000);
            $scope.year = date.getFullYear()
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
        // $scope.optionsMonth = {
        //   customClass: getDayClass,
        //   minDate: new Date(),
        //   maxDate: new Date(),
        //   showWeeks: false
        // };

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
            // console.log(data)
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
            console.log($scope.dt)
            var date = $scope.dt
            // console.log(date)
            console.log($rootScope.data.selectedDate)
            $rootScope.data.selectedDate = date
            console.log(date.getFullYear(), date.getMonth())
            $rootScope.data.minDate = new Date(date.getFullYear(), date.getMonth(), 1);
            $rootScope.data.maxDate = new Date(new Date(date.getFullYear(), date.getMonth() + 2, 0).setHours(23, 59, 59));
        })

        $rootScope.$watch('selectedDate', function() {
            // $window.reload();
            console.log($rootScope.data.selectedDate)
            var date = $rootScope.selectedDate
            $scope.dt = date
        })



    });
})()