 webApp.factory('validationUtil', function ($rootScope, $compile) {
    var fullNameRegExp = function () {
        return /^(?:[A-Za-z]+(?:\s+|$)){2,}$/;
    }

    var nameRegExp = function () {
        return /^[A-Za-z\s]*$/;
    }
    
    var emailRegExp = function () {
        return new RegExp(/^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$)/);
    }
    
    var numberRegExp=function(){
    	return new RegExp(/^([0-9]+)/);
    }
    return {
    	fullNameRegExp			:	fullNameRegExp,
    	nameRegExp				:	nameRegExp,
    	emailRegExp				:   emailRegExp,
    	numberRegExp			:	numberRegExp
    }
});