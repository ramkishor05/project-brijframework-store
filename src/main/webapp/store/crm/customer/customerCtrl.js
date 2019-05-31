crmApp.controller('customerCtrl', function ($scope, $state,metaDataServices,ajaxServices,messageServices,WebObject){
	console.log("hi customerCtrl");
	$scope.selectedObject=WebObject.getSelected();
	$scope.rowDataArray=[];
	$scope.loadData=function(){
		requestHashMap={};
    	requestHashMap.actionMap={}
    	requestHashMap.actionMap={
    			requestID : "EOCustomer_getAllObject",
    			objectID  : $scope.selectedObject['customerID']
    	};
    	requestHashMap.headerMap=$scope.selectedObject;
		var url="web/session/service";
		ajaxServices.postDataThen(url,requestHashMap).then(function(data){
			if(data.result!=undefined){
				$scope.rowDataArray=data.result;
			}
		});
	}
	$scope.loadData();
});