angular.module('app').config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    // $locationProvider.hashPrefix('');
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('index', {
            url: '/',
            templateUrl: 'scripts/controllers/main/main-index.html'
        })
        .state('timeTracker', {
            url: '/time-tracker',
            templateUrl: 'scripts/controllers/time-tracker/time-tracker-index.html'
        })
        .state('timeTrackerReport', {
            url: '/time-tracker-report',
            templateUrl: 'scripts/controllers/time-tracker/report/report-time-tracker-index.html'
        })
        .state('tablePagination', {
            url: '/table-pagination',
            templateUrl: 'scripts/controllers/table-pagination/table-pagination-index.html'
        });

    $locationProvider.html5Mode(true);
});