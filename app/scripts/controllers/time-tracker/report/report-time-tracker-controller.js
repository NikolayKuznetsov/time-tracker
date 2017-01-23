var ReportTimeTrackerCtrl = function (TimeTrackerService) {
    var rtt = this;

    var STATUS_OPEN = 'open';
    var STATUS_PROGRESS = 'progress';
    var STATUS_CLOSE = 'close';

    rtt.values = TimeTrackerService.values;

    rtt.chartPieLabels = ["Open", "Progress", "Close"];
    rtt.chartPieCharts = [];
    rtt.chartPieOptions = {
        maintainAspectRatio: true,
        responsive: true
    };
    rtt.chartPieColours = ["rgb(73,71,80)", "rgb(153,153,153)", "rgb(204,51,33)"];


    rtt.chartBarLabels = ['2016', '2017'];
    rtt.chartBarSeries = rtt.chartPieLabels;

    rtt.chartBarData = [
        [55, 40],
        [27, 90],
        [17, 40]
    ];

    /*
     * Function init controller
     * */
    rtt.initReportTimeTrackerCtrl = function () {
        TimeTrackerService.getValue();
        rtt.getValue();
        rtt.setReportCost();
    };

    /*
     *  Get all list tasks
     * */
    rtt.getValue = function () {
        rtt.values = TimeTrackerService.values;
    };

    /*
     * Get value cost for status
     * */
    rtt.getReportCost = function (status) {
        rtt.getValue();

        var sum = 0;
        if (rtt.values !== null) {
            for (var i = 0; i < rtt.values.length; i++) {
                if (rtt.values[i].status === status) {
                    sum += rtt.values[i].cost * (rtt.values[i].time / 3600)
                }
            }
        }

        return sum;
    };

    /*
     * Set report cost
     * */
    rtt.setReportCost = function () {
        rtt.chartPieCharts[rtt.chartPieCharts.length] = rtt.getReportCost(STATUS_OPEN);
        rtt.chartPieCharts[rtt.chartPieCharts.length] = rtt.getReportCost(STATUS_PROGRESS);
        rtt.chartPieCharts[rtt.chartPieCharts.length] = rtt.getReportCost(STATUS_CLOSE);
    };


    /*
     * Init Report Time Tracker Controller
     * */
    rtt.initReportTimeTrackerCtrl();


};

ReportTimeTrackerCtrl.$inject = ['TimeTrackerService'];
angular.module('app').controller('ReportTimeTrackerCtrl', ReportTimeTrackerCtrl);