var TimeTrackerCtrl = function (LocalStorageService) {
    var tt = this;

    tt.keyLocalTimeTracker = 'time-tracker-values';
    tt.jsonLocalTimeTracker = {
        '1': {
            'title': 'test 1',
            'time': '1',
            'message': 'lorem 1',
            'cost': '1200'
        },
        '2': {
            'title': 'test 2',
            'time': '2',
            'message': 'lorem 2',
            'cost': '100'
        },
        '3': {
            'title': 'test 3',
            'time': '3',
            'message': 'lorem 3',
            'cost': '300'
        }
    };
    tt.title = 'Time tracker';
    tt.values = [];
    tt.addTask = {};
    tt.addTask.name = '';
    tt.addTask.time = '';
    tt.addTask.message = '';
    tt.addTask.cost = '';

    tt.initTimeTrackerCtrl = function () {
        // tt.generationValue();
        tt.getValue();
    };

    tt.generationValue = function () {
        LocalStorageService.setObject(tt.keyLocalTimeTracker, tt.jsonLocalTimeTracker);
        tt.getValue();
    };

    tt.getValue = function () {
        tt.values = LocalStorageService.getObject(tt.keyLocalTimeTracker);
    };

    tt.removeValue = function () {
        LocalStorageService.removeString(tt.keyLocalTimeTracker);
        tt.getValue();
    };

    tt.addNewTask = function () {
        // console.log(tt.addTask.name);
        // console.log(tt.addTask.time);
        // console.log(tt.addTask.message);
        // console.log(tt.addTask.cost);
        // tt.values[tt.values.length];
        console.log(tt.values);
        // tt.values.push({
        //     title: tt.addTask.name,
        //     time: tt.addTask.time,
        //     message: tt.addTask.message,
        //     cost: tt.addTask.cost
        // });
        // console.log(tt.values);
    };

    tt.initTimeTrackerCtrl();

};

TimeTrackerCtrl.$inject = ['LocalStorageService'];
angular.module('app').controller('TimeTrackerCtrl', TimeTrackerCtrl);