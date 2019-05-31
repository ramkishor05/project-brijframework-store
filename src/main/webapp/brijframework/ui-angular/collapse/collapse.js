var angularUI= angular.module('angularUI', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
angularUI.controller('collapseCtrl', function ($scope) {
  $scope.isNavCollapsed = true;
  $scope.isCollapsed = false;
  $scope.isCollapsedHorizontal = false;
});