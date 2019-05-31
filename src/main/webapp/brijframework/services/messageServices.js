webApp.service('messageServices', function($http,$q,ajaxServices,notificationMessage,objectUtil,$window){
	var mapping = {
		ERROR : "error",
		SUCCESS : "success",
		INFO : "info",
		TRACE : "trace",
		WARNING : "warning",
		ADD : "add",
		UPDATE : "update",
		DELETE : "delete",
		SEARCH : "search"
	};
	
	function serverMessage(messageBox) {
		for(i in messageBox.infoArray){
			var info=messageBox.infoArray[i];
			notificationMessage.infoMessage(info.title,info.message)
		}
		for(s in messageBox.successArray){
			var success=messageBox.successArray[s];
			notificationMessage.successMessage(success.title,success.message)
		}
		for(w in messageBox.warningArray){
			var warning= messageBox.warningArray[w];
			notificationMessage.warningMessage(warning.title,warning.message)
		}
		for(d in messageBox.dangerArray){
			var danger=messageBox.dangerArray[d];
			notificationMessage.dangerMessage(danger.title,danger.message);
		}
		for(e in messageBox.errorArray){
			var error= messageBox.errorArray[e];
			notificationMessage.errorMessage(error.title,error.message);
		}
	}
	return {
		serverMessage				:		serverMessage
	}
	
});