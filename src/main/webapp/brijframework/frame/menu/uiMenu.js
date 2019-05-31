webApp.directive('uiMenu',function($location,WebObject){
	return {
		restrict:"EA",
		scope:{
			breadcrumbs:"=?",
		    menuArray:"=?",
		    changeLoction:'&'
		},
		replace:true,
		templateUrl:'brijframework/frame/menu/uiMenu.html',
		link:function(scope,elm,attrs){
			 scope.breadcrumbs=[];
			 
			 scope.loction=function(menuItem,i){
				 for(var p=scope.breadcrumbs.length;p>i;p--){
					 scope.breadcrumbs.splice(p,1);
				 }
				 WebObject.putSelected('menuID',menuItem.id);
				 WebObject.setMenu(menuItem);
				 console.log("location =", WebObject.getMenu())
				 scope.changeLoction({menu:menuItem});
			 }
			 
			 scope.selectedMenu=function(event,menu,i){
				 scope.breadcrumbs[i]=menu;
				 scope.loction(menu,i)
			 }

			 scope.menuIcon=function(menu){
				 if(menu.customClass!=null){
					return menu.customClass['smalIcon'];
				 }
				 return "";
			 }
			 
			 scope.getMenuLevel=function(menu){
				 if(menu.menuItemArray==null||menu.menuItemArray==undefined){
					 return "no-child-item";
				 }else{
					 return "has-child-item close-item";
				 }
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