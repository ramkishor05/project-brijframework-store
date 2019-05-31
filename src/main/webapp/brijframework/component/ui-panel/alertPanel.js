webApp.controller('alertPanel', function ($scope, $modalInstance, alertMsg) {

  $scope.alertMsg = alertMsg;
  $scope.cancel = function () {
    $modalInstance.close();
  };
});