var TimeTrackerCtrl = function (LocalStorageService, $q, $http, $timeout) {
    var tt = this;

    tt.KEY_LOCAL_TIME_TRACKER = 'timeTrackerData';
    tt.JSON_LOCAL_TIME_TRACKER = null;
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
        tt.generationValueJson();
    };

    /*
     * Function init controller
     * */
    tt.generationValueJson = function () {
        $http.get("/api/mainTimeTracking.json")
            .then(
                function (response) {
                    tt.JSON_LOCAL_TIME_TRACKER = response.data;
                },
                function (error) {
                    console.log("The request failed: " + error);
                });
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
     *  Remove element from values tasks
     * */
    tt.removeTask = function (id) {
        tt.deleteItemArray(id, tt.values);
        tt.deleteNullUndefinedFromArray();
        tt.addValueLocalStorage(tt.values);
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
     * Delete element from array
     * */
    tt.deleteItemArray = function (id, array) {
        delete array[id];
    };

    /*
     * Delete null and undefined from array values tasks
     * */
    tt.deleteNullUndefinedFromArray = function () {
        tt.values = tt.values.filter(function (x) {
            return x !== undefined && x !== null;
        });
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
     * Time format
     * */
    tt.timeFormat = function (number) {
        function num(val) {
            val = Math.floor(val);
            return val < 10 ? '0' + val : val;
        }

        var sec = number,
            hours = sec / 3600 % 24,
            minutes = sec / 60 % 60,
            seconds = sec % 60;
        return num(hours) + ":" + num(minutes) + ":" + num(seconds);
    };

    /*
     * Init Time Tracker Controller
     * */
    tt.initTimeTrackerCtrl();

};

TimeTrackerCtrl.$inject = ['LocalStorageService', '$q', '$http', '$timeout'];
angular.module('app').controller('TimeTrackerCtrl', TimeTrackerCtrl);