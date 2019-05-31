webApp.directive('uiBreadcrumb',function($location){
	return {
		restrict:"EA",
		scope:{
			breadcrumbArray:"=?"
		},
		replace:true,
		templateUrl:'brijframework/frame/breadcrumb/uiBreadcrumb.html',
		link:function(scope,elm,attrs){
			 scope.breadcrumbArray=[];
			 scope.changeLoction=function(menuItem,i){
				 $location.path(menuItem.url+"/"+btoa(JSON.stringify(menuItem)));
				 console.log('menu------breadcrumb--------',menuItem.url)
			 }
			
		}
	}
});