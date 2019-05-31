angular.module('ng-selectize', []).directive('selectize', function () {
  'use strict';
  return {
	  restrict: 'A',
      link: function(scope, element, attrs) {
          setTimeout(function() {
              $(element).selectize({
                                       allowEmptyOption: true,
                                       create: true
                                   });
          });
      }
  };
});
