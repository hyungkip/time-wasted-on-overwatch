angular.module('time-spent-on-overwatch')
  .controller('mainController', ['$scope', '$http', 'mainFactory', function ($scope, $http, mainFactory) {
    $scope.daysPlayed, $scope.hoursPlayed, $scope.username, $scope.avatar, $scope.validationFailed, $scope.loading;
    $scope.inputEntered = false;

    $scope.searchProfile = function (id, tag, region) {
      if (!id || !tag || !region) {
        mainFactory.showError('Please fill in all fields!');
      }
      var formattedID = mainFactory.formatID(id, tag);
      mainFactory.searchOverwatchProfile(formattedID).then(function (data) {
        var profileData = data[region.toLowerCase()];
        console.log('HERE IS PROFILEDATA', profileData);
        //mainFactory.retrieveInformation(data);
        return;
      }).catch(function (error) {
        mainFactory.showError('We could not retrieve your profile based on the info provided');
        console.log(error);
      });
    }



    //Users able to press enter to search. Quick and dirty jQuery
    $(document).ready(function(){
      $('#textBox').keypress(function(e){
        if(e.keyCode==13)
        $('#enterButton').click();
      });
    });


  }]);
