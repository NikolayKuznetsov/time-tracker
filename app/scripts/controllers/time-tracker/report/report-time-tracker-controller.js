var ReportTimeTrackerCtrl = function (TimeTrackerService) {
    var rtt = this;
    rtt.values = TimeTrackerService.values;


};

ReportTimeTrackerCtrl.$inject = ['TimeTrackerService'];
angular.module('app').controller('ReportTimeTrackerCtrl', ReportTimeTrackerCtrl);