storeApp.controller('userLandingCtrl', function ($rootScope,$scope,$location, WebObject,ajaxServices,$state,$stateParams,metaDataServices,messageServices){
	$scope.selectedObject=WebObject.getSelected();
	$scope.eoCustAppArray=[];
	
	$scope.loadMeta=function(){
		if($scope.selectedObject==null || $scope.selectedObject==undefined){
			return;
		}
		 var requestHashMap = {
			"actionMap" : {
				"requestID" : "EOCustomer_userCustApp",
				"objectID" :$scope.selectedObject['customerID']
			},
			"parameterMap":$scope.selectedObject,
			"headerMap":$scope.selectedObject
		}
		var url = "web/session/service";
		ajaxServices.postDataThen(url, requestHashMap).then(function(meta) {
			if (meta != undefined) {
				if (meta.result != undefined) {
					$scope.eoCustAppArray=meta.result;
					console.log($scope.eoCustAppArray)
					$scope.isLoading=true;
				}
			}
		});
	}
	
	$scope.loadMeta();
	$scope.redirectPage= function(app){
        if(app !=null || app !=undefined){
        	var obj={};
        	WebObject.putSelected("appID",app.eoAppMain.uniqueID);
        	WebObject.putSelected("custAppID",app.uniqueID);
        	$scope.menuObjectApp();
        }
	}
});
