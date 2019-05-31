webApp.factory("errorLogService", function($log, $window, stacktraceService, altaLoggingSvcs){

// I log the given error to the remote server.
	function log(exception, cause){
			var expMessage = exception.toString();
			var stackTraceList = stacktraceService.print({e:exception});
			var rootStackTrace = stackTraceList[0];
			var tempSubTrace = rootStackTrace.split(":");
			var rootExpLineNum = tempSubTrace[tempSubTrace.length - 2] + " : " + tempSubTrace[tempSubTrace.length - 1].toString().replaceAll("<br>", "");
			var stackTrace = [];
			for(var i = 0; i < stackTraceList.length; i++){
				var temp = "<br>" + stackTraceList[i] + "<br>";
				stackTrace.push(temp);
			}
			var errorHash = {expMessage:expMessage, expStackTrace:stackTrace, rootStackTrace:rootStackTrace, rootExpLineNum:rootExpLineNum};
			var ajaxForLogging = ($.cookie('loggingEnabled') == undefined?false:$.cookie('loggingEnabled'));
			console.log(errorHash);
			if(ajaxForLogging.toString() == "true"){
				altaLoggingSvcs.ajaxForLogging(errorHash);
			}
	}
// Return the logging function.
	return ( log );

});