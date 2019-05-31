var angularUI= angular.module('angularUI', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
angularUI.controller('TimepickerDemoCtrl', function ($scope, $log) {
  $scope.ngModel = new Date();

  $scope.hstep = 1;
  $scope.mstep = 1;

  $scope.options = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };

  $scope.ismeridian = true;
  $scope.toggleMode = function() {
    $scope.ismeridian = ! $scope.ismeridian;
  };

  $scope.update = function() {
    var d = new Date();
    d.setHours( 14 );
    d.setMinutes( 0 );
    $scope.ngModel = d;
  };

  $scope.changed = function () {
    $log.log('Time changed to: ' + $scope.ngModel);
  };

  $scope.clear = function() {
    $scope.ngModel = null;
  };
});
