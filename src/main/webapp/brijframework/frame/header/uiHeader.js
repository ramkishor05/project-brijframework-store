webApp.directive('uiHeader',function($rootScope,$location,notificationMessage){
	return {
		restrict:"EA",
		scope:{
            uiApplication:'=?',
			uiMessage:'=?',
			uiNotification:'=?',
			uiUser:'=?'
		},
		replace:true,
		templateUrl:'brijframework/frame/header/uiHeader.html',
		link:function(scope,elm,attrs){
			 scope.isLoading=$rootScope.isLoading;
			 scope.changeLocation=function(url){
				 $location.path(url);
			 }
			 console.log($rootScope.isLoading)
			 console.log(scope.uiApplication,scope.uiNotification, scope.uiMessage,scope.uiUser)
			 notificationMessage.successMessage('',scope.uiUser.message)
		}
	}
});