angular.module('time-spent-on-overwatch')
  .factory('mainFactory', ['$http', function ($http) {
    var mainFactory = {}

    mainFactory.formatID = function (id, tag) {
      var full_id = id + '-' + tag;
      console.log('here is full id', full_id);
      return full_id;
    }

    mainFactory.showError = function (str) {
      $('#errorMessage').text(str).delay(5000).fadeOut();
    }

    mainFactory.searchOverwatchProfile = function (blizzID) {
      var baseUrl = 'https://owapi.net/api/v3/u/';
      return $http({
        method: 'GET',
        url: baseUrl + blizzID + '/heroes'
      })
      .then(
        function (resp) {
          return resp.data;
        }).catch( function (error) {
          console.log(error);
        }
      );
    };

    mainFactory.retrieveInformation = function (obj) {
      //Format time played
      var competitiveHoursPlayed;
      if (obj.data.playtime.competitive == undefined) {
        competitiveHoursPlayed = 0;
      }
      else {
        competitiveHoursPlayed = parseInt(obj.data.playtime.competitive.split(' ')[0]);
      }

      var quickHoursPlayed;
      if (obj.data.playtime.quick == undefined) {
        quickHoursPlayed = 0;
      }
      else {
        quickHoursPlayed = parseInt(obj.data.playtime.quick.split(' ')[0]);
      }

      var totalHoursPlayed = competitiveHoursPlayed + quickHoursPlayed;
      $scope.daysPlayed = Math.floor(totalHoursPlayed/24);
      $scope.hoursPlayed = totalHoursPlayed - $scope.daysPlayed*24;
      $scope.username = obj.data.username;
      $scope.avatar = obj.data.avatar;
    }

    return mainFactory;
  }])
