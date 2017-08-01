(function() {
  var app = angular.module('myApp', ['ngRoute', 'ngMaterial', 'slickCarousel', 'ngStorage', 'ngAnimate', 'duScroll', 'ngResource', 'underscore', 'gm', 'ngSanitize', 'materialCalendar', 'ui.bootstrap', 'ui.router', 'angularModalService', 'angular-loading-bar', 'angular-md5', '720kb.socialshare', 'ngMeta', 'djds4rce.angular-socialshare'])
    .value('duScrollDuration', 4000)
    .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, $stateProvider, $urlRouterProvider, $window) {

      $urlRouterProvider.otherwise('/');
      $locationProvider.hashPrefix('!');
      // $window.location.href="http://www.google.com";
      // $locationProvider.html5Mode({
      //   enabled: true,
      //   requireBase: false
      // })

      $stateProvider
        .state('home', {
          params: {
            lat: null,
            long: null,
            address: null
          },
          url: '/',
          views: {
            '': {
              templateUrl: './app/templates/home.html'
            }
          },
          controller: 'homeCtrl'
        })
        .state('dashboard', {
          url: '/:address',
          views: {
            '': {
              templateUrl: './app/templates/home.html'
            }
          },
          controller: 'homeCtrl'
        })
        .state('calendar', {
          // abstract: true,
          url: '/calendar/:id/:date',
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
            event: null,
            url: null
          },
          url: '/event/:event_id',
          views: {
            '': {
              templateUrl: '../../../app/templates/event.html'
            }
          },
          controller: 'eventCtrl',
          data: {
              meta: {
                'title': 'Timenote Events',
                'description': 'Click here for the event'
              }
            }     
        })
          
      // $locationProvider.html5Mode({
      //   enabled: false,
      //   requireBase: false
      // });
    }])

  .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
      cfpLoadingBarProvider.includeSpinner = false;
      // $locationProvider.html5Mode({
      //   enabled: true,
      //   requireBase: false
      // })
    }])
    .run(['$rootScope', '$state','ngMeta','$FB', function($rootScope, $state, ngMeta, $FB) {
      ngMeta.init();
      $FB.init('1953311694902380');
      $rootScope.$on('$stateChangeSuccess', function(evt, to, params) {
        if (to.redirectTo) {
          evt.preventDefault();
          $state.go(to.redirectTo, params, { location: 'replace' })
        }
      });
    }])

})()
