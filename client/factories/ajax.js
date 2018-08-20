angular.module('time-spent-on-overwatch')
  .factory('ajax', ['$http', function ($http) {
    return {

      searchOverwatchProfile: function (blizzID) {
        var baseUrl = 'https://owapi.net/api/v3/u/';
        var url = baseUrl + blizzID + '/heroes';
        return $http({
          method: 'GET',
          url: url
        })
        .then(function (resp) {
            return resp.data;
        }).catch( function (error) {
            return console.log(error);
        });
      }

    }

  }])
