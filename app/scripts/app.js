'use strict';

/**
 * @ngdoc overview
 * @name angularImperativeCodebaseApp
 * @description
 * # angularImperativeCodebaseApp
 *
 * Main module of the application.
 */
angular
  .module('angularImperativeCodebaseApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.grid', 
    'ui.grid.selection', 
    'mutable'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
