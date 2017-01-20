var uiRouter = function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $stateProvider
        .state('index', {
            url: '/',
            templateUrl: "index.html"
        })
        .state('timeTracker.report', {
            url: "/report",
            templateUrl: "scripts/controllers/time-tracker/report/report-time-tracker-index.html"
        });

    $urlRouterProvider.otherwise('/');
};

uiRouter.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
angular.module('app').config(uiRouter);