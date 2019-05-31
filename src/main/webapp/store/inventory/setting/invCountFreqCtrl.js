invApp.controller('invCountFreqCtrl', function ($scope, $state,metaDataServices,WebObject,ajaxServices,uiDataModalSvcs,uiModalSvcs,messageServices){
	$scope.isLoadingDone=false;
	$scope.selectedObject=WebObject.getSelected();
	$scope.metaData=["Name","Description","TypeID"];
	$scope.global={
			countFreqList				:[]
	}
	
	$scope.isEdit=function(object){
			object['isEdit']=true;
	}
	
	function builderObjects(responce){
		$scope.isLoadingDone=false;
 		if(responce!=null || responce!=undefined){
 			for(var c in responce){
 				$scope.global.countFreqList.push(new UIFreq(responce[c]))
 			}
 		}
 		for(var c in $scope.global.countFreqList){
 			$scope.global.countFreqList[c]['isEdit']=false;
 		}
 		$scope.isLoadingDone=true;
 	}

 	$scope.loadData= function(){
 		
     	requestHashMap={};
     	requestHashMap.actionMap={
     			requestID:"EOInvApp_countFreqs",
     			objectID:$scope.selectedObject.appMain
     	}
     	requestHashMap.headerMap=$scope.selectedObject
 		var url="web/session/service";
 		ajaxServices.postDataThen(url,requestHashMap).then(function(data){
 			if(data.isSuccess){
 				builderObjects(data.result);
 			}
 		});
 		
 	};
 	
 	$scope.loadData();
 	
 	function validUpdate(param){
	    delete param['isEdit'];
	    return false;
 	}
 	
	 $scope.updateObject=function(param){
		   if(validUpdate(param)){
			   return ;
		   }
			requestHashMap={};
	     	requestHashMap.actionMap={
	     			requestID:"EOCountFreq_updateObject",
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
		   for(var d in $scope.global.countFreqList){
			   if($scope.global.countFreqList[d].uniqueID==Obj.uniqueID){
				   $scope.global.countFreqList[d]=Obj;
			   }
		   }
	   }
})