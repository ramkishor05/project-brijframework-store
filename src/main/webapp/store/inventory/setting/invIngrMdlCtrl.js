invApp.controller('invIngrMdlCtrl', function ($scope, $state,metaDataServices,ajaxServices,metaData,$uibModalInstance,objectMap,messageServices){
	$scope.isLoadingDone=false;
	
	$scope.dataObject=angular.copy(new UIIngrDetail(objectMap));
	$scope.dataObject.eoCategory=null;
	$scope.unitGroup={};
	$scope.storage={};
	$scope.seleted={
			storage:"0",
			location:"0",
			unitGroup:"0"
	}
	console.log("$scope.dataObject",new UIIngrDetail(objectMap))
	
	$scope.modelObject={
			categoryList				:metaData.categoryList,
			storageList					:metaData.storageList,
			countFreqList				:metaData.countFreqList,
			unitGroupList				:metaData.unitGroupList
	}
	
	function loader(){
		$scope.seleted.unitGroup	   =metaData.unitGroupList[0]  
	}
	loader()
	$scope.changeStorage=function(storage){
		for(var s in $scope.modelObject.storageList){
			if($scope.modelObject.storageList[s].uniqueID==storage){
				$scope.storage=$scope.modelObject.storageList[s];
			}
		}
		console.log("storage",$scope.storage)
	}
	$scope.changeUnitGroup=function(unitGroup){
		console.log("unitGroup="+unitGroup)
		for(var u in $scope.modelObject.unitGroupList){
			console.log("unitGroup="+$scope.modelObject.unitGroupList[u])
			if($scope.modelObject.unitGroupList[u].uniqueID==unitGroup){
				
				$scope.unitGroup=$scope.modelObject.unitGroupList[u];
			}
		}
		console.log("unitGroup",$scope.unitGroup)
	}
	
	$scope.addLocation=function(location){
		if(location!=null || $scope.storage!=null){
			var locObject=null;
			for(var l in $scope.storage.locationList){
				if($scope.storage.locationList[l].uniqueID==location){
					locObject=$scope.storage.locationList[l];
				}
			}
			if(locObject!=null){
				$scope.dataObject.addLocation(locObject);
			}
			console.log("locObject",locObject)
		}
		
	}
	
	
    $scope.cancel = function () {
		    $uibModalInstance.dismiss('cancel');
	};
	$scope.tab={
			GENERAL_INFO_TAB:true,
			MEASUREMENT_TAB:false,
			STORAGE_INFO_TAB:false,
	        VENTOR_INFO_TAB:false,
	        RECIPE_INFO_TAB:false
	}
	$scope.activeTab=function(tab){
		var keys=Object.keys($scope.tab);
		for(var k in keys){
			var key=keys[k];
			$scope.tab[key]=false;
		}
		$scope.tab[tab]=true;
	}
		
	
	$scope.ok= function () {
		 $scope.dataObject.bulidObject();
		$uibModalInstance.close({objectMap: $scope.dataObject});
	}
	
	$scope.showTabData = function (id) {
		$('.select2-drop.select2-display-none.select2-with-searchbox').css("display","none");
		$('.select2-container').trigger("click");
		$(".tab-pane, .data_tab").removeClass("active");
		$("#" + id + ", #" + id + "_tab").addClass("active");
	};
	
})