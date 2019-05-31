webApp.controller('viewPanelCtrl', function ($scope, WebObject,$state,$location,metaDataServices,messageServices,$stateParams){
	$scope.isLoadingDone=false;
	$scope.menu= {};
	
	$scope.style=function(menuItem){

	}
	
	$scope.changeView=function (menuItem){
		 if(menuItem!=undefined || menuItem!=null){
			// WebObject.putSelected('menuID',menuItem.id);
			 //WebObject.setMenu(menuItem);
		 }
		/*if(menuItem.menuItemArray!=undefined && menuItem.menuItemArray.length > 0){
			$location.path(menuItem.url+"/"+window.btoa(JSON.stringify(menuItem)));
		}else{
			console.log(menuItem.url)
			$location.path(menuItem.url);
		}*/
	}
	
	function isEncoded(string) {
		try {
			window.atob(string);
		}
		catch (e) {
		     return false;
		}
		return true;
	}
	
	$scope.loading=function(){
		$scope.menu= WebObject.getMenu();
		console.log("get cache=",WebObject.cache())
		console.log("get menu=",WebObject.getMenu())
		/*if(!isEncoded($stateParams.menuItem )){
			return ;
		}
		if($stateParams.menuItem != null||$stateParams.menuItem != undefined){
			var json=window.atob($stateParams.menuItem);
			if(json!=null && ((json.startsWith('{')||json.startsWith('['))&& (json.endsWith('}')||json.endsWith(']')))){
				$scope.menu=$.parseJSON(json);
			}
			
		}*/
	}
});
