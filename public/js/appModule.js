define(['services/dependencyResolver'], function(config, dependencyResolverFor) {
  var app = angular.module('app', []);

  app.config(
    function($controllerProvider, $compileProvider, $filterProvider, $provide, $routeProvider, $locationProvider) {
      // save references to the providers
      app.lazy = {
        controller: $controllerProvider.register,
        directive: $compileProvider.directive,
        filter: $filterProvider.register,
        factory: $provide.factory,
        service: $provide.service,
      };

      $locationProvider.html5Mode(true);

      // define routes
      $routeProvider.when('/',{
        templateUrl:'partials/dashboard.html',
        resolve: {
          load: ['$q', '$rootScope', function($q, $rootscope) {
            var deferred = $q.defer();
            require(['controllers/homeController'], function () {
              $rootscope.$apply(function () {
                deferred.resolve();
              });
            });
            return deferred.promise;
          }]
        }
      });

      $routeProvider.when('/interests', {
        templateUrl:'partials/interest/list.html',
        resolve: {
          load: ['$q', '$rootScope', function($q, $rootscope) {
            var deferred = $q.defer();
            require(['controllers/interestController'], function () {
              $rootscope.$apply(function () {
                deferred.resolve();
              });
            });
            return deferred.promise;
          }]
        }
      });
    }
  );

  return app;
});
