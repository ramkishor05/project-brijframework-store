invApp.controller('invIngrCtrl', function ($scope, $state,metaDataServices,WebObject,ajaxServices,uiDataModalSvcs,uiModalSvcs,messageServices){
	$scope.isLoadingDone=false;
	$scope.isDetail=true
	$scope.selectedObject=WebObject.getSelected();
	$scope.metaData=["ID","Name","Description","Qnt"];
	$scope.global={
			ingrList					:[],
			storageList 				:[],
			countFreqList				:[],
			categoryList				:[],
			unitGroupList				:[]
	}
	
	function builderObjects(responce){
 		if(responce!=null || responce!=undefined){
 			for(var c in responce.unitGroupList){
 				$scope.global.unitGroupList.push(new UIUnitGroup(responce.unitGroupList[c]))
 			}
 			for(var c in responce.ingrList){
 				$scope.global.ingrList.push(new UIIngr(responce.ingrList[c]))
 			}
 			for(var c in responce.storageList){
 				$scope.global.storageList.push(new UIStorage(responce.storageList[c]))
 			}
 			for(var c in responce.countFreqList){
 				$scope.global.countFreqList.push(new UIFreq(responce.countFreqList[c]))
 			}
 			for(var c in responce.categoryList){
 				$scope.global.categoryList.push(new UICategory(responce.categoryList[c]))
 			}
 		}
 		console.log("$scope.global=",$scope.global)
 	}

 	$scope.loadData= function(){
 		$scope.isLoadingDone=false;
     	requestHashMap={};
     	requestHashMap.actionMap={
     			requestID:"EOInvApp_ingrSummary",
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
 		 console.log("UIIngrDetail",new UIIngrDetail())
 		 var objectMap={};
         var metaData={
        	 pageUrl:{
        		 controllerName:"invIngrMdlCtrl",
        		 templateHtml:"store/inventory/setting/invIngrMdl.html"
        	 },
        	 size:"lg",
        	 objectMap			:{},
	         categoryList		:$scope.global.categoryList,
	         storageList		:$scope.global.storageList,
	         countFreqList		:$scope.global.countFreqList,
	         unitGroupList		:$scope.global.unitGroupList
         }
         uiModalSvcs.dataModal(metaData,objectMap).then(function(response){
          	  addObject(response.objectMap)
          })
  	  }
	
	 var addObject=function(param){
		requestHashMap={};
     	requestHashMap.actionMap={
     			requestID:"EOInvApp_addIngr",
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
	        		 controllerName:"invIngrMdlCtrl",
	        		 templateHtml:"store/inventory/setting/invIngrMdl.html"
	        	 },
	        	 objectMap			:objectMap,
		         categoryList		:$scope.global.categoryList,
		         storageList		:$scope.global.storageList,
		         countFreqList		:$scope.global.countFreqList,
		         unitGroupList		:$scope.global.unitGroupList
	      }
         uiModalSvcs.dataModal(metaData,objectMap).then(function(response){
        	 updateObject(response.objectMap)
          })
  	  }
	 
	  var updateObject=function(param){
			requestHashMap={};
	     	requestHashMap.actionMap={
	     			requestID:"EOIngr_updateObject",
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