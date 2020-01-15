angular.module('time-spent-on-overwatch')
	.factory('helpers', ['$http', function ($http) {
		return {
			formatId: function (id, tag) {
				var full_id = id + '-' + tag;
				return full_id;
			},

			sendOwApiGetRequest: function (blizzID) {
				var baseUrl = 'https://owapi.net/api/v3/u/';
				var url = baseUrl + blizzID + '/stats';
				return $http({
						method: 'GET',
						url: url
					})
					.then(function (resp) {
						return resp.data;
					}).catch(function (error) {
						return error;
					});
			},

			checkIfDataIsEmpty(data, region) {
				return data[region.toLowerCase()].stats.quickplay.game_stats.length + data[region.toLowerCase()].stats.competitive.game_stats.length == 0;
			}
		}
	}])
