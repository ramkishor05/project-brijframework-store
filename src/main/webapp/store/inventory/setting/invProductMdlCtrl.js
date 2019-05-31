invApp.controller('invProductMdlCtrl', function ($scope, $state,metaDataServices,ajaxServices,metaData,$uibModalInstance,objectMap,messageServices){
	$scope.dataObject=objectMap;
	$scope.isLoadingDone=false;
	$scope.categoryList=metaData.categoryList;
	$scope.locationList=metaData.locationList;
	$scope.countFreqList=metaData.countFreqList
    $scope.cancel = function () {
		    $uibModalInstance.dismiss('cancel');
		};
		
	$scope.ok= function () {
		$uibModalInstance.close({objectMap: $scope.dataObject});
	}
})