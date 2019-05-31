var storeApp = angular.module('storeApp', [ 'webApp', 'invApp', 'ngAnimate','ui.bootstrap' ]);
// 'ngSanitize',
storeApp.config([
		'$stateProvider',
		'$urlRouterProvider',
		'$httpProvider',
		'$sceDelegateProvider',
		'$compileProvider',
		function($stateProvider, $urlRouterProvider, $httpProvider,
				$sceDelegateProvider, $compileProvider) {
			$sceDelegateProvider.resourceUrlWhitelist([ '**' ]);
			$httpProvider.useApplyAsync(true);
			$compileProvider.debugInfoEnabled(true);
			/* for login & signup */

			$stateProvider.state("store", {
				url : "/store/",
				templateUrl : "store/index.html"
			});

			$stateProvider.state("user", {
				url : "/user",
				templateUrl : "store/landing/userControl.html",
				controller : 'userControlCtrl'
			});
			$stateProvider.state('user.app', {
				url : '/app/:cache',
				templateUrl : 'store/app/app.html',
				controller : 'appCtrl'
			});

			$stateProvider.state('userLanging', {
				url : '/userLanging',
				templateUrl : 'store/landing/userLanding.html',
				controller : 'userLandingCtrl'
			});

			$stateProvider.state('appMarket', {
				url : '/appMarket',
				templateUrl : 'store/landing/appMarket.html',
				controller : 'appMarketCtrl'
			});

			$stateProvider.state('application', {
				url : '/application/:cache',
				templateUrl : 'store/landing/application.html',
				controller : 'applicationCtrl'
			});

			$urlRouterProvider.otherwise('user');
		} ]);

storeApp.run(function($rootScope, $urlRouter, $cookies, $state,
		metaDataServices, $location, WebObject, $location) {
	metaDataServices.loadMetaData()
	altaPageStatus = false;
	function getUrl(url) {
		var userAppLang = $cookies.get("SESSION");
		userAppLang = (userAppLang == undefined) ? null : userAppLang;

		if (url.charAt(0) == "/") {
			url = url.substr(1);
		}
		var urlArr = url.split("/");
		var renamedUrl = "";
		for (var i = 0; i < urlArr.length; i++) {
			if (i == 0) {
				renamedUrl += "/" + urlArr[i] /* + userAppLang.langCode */;
			} else if (i == 1) {
				if (WebObject.checkEncryption()) {
					renamedUrl += "/" + urlArr[i] + "/"
							+ btoa(JSON.stringify(WebObject.cache()));
				} else {
					renamedUrl += "/" + urlArr[i] + "/"
							+ JSON.stringify(WebObject.cache());
				}
			} else {
				renamedUrl += "/" + urlArr[i];
			}
		}
		if (renamedUrl == "/application") {
			renamedUrl += "/" + btoa(JSON.stringify(WebObject.cache()));
		}
		return renamedUrl;
	}
	$rootScope.isGlobalDataLoaded = true;
	$rootScope.logout = function() {

	};
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams,
			fromState, fromParams) {
		pageStatus = true;
		var urlHash = {};
		/*
		 * console.log("toState=",toState) console.log("toParams",toParams)
		 * console.log("fromState=",fromState)
		 * console.log("fromParams=",fromParams)
		 */
		if (toParams.cache !== undefined && toParams.cache !== null) {
			// event.preventDefault();
			var state = "";
			if (WebObject.isEncoded(toParams.cache)) {
				if (WebObject.checkEncryption()) {
					urlHash = $.parseJSON(atob(toParams.cache));
				} else {
					urlHash = $.parseJSON(toParams.cache);
				}
				var menu = metaDataServices.menuHashForID(toState.name);
				WebObject.loadcache(urlHash);
			} else {
				state = "/" + toState.url;
			}
		}
	});

	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams,
			fromState, fromParams) {
		if (altaPageStatus) {
			altaPageStatus = false;
		}

	});

	$rootScope.$on('$stateChangeError', function(event, toState, toParams,
			fromState, fromParams, error) {
		if (altaPageStatus) {
			altaPageStatus = false;
		}
	});

	$rootScope.menuLoaded = false;
	$rootScope.stopInterval = function() {
		if (timeInterval !== undefined && timeInterval !== null) {
			$interval.cancel(timeInterval);
			timeInterval = undefined;
		}
		;
		$rootScope.startInterval = function() {
			if (timeInterval == undefined || timeInterval === null) {
				timeInterval = $interval(function() {
					$rootScope.$broadcast('timeChange');
				}, 1000);
			}
		};
	};
})
storeApp.controller('storeAppCtrl', function($scope, $rootScope, $location,
		WebObject, ajaxServices, $window, $state, $cookies, metaDataServices,
		notificationMessage, modalServices) {
	$scope.isLoading = $rootScope.isLoading;
	$scope.uiApplication = {
		isAppload : true
	};
	$scope.uiUser = {
		isUserLogin : true,
		message : "Hi, Welcome to home",
		username : "Ram",
		role : "Developer",
		options : [ {
			classoption : "fa fa-user",
			url : "/userProfile",
			styleoption : "",
			label : "Profile"
		} ]

	};
	$scope.uiNotification = [];
	$scope.uiMessage = [];

	function getUrl(url) {
		var userAppLang = $cookies.get("SESSION");
		userAppLang = (userAppLang == undefined) ? null : userAppLang;

		if (url.charAt(0) == "/") {
			url = url.substr(1);
		}
		var urlArr = url.split("/");
		var renamedUrl = "";
		for (var i = 0; i < urlArr.length; i++) {
			if (i == 0) {
				renamedUrl += "/" + urlArr[i] /* + userAppLang.langCode */;
			} else if (i == 1) {
				if (WebObject.checkEncryption()) {
					renamedUrl += "/" + urlArr[i] + "/"
							+ btoa(JSON.stringify(WebObject.cache()));
				} else {
					renamedUrl += "/" + urlArr[i] + "/"
							+ JSON.stringify(WebObject.cache());
				}
			} else {
				renamedUrl += "/" + urlArr[i];
			}
		}
		return renamedUrl;
	}

	$rootScope.menuObjectApp = function() {
		$scope.selectedObject = WebObject.getSelected();
		var requestHashMap = {
			"actionMap" : {
				"requestID" : "EOCustRole_menuForUser",
				"objectID" : $scope.selectedObject['roleID']
			},
			parameterMap : {
				appID : $scope.selectedObject['appID']
			},
			headerMap : $scope.selectedObject
		}
		var url = "web/session/service";
		ajaxServices.postDataThen(url, requestHashMap).then(function(data) {
			if (data != undefined) {
				if (data.result != undefined) {
					$rootScope.menuObject = data.result;
					if ($rootScope.menuObject != null) {
						$rootScope.menuLoaded = true;
						$rootScope.menuObject.breadcrumbs = {};
						WebObject.setMenu($rootScope.menuObject);
					}
					$scope.rediectLoction($rootScope.menuObject.url);
				}
			}
		});
	}

	$scope.rediectLoction = function(url) {
		$location.path(url + "/"
				+ window.btoa(JSON.stringify(WebObject.cache())));
	}

	$scope.changeLoction = function(menu) {
		// console.log("menu.url=",menu.url)
		$location.path(getUrl(menu.url));
	}
});