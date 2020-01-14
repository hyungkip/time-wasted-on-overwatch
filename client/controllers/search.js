angular.module('time-spent-on-overwatch')
	.controller('search', ['$scope', '$http', 'ajax', 'helpers', function ($scope, $http, ajax, helpers) {

		$scope.searchProfile = function (id, tag, region) {
			var formIncomplete = !id || !tag || !region;
            $scope.inputEntered = false;
			if (formIncomplete) {
				helpers.showError('Please fill in all fields!');
				return;
			}
			var formattedId = helpers.formatId(id, tag);
			ajax.searchOverwatchProfile(formattedId).then(function (data) {
				console.log('AJAX SUCCESS', data);
				if (data.status == 403 || data[region.toLowerCase()].stats.quickplay.game_stats.length + data[region.toLowerCase()].stats.competitive.game_stats.length == 0) {
					helpers.showError('This profile is private');
					return;
				}
                if (data.status == 404) {
					helpers.showError('We could not retrieve your profile based on the info provided');
					return;
				}
				$scope.username = id;
				return retrieveInformation(data[region.toLowerCase()].stats);

				return;
			}).catch(function (error) {
				helpers.showError('We could not retrieve your profile based on the info provided');
				return console.log(error);
			});
		}


		var retrieveInformation = function (statsObj) {
			console.log(statsObj.competitive, 'HERE IS OBJ COMP');
			console.log(statsObj.quickplay, 'HERE IS OBJ QUICK');
			//Format time played
			var competitiveHoursPlayed = 0;
			var quickplayHoursPlayed = 0;
			competitiveHoursPlayed = statsObj.competitive.game_stats.time_played
			quickplayHoursPlayed = statsObj.quickplay.game_stats.time_played

			var totalHoursPlayed = competitiveHoursPlayed + quickplayHoursPlayed;
			$scope.daysPlayed = Math.floor(totalHoursPlayed / 24);
			$scope.hoursPlayed = Math.floor(totalHoursPlayed - $scope.daysPlayed * 24);
			$scope.minutesPlayed = Math.floor((totalHoursPlayed - $scope.hoursPlayed) * 60);
			$scope.inputEntered = true;
			$scope.avatar = statsObj.competitive.overall_stats.avatar;
		}

		//Users able to press enter to search. Quick and dirty jQuery
		$(document).ready(function () {
			$('#textBox').keypress(function (e) {
				if (e.keyCode == 13)
					$('#enterButton').click();
			});
		});


	}]);
