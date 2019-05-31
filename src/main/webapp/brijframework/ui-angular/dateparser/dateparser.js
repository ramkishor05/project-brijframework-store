var angularUI= angular.module('angularUI', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
angularUI.controller('DateParserCtrl', function ($scope, uibDateParser) {
  $scope.format = 'yyyy/MM/dd';
  $scope.date = new Date();
});