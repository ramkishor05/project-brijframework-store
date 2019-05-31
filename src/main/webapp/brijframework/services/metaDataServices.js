webApp.service('metaDataServices', function($http,$q,$rootScope,ajaxServices,objectUtil){
	var url="web/request/service"
	$rootScope.fieldHash=[];
	$rootScope.dataTableHash=[];
	$rootScope.dropDownHash=[];
	$rootScope.dataListHash=[];
	$rootScope.lookupHash=[];
	$rootScope.menuHash=[];
	$rootScope.isLoading=false;
	function fillMetaData(metaData) {
		$rootScope.fieldHash = objectUtil.mergeHash($rootScope.fieldHash, metaData.fieldHash);
		$rootScope.dataTableHash = objectUtil.mergeHash($rootScope.dataTableHash, metaData.dataTableHash);
		$rootScope.dropDownHash = objectUtil.mergeHash($rootScope.dropDownHash, metaData.dropDownHash);
		$rootScope.dataListHash = objectUtil.mergeHash($rootScope.dataListHash, metaData.dataListHash);
		$rootScope.lookupHash = objectUtil.mergeHash($rootScope.lookupHash, metaData.lookupHash);
		$rootScope.menuHash = objectUtil.mergeHash($rootScope.menuHash, metaData.menuHash);
    }
	
	var loadMetaData = function(){
		var defer=$q.defer();
		/*request={};
		request.actionMap={};
		request.actionMap.requestID="ComponentContainer_metaCache";
		request.actionMap.isMetaData=true;
		ajaxServices.postDataThen(url,request).then(function(data){
			if(data!=undefined){
    			if(data!=undefined){
    				if(data.result!=undefined){
    					var metaData=data.result;
    					if(metaData!=undefined){
    						fillMetaData(metaData)
    					}
    				}
    			}
			}
			defer.resolve(data);
			$rootScope.isLoading=true;
		});*/
		$rootScope.isLoading=true;
		return defer.promise;
	}
	
	function isValid(metaData){
		return metaData!==undefined && metaData!==null;
	}
	
	
	function loadFieldMetaData(metaData) {
		if(!isValid(metaData)){
			console.log("InValid valud metaData loading",metaData)
			return null
		}	
		$rootScope.fieldHash[metaData.id]=metaData;
    }
	
	function loadTableMetaData(metaData) {
		if(!isValid(metaData)){
			console.log("InValid valud metaData loading",metaData)
			return null
		}	
		$rootScope.dataTableHash[metaData.id]=metaData;
    }
	
	function loadDropDownMetaData(metaData) {
		if(!isValid(metaData)){
			console.log("InValid valud metaData loading",metaData)
			return null
		}	
		$rootScope.dropDownHash[metaData.id]=metaData;
    }
	
	function loadDataListMetaData(metaData) {
		if(!isValid(metaData)){
			console.log("InValid valud metaData loading",metaData)
			return null
		}	
		$rootScope.dataListHash[metaData.id]=metaData;
    }

	/*
     *  method is used to get meta data for the particular meta data type and id from server
     */
	function fieldHashForID(ID) {
		if(!isValid(ID)){
			console.log("InValid metaData for field : ",ID)
			return null
		}	
		console.log($rootScope.fieldHash)
		return $rootScope.fieldHash[ID];
    }
	
	function tableHashForID(ID) {
		if(!isValid(ID)){
			console.log("InValid metaData for table : ",ID)
			return null
		}	
		return $rootScope.dataTableHash[ID];
    }
	
	function dropDownHashForID(ID) {
		if(!isValid(ID)){
			console.log("InValid metaData for dropDown : ",ID)
			return null
		}
		return $rootScope.dropDownHash[ID];
    }
	
	function dataListHashForID(ID) {
		if(!isValid(ID)){
			console.log("InValid metaData for dataList : ",ID)
			return null
		}
		return $rootScope.dataListHash[ID];
    }
	function lookupHashForID(ID) {
		if(!isValid(ID)){
			console.log("InValid metaData for lookup : ",ID)
			return null
		}
		return $rootScope.lookupHash[ID];
    }
	function  menuHashForID(ID) {
		if(!isValid(ID)){
			console.log("InValid metaData for menu item : ",ID)
			return null
		}
		return $rootScope.menuHash[ID];
    }
	
	/*
     * loadWithAjax method is used to get meta data for the particular meta data type and id from server
     */
	
    function loadWithAjax(id) {
        var deferred = $q.defer();
        requestHash={}
    	requestHash.actionMap={}
    	requestHash.actionMap.isMetaData=true;
    	requestHash.actionMap.requestID=id;
        $http.post(url, JSON.stringify(requestHash)).success(function (data) {
            deferred.resolve(data);
        }).error(function (data) {
            throw(new Error("Error in getting data. \n Request Param : " + requestParam + "\n Response : " + data));
            deferred.reject();
        });
        return deferred.promise;
    }
    /*
     * loadMetaDataForId is used to load and store meta data for particular type and id
     * */
    function loadMetaDataForId(ID) {
    	if(!isValid(ID)){
			console.log("InValid metaData for : ",ID)
			return null
		}
        var serverData = loadWithAjax(ID);
        serverData.then(function (data) {
            if (!data.isError) {
                loadMetaData(data.result.data);
                return data.result.data;
            } else {
                return null;
            }
        });
    }
	
	
    
	return{
		loadMetaData		:		loadMetaData,
		loadFieldMetaData	:		loadFieldMetaData,
		loadTableMetaData	:		loadTableMetaData,
		fillMetaData		:		fillMetaData,
		fieldHashForID		:		fieldHashForID,
		tableHashForID		:		tableHashForID,
		dropDownHashForID	:		dropDownHashForID,
		dataListHashForID	:		dataListHashForID,
		lookupHashForID		:		lookupHashForID,
		menuHashForID		:		menuHashForID,
		loadMetaDataForId 	:      loadMetaDataForId 
	}
});
