webApp.controller('uiDataModalCtrl',function($scope,$window,$location,$uibModalInstance,metaData,modalMap){
	
	$scope.metaData=metaData;
	$scope.modalMap={}
	$scope.name="";
	$scope.objectMap=angular.extend({},modalMap);
	$scope.modalMap.objectMap=angular.extend({},modalMap);
	$scope.modalName=metaData.headerLabel;
    $scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	};
	
	$scope.ok= function () {
		$uibModalInstance.close({objectMap: $scope.modalMap.objectMap});
	}
});

webApp.factory('uiDataModalSvcs', function ($q, $uibModal){
	function dataModal(metaData,modalMap){
		var defer=$q.defer();
		var modalInstance =$uibModal.open({
		      animation: true,
		      ariaLabelledBy: 'modal-title-top',
		      ariaDescribedBy: 'modal-body-top',
		      templateUrl: 'brijframework/component/ui-modal/uiDataModal.html',
		      size: metaData.size,
		      resolve: {
		    	  metaData: function () {
		            return metaData;
		          }
				 ,modalMap: function () {
			            return modalMap;
		         }
		        },
		      controller:"uiDataModalCtrl"
		    });
	    
	    modalInstance.result.then(function(response){
	    	defer.resolve(response);
	    },function () {
	    });
	    return defer.promise;
	}
	return {
		dataModal		:	dataModal
	}
});

