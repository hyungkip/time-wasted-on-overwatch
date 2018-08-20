angular.module('time-spent-on-overwatch')
  .factory('helpers', [function () {
    return {

      formatId: function (id, tag) {
        var full_id = id + '-' + tag;
        console.log('here is full id', full_id);
        return full_id;
      },

      showError: function (str) {
        return $('#errorMessage').text(str).delay(5000).fadeOut();
      },

      packageData: function (statsData, playtimeData) {
        function mergeDatasets (stats, playtimes) {
          for (let hero in stats) {
            for (let hero2 in p laytimes) {
              if (hero == hero2) {
                stats[hero]['playtime'] == playtimes[hero2];
              }
            }
          }
          return stats;
        }

        let qpData = mergeDatasets(statsData['quickplay'], playtimeData['quickplay']);
        let compData = mergeDatasets(statsData['competitive'], playtimeData['competitive'])

        return {
          'quickplay': qpData,
          'competitive', compData
        }
      }

    }
  }])
