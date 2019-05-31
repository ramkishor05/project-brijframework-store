webApp.directive('uiPagination',function(){
	return {
		restrict:"EA",
		scope:{
			currentPage:"=",
			pageSize :"=",
		    rowArray:"=",
			customClass:"@"
		},
		templateUrl:'brijframework/component/ui-pagination/uiPagination.html',
		link:function(scope,elm,attrs){
			
			scope.currentPage = scope.currentPage | 0;
			scope.pageSize = parseInt(scope.pageSize);
			showFooter = scope.$eval(attrs.showActionFooter);
			scope.showTableFooter = showFooter !== undefined ? showFooter : true;
			
			scope.numberOfPages = function () {
				return Math.ceil(scope.rowArray.length / scope.pageSize);
			};
			
			scope.firstPage = function(){
				scope.currentPage = 0;
			}
			
			scope.isLastPage = function(){
				return scope.currentPage >= Math.ceil(scope.rowArray.length / scope.pageSize - 1);
			}
			
		    scope.lastPage = function () {
		    	scope.currentPage = Math.ceil(scope.rowArray.length / scope.pageSize - 1);
		    };
		    
		    scope.nextPage = function(){
		    	scope.currentPage += 1;
		    }
		    
		    scope.prevPage = function(){
		    	scope.currentPage -= 1;
		    }


			scope.$on('rowArray',function (event,args){
				if(args.currentPage <1){
					scope.firstPage();
				}
			});
		 
		    scope.$watch('pageSize',function(newVal, oldVal){
		    	if(newVal !== oldVal){ 
		    		scope.pageSize = newVal > scope.rowArray.length ? oldVal : newVal;
		    		scope.firstPage();
		    	}
		    });
		    
		    scope.$watchCollection('rowArray',function (newVal,oldVal) {
		    	if(newVal != oldVal){
		            if (scope.rowArray.length <= scope.pageSize && scope.currentPage != 0) {
		            	scope.prevPage();
		            }
		        }
		    });
	      
		}
		
	}
});