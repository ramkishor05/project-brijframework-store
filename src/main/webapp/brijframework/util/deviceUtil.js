webApp.factory('deviceUtil', function (dateUtil,timeUtil, $rootScope, $compile) {
	 var deviceIconHash = {
		        'WEB': 'fa fa-globe fa-lg',
		        'ANDROID': 'fa fa-mobile fa-lg',
		        'MOBILE': 'fa fa-mobile fa-lg',
		        'WINDOWSTAB': 'fa fa-tablet fa-lg',
		        'IOS': 'fa fa-mobile fa-lg',
		        'WINDOWS8': 'fa fa-windows fa-lg',
		        'UNKNOWN': 'fa fa-question-circle fa-lg',
		        'APACHECLIENT': 'fa fa-sitemap fa-lg',
		        'ANDROIDTAB': 'fa fa-tablet fa-lg',
		        'IPAD': 'fa fa-tablet fa-lg'
    };

    function deviceIcon(type) {
        if (type != undefined) {
            return deviceIconHash[type];
        }
        return null;
    }
    
    return {
    	 deviceIcon: deviceIcon
    }
});