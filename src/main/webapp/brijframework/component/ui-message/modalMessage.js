webApp.controller('modalMessage',function($scope,$window,$location,$uibModalInstance,metaData,modalMap){
	$scope.metaData=metaData;
	$scope.modalMap=angular.extend({},modalMap);
	$scope.headerLabel=metaData.headerLabel;
    $scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	};
	$scope.ok= function () {
		$uibModalInstance.close({state: true});
	}
});

webApp.factory('modalServices', function ($q, $uibModal){
    function confirmModal(metaData,modalMap){
		var defer=$q.defer();
		var modalInstance =$uibModal.open({
			      animation: true,
			      ariaLabelledBy: 'modal-title-bottom',
			      ariaDescribedBy: 'modal-body-bottom',
			      templateUrl: 'brijframework/component/ui-message/modalMessage.html',
			      size: metaData.size,
			      resolve: {
			    	  metaData: function () {
			            return metaData;
			          }
					 ,modalMap: function () {
				            return modalMap;
			         }
			        },
			      controller:"modalMessage"
			});
	      modalInstance.result.then(function(response){
	    	defer.resolve(response);
	    },function () {
	  });
	 return defer.promise;
   }
	  

	return {
		confirmModal	:	confirmModal
	}
	
	
});