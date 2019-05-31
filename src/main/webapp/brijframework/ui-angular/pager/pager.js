var angularUI= angular.module('angularUI', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
angularUI.controller('PagerDemoCtrl', function($scope) {
  $scope.totalItems = 64;
  $scope.currentPage = 4;
});