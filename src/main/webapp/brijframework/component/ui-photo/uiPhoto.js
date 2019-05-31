webApp.directive('uiPhoto',function(ajaxServices,metaDataServices,dateUtil){
	return{
        restrict:"EA",
        scope:{
        	id:'@',
        	name:'@',
        	type:'@',
        	label:'@',
        	url:'@',
        	description:'@',
        	placeholder:'@',
           	metaDataMap:'=?',
        	objectDataMap:'=?',
        	modelData:'=?',
        	dataArray:'=?'
        },
        replace:true,
        templateUrl:"brijframework/component/ui-component/ui-photo/uiPhoto.html",
        link:function(scope,element,attr){
            scope.id=attr.id;
        	scope.server=attr.server;
        	scope.isLoadingDone=false;
        	if(scope.objectDataMap==undefined||scope.objectDataMap==null){
        		scope.objectDataMap={};
        	}
        	
        	scope.change=function(key,val){
        		scope.objectDataMap[key]=JSON.parse(val);
        		var obj=scope.objectDataMap[key]['uniqueID'];
        		scope.objectDataMap[key]={};
        		scope.objectDataMap[key]['uniqueID']=obj;
        	}
        	scope.getVal=function(data,key){
        		return data[scope.displayKey];
        	}
        	scope.metaDataMap={};
        	
        	scope.fillUIMetaData=function(metaData){
        	 	scope.classID=attr.classid!=undefined?attr.classid:metaData.classID;
	        	scope.beanID=attr.beanid!=undefined?attr.beanid:metaData.beanID;
	        	scope.uniqueID=attr.uniqueid!=undefined?attr.uniqueid:metaData.uniqueID;
	        	scope.id=attr.id!=undefined?attr.id:metaData.id;
	        	scope.name=attr.name!=undefined?attr.name:metaData.name;
	        	scope.type=attr.type!=undefined?attr.type:metaData.type;
	        	scope.uitype=attr.uitype!=undefined?attr.uitype:metaData.uitype;
	        	scope.label=attr.label!=undefined?attr.label:metaData.label;
	        	scope.description=attr.description!=undefined?attr.description:metaData.description;
	        	scope.placeholder=attr.placeholder!=undefined?attr.placeholder:metaData.placeholder;
	        	scope.height=attr.height!=undefined?attr.height:metaData.height;
	        	scope.width=attr.width!=undefined?attr.width:metaData.width;
	        	scope.isImmedate=attr.isimmedate!=undefined?attr.isimmedate:metaData.isImmedate;
	        	scope.isRequired=attr.isrequired!=undefined?attr.isrequired:metaData.isRequired;
	        	scope.isReadonly=attr.isreadonly!=undefined?attr.isreadonly:metaData.isReadonly;
	        	scope.isDisabled=attr.isdisabled!=undefined?attr.isdisabled:metaData.isDisabled;
	        	scope.isAutocomplete=attr.isautocomplete!=undefined?attr.isautocomplete:metaData.isAutocomplete;
	        	scope.isMultiple=attr.ismultiple!=undefined?attr.ismultiple:metaData.isMultiple;
	        	scope.requestID=metaData.requestID;
        	}
        	
        	scope.loadMetaData= function(){
        		if(scope.metaDataMap.id!=null){
        			scope.fillUIMetaData(scope.metaDataMap)
        		}else{
	            	requestHash={}
	            	requestHash.actionMap={}
	            	requestHash.actionMap.isMetaData=true;
	            	requestHash.actionMap.requestID=scope.id;
	        		var url=scope.server;
	        		ajaxServices.postDataThen(url,requestHash).then(function(data){
	        			if(data!=undefined){
	        				if(data.result!=undefined){
	        					if(data.result.successResult!=undefined)
	        					  scope.metaDataMap=data.result.successResult
	        				      scope.fillUIMetaData(scope.metaDataMap)
	        				      scope.loadData();
	        				}
	        			}
	        		});
	        		
	        	}
        		scope.isLoadingDone=true;
        	};
        	scope.loadData= function(){
	        	requestHash={}
	        	requestHash.actionMap={}
	        	requestHash.actionMap.requestID=scope.requestID;
	    		var url=scope.server;
	    		ajaxServices.postDataThen(url,requestHash).then(function(data){
	    			if(data!=undefined){
	    				if(data.result!=undefined){
	    					if(data.result.successResult!=undefined)
	    					  scope.dataArray=data.result.successResult;
	    				}
	    			}
	    		});
        	};
        	function startup(){
        		var photo=metaDataServices.photoHashForID(scope.id);
	        	if(photo!=null||photo!=undefined){
	        		scope.fillUIMetaData(photo)
        			scope.loadData();
        			console.log("field meta data from client")
	        	}else{
	        		scope.loadMetaData();
	        		console.log("field meta data from server")
	        	}
        	}
        	startup()
      
        }
    }
});