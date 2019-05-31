webApp.factory('WebObject', function ($rootScope, $cookies,$compile,ajaxServices) {
	 $rootScope.isURLEncrypt=true;
	 $cookies.put('SESSION',new SessionObject(null));
	 var webObject=new WebObject($cookies.get('WEBObject'));
	 $cookies.put('WEBObject',webObject);
	 $rootScope.menuLoaded=false;
	 function isEncoded(string) {
			try {
				window.atob(string);
			}
			catch (e) {
			     return false;
			}
			return true;
	 }
	 
	 
		
	 function ScopeObject(object){
	    if(object!=null){
	    	var keys=Object.keys(object);
	    	for(var k in keys){
	    		var key=keys[k]
				this[key]=object[key];
			} 
		}
	 }
	 function PageObject(page){
		 if(page!=null){
			var keys=Object.keys(page);
	    	for(var k in keys){
	    		var key=keys[k]
				this[key]=page[key];
			} 
		 }
	 }
	
	 function SessionObject(session){
		 if(session!=null){
			var keys=Object.keys(session);
	    	for(var k in keys){
	    		var key=keys[k]
				this[key]=session[key];
			} 
		 }
	 }
	 
	 function SelectedObject(object){
		 if(object!=null){
			var keys=Object.keys(object);
	    	for(var k in keys){
	    		var key=keys[k]
				this[key]=object[key];
			} 
		}
	 }
	 
	 function WebObject(obj){
		 if(obj==null){
			 this.pageObject=new PageObject(null);
			 this.sessionObject=new SessionObject(null);
			 this.scopeObject=new ScopeObject(null);
		 }else {
			 this.pageObject=isValid(obj.pageObject)? new PageObject(obj.pageObject):new PageObject(null);
			 this.sessionObject=isValid(obj.sessionObject)? new SessionObject(obj.sessionObject):new SessionObject(null);
			 this.scopeObject=isValid(obj.scopeObject)?new ScopeObject(obj.scopeObject):new ScopeObject(null);
			 this.selectedObject=isValid(obj.selectedObject)?new SelectedObject(obj.selectedObject):new SelectedObject(null)
		 }
	 }
	 
	 function isValid(obj){
		return (obj==null || obj==undefined )?false :true
	 }
	 
	 function setPage(page){
		 webObject.pageObject=new PageObject(page);
	 }
	 
	 function getPage(){
	  	return  webObjectt.pageObject;
	 }
	 
	 function setMenu(menu){
		webObject.scopeObject['menu']=menu;
	 }
	 
	 function getMenu(){
		var menu = webObject.scopeObject['menu'];
		console.log(menu)
		return menu;
	 } 
	 
	 function setSelected(object){
		 webObject.selectedObject=new SelectedObject(object);
	 }
	 
	 function getSelected(){
		return webObject.selectedObject
	 }
	
	 function putSelected(key,value){
	    webObject.selectedObject[key]=value;
	}
	 
	 function getUser(){
		return webObject.scopeObject['user'];
     } 
	 
	 function setUser(user){
		webObject.scopeObject['user']=user;
	 } 
	 
	 function setApp(app){
		 webObject.scopeObject['app']=app;
	 } 
	 
	 function getApp(){
	   return webObject.scopeObject['app'];
	 } 
	 
     function checkEncryption(){
    	 return $rootScope.isURLEncrypt;
     }
     function getScope(){
    	 return webObject.scopeObject;
     }
     
     function setScope(object){
    	 webObject.scopeObject=new ScopeObject(object);
     }
     
     function buildObject(urlHash) {
         angular.forEach(urlHash, function (value, key) {
             getObject()[key] = value;
         });
     };
     
     function getSession(){
    	 return $cookies.get('SESSION');
     }
     
     function setSession(obj){
    	 $cookies.put('SESSION',new SessionObject(obj));
     }
     
     function checkObject(urlHash, callback) {
    	 buildObject(urlHash);
         var selectedObject = getSession();
         if (Object.keys(selectedObject).length > 1) {
             var requestMap = {
            	  actionMap: {
            		 requestID: getMenuID(),
            		 isMetaData:true
                 }
             };
             ajaxServices.postDataThen("web/request/service",requestMap, function (data) {
                 if (!data.isError) {
                     var menuData = data.result;
                     setMenu(menuData);
                     callback(getMenu);
                 }
             });
         }
     };
     
     function cache(){
    	 return webObject;
     }
     function loadcache(load){
    	webObject=new WebObject(load);
     }
     
     return {
    	 cache					: cache,
    	 loadcache				: loadcache,
    	 setUser		        : setUser,
    	 getUser		        : getUser,
    	 setPage		        : setPage,
    	 getPage		        : getPage,
    	 setMenu		        : setMenu,
    	 getMenu		        : getMenu,
    	 setApp			        : setApp,
    	 getApp			        : getApp,
    	 setSession			    : setSession,
    	 getSession     		: getSession,
    	 setSelected			: setSelected,
    	 getSelected			: getSelected,
    	 putSelected			: putSelected,
    	 setScope			    : setScope,
    	 getScope			    : getScope,
    	 checkObject			: checkObject,
    	 buildObject			: buildObject,
    	 checkEncryption        : checkEncryption,
    	 isEncoded				: isEncoded
     }
	  
});