angular.module('time-wasted-on-overwatch')
  .controller('mainController', ['$scope', '$http', function ($scope, $http) {
    $scope.daysPlayed, $scope.hoursPlayed, $scope.username, $scope.avatar, $scope.validationFailed, $scope.loading;
    $scope.inputEntered = false;

    // $scope.searchID = function (id) {
    //   $scope.validationFailed = false;
    //   $scope.inputEntered = false;
    //   $scope.loading = true;
    //
    //   searchLootBoxProfile(id).then( function (data) {
    //     return retrieveInformation(data);
    //   }).then(function (data) {
    //     $scope.inputEntered = true;
    //     $scope.validationFailed = false;
    //     $scope.loading = false;
    //     return;
    //   }).catch( function (error) {
    //     $scope.inputEntered = false;
    //     $scope.validationFailed = true;
    //     $scope.loading = false;
    //     console.log(error);
    //   });
    // }

    $scope.searchID = function (id) {
      $scope.validationFailed = false;
      $scope.inputEntered = false;
      $scope.loading = true;
      var formattedID = formatID(id);
      searchLootBoxProfile(formattedID)
      .then( function (data) {
        retrieveInformation(data);
        $scope.inputEntered = true;
        $scope.validationFailed = false;
        $scope.loading = false;
        return;
      }).catch( function (error) {
        $scope.inputEntered = false;
        $scope.validationFailed = true;
        $scope.loading = false;
        console.log(error);
      });
    }

    var formatID = function (unformattedID) {
    	//note: battlenet tag numbers will always be either 4 or 5 digits long
    	//case if separator is a hyphen
    	if (unformattedID[unformattedID.length - 5] == '-' || unformattedID[unformattedID.length - 6] == '-') {
          	return unformattedID;
      }

      var possibleSeparators = ['#', '.', ' '];

      //check for other separators
    	for (var i=0; i<possibleSeparators.length; i++) {
          if (unformattedID[unformattedID.length - 5] == possibleSeparators[i] || unformattedID[unformattedID.length - 6] == possibleSeparators[i]) {
          	return unformattedID.split(possibleSeparators[i]).join('-');
          }
    	}

    	//check for no separator
    	for (var i=5; i>3; i--) {
    		if (!isNaN(unformattedID[unformattedID.length - i])) {
    			return unformattedID.substring(0, unformattedID.length - i) + '-' + unformattedID.substring(unformattedID.length - i, unformattedID.length)
    		}
    	}
    	return unformattedID;
    }

    var searchLootBoxProfile = function (blizzID) {
      return $http({
        method: 'GET',
        url: 'https://api.lootbox.eu/pc/us/' + blizzID + '/profile'
      })
      .then(
        function (resp) {
          return resp.data;
        }).catch( function (error) {
          console.log(error);
        }
      );
    };

    var retrieveInformation = function (obj) {
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

    //Users able to press enter to search. Quick and dirty jQuery
    $(document).ready(function(){
      $('#textBox').keypress(function(e){
        if(e.keyCode==13)
        $('#enterButton').click();
      });
    });


  }]);
