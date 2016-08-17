angular.module('time-wasted-on-overwatch')
  .controller('mainController', ['$scope', '$http', function ($scope, $http) {
    var searchID = function() {
      return $http({
        method: 'GET',
        url: 'https://api.lootbox.eu/pc/us/Hunky-1228/profile'
        // data: coordinates
      })
      .then(
        function(resp) {
          return resp.data;
        }).catch(function(error) {
          console.log(error);
        }
      );
    };
    // app.get("https://api.lootbox.eu/pc/us/Hunky-1228/profile")
    // .end(function (result) {
    //   console.log(result.status, result.headers, result.body);
    // });

    searchID().then(
      function(resp) {
        console.log(resp.data);
        return resp.data;
      }).catch(function(error) {
        console.log(error);
      });


  }]);
