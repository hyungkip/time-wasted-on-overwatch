angular.module('time-wasted-on-overwatch')
  .controller('mainController', ['$scope', '$http', function ($scope, $http) {
    $scope.searchID = function (id) {
      $http({
        method: 'GET',
        url: 'https://api.lootbox.eu/pc/us/' + id + '/profile'
      })
      .then(
        function (resp) {
          console.log(resp);
          return resp.data;
        }).catch( function (error) {
          console.log(error);
        }
      );
    };

    // searchID().then(
    //   function (resp) {
    //     console.log(resp.data);
    //     return resp.data;
    //   }).catch( function (error) {
    //     console.log(error);
    //   });


  }]);
