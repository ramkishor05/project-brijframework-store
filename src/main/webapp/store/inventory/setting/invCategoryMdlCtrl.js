invApp.controller('invCategoryMdlCtrl', function ($scope, $state,metaDataServices,ajaxServices,metaData,$uibModalInstance,objectMap,messageServices){
	$scope.dataObject=objectMap;
	$scope.dataObject.eoCategoryGroup=0;
	$scope.isLoadingDone=false;
	$scope.categoryGroupList=metaData.categoryGroupList;
	 $scope.cancel = function () {
		    $uibModalInstance.dismiss('cancel');
		};
		
	$scope.ok= function () {
		$uibModalInstance.close({objectMap: $scope.dataObject});
	}
})