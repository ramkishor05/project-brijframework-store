invApp.controller('invMainCtrl', function($scope,$rootScope, $location,WebObject, ajaxServices,$window, $state, metaDataServices,notificationMessage, modalServices) {
        $scope.uiApplication = {isAppload:true};
        $scope.uiUser = {
			isUserLogin:true,
			message:"Hi, Welcome to home",
			username:"Ram",
			role:"Developer",
			options:[
				{
				classoption:"fa fa-user",
				url:"/userProfile",
				styleoption:"",
				label:"Profile"
				}
			]
        				
        };
		$scope.uiNotification = [];
		$scope.uiMessage = [];
		$scope.isLoading=false;
		
		$scope.selectedObject=WebObject.getSelected();
		$scope.menuObject={};
		$scope.menuObject.breadcrumbs={};
		$scope.menuObjectApp = function() {
			if($rootScope.menuObject !=null){
				$scope.menuObject=$rootScope.menuObject;
			}
		}
		
		$scope.menuObjectApp();
		
		$scope.changeLoction=function (menu){
		  $location.path(menu.url);
		}
});