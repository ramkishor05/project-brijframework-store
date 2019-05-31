storeApp.controller("appCtrl",function($rootScope,$scope,$location,ajaxServices,WebObject){
	$scope.selectedObject=WebObject.getSelected();
	console.log("menuObject=",$rootScope.menuObject)
	$scope.menuObjectGet = function() {
		if($rootScope.menuObject==null || $rootScope.menuObject==undefined){
			$rootScope.menuObjectApp();
		}
	}
	$scope.menuObjectGet();
	
	$scope.loadData= function(){
		if($scope.selectedObject.custAppID==null){
			return;
		}
		$scope.selectedObject=WebObject.getSelected();
		if($scope.selectedObject["appMain"]!=null && $scope.selectedObject["appMain"]!=undefined){
			return;
		}
     	requestHashMap={};
     	requestHashMap.actionMap={
     			requestID:"EOCustApp_getSelectForApp",
     			objectID :$scope.selectedObject.custAppID
     	}
     	requestHashMap.headerMap=$scope.selectedObject
 		var url="web/session/service";
 		ajaxServices.postDataThen(url,requestHashMap).then(function(data){
 			if(data.isSuccess){
 				if(data.result!=null && data.result!=undefined){
 					WebObject.putSelected("appMain",data.result.appMain);
 				}
 			}
 		});
 	};
 	$scope.loadData();
})