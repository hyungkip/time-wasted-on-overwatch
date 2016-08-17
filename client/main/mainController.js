angular.module('time-wasted-on-overwatch')
  .controller('mainController', ['$scope', '$http', function ($scope, $http) {
    var searchID = function() {
      return $http({
        method: 'GET',
        url: 'https://api.lootbox.eu/pc/us/Hunky-1228/profile'
      })
      .then(
        function(resp) {
          return resp.data;
        }).catch(function(error) {
          console.log(error);
        }
      );
    };

    searchID().then(
      function(resp) {
        console.log(resp.data);
        return resp.data;
      }).catch(function(error) {
        console.log(error);
      });


  }]);
