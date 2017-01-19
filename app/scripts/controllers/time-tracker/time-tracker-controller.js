var TimeTrackerCtrl = function (LocalStorageService, TimeTrackerService, $q, $http, $timeout, $uibModal) {
    var tt = this;

    tt.KEY_LOCAL_TIME_TRACKER = 'timeTrackerData';
    tt.JSON_LOCAL_TIME_TRACKER = null;
    tt.title = 'Time tracker';

    tt.values = TimeTrackerService.values;

    tt.timeCounter = 0;
    tt.btnStartTimer = false;
    tt.devProgress = true;
    var timer = true;

    /*
     * Function init controller
     * */
    tt.initTimeTrackerCtrl = function () {
        tt.generationValueJson();
        TimeTrackerService.getValue();
        tt.getValue();
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
        TimeTrackerService.addValueLocalStorage(tt.JSON_LOCAL_TIME_TRACKER);
        tt.getValue();
    };

    /*
     *  Get all list tasks
     * */
    tt.getValue = function () {
        tt.values = TimeTrackerService.values;
    };

    /*
     *  Remove all tasks with LocalStorage
     * */
    tt.removeValue = function () {
        TimeTrackerService.removeValue();
        tt.getValue();
    };

    /*
     *  Remove element from values tasks
     * */
    tt.removeTask = function (id) {
        TimeTrackerService.removeTask(id);
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
     * Modal Add Task
     * */
    tt.openModalAddTask = function (size) {
        var modalInstance = $uibModal.open({
            templateUrl: 'scripts/controllers/time-tracker/modal/add-time-tracker.html',
            controller: 'TimeTrackerModalCtrl',
            controllerAs: '$ctrl',
            size: size,
            resolve: {
                data: function () {
                    return undefined;
                }
            }
        });

        modalInstance.result.then(function () {
            tt.getValue();
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    };

    /*
     * Modal Edit Task
     * */
    tt.editTask = function (id) {
        var modalInstance = $uibModal.open({
            templateUrl: 'scripts/controllers/time-tracker/modal/add-time-tracker.html',
            controller: 'TimeTrackerModalCtrl',
            controllerAs: '$ctrl',
            size: 'sm',
            resolve: {
                data: function () {
                    return tt.values[id];
                }
            }
        });
        modalInstance.result.then(function () {
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

TimeTrackerCtrl.$inject = ['LocalStorageService', 'TimeTrackerService', '$q', '$http', '$timeout', '$uibModal'];
angular.module('app').controller('TimeTrackerCtrl', TimeTrackerCtrl);