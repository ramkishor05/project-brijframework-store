webApp.factory('viewPanelSvcs', [ '$q','$timeout','metaDataServices','WebObject',function ($q, $timeout, metaDataServices, WebObject) {
    function data(meuItem) {
        var urlHash = $.parseJSON(meuItem);
        angular.forEach(urlHash, function (value, key) {
        	WebObject.putSelected(key,value);
        });
      var deferred = $q.defer();
      $timeout(function () {
        deferred.resolve({
          menuItem: urlHash
        });
      }, 1000);
      return deferred.promise;
    }

    return {
      data: data
    };
  }
]);