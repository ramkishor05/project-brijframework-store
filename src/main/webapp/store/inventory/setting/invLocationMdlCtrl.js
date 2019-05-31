invApp.controller('invLocationMdlCtrl', function ($scope, $state,metaDataServices,ajaxServices,metaData,$uibModalInstance,objectMap,messageServices){
	$scope.dataObject=objectMap;
	$scope.isLoadingDone=false;
	$scope.cancel = function () {
		    $uibModalInstance.dismiss('cancel');
	};
		
	$scope.ok= function () {
		$uibModalInstance.close({objectMap: $scope.dataObject});
	}
})