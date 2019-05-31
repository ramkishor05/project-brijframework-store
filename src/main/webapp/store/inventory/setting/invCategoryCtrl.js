invApp.controller('invCategoryCtrl', function ($scope, $state,metaDataServices,WebObject,ajaxServices,uiDataModalSvcs,uiModalSvcs,messageServices){
	$scope.isLoadingDone=false;
	$scope.selectedObject=WebObject.getSelected();
	$scope.metaData=["CategoryID","Name","TypeID","CategoryGroup"];
	$scope.global={
			categoryGroupList			:[],
			categoryList				:[]
	}
	
	function builderObjects(responce){
 		if(responce!=null || responce!=undefined){
 			for(var c in responce.categoryGroups){
 				$scope.global.categoryGroupList.push(new UICategoryGroup(responce.categoryGroups[c]))
 			}
 			for(var c in responce.categoryList){
 				$scope.global.categoryList.push(new UICategory(responce.categoryList[c]))
 			}
 		}
 	}

 	$scope.loadData= function(){
 		$scope.isLoadingDone=false;
     	requestHashMap={};
     	requestHashMap.actionMap={
     			requestID:"EOInvApp_categorySummary",
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
        		 controllerName:"invCategoryMdlCtrl",
        		 templateHtml:"store/inventory/setting/invCategoryMdl.html"
        	 },
        	 categoryGroupList:$scope.global.categoryGroupList
         }
         uiModalSvcs.dataModal(metaData,objectMap).then(function(response){
          	  addObject(response.objectMap)
          })
  	  }
	
	 var addObject=function(param){
		requestHashMap={};
     	requestHashMap.actionMap={
     			requestID:"EOInvApp_addCategory",
     			objectID:$scope.selectedObject.appMain
     	}
     	requestHashMap.parameterMap=param;
     	requestHashMap.headerMap=$scope.selectedObject
 		var url="web/session/service";
 		ajaxServices.postDataThen(url,requestHashMap).then(function(data){
 			if(data.isSuccess){
 				$scope.global.categoryList.push(data.result);
 				$scope.isLoadingDone=true;
 			}
 		});
	}
	 
	 $scope.updateModal=function(objectMap){
		 var metaData={
	        	 pageUrl:{
	        		 controllerName:"invCategoryMdlCtrl",
	        		 templateHtml:"store/inventory/setting/invCategoryMdl.html"
	        	 }
		         , categoryGroupList:$scope.global.categoryGroupList
	      }
         uiModalSvcs.dataModal(metaData,objectMap).then(function(response){
        	 updateObject(response.objectMap)
          })
  	  }
	 
	  var updateObject=function(param){
		    delete param.categoryGroup
			requestHashMap={};
	     	requestHashMap.actionMap={
	     			requestID:"EOCategory_updateObject",
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
		   for(var d in $scope.global.categoryList){
			   if($scope.global.categoryList[d].uniqueID==Obj.uniqueID){
				   $scope.global.categoryList[d]=Obj;
			   }
		   }
	   }
})