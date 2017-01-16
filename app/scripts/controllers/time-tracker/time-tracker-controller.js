var TimeTrackerCtrl = function (LocalStorageService, $timeout) {
    var tt = this;

    tt.KEY_LOCAL_TIME_TRACKER = 'timeTrackerData';
    tt.JSON_LOCAL_TIME_TRACKER = [
        {
            'title': 'Task #1',
            'time': '120',
            'message': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae, vel.',
            'cost': '1200'
        }, {
            'title': 'Task #2',
            'time': '220',
            'message': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae, vel.',
            'cost': '100'
        }, {
            'title': 'Task #3',
            'time': '360',
            'message': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae, vel.',
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
    tt.timeCounter = 0;
    tt.btnStartTimer = false;
    var timer = true;

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
        if (tt.values === null) {
            tt.addValuesNewArray(tt.addTask.name, tt.addTask.time, tt.addTask.message, tt.addTask.cost);
        } else {
            tt.addValuesArray(tt.addTask.name, tt.addTask.time, tt.addTask.message, tt.addTask.cost);
        }
        tt.addValueLocalStorage(tt.values);
        // Clean form
        tt.cleanForm();
    };

    /*
     * Add value for new array values
     * */
    tt.addValuesNewArray = function (title, time, message, cost) {
        tt.values = [{'title': title, 'time': time, 'message': message, 'cost': cost}];
    };

    /*
     * Add value for array values
     * */
    tt.addValuesArray = function (title, time, message, cost) {
        tt.values.push({'title': title, 'time': time, 'message': message, 'cost': cost});
    };

    /*
     * Clean from create task
     * */
    tt.cleanForm = function () {
        tt.addTask.name = tt.addTask.time = tt.addTask.message = tt.addTask.cost = '';
    };

    /*
     * Validation from create task
     * */
    tt.validationForm = function () {
        if (tt.addTask.name == '' || tt.addTask.time == '' || tt.addTask.message == '' || tt.addTask.cost == '') {
            return true;
        }
    };

    /*
     * Start: Counter task
     * */
    tt.startCounter = function () {
        if (timer != null) {
            tt.updateCounter();
            tt.btnStartTimer = true;
        } else {
            timer = 0;
            tt.updateCounter();
            tt.btnStartTimer = true;
        }
    };

    /*
     * Stop: Counter task
     * */
    tt.stopCounter = function () {
        $timeout.cancel(timer);
        tt.btnStartTimer = false;
        timer = null;
    };

    /*
     * Update: Counter task
     * */
    tt.updateCounter = function () {
        tt.timeCounter++;
        timer = $timeout(tt.startCounter, 1000);
    };

    /*
     * Init Time Tracker Controller
     * */
    tt.initTimeTrackerCtrl();

};

TimeTrackerCtrl.$inject = ['LocalStorageService', '$timeout'];
angular.module('app').controller('TimeTrackerCtrl', TimeTrackerCtrl);