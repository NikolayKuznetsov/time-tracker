var TimeTrackerCtrl = function (LocalStorageService) {
    var tt = this;

    tt.keyLocalTimeTracker = 'time-tracker-values';
    tt.jsonLocalTimeTracker = {
        '1': {
            'title': 'test 1',
            'time': '1',
            'cost': '1200'
        },
        '2': {
            'title': 'test 2',
            'time': '2',
            'cost': '100'
        }
    };
    tt.title = 'Time tracker';
    tt.values = [];

    tt.initTimeTrackerCtrl = function () {
        console.log("init");
        tt.generationValue();
        tt.getValue();
    };

    tt.generationValue = function () {
        console.log("generationValue");
        LocalStorageService.setObject(tt.keyLocalTimeTracker, tt.jsonLocalTimeTracker);
    };

    tt.getValue = function () {
        console.log("getValue");
        tt.values = LocalStorageService.getObject(tt.keyLocalTimeTracker);
        console.log(tt.values)
    };

    tt.initTimeTrackerCtrl();

};

TimeTrackerCtrl.$inject = ['LocalStorageService'];
angular.module('app').controller('TimeTrackerCtrl', TimeTrackerCtrl);