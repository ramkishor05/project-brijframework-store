invApp.controller('invStorageDetailCtrl', function ($scope, $state,metaDataServices,uiModalSvcs,ajaxServices,messageServices){
	$scope.dataObject=$scope.objectMap;
	$scope.dataObject.locationList=[];
	
	function builderLocations(responce){
 		if(responce!=null || responce!=undefined){
 			for(var c in responce){
 				$scope.dataObject.locationList.push(new UILocation(responce[c]))
 			}
 		}
 	}

	$scope.isLoadingDone=true;
	$scope.loadData = function () {
		$scope.isLoadingDone=false;
     	requestHashMap={};
     	requestHashMap.actionMap={
     			requestID:"EOStorage_getLocations",
     			objectID:$scope.dataObject.uniqueID
     	}
     	requestHashMap.headerMap=$scope.selectedObject
 		var url="web/session/service";
 		ajaxServices.postDataThen(url,requestHashMap).then(function(data){
 			if(data.isSuccess){
 				builderLocations(data.result);
 				$scope.isLoadingDone=true;
 			}
 		});
	};
	$scope.loadData();
	
	$scope.addLocationModal=function(){
		var objectMap={};
        var metaData={
       	 pageUrl:{
       		 controllerName:"invLocationMdlCtrl",
       		 templateHtml:"store/inventory/setting/invLocationMdl.html"
       	 }
        }
        uiModalSvcs.dataModal(metaData,objectMap).then(function(response){
        	addLocationObject(response.objectMap)
         })
 	  }
	
	 var addLocationObject=function(param){
		requestHashMap={};
    	requestHashMap.actionMap={
    			requestID:"EOStorage_addLocation",
    			objectID:$scope.dataObject.uniqueID
    	}
    	requestHashMap.parameterMap=param;
    	requestHashMap.headerMap=$scope.selectedObject
		var url="web/session/service";
		ajaxServices.postDataThen(url,requestHashMap).then(function(data){
			if(data.isSuccess){
				$scope.dataObject.locationList.push(new UILocation(data.result))
				$scope.isLoadingDone=true;
			}
		});
	}
	
})