invApp.controller('invCategoryGroupCtrl', function ($scope, $state,metaDataServices,WebObject,ajaxServices,uiDataModalSvcs,uiModalSvcs,messageServices){
	$scope.isLoadingDone=false;
	$scope.selectedObject=WebObject.getSelected();
	$scope.metaData=["CategoryID","Name","TypeID"];
	$scope.global={
			categoryGroupList			:[]
	}

	function builderObjects(responce){
 		if(responce!=null || responce!=undefined){
 			for(var obj in responce){
 				$scope.global.categoryGroupList.push(new UICategoryGroup(responce[obj]));
 			}
 		}
 	}
 	
 	$scope.loadData= function(){
 		$scope.isLoadingDone=false;
     	requestHashMap={};
     	requestHashMap.actionMap={
     			requestID:"EOInvApp_categoryGroups",
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
        		 controllerName:"invCategoryGroupMdlCtrl",
        		 templateHtml:"store/inventory/setting/invCategoryGroupMdl.html"
        	 }
         }
         uiModalSvcs.dataModal(metaData,objectMap).then(function(response){
          	  console.log("objectMap", response)
          	  addObject(response.objectMap)
          })
  	  }
	
	 var addObject=function(param){
		requestHashMap={};
     	requestHashMap.actionMap={
     			requestID:"EOInvApp_addCategoryGroup",
     			objectID:$scope.selectedObject.appMain
     	}
     	requestHashMap.parameterMap=param;
     	requestHashMap.headerMap=$scope.selectedObject
 		var url="web/session/service";
 		ajaxServices.postDataThen(url,requestHashMap).then(function(data){
 			if(data.isSuccess){
 				$scope.global.categoryGroupList.push(data.result);
 				$scope.isLoadingDone=true;
 			}
 		});
	}
	 
	 $scope.updateModal=function(objectMap){
		 var metaData={
	        	 pageUrl:{
	        		 controllerName:"invCategoryGroupMdlCtrl",
	        		 templateHtml:"store/inventory/setting/invCategoryGroupMdl.html"
	        	 }
	      }
         uiModalSvcs.dataModal(metaData,objectMap).then(function(response){
        	 updateObject(response.objectMap)
          })
  	  }
	 
	 var updateObject=function(param){
			requestHashMap={};
	     	requestHashMap.actionMap={
	     			requestID:"EOCategoryGroup_updateObject",
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
		   for(var d in $scope.global.categoryGroupList){
			   if($scope.global.categoryGroupList[d].uniqueID==Obj.uniqueID){
				   $scope.global.categoryGroupList[d]=Obj;
			   }
		   }
	   }
})