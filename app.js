angular.module('time-spent-on-overwatch', [
	'ui.router'
]).config(function ($stateProvider, $urlRouterProvider) {

	$stateProvider.state('main', {
		url: '/',
		templateUrl: './src/views/search.html',
		controller: 'search'
	});

	$urlRouterProvider.otherwise('/');
});
