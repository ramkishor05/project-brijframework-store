webApp.factory('dataServices', function($http,$q,ajaxServices,messageServices,notificationMessage,objectUtil,$window){
	 var url="web/request/service";
	 
	function deletedConfirmPost(requestID,parameterMap){
	  /*  var defer=$q.defer();
	    var state=SweetAlert.swal({
		   title: "Are you sure?",
		   text: "Your will not be able to recover this data!",
		   type: "warning",
		   showCancelButton: true,
		   confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
		   cancelButtonText: "No, cancel please!",
		   closeOnConfirm: false,
		   closeOnCancel: false}, 
		   function(isConfirm){ 
				   if (isConfirm) {
				      respose={isConfirmed:true}
				      requestHashMap={};
		         	  requestHashMap.actionMap={}
		         	  requestHashMap.actionMap.requestID=requestID
		         	  requestHashMap.parameterMap=parameterMap;
			        	  ajaxServices.postDataThen(url,requestHashMap).then(function(data){
			        			if(data!=undefined){
			        				if(data.result.successResult!=undefined){
			        					var obj=data.result.successResult;
			        					respose.data=obj;
			        				}
			        				if(data.result.errorResult!=undefined){
			        					var obj=data.result.errorResult;
			        					respose.data=obj;
			        				}
			        				messageServices.serverMessage("Deleted",data.messageBox)
			        			    defer.resolve(respose);
			        		}
			        	 });
				   } else {
				      respose={isConfirmed:false,data:""}
					  defer.resolve(respose);
				      SweetAlert.swal("Cancelled", "Your data is safe ", "error");
				   }
				 });
		       return defer.promise;*/
          }
	
	function updatedConfirmPost(requestID,parameterMap){
	  /*  var defer=$q.defer();
	    var state=SweetAlert.swal({
		   title: "Are you sure?",
		   text: "Your will not be able to recover this data!",
		   type: "warning",
		   showCancelButton: true,
		   confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, update it!",
		   cancelButtonText: "No, cancel please!",
		   closeOnConfirm: false,
		   closeOnCancel: false}, 
		   function(isConfirm){ 
			   if (isConfirm) {
			      respose={isConfirmed:true}
			      requestHashMap={};
	         	  requestHashMap.actionMap={}
	         	  requestHashMap.actionMap.requestID=requestID
	         	  requestHashMap.parameterMap=parameterMap;
	        	  ajaxServices.postDataThen(url,requestHashMap).then(function(data){
	        			if(data!=undefined){
		        			if(data.result!=undefined){
		        				if(data.result.successResult!=undefined){
		        					var obj=data.result.successResult;
		        					respose.data=obj;
		        				}
		        				if(data.result.errorResult!=undefined){
		        					var obj=data.result.errorResult;
		        					respose.data=obj;
		        				}
		        				messageServices.serverMessage("Updated",data.messageBox)
		        			    defer.resolve(respose);
	        			}
	        		}
	        	 });
		          
			   } else {
				  respose={isConfirmed:false,data:""}
				  defer.resolve(respose);
			      SweetAlert.swal("Cancelled", "Your data is safe ", "error");
			   }
			 });
	       return defer.promise;*/
          }
		function updatedPost(requestID,parameterMap){
			/*	 var defer=$q.defer();
			      respose={isConfirmed:true}
			      requestHashMap={};
	         	  requestHashMap.actionMap={}
	         	  requestHashMap.actionMap.requestID=requestID
	         	  requestHashMap.parameterMap=parameterMap;
	        	  ajaxServices.postDataThen(url,requestHashMap).then(function(data){
	        			if(data!=undefined){
		        			if(data.result!=undefined){
		        				if(data.result.successResult!=undefined){
		        					var obj=data.result.successResult;
		        					respose.data=obj;
		        				}
		        				if(data.result.errorResult!=undefined){
		        					var obj=data.result.errorResult;
		        					respose.data=obj;
		        				}
		        				notificationMessage.serverMessage("Updated",data.messageBox)
		        			    defer.resolve(respose);
	        			}
	        		}
	        	 });
		       
	       return defer.promise;*/
       }
		function deletedPost(requestID,parameterMap){
			 /* var defer=$q.defer();
		      respose={isConfirmed:true}
		      requestHashMap={};
         	  requestHashMap.actionMap={}
         	  requestHashMap.actionMap.requestID=requestID
         	  requestHashMap.parameterMap=parameterMap;
	        	  ajaxServices.postDataThen(url,requestHashMap).then(function(data){
	        			if(data!=undefined){
	        				if(data.result.successResult!=undefined){
	        					var obj=data.result.successResult;
	        					respose.data=obj;
	        				}
	        				if(data.result.errorResult!=undefined){
	        					var obj=data.result.errorResult;
	        					respose.data=obj;
	        				}
	        				notificationMessage.serverMessage("Deleted",data.messageBox)
	        			    defer.resolve(respose);
	        		}
	        });
		  
         return defer.promise;*/
	   }
		function addedPost(requestID,parameterMap){
		/*	  var defer=$q.defer();
		      respose={isConfirmed:true}
		      requestHashMap={};
	       	  requestHashMap.actionMap={}
	       	  requestHashMap.actionMap.requestID=requestID
	       	  requestHashMap.parameterMap=parameterMap;
	        	  ajaxServices.postDataThen(url,requestHashMap).then(function(data){
	        			if(data!=undefined){
	        				if(data.result.successResult!=undefined){
	        					var obj=data.result.successResult;
	        					respose.data=obj;
	        				}
	        				if(data.result.errorResult!=undefined){
	        					var obj=data.result.errorResult;
	        					respose.data=obj;
	        				}
	        				notificationMessage.serverMessage("Added",data.messageBox)
	        			    defer.resolve(respose);
	        		}
	        });
		  
       return defer.promise;*/
	   }
	return {
		addedPost				:		addedPost,
		deletedPost				:		deletedPost,
		updatedPost				:		updatedPost,
		deletedConfirmPost		:		deletedConfirmPost,
		updatedConfirmPost		:		updatedConfirmPost
	}
});