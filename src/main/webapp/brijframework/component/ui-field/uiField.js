webApp.directive('uiField',function(ajaxServices,metaDataServices,dateUtil){
	 return{
	        restrict:"EA",
	        scope:{
	        	id :'@',
	        	message : "=",
	        	isEdit :'=',
	        	metaData : '=',
	        	dataMap : '=',
	        	modelData : '='
	        },
	        require: 'ngModel',
	        replace:true,
	        templateUrl:"brijframework/component/ui-field/uiField.html",
	        link:function(scope,element,attr,ngModel){
	        	scope.isLoadingDone=false;
	        	if(scope.dataMap==undefined||scope.dataMap==null){
	        		scope.dataMap={};
	        	}
	        	console.log(scope.dataMap);
	        	scope.change=function(key,val){
	        		console.log("chanfe ",key,val)
	        		scope.dataMap[key]=val;
	        	}
	        	
	        	scope.modelValue = function () {
	                return ngModel.$viewValue;
	            };
	            
	        	scope.$watch('ngModel', function (value) {
	                scope.modelData=scope.modelValue();
	            });
	        	
	        
	            scope.$watch('dataMap.' + scope.name, function (value) {
	              scope.modelData = value;
	            });
	            
	         
	        	scope.fillUIMetaData=function(metaData){
	        		if(metaData==undefined){
	        			return ;
	        		}
	        		scope.metaData=new UIField(metaData);
	        		scope.isLoadingDone=true;
	        	}
	        	
	        	scope.loadMetaData= function(){
	        		var metaData=metaDataServices.loadMetaDataForId(scope.id)
	        		scope.fillUIMetaData(metaData)
	        	};
	        	
	        	
	        	function startup(){
	        		console.log("id :",scope.id)
	        		if(scope.metaData!=null||scope.metaData!=undefined){
	        			scope.fillUIMetaData(scope.metaData)
	        			console.log("field meta data from ui client")
	        		}else{
		        		var field=metaDataServices.fieldHashForID(scope.id);
			        	if(field!=null||field!=undefined){
			        		scope.fillUIMetaData(field)
		        			if(scope.dataId!=null){
		        				scope.loadData();
		        			}
		        			console.log("field meta data from client")
			        	}else{
			        		scope.loadMetaData();
			        		console.log("field meta data from server")
			        	}
	        		}
	        	}
	        	startup()
	        	
	        	
	        	// date 
	        	
	       
        	 scope.changeDate=function(key,date){
	        		var m = date.getMonth() + 1;
	        	    var d = date.getDate();
	        		scope.dataMap[key]=( d + "/"+m + "/"+ date.getFullYear());
	         }
	        	
	          scope.today = function() {
			    scope.modelData = new Date();
			  };
			  scope.today();
			
			  scope.clear = function() {
			    scope.modelData = null;
			  };
			
			  scope.inlineOptions = {
			    customClass: getDayClass,
			    minDate: new Date(),
			    showWeeks: true
			  };
			
			  scope.dateOptions = {
			    dateDisabled: disabled,
			    formatYear: 'yy',
			    maxDate: new Date(2020, 5, 22),
			    minDate: new Date(),
			    startingDay: 1
			    
			  };
			
			  // Disable weekend selection
			  function disabled(data) {
			    var date = data.date,
			      mode = data.mode;
			    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
			  }
			
			  scope.toggleMin = function() {
			    scope.inlineOptions.minDate = scope.inlineOptions.minDate ? null : new Date();
			    scope.dateOptions.minDate = scope.inlineOptions.minDate;
			  };
			
			  scope.toggleMin();
			
			  scope.open1 = function() {
			    scope.popup1.opened = true;
			  };
			
			  scope.open2 = function() {
			    scope.popup2.opened = true;
			  };
			
			  scope.setDate = function(year, month, day) {
			    scope.modelData = new Date(year, month, day);
			  };
			
			  scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
			  scope.format = ['shortDate'];
			  scope.altInputFormats = ['shortDate'];
			
			  scope.popup1 = {
			    opened: false
			  };
			
			  scope.popup2 = {
			    opened: false
			  };
			
			  var tomorrow = new Date();
			  tomorrow.setDate(tomorrow.getDate() + 1);
			  var afterTomorrow = new Date();
			  afterTomorrow.setDate(tomorrow.getDate() + 1);
			  scope.events = [
			    {
			      date: tomorrow,
			      status: 'full'
			    },
			    {
			      date: afterTomorrow,
			      status: 'partially'
			    }
			  ];
			
			  function getDayClass(data) {
			    var date = data.date,
			      mode = data.mode;
			    if (mode === 'day') {
			      var dayToCheck = new Date(date).setHours(0,0,0,0);
			
			      for (var i = 0; i < scope.events.length; i++) {
			        var currentDay = new Date(scope.events[i].date).setHours(0,0,0,0);
			
			        if (dayToCheck === currentDay) {
			          return scope.events[i].status;
			        }
			      }
			    }
			
			    return '';
			  }
	        }
	    }
});