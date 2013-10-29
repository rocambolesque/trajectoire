define(['appModule'], function(app) {
  app.lazy.controller('InterestController', function($scope) {
    $scope.interests = [{label: 'football'}, {label: 'tennis'}];
  });
});
