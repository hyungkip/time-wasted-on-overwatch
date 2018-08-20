angular.module('time-spent-on-overwatch')
  .controller('search', ['$scope', '$http', 'ajax', 'helpers', function ($scope, $http, ajax, helpers) {

    $scope.searchProfile = function (id, tag, region) {
      var formIncomplete = !id || !tag || !region;

      if (formIncomplete) {
        helpers.showError('Please fill in all fields!');
        return;
      }
      var formattedId = helpers.formatId(id, tag);

      ajax.searchOverwatchProfile(formattedId).then(function (data) {
        var data = data[region.toLowerCase()].heroes;
        var statsData = data.stats;
        var playtimeData = data.playtime;
        var packagedData = helpers.packageData(statsData, playtimeData);
        return;
      }).catch(function (error) {
        helpers.showError('We could not retrieve your profile based on the info provided');
        return console.log(error);
      });
    }

    $scope.compareProfiles = function (id, tag, region, id2, tag2, region2) {
      var formIncomplete = !id || !tag || !region || !id2 || !tag2 || !region2;

      if (formIncomplete) {
        helpers.showError('hello');
        return;
      }
      var p1_formattedId = helpers.formatId(id, tag);
      var p2_formattedId = helpers.formatId(id2, tag2);

      ajax.searchOverwatchProfile(p1_formattedId).then(function (p1_data) {
        ajax.searchOverwatchProfile(p2_formattedId).then(function (p2_data) {
          var p1_data = p1_data[region.toLowerCase()].heroes;
          var p1_statsData = p1_data.stats;
          var p1_playtimeData = p1_data.playtime;
          var p1_packagedData = helpers.packageData(p1_statsData, p1_playtimeData);

          var p2_data = p2_data[region2.toLowerCase()].heroes;
          var p2_statsData = p2_data.stats;
          var p2_playtimeData = p2_data.playtime;
          var p2_packagedData = helpers.packageData(p2_statsData, p2_playtimeData);
        })
      }).catch(function (error) {
        helpers.showError('hello there');
        return console.log(error);
      })
    }

    //Users able to press enter to search. Quick and dirty jQuery
    $(document).ready(function(){
      $('#textBox').keypress(function(e){
        if(e.keyCode==13)
        $('#enterButton').click();
      });
    });


  }]);
