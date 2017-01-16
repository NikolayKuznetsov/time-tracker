var TimeTrackerCtrl = function (LocalStorageService) {
    var tt = this;

    tt.KEY_LOCAL_TIME_TRACKER = 'time-tracker-values';
    tt.JSON_LOCAL_TIME_TRACKER = [
        {
            'title': 'test 1',
            'time': '1',
            'message': 'lorem 1',
            'cost': '1200'
        }, {
            'title': 'test 2',
            'time': '2',
            'message': 'lorem 2',
            'cost': '100'
        }, {
            'title': 'test 3',
            'time': '3',
            'message': 'lorem 3',
            'cost': '300'
        }
    ];
    tt.title = 'Time tracker';
    tt.values = [];
    tt.addTask = {};
    tt.addTask.name = '';
    tt.addTask.time = '';
    tt.addTask.message = '';
    tt.addTask.cost = '';

    /*
     * Function init controller
     * */
    tt.initTimeTrackerCtrl = function () {
        tt.getValue();
    };

    /*
     *  Generation tasks
     * */
    tt.generationValue = function () {
        tt.addValueLocalStorage(tt.JSON_LOCAL_TIME_TRACKER);
        tt.getValue();
    };

    /*
     *  Get all tasks with LocalStorage
     * */
    tt.getValue = function () {
        tt.values = LocalStorageService.getObject(tt.KEY_LOCAL_TIME_TRACKER);
    };

    /*
     *  Write tasks for LocalStorage
     * */
    tt.addValueLocalStorage = function (jsonValues) {
        LocalStorageService.setObject(tt.KEY_LOCAL_TIME_TRACKER, jsonValues);
    };

    /*
     *  Remove all tasks with LocalStorage
     * */
    tt.removeValue = function () {
        LocalStorageService.removeString(tt.KEY_LOCAL_TIME_TRACKER);
        tt.getValue();
    };

    /*
     *  Add new task for list and LocalStorage
     * */
    tt.addNewTask = function () {
        tt.values.push({
            title: tt.addTask.name,
            time: tt.addTask.time,
            message: tt.addTask.message,
            cost: tt.addTask.cost
        });
        tt.addValueLocalStorage(tt.values);
        // Clean form
        tt.cleanForm();
    };

    /*
     * Clean from create task
     * */
    tt.cleanForm = function () {
        tt.addTask.name = tt.addTask.time = tt.addTask.message = tt.addTask.cost = '';
    };

    /*
     * Init Time Tracker Controller
     * */
    tt.initTimeTrackerCtrl();

};

TimeTrackerCtrl.$inject = ['LocalStorageService'];
angular.module('app').controller('TimeTrackerCtrl', TimeTrackerCtrl);