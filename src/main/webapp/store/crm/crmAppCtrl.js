crmApp.controller('crmAppCtrl', function($scope,$rootScope, $location,WebObject, ajaxServices,$window, $state, metaDataServices,notificationMessage, modalServices) {
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
		console.log("selectedObject=",$scope.selectedObject)
		$scope.menuObject={};
		$scope.menuObject.breadcrumbs={};
		$scope.menuObjectApp = function() {
			var requestHashMap = {
				"actionMap" : {
					"requestID" : "EOCustRole_menuForUser",
					"objectID" : $scope.selectedObject['roleID']
				},
				parameterMap : {
					appID:$scope.selectedObject['appID']
				},
				headerMap:$scope.selectedObject
			}
			var url = "web/session/service";
			ajaxServices.postDataThen(url, requestHashMap).then(function(data) {
				if (data != undefined) {
					if (data.result != undefined) {
						$scope.menuObject = data.result;
						WebObject.putSelected('menuID',$scope.menuObject.id);
						console.log(WebObject);
						console.log($scope.menuObject)
					}
				}
			});
		}
		
		$scope.menuObjectApp();
		
		$scope.changeLoction=function (menu){
			 console.log(menu.url);
			$location.path("/crm/customer");
		}
});