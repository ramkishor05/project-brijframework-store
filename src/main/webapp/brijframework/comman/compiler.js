webApp.directive('compile', function ($compile) {
  return {
    replace: true,
    link: function (scope, element, attributes) {
    scope.$watch(function (scope) {
        // watch the 'compile' expression for changes
        var strToCompile = scope.$eval(attributes.compile);
        var finalStr = scope.$eval(attributes.compile);
        var size = "";
        if (attributes.altasize != undefined && strToCompile != undefined) {
           size = parseInt(attributes.size);
          finalStr = strToCompile.substr(0, size);
          return finalStr;
        } else {
          return finalStr;
        }
      },
      function (value) {
           element.html(value);
           $compile(element.contents())(scope);
      });
    }
  };
});