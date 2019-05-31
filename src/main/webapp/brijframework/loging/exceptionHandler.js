
// By default, AngularJS will catch errors and log them to
// the Console. We want to keep that behavior; however, we
// want to intercept it so that we can also log the errors
// to the server for later analysis.

webApp.provider("$exceptionHandler",{
      $get: function (errorLogService) {
        return( errorLogService );
      }
    }
);
