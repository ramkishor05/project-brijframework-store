(function() {
	'use strict';
	angular.module('ribFrameworkWeb').controller('zipinvingMdlCtrl', zipinvingMdlCtrl);
	function zipinvingMdlCtrl($scope,altaAjaxSvcs,metaData,$modalInstance,altaUtil,altaCommonMsgSvcs,rootSvcs,ribRootSvcs) {
		$scope.objectHash = metaData.mdlData;
		$scope.isUpdate = metaData.isUpdate;
		$scope.currencyFormat = ribRootSvcs.currencyFormat();
		var eoBaseUnit  = angular.copy($scope.objectHash.eoBaseUnit);
		$scope.selectedHash = {isSelFilter:false,isHideMdl:metaData.isUpdate?false:true,isDisableCase:$scope.objectHash.isPack?true:false,unitHash:altaUtil.getHashFromArrayOfObjects($scope.objectHash.rptUnitArray,"primaryKey")};
		if(metaData.isUpdate){
			$scope.selectedHash.baseunitDesc = $scope.objectHash.selectedPackUnit;
			$scope.selectedHash.isSelFilter = true;
		}
		var _packUnitHash = altaUtil.getHashFromArrayOfObjects($scope.objectHash.rptUnitArray,"primaryKey")
		$scope.headerObject = {"vendorPK": null,"eoGlbUnit":$scope.objectHash.eoGlbUnit}
		$scope.showTabData = function (id) {
			$('.select2-drop.select2-display-none.select2-with-searchbox').css("display","none");
			$('.select2-container').trigger("click");
			$(".tab-pane, .data_tab").removeClass("active");
			$("#" + id + ", #" + id + "_tab").addClass("active");
		};
		$scope.toggleDiv = function(isAddNew){
			$scope.selectedHash.isSelFilter = true;
			if(isAddNew){
				$scope.selectedHash.isSelFilter = true;
			}
			else{
				$scope.selectedHash.isSelFilter = false;
			}
			$scope.selectedHash.isAddNew = isAddNew;
			$scope.selectedHash.isHideMdl = false;
		} 
		$scope.cancel = function () {
			$modalInstance.close();
		};
		$scope.getVIT = function(response){
			if(!altaUtil.isEmptyStr(response)){
				$scope.selectedHash.isSelFilter = true;
				$scope.objectHash = new EOCustVit(response);
			}
		}
		function EOCustVit(response){
			this.idenNo =  response.idenNo;
			this.itemType = response.eoGlbDesc;
			this.isActive = response.isActive;
			this.numPacksPerCase = response.numPacksPerCase;
			this.isPack = response.isPack;
			this.numUnitsPerPack = response.numUnitsPerPack;
			this.unitCost = response.unitCost;
			this.name = response.name;
			this.numBaseUnitsPerPackUnit = response.numBaseUnitsPerPackUnit;
			if(this.numBaseUnitsPerPackUnit > 0){
				this.isConversionEnabled = true;
			}
			this.primaryKey = response.primaryKey;
			this.ingrName = $scope.objectHash.ingrName;
			this.eoCustVendor = $scope.objectHash.eoCustVendor;
			this.vendorArray = $scope.objectHash.vendorArray
			this.oldVitArray = $scope.objectHash.oldVitArray
			$scope.selectedHash.baseunitDesc = response.caseDescription;
			
		}
		$scope.changeVendor = function(vendorPK){
			if(!altaUtil.isEmptyStr(vendorPK)){
				$scope.objectHash.eoCustVendor = vendorPK;
				$scope.headerObject = {"vendorPK": vendorPK,"eoGlbUnit":$scope.objectHash.eoGlbUnit}
			}
		}
		$scope.save = function(){
			validateSupItem($scope.objectHash,function (respObj){
				if(respObj.isValid){
					metaData.redirectData($scope.objectHash);
					$modalInstance.close();
				} else {rootSvcs.showCustomMessage(respObj.reason,"error"); }
			},true);
		}
		$scope.changePack = function(){
			$scope.selectedHash.isDisableCase = false
			if($scope.objectHash.isPack){
				$scope.selectedHash.isDisableCase = true;
			}
			else{
				$scope.objectHash.numPacksPerCase = 1;
			}
		}
		$scope.changeUnit = function(pk){
			$scope.selectedHash.baseunitDesc = $scope.selectedHash.unitHash[pk].eoGlbUnit_shortDesc;
			if(eoBaseUnit != pk){
				$scope.objectHash.isConversionEnabled = true;
				$scope.objectHash.numBaseUnitsPerPackUnit = _packUnitHash[pk].qnt;
			}
			else{
				$scope.objectHash.isConversionEnabled = false;
				$scope.objectHash.numBaseUnitsPerPackUnit = ""
			}
			$scope.objectHash.eoPackUnit = pk;
		}
		
		function isDuplicateVit(objectHash){
			if(!$scope.isUpdate){
				return objectHash.oldVitArray.filter(function(oldVitObj){return oldVitObj.idenNo === objectHash.idenNo}).length >= 1 ;	
			}else{
				return objectHash.oldVitArray.filter(function(oldVitObj){return (oldVitObj.idenNo === objectHash.idenNo && oldVitObj.primaryKey != objectHash.primaryKey)}).length >= 1 ;
			}
		}
		function validateSupItem(objectHash,callback){
			if(objectHash != undefined){
				if(isDuplicateVit(objectHash)){
					callback({isValid:false,reason:altaCommonMsgSvcs.getMsgForId('Duplicate VIT number.')});
				}else if(altaUtil.isEmptyStr(objectHash.eoCustVendor)){
					callback({isValid:false,reason:altaCommonMsgSvcs.getMsgForId('Select a Supplier.')});
				}else if(altaUtil.isEmptyStr(objectHash.name)){
					callback({isValid:false,reason:altaCommonMsgSvcs.getMsgForId('Please enter Item Name.')});
				}else if(altaUtil.isEmptyStr(objectHash.idenNo)){
					callback({isValid:false,reason:altaCommonMsgSvcs.getMsgForId('SKU# can not blank.')});
				} else if(altaUtil.isEmptyStr(objectHash.numPacksPerCase)){
					callback({isValid:false,reason:altaCommonMsgSvcs.getMsgForId('Please enter Case Size.')});
				}else if(objectHash.numPacksPerCase === "0"){
					callback({isValid:false,reason:altaCommonMsgSvcs.getMsgForId('Case Can not ba Zero.')});
				}else if(altaUtil.isEmptyStr(objectHash.numUnitsPerPack)){
					callback({isValid:false,reason:altaCommonMsgSvcs.getMsgForId('Please enter Pack Size.')});
				}else if(objectHash.numUnitsPerPack === "0"){
					callback({isValid:false,reason:altaCommonMsgSvcs.getMsgForId('Pack Size Can not ba Zero.')});
				} else if(objectHash.eoPackUnit == "null") {
					callback({isValid:false,reason:altaCommonMsgSvcs.getMsgForId('Please select Unit of the Pack.')});
				}else if(altaUtil.isEmptyStr(objectHash.unitCost)){
					callback({isValid:false,reason:altaCommonMsgSvcs.getMsgForId('Please enter Price Per Case.')});
				}else{
					callback({isValid:true,objectHash:objectHash});
				}
			}
		}

	}
})();