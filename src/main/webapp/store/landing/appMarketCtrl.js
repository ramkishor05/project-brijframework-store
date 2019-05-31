storeApp.controller('appMarketCtrl', function($rootScope, $scope, $location,
		WebObject, ajaxServices, $state, metaDataServices, messageServices) {
	$scope.selectedObject=WebObject.getSelected();
	$scope.eoAppMainArray = {};
	$scope.eoAppMainMeta = {};
	$scope.isLoading = false;
	$scope.viewApp = {};
	$scope.appUser = WebObject.getUser();
	console.log("appUser", $scope.appUser)
	$scope.loadMeta = function() {
		var requestHashMap = {
			"actionMap" : {
				"requestID" : "EOAppMain",
				"isMetaData" : true
			}
		}
		var url = "web/permission/service";
		ajaxServices.postDataThen(url, requestHashMap).then(function(meta) {
			if (meta != undefined) {
				if (meta.result != undefined) {
					$scope.eoAppMainMeta = meta.result;
					console.log($scope.eoAppMainMeta)
				}
			}
		});
	}

	$scope.viewApp = function(app) {
		$scope.viewApp = app;
	}

	// $scope.loadMeta();

	$scope.loadEOAppMain = function() {
		var requestHashMap = {
			"actionMap" : {
				"requestID" : "EOAppMain_getAllObject"
			},headerMap:$scope.selectedObject
		}
		var url = "web/permission/service";
		ajaxServices.postDataThen(url, requestHashMap).then(function(data) {
			if (data != undefined) {
				if (data.result != undefined) {
					$scope.eoAppMainArray = data.result;
					$scope.isLoading = true;
				}
			}
		});
	}
	$scope.loadEOAppMain();

	$scope.trialApp = function(app) {
		console.log("eoAppID" , app);
		var trialApp = {
			"eoAppID" : app.uniqueID
		}
		var requestHashMap = {
			"actionMap" : {
				"requestID" : "EOCustomer_addCustApp",
				"objectID" : $scope.selectedObject['customerID']
			},
			parameterMap : trialApp,
			headerMap:$scope.selectedObject
		}
		var url = "web/permission/service";
		ajaxServices.postDataThen(url, requestHashMap).then(function(data) {
			if (data != undefined) {
				if (data.result != undefined) {
					$scope.result = data.result;
					WebObject.putSelected("appID" , $scope.result.eoAppMain.uniqueID);
					WebObject.putSelected("custAppID" , $scope.result.uniqueID);
					$scope.menuObjectApp();
				}
			}
		});
	}
	
});