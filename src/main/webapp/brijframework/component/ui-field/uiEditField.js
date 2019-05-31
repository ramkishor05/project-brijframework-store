webApp.directive('uiEditField',function(ajaxServices,metaDataServices){
	 return{
	        restrict:"EA",
	        scope:{
	        	form:'@',
	        	formaction:'@',
	        	formenctype:'@',
	        	formmethod:'@',
	        	formtarget:'@',
	        	
	        	id:'@',
	        	name:'@',
	        	type:'@',
	        	label:'@',
	        	helpText:'@',
	        	description:'@',
	        	placeholder:'@',
	        	
	        	size:'@',
	        	maxlength:'@',
	        	minlength:'@',
	        	
	        	src:'@',
	        	alt:'@',
	        	pattern:'@',
	        	
	        	min:'@',
	        	max:'@',
	        	height:'@',
	        	width:'@',
	        	step:'@',
	        	
	        	isRequired:'@',
	        	isReadonly:'@',
	        	isDisabled:'@',
	        	isAutocomplete:'@',
	        	isAutofocus:'@',
	        	isFormnovalidate:'@',
	        	isMultiple:'@',
	        	isEdit:'@',
	        	isLoadingDone:'@',
	        	metaDataMap:'=?',
	        	objectDataMap:'=?',
	        	uniqueID:'=?'
	        },
	        require: 'ngModel',
	        replace:true,
	        templateUrl:"brijframework/component/ui-field/uiEditField.html",
	        link:function(scope,element,attr,ngModel){
	            scope.id=attr.id;
	            scope.metaDataMap={};
	        	scope.server=attr.server;
	        	
	        	if(attr.metaDataMap!=undefined)
	        	scope.metaDataMap=JSON.parse(attr.metaDataMap);
	        	
	        	scope.isLoadingDone=false;
	        	
	        	scope.isEdit=false;
	            
	        	scope.map={};
	        	scope.objectDataMap={};
	        	
	         	scope.modelValue = function () {
			      return ngModel.$viewValue;
			    };
	            
	        	scope.$watch('ngModel', function (value) {
	                scope.ngModel=scope.modelValue();
	             });
			 
	        	// set up two-way binding for field value
                scope.$watch('objectDataMap.' + scope.name, function (value) {
                   scope.ngModel = value;
                });
	            
	        	scope.change=function(key,data){
	        		scope.map[key]=data
	        		scope.objectDataMap[key]=data;
				    scope.objectDataMap['uniqueID']=scope.uniqueID;
	        		scope.map['uniqueID']=scope.uniqueID;
	        	}
	        	
	        	scope.isEditor=function(){
	        		if(scope.isEdit==undefined){
	        			scope.isEdit=false;
	        		}
	        		if(scope.isEdit==true){
	        			scope.isEdit=false
		        	    scope.setProperty(scope.map);	
	        		}else{
	        			scope.isEdit=true;
	        		}
	        	}
	        	
	        	scope.setProperty= function(map){
	        		requestHash={}
	            	requestHash.actionMap={}
	            	requestHash.actionMap.requestID=scope.id;
	            	requestHash.parameterMap=map
	        		var url=scope.server;
	        		ajaxServices.postDataThen(url,requestHash).then(function(data){
	        			if(data!=undefined){
	        				if(data.result!=undefined){
	        				   scope.uniqueID=data.result.uniqueID;
	        				}
	        			}
	        		});
	        	};
	        	
	        	scope.fillUIMetaData=function(metaData){
	        		scope.form=attr.form!=undefined?attr.form:metaData.form;
		        	scope.formaction=attr.formaction!=undefined?attr.formaction:metaData.formaction;
		        	scope.formenctype=attr.formenctype!=undefined?attr.formenctype:metaData.formenctype;
		        	scope.formmethod=attr.formmethod!=undefined?attr.formmethod:metaData.formmethod;
		        	scope.formtarget=attr.formtarget!=undefined?attr.formtarget:metaData.formtarget;
		        	scope.classID=attr.classid!=undefined?attr.classid:metaData.classID;
		        	scope.beanID=attr.beanid!=undefined?attr.beanid:metaData.beanID;
		        	scope.uniqueID=attr.uniqueid!=undefined?attr.uniqueid:metaData.uniqueID;
		        	
		        	scope.id=attr.id!=undefined?attr.id:metaData.id;
		        	scope.name=attr.name!=undefined?attr.name:metaData.name;
		        	scope.type=attr.type!=undefined?attr.type:metaData.type;
		        	scope.uitype=attr.uitype!=undefined?attr.uitype:metaData.uitype;
		        	scope.ngModel=attr.val!=undefined?attr.val:metaData.value;
		        	scope.label=attr.label!=undefined?attr.label:metaData.label;
		        	scope.helpText=attr.helpText!=undefined?attr.helpText:metaData.helpText;
		        	scope.description=attr.description!=undefined?attr.description:metaData.description;
		        	scope.placeholder=attr.placeholder!=undefined?attr.placeholder:metaData.placeholder;
		        	
		        	scope.size=attr.size!=undefined?attr.size:metaData.size;
		        	scope.maxlength=attr.maxlength!=undefined?attr.maxlength:metaData.maxlength;
		        	scope.minlength=attr.minlength!=undefined?attr.minlength:metaData.minlength;
		        	
		        	scope.src=attr.src!=undefined?attr.src:metaData.src;
		        	scope.alt=attr.alt!=undefined?attr.alt:metaData.alt;
		        	scope.pattern=attr.pattern!=undefined?attr.pattern:metaData.pattern;
		        	
		        	scope.min=attr.min!=undefined?attr.min:metaData.min;
		        	scope.max=attr.max!=undefined?attr.max:metaData.max;
		        	scope.height=attr.height!=undefined?attr.height:metaData.height;
		        	scope.width=attr.width!=undefined?attr.width:metaData.width;
		        	scope.step=attr.step!=undefined?attr.step:metaData.step;
		        	
		        	scope.isImmedate=attr.isimmedate!=undefined?attr.isimmedate:metaData.isImmedate;
		        	scope.isRequired=attr.isrequired!=undefined?attr.isrequired:metaData.isRequired;
		        	scope.isReadonly=attr.isreadonly!=undefined?attr.isreadonly:metaData.isReadonly;
		        	scope.isDisabled=attr.isdisabled!=undefined?attr.isdisabled:metaData.isDisabled;
		        	scope.isAutocomplete=attr.isautocomplete!=undefined?attr.isautocomplete:metaData.isAutocomplete;
		        	scope.isAutofocus=attr.isautofocus!=undefined?attr.isautofocus:metaData.isAutofocus;
		        	scope.isFormnovalidate=attr.isformnovalidate!=undefined?attr.isformnovalidate:metaData.isFormnovalidate;
		        	scope.isMultiple=attr.ismultiple!=undefined?attr.ismultiple:metaData.isMultiple;
		        	
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
		        					  scope.metaDataMap=data.result;
		        				      scope.fillUIMetaData(scope.metaDataMap)
		        				}
		        			}
		        		});
		        	  }
	        		scope.isLoadingDone=true;
	        	};
	        	function startup(){
	        		var field=metaDataServices.fieldHashForID(scope.id);
		        	if(field!=null||field!=undefined){
		        		scope.fillUIMetaData(field)
	        			console.log("field meta data from client")
		        	}else{
		        		scope.loadMetaData();
		        		console.log("field meta data from server")
		        	}
	        	}
	        	startup();
	        }
	    }
});