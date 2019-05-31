webApp.directive('uiModal',function($window,$location,$parse,$modal,$modalInstance){
	return {
		restrict:"EA",
		scope:{
			id:'@',
			mdlFieldArray:"@",
			mdlHeader:"@",
			mdlFooter:"@"
		},
		replace:true,
		templateUrl:'brijframework/component/ui-modal/uiModal.html',
		link:function(scope,elm,attrs){
			var modelAccessor = $parse(attrs.ngModel);
			scope.getID=function(){
				return scope.id;
			}
			var app={
					nanoscrolls:function(){
					$.isFunction($.fn.nanoScroller)&&$(".nano").nanoScroller()
					},
					tooltips:function(){
						$.isFunction($.fn.tooltip)&&$('[data-toggle="tooltip"]').tooltip({container:"body"})
					},
					popovers:function(){
						$.isFunction($.fn.popover)&&$('[data-toggle="popover"]').popover({container:"body"})
					},
					animations:function(){
						$.isFunction($.fn.appear)&&$("[data-animation-name]").each(function(){
							$(this).pluginAnimate()
							})
					}
					,peityCharts:function(){
						$.isFunction($.fn.peity)&&($(".pie-chart").peity("pie"),$(".donut-chart").peity("donut"),
						$(".line-chart").peity("line"),$(".bar-chart").peity("bar"))
				    }	
			};$(function(){
				app.nanoscrolls(),
				app.tooltips(),
				app.popovers(),
				app.animations(),
				app.peityCharts()
			});
		}
	}
});

webApp.controller('uiModalCtrl',function($scope,$controller,$window,$location,$uibModalInstance,metaData,modalMap){
	
	$scope.metaData=metaData;
	$scope.modalMap={}
	$scope.name="";
	$scope.objectMap=angular.extend({},modalMap);
	$scope.modalMap.objectMap=angular.extend({},modalMap);
	$scope.modalName=metaData.headerLabel;
    $scope.controller = function () {
	    return $controller(metaData.pageUrl.controllerName, {$scope: $scope});
    };
    $scope.templateUrl = metaData.pageUrl.templateHtml;
    console.log("$scope.metaData",$scope.metaData)
    $scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	};
	
	$scope.ok= function () {
		$uibModalInstance.close({objectMap: $scope.modalMap.objectMap});
	}
});

webApp.factory('uiModalSvcs', function ($q, $uibModal){
	function dataModal(metaData,objectMap){
		var defer=$q.defer();
		var modalInstance =$uibModal.open({
		      animation: true,
		      ariaLabelledBy: 'modal-title-top',
		      ariaDescribedBy: 'modal-body-top',
		      templateUrl:  metaData.pageUrl.templateHtml,
		      size: metaData.size,
		      resolve: {
		    	  metaData: function () {
		            return metaData;
		          }
				 ,objectMap: function () {
			            return objectMap;
		         }
		        },
		      controller:metaData.pageUrl.controllerName
		    });
	    
	    modalInstance.result.then(function(response){
	    	defer.resolve(response);
	    },function () {
	    });
	    return defer.promise;
	}
	return {
		dataModal		:	dataModal
	}
});
