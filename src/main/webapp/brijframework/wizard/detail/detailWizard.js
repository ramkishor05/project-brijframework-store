webApp.directive('detailWizard',['$timeout','$http',function($timeout,$http){
	 return{
	        restrict:"EA",
	        scope:{
	        	metaData:"=",
	        	objectMap:'=',
	            doAction:'&',
	            messageBox:'='
	        },
	        templateUrl:"brijframework/wizard/detail/detailWizard.html",
	        link:function(scope,element,attr){
	        	scope.metaData={
	        	}
	        	scope.objectMap={
	     
	        	}
	        	defaultSet();
	           
                scope.doAction = function(){
                	scope.doAction({objectMap:scope.objectMap});
             	};
             	
                function defaultSet(){
                	
                }
	        }
	    }
}]);