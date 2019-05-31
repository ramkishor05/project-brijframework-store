webApp.directive('loginPage',['$timeout','$http',function($timeout,$http){
	 return{
	        restrict:"EA",
	        scope:{
	        	metaData:"=",
	        	objectMap:'=',
	            doLogin:'&',
	            doSignup:'&',
	            onKeyUp:'&',
	            messageBox:'='
	        },
	        templateUrl:"brijframework/wizard/login/loginWizard.html",
	        link:function(scope,element,attr){
	        	scope.metaData={
	        			forgetLink 				: attr.forgetlink,
	        			termLink   				: attr.termlink,
	        			loginHeader             : attr.loginheader,
	        			signupHeader    		: attr.signupheader,
	        			userName				: attr.username,
	        			userLabel               : attr.userlabel,
	        			userID                  : attr.userid,
	        			userPlaceHolder         : attr.userplaceholder,
	        			userPattern				: attr.userpattern,
	        			passwordName			: attr.passwordname,
	        			passwordLabel			: attr.passwordlabel,
	        			passwordID				: attr.passwordid,
	        			passwordPlaceHolder     : attr.passwordplaceholder,
	        			passwordPattern			: attr.passwordpattern,
	        			rePasswordName			: attr.repasswordname,
	        			rePasswordID			: attr.repasswordid,
	        			rePasswordPlaceHolder   : attr.repasswordplaceholder
	        	}
	        	scope.objectMap={
	        			username		: "",
	        			password		: "",
	        			rePassword		: ""
	        			
	        	}
	        	defaultSet();
	           
	        	scope.isUserExist= function(){
	        		scope.onKeyUp({objectMap:scope.objectMap});
	        	};
                scope.login = function(){
                	scope.doLogin({objectMap:scope.objectMap});
             	};
                scope.signup = function(){
	        	  scope.doSignup({objectMap:scope.objectMap});
             	};
                function defaultSet(){
                	if(scope.metaData.forgetLink==undefined){
                		scope.metaData.forgetLink="#"
                	}
                	if(scope.metaData.termLink==undefined){
                		scope.metaData.termLink="#"
                	}
                	
	                if(scope.metaData.messageBox==undefined){
		        		scope.metaData.messageBox="";
		        	}
	               
		        	if(scope.metaData.loginHeader==undefined){
		        		scope.metaData.loginHeader="Please enter detail of user";
		        	}
		        	if(scope.signupHeader==undefined){
		        		scope.signupHeader="Fill detail of user";
		        	}
		        	
		        	if(scope.metaData.userName==undefined){
		        		scope.metaData.userName="username";
		        	}
		        	if(scope.metaData.userLabel==undefined){
		        		scope.metaData.userLabel="Username";
		        	}
		        	if(scope.metaData.userId==undefined){
		        		scope.userID="userId";
		        	}
		        	if(scope.metaData.userplaceholder==undefined){
		        		var lbl=scope.metaData.userLabel;
		        		scope.metaData.userPlaceHolder="Please enter "+angular.lowercase(lbl);
		        	}
		        	if(scope.metaData.usertext==undefined){
		        		scope.metaData.userText="";
			        }
		        	if(scope.metaData.userPattern==undefined){
		        		scope.metaData.userPattern="a-zA-Z0-9";
		        	}
		        	if(scope.metaData.passwordPattern==undefined){
		        		scope.metaData.passwordPattern="a-zA-Z0-9";
		        	}
		        	if(scope.metaData.passwordname==undefined){
		        		scope.metaData.passwordName="password";
		        	}
		        	if(scope.metaData.passwordlabel==undefined){
		        		scope.metaData.passwordLabel="Password";
		        	}
		        	if(scope.metaData.passwordid==undefined){
		        		scope.metaData.passwordID="password";
		        	}
		        	if(scope.metaData.passwordplaceholder==undefined){
		        		var lbl=scope.metaData.passwordLabel;
		        		scope.metaData.passwordPlaceHolder="Please enter "+angular.lowercase(lbl);
		        	}
		        	if(scope.metaData.passwordtext==undefined){
		        		scope.metaData.passwordText="";
			        }
		        	
		        	if(scope.metaData.repasswordname==undefined){
		        		scope.metaData.rePasswordName="repassword";
		        	}
		        	if(scope.metaData.repasswordlabel==undefined){
		        		scope.rePasswordLabel="Re-Password";
		        	}
		        	if(scope.metaData.repasswordid==undefined){
		        		scope.metaData.rePasswordID="repassword";
		        	}
		        	if(scope.metaData.repasswordplaceholder==undefined){
		        		var lbl=scope.metaData.rePasswordLabel;
		        		scope.metaData.rePasswordPlaceHolder="Please enter "+angular.lowercase(lbl);
		        	}
                }
	        }
	    }
}]);