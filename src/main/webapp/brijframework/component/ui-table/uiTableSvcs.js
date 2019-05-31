webApp.service('uiTableSvcs', function($http,$q,$rootScope,ajaxServices,objectUtil){

	
	var updateObject=function(param){
		 requestID=scope.beanID+"_updateObject";
		 dataServices.updatedPost(requestID,param).then(function(response){
			 if(response.isConfirmed){
				  var obj=response.data;
				  objectUtil.updateObject(scope.rowDataArray,obj,"uniqueID");
			 }else{
				 scope.rowObject.updateObject={};
			 }
		 })
		  
	}
	var deleteObject=function(param){
		 requestID=scope.beanID+"_deleteObject";
		 dataServices.deletedPost(requestID,param).then(function(response){
			 if(response.isConfirmed){
				 var obj=response.data;
				 objectUtil.deleteObject(scope.rowDataArray,obj,"uniqueID");
			 }else{
				 scope.rowObject.deleteObject={};
			 }
		 })
	}
	
	return {
		
	}
	
});