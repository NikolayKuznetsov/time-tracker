angular.module('app').config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    var header = {
        templateUrl: 'scripts/components/header/header-index.html',
        controller: 'HeaderCtrl',
        controllerAs: 'header'
    };

    // $locationProvider.hashPrefix('');
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('index', {
            url: '/',
            views: {
                'main': {
                    templateUrl: 'scripts/components/main/main-index.html'
                },
                'header': header
            }
        })
        .state('login', {
            url: '/login',
            views: {
                'main': {
                    templateUrl: 'scripts/components/login/login-index.html'
                }
            }
        })
        .state('timeTracker', {
            url: '/time-tracker',
            views: {
                'main': {
                    templateUrl: 'scripts/components/time-tracker/time-tracker-index.html'
                },
                'header': header
            }
        })
        .state('timeTrackerReport', {
            url: '/time-tracker-report',
            views: {
                'main': {
                    templateUrl: 'scripts/components/time-tracker/report/report-time-tracker-index.html'
                },
                'header': header
            }
        });
        // .state('tablePagination', {
        //     url: '/table-pagination',
        //     templateUrl: 'scripts/components/table-pagination/table-pagination-index.html'
        // });

    $locationProvider.html5Mode(true);
});