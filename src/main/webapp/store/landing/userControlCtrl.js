storeApp.controller('userControlCtrl', function($rootScope, $scope, $location,
		WebObject, ajaxServices, $state, metaDataServices, notificationMessage, $stateParams) {
	$scope.objectHash = {};
	$scope.user = {};
	$scope.user.username = "";
	$scope.user.password = "";
	$scope.user.rememberme = false;

	$scope.metaUserControl = {};
	$scope.uiMetaData = {};
	$scope.modalMap = {};
	$scope.modalMap.objectMap = {};

	$scope.metaDataForID = function(id) {
		for (s in $scope.metaUserControl.sectionArray) {
			if ($scope.metaUserControl.sectionArray[s].id == id) {
				$scope.uiMetaData = $scope.metaUserControl.sectionArray[s];
				return $scope.metaUserControl.sectionArray[s];
			}
		}
		return null;
	}

	$scope.loadMeta = function() {
		var requestHashMap = {
			"actionMap" : {
				"requestID" : "UserController",
				"isMetaData" : true
			}
		}
		var url = "web/permission/service";
		ajaxServices.postDataThen(url, requestHashMap).then(function(meta) {
			if (meta != undefined) {
				if (meta.result != undefined) {
					$scope.metaUserControl = meta.result;
					console.log($scope.metaUserControl);
					$scope.uiMetaData = $scope.metaUserControl.sectionArray[0];
					$scope.isLoading = true;
				}
			}
		});
	}

	$scope.loadMeta();

	$scope.doSignup = function(objectMap) {
		if (!validation(objectMap)) {
			return;
		}
		var requestHashMap = {
			"actionMap" : {
				"requestID" : "UserController_signup"
			},
			"parameterMap" : objectMap
		}
		var url = "web/permission/service";
		ajaxServices.postDataThen(url, requestHashMap).then(function(data) {
			if (data.isSuccess) {
				if (data.result != undefined) {
					console.log(data.result.seletedObject)
					WebObject.setSelected(data.result.seletedObject)
					$location.path("appMarket");
				}
			}
		});
	}
	
	$scope.doLogin = function(objectMap) {
		if (!validation(objectMap)) {
			return;
		}
		var requestHashMap = {
			"actionMap" : {
				"requestID" : "UserController_login"
			},
			"parameterMap" : objectMap
		}
		var url = "web/permission/service";
		ajaxServices.postDataThen(url, requestHashMap).then(function(data) {
			if (data.isSuccess) {
				if (data.result != undefined) {
					console.log(data.result.seletedObject)
					WebObject.setSelected(data.result.seletedObject)
					$location.path("userLanging");
				}
			}
	  });
	}
	
	$scope.isUserExist=function(objectMap){
	}

	function validation(user) {
		if(user==null){
			return false;
		}
		if (user['username'] == null || user['username'] == undefined
				|| user['username'] == "") {
			notificationMessage.warningMessage("User :","Username should not be blank");
			return false;
		}
		if (user['password'] == null || user['password'] == undefined|| user['password'] == "") {
			notificationMessage.warningMessage("User :","Password should not be blank");
			return false;
		}
		return true;
	}

});