invApp.controller('invProductCtrl', function ($scope, $state,metaDataServices,WebObject,ajaxServices,uiDataModalSvcs,uiModalSvcs,messageServices){
	$scope.isLoadingDone=false;
	$scope.selectedObject=WebObject.getSelected();
	$scope.metaData=["ID","Name","Description","Qnt"];
	$scope.global={
			productList					:[],
			locationList				:[],
			countFreqList				:[],
			categoryList  				:[]
	}
	
	function builderObjects(responce){
 		if(responce!=null || responce!=undefined){
 			for(var c in responce.categoryList){
 				$scope.global.categoryList.push(new UICategory(responce.categoryList[c]))
 			}
 			for(var c in responce.productList){
 				$scope.global.productList.push(new UIProduct(responce.productList[c]))
 			}
 			for(var c in responce.locationList){
 				$scope.global.locationList.push(new UILocation(responce.locationList[c]))
 			}
 			for(var c in responce.countFreqList){
 				$scope.global.countFreqList.push(new UIFreq(responce.countFreqList[c]))
 			}
 		}
 	}

 	$scope.loadData= function(){
 		$scope.isLoadingDone=false;
     	requestHashMap={};
     	requestHashMap.actionMap={
     			requestID:"EOInvApp_productSummary",
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
        		 controllerName:"invProductMdlCtrl",
        		 templateHtml:"store/inventory/setting/invProductMdl.html"
        	 },
        	 categoryList  :$scope.global.categoryList,
	    	 countFreqList :$scope.global.countFreqList,
	    	 locationList  :$scope.global.locationList
         }
         uiModalSvcs.dataModal(metaData,objectMap).then(function(response){
          	  addObject(response.objectMap)
          })
  	  }
	
	 var addObject=function(param){
		requestHashMap={};
     	requestHashMap.actionMap={
     			requestID:"EOInvApp_addProduct",
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
	        		 controllerName:"invProductMdlCtrl",
	        		 templateHtml:"store/inventory/setting/invProductMdl.html"
	        	 },
				 categoryList  :$scope.global.categoryList,
		    	 countFreqList :$scope.global.countFreqList,
		    	 locationList  :$scope.global.locationList
	      }
         uiModalSvcs.dataModal(metaData,objectMap).then(function(response){
        	 updateObject(response.objectMap)
          })
  	  }
	 
	  var updateObject=function(param){
			requestHashMap={};
	     	requestHashMap.actionMap={
	     			requestID:"EOProduct_updateObject",
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
		   for(var d in $scope.global.productList){
			   if($scope.global.productList[d].uniqueID==Obj.uniqueID){
				   $scope.global.productList[d]=Obj;
			   }
		   }
	   }
})