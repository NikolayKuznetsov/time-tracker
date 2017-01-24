var ReportTimeTrackerCtrl = function (TimeTrackerService) {
    var vm = this;

    var STATUS_OPEN = 'open';
    var STATUS_PROGRESS = 'progress';
    var STATUS_CLOSE = 'close';

    vm.chartPieLabels = ["Open", "Progress", "Close"];
    vm.chartPieCharts = [];
    vm.chartPieOptions = {
        maintainAspectRatio: true,
        responsive: true
    };
    vm.chartPieColours = ["rgb(73,71,80)", "rgb(153,153,153)", "rgb(204,51,33)"];


    vm.chartBarLabels = ['2016', '2017'];
    vm.chartBarSeries = vm.chartPieLabels;

    vm.chartBarData = [
        [55, 40],
        [27, 90],
        [17, 40]
    ];

    /*
     * Function init controller
     * */
    vm.initReportTimeTrackerCtrl = function () {
        vm.setReportCost();
    };

    /*
     * Get value cost for status
     * */
    vm.getReportCost = function (status) {
        var sum = 0;
        if (TimeTrackerService.values !== null) {
            for (var i = 0; i < TimeTrackerService.values.length; i++) {
                if (TimeTrackerService.values[i].status === status) {
                    sum += TimeTrackerService.values[i].cost * (TimeTrackerService.values[i].time / 3600)
                }
            }
        }

        return sum;
    };

    /*
     * Set report cost
     * */
    vm.setReportCost = function () {
        vm.chartPieCharts[vm.chartPieCharts.length] = vm.getReportCost(STATUS_OPEN);
        vm.chartPieCharts[vm.chartPieCharts.length] = vm.getReportCost(STATUS_PROGRESS);
        vm.chartPieCharts[vm.chartPieCharts.length] = vm.getReportCost(STATUS_CLOSE);
    };

    /*
     * Init Report Time Tracker Controller
     * */
    vm.initReportTimeTrackerCtrl();


};

ReportTimeTrackerCtrl.$inject = ['TimeTrackerService'];
angular.module('app').controller('ReportTimeTrackerCtrl', ReportTimeTrackerCtrl);