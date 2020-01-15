angular.module('time-spent-on-overwatch')
	.controller('search', ['$scope', '$http', 'helpers', function ($scope, $http, helpers) {
		$scope.errorMessage = '';

		var checkIfFormIsComplete = function () {
			var formIncomplete = !$scope.blizzardId || !$scope.blizzardTag || !$scope.blizzardRegion;
			return formIncomplete;
		}

		var showResults = function () {
			$scope.searchSuccessful = true;
		}

		var hideResults = function () {
			$scope.searchSuccessful = false;
		}

		var showError = function (str) {
			return $scope.errorMessage = str;
			// return $('#errorMessage').text(str).delay(7000).fadeOut();
		}
		var hideError = function () {
			return $scope.errorMessage = '';
		}

		var updateResults = function (statsObj) {
			//Format time played
			var competitiveHoursPlayed = statsObj.competitive.game_stats.time_played;
			var quickplayHoursPlayed = statsObj.quickplay.game_stats.time_played;
			var totalHoursPlayed = competitiveHoursPlayed + quickplayHoursPlayed;
			$scope.daysPlayed = Math.floor(totalHoursPlayed / 24);
			$scope.hoursPlayed = Math.floor(totalHoursPlayed - $scope.daysPlayed * 24);
			$scope.minutesPlayed = Math.floor((totalHoursPlayed - $scope.hoursPlayed) * 60);
			$scope.avatar = statsObj.competitive.overall_stats.avatar;
		}


		$scope.searchProfile = function (id, tag, region) {
			hideError();
			hideResults();

			if (checkIfFormIsComplete()) {
				showError('Please fill in all fields!');
				return;
			}

			var formattedId = helpers.formatId(id, tag);

			helpers.sendOwApiGetRequest(formattedId).then(function (data) {
				if (data.status == 403 || helpers.checkIfDataIsEmpty(data, region)) {
					showError('This profile is private');
					return;
				}
                if (data.status == 404) {
					showError('We could not retrieve your profile based on the info provided');
					return;
				}
				$scope.username = id;
				updateResults(data[region.toLowerCase()].stats);
				showResults();
				return
			}).catch(function (error) {
				showError('We could not retrieve your profile based on the info provided');
				return console.log(error);
			});
		}

		//Users able to press enter to search.
		$(document).ready(function () {
			$('#textBox').keypress(function (e) {
				if (e.keyCode == 13)
					$('#enterButton').click();
			});
		});


	}]);
