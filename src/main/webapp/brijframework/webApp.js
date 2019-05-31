var webApp = angular.module('webApp',['ngResource','ui.router','ngMaterial','ui.bootstrap','ngMessages','ngCookies']) ;
webApp.run(function($rootScope) {
	
})
webApp.$inject=['jQuery']
webApp.$inject=['$']
webApp.controller('webAppController', function ($scope,$window, $state,metaDataServices,messageServices){
});



webApp.factory('webAppServices', function ( $location,$cookies,$rootScope,$compile,$state,$stateParams){
	console.log("app services")
});

