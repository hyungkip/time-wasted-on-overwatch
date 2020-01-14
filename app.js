angular.module('time-spent-on-overwatch', [
	'ui.router'
]).config(function ($stateProvider, $urlRouterProvider) {

	$stateProvider.state('main', {
		url: '/',
		templateUrl: './client/views/search.html',
		controller: 'search'
	});

	$urlRouterProvider.otherwise('/');
});
