angular.module('time-wasted-on-overwatch')
  .controller('mainController', ['$scope', '$http', function ($scope, $http) {
    $scope.daysPlayed, $scope.hoursPlayed, $scope.username, $scope.avatar, $scope.validationFailed, $scope.loading;
    $scope.inputEntered = false;

    $scope.searchID = function (id) {
      $scope.loading = true;
      searchLootBoxProfile(id).then( function (data) {
        return retrieveInformation(data);
      }).then(function (data) {
        $scope.inputEntered = true;
        $scope.validationFailed = false;
        $scope.loading = false;
        return;
      }).catch( function (error) {
        $scope.validationFailed = true;
        $scope.loading = false;
        console.log(error);
      });
    }


    var searchLootBoxProfile = function (blizzID) {
      return $http({
        method: 'GET',
        url: 'https://api.lootbox.eu/pc/us/' + blizzID + '/profile'
      })
      .then(
        function (resp) {
          $scope.validationSuccess = true;
          return resp.data;
        }).catch( function (error) {
          console.log(error);
        }
      );
    };

    var retrieveInformation = function (obj) {
      //Format time played
      var competitiveHoursPlayed = parseInt(obj.data.playtime.competitive.split(' ')[0]);
      var quickHoursPlayed = parseInt(obj.data.playtime.quick.split(' ')[0]);
      var totalHoursPlayed = competitiveHoursPlayed + quickHoursPlayed;
      $scope.daysPlayed = Math.floor(totalHoursPlayed/24);
      $scope.hoursPlayed = totalHoursPlayed - $scope.daysPlayed*24;
      $scope.username = obj.data.username;
      $scope.avatar = obj.data.avatar;


    }


    $(document).ready(function(){
      $('#textBox').keypress(function(e){
        if(e.keyCode==13)
        $('#enterButton').click();
      });
    });


  }]);
