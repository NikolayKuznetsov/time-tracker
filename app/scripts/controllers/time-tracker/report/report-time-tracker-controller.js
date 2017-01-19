var ReportTimeTrackerCtrl = function (TimeTrackerService) {
    var rtt = this;

    rtt.values = TimeTrackerService.values;

    /*
     * Function init controller
     * */
    rtt.initReportTimeTrackerCtrl = function () {
        // TimeTrackerService.getValue();
        // rtt.getValue();
    };

    /*
     *  Get all list tasks
     * */
    rtt.getValue = function () {
        rtt.values = TimeTrackerService.values;
    };

    rtt.getReportCost = function () {
        var sum = 0;

        for (var i = 0; i < rtt.values.length; i++) {
            sum += rtt.values[i].cost * (rtt.values[i].time / 3600)
        }

       console.log(sum);
    };

    /*
     * Init Report Time Tracker Controller
     * */
    rtt.initReportTimeTrackerCtrl();


};

ReportTimeTrackerCtrl.$inject = ['TimeTrackerService'];
angular.module('app').controller('ReportTimeTrackerCtrl', ReportTimeTrackerCtrl);