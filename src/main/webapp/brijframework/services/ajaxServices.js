webApp.service('ajaxServices', function($http,$q){
	
	function postData(url, requestMap, callback){
		var defer=$q.defer();
		$http.post(url, requestMap).success(function(response){
			if(angular.isFunction(callback)){
				callback(response);
			}else{
				defer.resolve(response.data);
			}
		}).error(function(response){
			throw(new Error("error in processing ajax on URL :  " + url +
					"\n Request Map : " + requestMap + "\n Response : " + response));
			notif({
				msg :"ERROR IN GETTING DATA",
				type:"error"
			});
		});
		return defer.promise;
	}
	
	function postDataThen(url,requestMap){
        var defer=$q.defer();
        $http.post(url,requestMap)
        .then(function(response){
            if(response && response.data){
                defer.resolve(response.data);
            }
        });
        return defer.promise;
    };        
	
    
    
	return {
		postData:postData,
		postDataThen:postDataThen
	};
});