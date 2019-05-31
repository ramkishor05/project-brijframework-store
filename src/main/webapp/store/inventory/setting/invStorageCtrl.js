invApp.controller('invStorageCtrl', function ($scope, $state,metaDataServices,WebObject,ajaxServices,uiDataModalSvcs,uiModalSvcs,messageServices){
	$scope.isLoadingDone=false;
	$scope.selectedObject=WebObject.getSelected();
	$scope.metaData=["ID","Name"];
	$scope.global={
			storageList				:[]
	}
	
	function builderObjects(responce){
 		if(responce!=null || responce!=undefined){
 			for(var c in responce){
 				$scope.global.storageList.push(new UIStorage(responce[c]))
 			}
 		}
 		console.log($scope.global.storageList);
 	}

 	$scope.loadData= function(){
 		$scope.isLoadingDone=false;
     	requestHashMap={};
     	requestHashMap.actionMap={
     			requestID:"EOInvApp_storages",
     			objectID:$scope.selectedObject.appMain
     	}
     	requestHashMap.headerMap=$scope.selectedObject
 		var url="web/session/service";
 		ajaxServices.postDataThen(url,requestHashMap).then(function(data){
 			if(data.isSuccess){
 				builderObjects(data.result);
 				$scope.isLoadingDone=true;
 			}
 		});
 		
 	};
 	
 	$scope.loadData();
 	$scope.addModal=function(){
 		 var objectMap={};
         var metaData={
        	 pageUrl:{
        		 controllerName:"invStorageMdlCtrl",
        		 templateHtml:"store/inventory/setting/invStorageMdl.html"
        	 }
         }
         uiModalSvcs.dataModal(metaData,objectMap).then(function(response){
          	  addObject(response.objectMap)
          })
  	  }
	
	 var addObject=function(param){
		requestHashMap={};
     	requestHashMap.actionMap={
     			requestID:"EOInvApp_addStorage",
     			objectID:$scope.selectedObject.appMain
     	}
     	requestHashMap.parameterMap=param;
     	requestHashMap.headerMap=$scope.selectedObject
 		var url="web/session/service";
 		ajaxServices.postDataThen(url,requestHashMap).then(function(data){
 			if(data.isSuccess){
 				$scope.global.storageList.push(data.result);
 				$scope.isLoadingDone=true;
 			}
 		});
	}
	 
	 $scope.updateModal=function(objectMap){
		 /*var metaData={
	        	 pageUrl:{
	        		 controllerName:"invStorageMdlCtrl",
	        		 templateHtml:"store/inventory/setting/invStorageMdl.html"
	        	 }
	      }*/
		 $scope.isDetail=true;
		 $scope.objectMap=objectMap;
		 console.log("colling -",$scope.objectMap)
        /* uiModalSvcs.dataModal(metaData,objectMap).then(function(response){
        	 updateObject(response.objectMap)
          })*/
  	  }
	 
	 $scope.backToHome=function(){
		 $scope.isDetail=false;
	 }
	 
	 $scope.updateObject=function(param){
			requestHashMap={};
	     	requestHashMap.actionMap={
	     			requestID:"EOStorage_updateObject",
	     			objectID:param.uniqueID
	     	}
	     	requestHashMap.parameterMap=param;
	     	requestHashMap.headerMap=$scope.selectedObject
	 		var url="web/session/service";
	 		ajaxServices.postDataThen(url,requestHashMap).then(function(data){
	 			if(data.isSuccess){
	 				margeObject(data.result);
	 			}
	 		});
	  }
	   
	   function margeObject(Obj){
		   for(var d in $scope.global.storageList){
			   if($scope.global.storageList[d].uniqueID==Obj.uniqueID){
				   $scope.global.storageList[d]=Obj;
			   }
		   }
	   }
})