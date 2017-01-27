(function() {
  var app = angular.module('myApp', ['ngRoute', 'ngMaterial', 'slickCarousel', 'ngStorage', 'ngAnimate', 'duScroll', 'ngResource', 'underscore', 'gm', 'ngSanitize', 'materialCalendar', 'ui.bootstrap', 'ui.router', 'angularModalService', 'angular-loading-bar', 'angular-md5'])
    .value('duScrollDuration', 4000)
    .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, $stateProvider, $urlRouterProvider) {

      // $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('home', {
          url: '/',
          views: {
            '': {
              templateUrl: './app/templates/home.html'
            }
          },
          controller: 'homeCtrl'
        })
        .state('calendar', {
          // abstract: true,
          url: '/calendar/:id',
          views: {
            '': {
              templateUrl: '../app/templates/calendar.html'
            }
          },
          redirectTo: '.day'

        })
        .state('calendar.day', {
          url: '',
          views: {
            '': {
              templateUrl: '../app/templates/day.html'
            }
          }

        })
        .state('calendar.week', {
          url: '',
          views: {
            '': {
              templateUrl: '../app/templates/week.html'
            }
          },
          controller: 'weekCtrl'
        })
        .state('calendar.month', {
          url: '',
          views: {
            '': {
              templateUrl: '../app/templates/month.html'
            }
          },
          controller: 'monthCtrl'
        })
        .state('calendar.event', {
          params: {
            event: null
          },
          url: '/event',
          views: {
            '': {
              templateUrl: '../../../app/templates/event.html'
            }
          },

          controller: 'eventCtrl'
        })
        // .state('calendar', {
        //   url: '/calendar',
        //   views: {
        //     '': { templateUrl: './app/templates/calendar.html' },
        //       'nav@calendar': { templateUrl: './app/templates/nav.html' },
        //       'body@calendar': { templateUrl: './app/templates/calendarBody.html' },
        //       'sideNav@calendar': { templateUrl: './app/templates/sideNav.html' }
        //   }
        // })

      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });




      //  $provide.decorator('$state', function($delegate, $stateParams) {
      //     $delegate.forceReload = function() {
      //         return $delegate.go($delegate.current, $stateParams, {
      //             reload: true,
      //             inherit: false,
      //             notify: true
      //         });
      //     };
      //     return $delegate;
      // });


    }])


  .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
      cfpLoadingBarProvider.includeSpinner = false;
    }])
    .run(['$rootScope', '$state', function($rootScope, $state) {

      $rootScope.$on('$stateChangeSuccess', function(evt, to, params) {
        if (to.redirectTo) {
          evt.preventDefault();
          $state.go(to.redirectTo, params, { location: 'replace' })
        }
      });
    }])
    // .directive('disableTap', function($timeout) {
    //   return {
    //     link: function() {

    //       $timeout(function() {
    //         document.querySelector('.pac-container').setAttribute('data-tap-disabled', 'true')
    //       }, 500);
    //     }
    //   };
    // });
})()
