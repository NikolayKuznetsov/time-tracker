var uiRouter = function ($stateProvider, $urlRouterProvider) {

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

uiRouter.$inject = ['$stateProvider', '$urlRouterProvider'];
angular.module('app').config(uiRouter);