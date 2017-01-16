var TimeTrackerCtrl = function (LocalStorageService, $q, $http, $timeout, $uibModal) {
    var tt = this;

    tt.KEY_LOCAL_TIME_TRACKER = 'timeTrackerData';
    tt.JSON_LOCAL_TIME_TRACKER = null;
    tt.title = 'Time tracker';
    tt.values = [];
    // tt.addTask = {};
    // tt.addTask.name = '';
    // tt.addTask.time = '';
    // tt.addTask.message = '';
    // tt.addTask.cost = '';
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
     * Generation Value JSON
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
     *  Remove all tasks with LocalStorage
     * */
    tt.removeValue = function () {
        LocalStorageService.removeString(tt.KEY_LOCAL_TIME_TRACKER);
        tt.getValue();
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
     *  Write tasks for LocalStorage
     * */
    tt.addValueLocalStorage = function (jsonValues) {
        LocalStorageService.setObject(tt.KEY_LOCAL_TIME_TRACKER, jsonValues);
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
     * openModal
     * */
    tt.openModal = function (size) {
        var modalInstance = $uibModal.open({
            templateUrl: 'scripts/controllers/time-tracker/modal/add-time-tracker.html',
            controller: 'TimeTrackerModalCtrl',
            controllerAs: '$ctrl',
            size: size,
            resolve: {
                addTask: function () {
                    return tt.addTask;
                }
            }
        });

        modalInstance.result.then(function (response) {
            tt.getValue();
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    };

    /*
     * Init Time Tracker Controller
     * */
    tt.initTimeTrackerCtrl();

};

TimeTrackerCtrl.$inject = ['LocalStorageService', '$q', '$http', '$timeout', '$uibModal'];
angular.module('app').controller('TimeTrackerCtrl', TimeTrackerCtrl);