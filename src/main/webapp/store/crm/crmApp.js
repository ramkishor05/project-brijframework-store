var crmApp = angular.module('crmApp', []);

crmApp.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider) {
		$stateProvider.state('crm', {
			url: '/crm/:cache',
			templateUrl: 'store/crm/index.html',
			controller: 'crmAppCtrl'
		});
	
		$stateProvider.state('crm.customer', {
			url: '/customer',
			templateUrl: 'store/crm/customer/customer.html',
			controller : 'customerCtrl'
		});
	
}]);