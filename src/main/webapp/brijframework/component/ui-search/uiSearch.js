webApp.directive('uiSearch',['$timeout',function($timeout){
    return{
        restrict:"EA",
        scope:{
            searchId:'@',
            actionId : "@",
            doAjaxAfter : "@",
            onSelectCallback:"&",
            displayKey:"@",
            noDataMsg:"@",
            placeholder:"@"
        },
        templateUrl:"brijframework/component/ui-search/uiSearch.html",
        link:function(scope,element,attr){
        	scope.searchResults = ["ram","ajay","powan"];
        	scope.showAjaxSearchDrop = false;
        	
        	if(angular.isDefined(scope.doAjaxAfter) && scope.doAjaxAfter.trim() !== ""){
        		if(parseInt(scope.doAjaxAfter) != "NaN")
        			scope.doAjaxAfter = parseInt(scope.doAjaxAfter);
        		else
        			scope.doAjaxAfter = 200;
        	}
        	var ajaxTimer;
            scope.performSearch = function(){
            	if(angular.isDefined(ajaxTimer)){
            		$timeout.cancel(ajaxTimer);
            	}
            	if(scope.searchText==""){
            		scope.onSelectCallback({callback:scope.searchText});
            	}
            	ajaxTimer = $timeout(function(){
                	if(scope.searchText.length >= 3){
		            	var requestMap = { 
		            		queryParamHash : {
		            			actionID : scope.actionId
		            		},
		            		objectHash : {
		            			id : scope.searchId,
		            			value :scope.searchText
		            		}
		            	};
		               /* altaAjaxSvcs.postAuthAjax(requestMap,function(response){
		                	if(!response.responseMsg.isError){
		                		scope.searchResults = response.responseResult.result.data;
                                if(scope.searchResults.length<1){
                                    scope.onSelectCallback({callback:undefined});
                                }
		                		scope.showAjaxSearchDrop = true;
		                	}
		                });*/
                	} 
            	},scope.doAjaxAfter,false);
            };
            
            scope.getSelectedObj = function(selectedObj){
            	scope.showAjaxSearchDrop = false;
            	scope.searchText = angular.copy(selectedObj[scope.displayKey]);
            	scope.onSelectCallback({callback:selectedObj});
            };
            
           angular.element("body").on('click',function(){
           		scope.showAjaxSearchDrop = false;
           });
        }
    };
}]);