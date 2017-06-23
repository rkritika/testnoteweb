(function() {
  var app = angular.module('myApp', ['ngRoute', 'ngMaterial', 'slickCarousel', 'ngStorage', 'ngAnimate', 'duScroll', 'ngResource', 'underscore', 'gm', 'ngSanitize', 'materialCalendar', 'ui.bootstrap', 'ui.router', 'angularModalService', 'angular-loading-bar', 'angular-md5', '720kb.socialshare', 'ngMeta'])
    .value('duScrollDuration', 4000)
    .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, $stateProvider, $urlRouterProvider) {

      // $urlRouterProvider.otherwise('/');
      $locationProvider.hashPrefix('!');

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
          url: '/event',
          views: {
            '': {
              templateUrl: '../../../app/templates/event.html'
            }
          },
          controller: 'eventCtrl',
          data: {
              meta: {
                'title': 'Event',
                'description': 'Visit timenote.com'
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
    .run(['$rootScope', '$state','ngMeta', function($rootScope, $state, ngMeta) {
      ngMeta.init();
      $rootScope.$on('$stateChangeSuccess', function(evt, to, params) {
        if (to.redirectTo) {
          evt.preventDefault();
          $state.go(to.redirectTo, params, { location: 'replace' })
        }
      });
    }])

})()
