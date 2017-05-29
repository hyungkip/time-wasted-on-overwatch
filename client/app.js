angular.module('time-spent-on-overwatch', [
  'ui.router'
]).config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider.state('main', {
    url: '/main',
    templateUrl: '/main/mainView.html',
    controller: 'mainController'
  });
  $urlRouterProvider.otherwise('/main');
});
