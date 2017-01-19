var ReportTimeTrackerCtrl = function (TimeTrackerService) {
    var rtt = this;

    rtt.values = TimeTrackerService.values;

    /*
     * Function init controller
     * */
    rtt.initReportTimeTrackerCtrl = function () {
        TimeTrackerService.getValue();
        rtt.getValue();
    };

    /*
     *  Get all list tasks
     * */
    rtt.getValue = function () {
        rtt.values = TimeTrackerService.values;
    };

    rtt.getReportCost = function (status) {
        rtt.getValue();

        var sum = 0;
        if (rtt.values !== null) {
            for (var i = 0; i < rtt.values.length; i++) {
                if (rtt.values[i].status === status) {
                    console.log(rtt.values[i].time / 3600);
                    sum += rtt.values[i].cost * (rtt.values[i].time / 3600)
                }
            }
        }

        return sum;
    };

    /*
     * Init Report Time Tracker Controller
     * */
    rtt.initReportTimeTrackerCtrl();


};

ReportTimeTrackerCtrl.$inject = ['TimeTrackerService'];
angular.module('app').controller('ReportTimeTrackerCtrl', ReportTimeTrackerCtrl);