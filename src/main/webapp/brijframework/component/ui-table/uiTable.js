webApp.directive('uiTable',function(ajaxServices,objectUtil,metaDataServices,dataServices,messageServices,uiDataModalSvcs,modalServices,$window){
	 return{
	        restrict:"E",
	        scope:{
	        	id:'@',
	        	name:'@',
	        	headerLabel:'@',
	        	metaData:'=',
	        	dataArray:'=',
	        	message:'@',
	        	filterData:'=',
	        	currentPage:'@',
	            pageSize:'@',
	            rowObject:'=',
	            mdlAction:"&",
	            rowAction:"&",
	            uiPagination:'=',
	            isLoadingDone:'@'
	        },
	        templateUrl:"brijframework/component/ui-table/uiTable.html",
	        link:function(scope,element,attr){
	        	scope.server=attr.server;
	        	scope.isAdd=false;
	        	scope.isLoadingDone=false;
	        	scope.pageSizeArray=[5,10,20,50,100]
	        	scope.currentPage=0;
	        	scope.pageSize=10;
	        	scope.totalSize=0;
	        	scope.sortingColumn="uniqueID";
	        	scope.fieldMetaData=[];
	        	if(scope.dataArray==undefined || scope.dataArray==null){
	        		scope.dataArray=[];
	        	}
	        	scope.rowObject={addObject:{},updateObject:{},deleteObject:{}}
	        	scope.getValueForKey=function(key,obj){
	        		for(var keyName in obj){        
		        	     if(key==keyName){
		        	     var value= obj[keyName];
		        	     return value;
		        	     }
		        	}
	        		return "";
	        	}
	        	// set up two-way binding for field value
	            scope.$watch('rowObject', function (value) {
	            	scope.rowObject = value;
	            });
	            
	        	scope.getUniqueValueForKey=function(obj){
	        		var key= scope.uniqueKey;
	        		return scope.getValueForKey(obj)
	        	}
	        
	        	scope.setValueForKey=function(obj,key,val){
	        		obj[key]=val;
	        	}
	        
		       
	        	scope.isAddCall= function(){
	        		if(scope.isAdd==undefined){
	        			scope.isAdd=false;
	        		}
	        		if(scope.isAdd==false){
	        			scope.isAdd=true;
	        		}else
	        		if(scope.isAdd==true){
	        			scope.isAdd=false;
	        		}
	        	}
	        	
	        	scope.pageSizes = function(no) {
	        		scope.pageSize=no
				};
				
				scope.previousPages = function() {
	        		scope.currentPage=scope.currentPage-1;
				};
				
				scope.firstPages = function(no) {
	        		scope.currentPage=0;
				};
				
	        	scope.currentPages = function(no) {
	        		scope.currentPage=no
				};
				
				scope.lastPages = function() {
					scope.currentPage=scope.totalSize;
				};
				
				scope.nextPages= function() {
					scope.currentPage=scope.currentPage+1;
				};
				
			
				
				scope.fillUIMetaData=function(metaData){
					scope.metaData=new UITable(metaData);
					
        			for(var a in scope.metaData.addFieldArray){
        				metaDataServices.loadFieldMetaData(scope.metaData.addFieldArray[a])
        			}
        			
        			for(var a in scope.metaData.relFieldArray){
        				metaDataServices.loadFieldMetaData(scope.metaData.relFieldArray[a])
        			}
        			for(var a in scope.metaData.mdlFieldArray){
        				metaDataServices.loadFieldMetaData(scope.metaData.mdlFieldArray[a])
        			}
        			metaDataServices.loadTableMetaData(scope.metaData);
        			console.log('dataArray=',scope.dataArray);
		        	
	        	}
				
				 scope.loadMetaData= function(){
		            	requestHashMap={};
			        	requestHashMap.actionMap={}
			        	requestHashMap.actionMap.requestID=scope.id;
			        	requestHashMap.actionMap.isMetadata=true;
		        		var url=scope.server;
		        		ajaxServices.postDataThen(url,requestHashMap).then(function(data){
		        			console.log("datameta=",data)
		        			if(data.isSuccess){
			        				console.log(data.result)
			        				scope.fillUIMetaData(data.result)
		        			}else{
		        				  scope.message=data.errorMsg;
		        			 }
		        		});
		        		
		        	};
		        	scope.getFieldID=function(val){
		        		return scope.beanID+"_"+val;
		        	}
		        	
		        	scope.getMetaDataByID=function(key,val){
		        		for(i in scope.fieldMetaData){
		        			if(scope.fieldMetaData[i][key]==val){
		        				return scope.fieldMetaData[i];
		        			}
		        		}
		        		return {};
		        	}
		        	scope.totalSize=Math.round(scope.dataArray.length/scope.pageSize);
		        	scope.loadAllData=function(){
			 	          requestHashMap={};
			         	  requestHashMap.actionMap={}
			         	  requestHashMap.actionMap.requestID=scope.beanID+'_getAllObject';
		 	        	  var url=scope.server;
		 	        	  ajaxServices.postDataThen(url,requestHashMap).then(function(data){
		 	        			if(data!=undefined){
		 		        			if(data.result!=undefined){
		 		        				if(data.result.successResult!=undefined){
		 		        				 scope.dataArray=data.result.successResult;
		 				        		 scope.totalSize=Math.round(scope.dataArray.length/scope.pageSize);
		 				        		 scope.sorting(scope.sortingColumn);
		 		        				}
		 		        			}
		 		        		
		 	        			}
		 	        		});
		 		      }
		        
		        	scope.updateAction=function(row){
		        		var metaData=row
		        	}
		        	
		          
		        	
			        // FOR SORTING
		        	scope.isDesc=false;
		        	
		        	scope.getSortClass = function (col) {
		               if (scope.sortingColumn == col){
		                    return scope.isDesc ? "fa fa-sort-amount-desc" : "fa fa-sort-amount-asc";
		               }
		               return "";
		            };
		            
		        	scope.sorting= function(key){
		        		console.log("key ",key)
		        		scope.sortingColumn=key;
		        		objectUtil.sortObject(scope.dataArray,key,scope.isDesc);
		        		scope.isDesc=!scope.isDesc
		        		scope.sortingColumn=key;
		        	}
		        	
		        	scope.startup=function(){
		        		if(scope.metaData!=null && scope.metaData!=undefined){
		        			scope.fillUIMetaData(scope.metaData)
		        			scope.isLoadingDone=true;
		        		}else{
		        			var table=metaDataServices.tableHashForID(scope.id);
				        	if(table!=null||table!=undefined){
			        			console.log("load table from client")
			        			scope.fieldlabelArray=table.fieldlabelArray;
			        			scope.fillUIMetaData(table)
				        	}else{
				        		scope.loadMetaData();
				        		console.log("load table from server")
				        	}
				        	scope.isLoadingDone=true;
		        		}
			        }
			        scope.startup();	
	        }
	    }
});

webApp.filter('pagination', function()
{
 return function(input, start)
   {
     start = +start;
    return/* input.slice(start)*/ 0;
   };
});
