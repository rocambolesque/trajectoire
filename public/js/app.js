var app = angular.module('trajectoire', ['ngRoute']);

app.config(function($routeProvider) {

  // define routes
  $routeProvider.
  when('/',{
    templateUrl:'partials/dashboard.html',
    controller: 'HomeController'
  }).
  when('/interests', {
    templateUrl:'partials/interest/list.html',
    controller: 'InterestController'
  }).
  otherwise({
    redirectTo: '/'
  });
});
