webApp.service('notificationMessage',function($http, $q, ajaxServices, objectUtil, $window) {
		PNotify.prototype.options.styling = "fontawesome";
		// notification message
		function errorMessage(title, message) {
			new PNotify({
				title : title,
				text : message,
				type : 'error'
			});
		}

		function successMessage(title, message) {
			if (title == null|| title == undefined || title == "") {
				new PNotify({
					title : "-----------------",
					text : message,
					type : 'success'
				});
			} else {
				new PNotify({
					title : title,
					text : message,
					type : 'success'
				});
			}

		}

		function infoMessage(title, message) {
			new PNotify({
				title : title,
				text : message,
				type : 'info'
			});
		}

		function warningMessage(title, message) {
			new PNotify({
				title : title,
				text : message,
				type : 'warning',
				icon : 'fa fa-exclamation'
			});
		}

		function primaryMessage(title, message) {
			new PNotify({
				title : title,
				text : message,
				type : 'custom',
				addclass : 'pnotify-primary',
				icon : "fa fa-user"
			});
		}
		
		function dangerMessage(title, message) {
			new PNotify({
				title : title,
				text : message,
				type : 'custom',
				addclass : 'pnotify-danger',
				icon : "fa fa-user"
			});
		}
		

		function customMessage(title, message, type) {
			new PNotify({
				title : title,
				text : message,
				type : type
			})
		}
	return {
		successMessage	 : successMessage,
		errorMessage 	 : errorMessage,
		infoMessage 	 : infoMessage,
		warningMessage 	 : warningMessage,
		customMessage	 : customMessage,
		dangerMessage 	 : dangerMessage,
		primaryMessage   : primaryMessage
	}
});