var TimeTrackerCtrl = function ($scope, TimeTrackerService, $q, $http, $timeout, $uibModal) {
    var tt = this;

    tt.JSON_LOCAL_TIME_TRACKER = null;
    tt.title = 'List tasks';

    tt.values = TimeTrackerService.values;

    tt.timeCounter = 0;
    tt.btnStartTask = [];
    tt.btnDisableStartTimeTracker = true;
    tt.devProgress = false;
    tt.editTimeTaskID = 0;
    var timer = true;

    /* variables for pagination */
    tt.tableLength = 5;
    tt.currentPage = 1;
    tt.totalItems = tt.values.length;
    tt.itemsPerPage = tt.tableLength;

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
        tt.updateDataTable();
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
        tt.getValue();
    };

    /*
     *  Start timer time tasks
     * */
    tt.startTimerTask = function (id) {
        tt.btnDisableStartTimeTracker = false;
        tt.btnStartTask[id] = true;
        tt.editTimeTaskID = id;
        tt.updateStatusTaskCounter(id);
        tt.startCounter(id);
    };

    /*
     *  Stop timer time tasks
     * */
    tt.stopTimerTask = function (id) {
        tt.btnDisableStartTimeTracker = true;
        tt.btnStartTask[id] = false;
        tt.stopCounter();
        tt.updateStatusTaskCounter(id);
        // method update task for LocalStorage
        TimeTrackerService.updateValueLocalStorage(tt.values);
        tt.timeCounter = 0;
    };

    /*
     * Start: Counter task
     * */
    tt.startCounter = function () {
        if (timer != null) {
            tt.updateCounter();
        } else {
            timer = 0;
            tt.updateCounter();
        }
    };

    /*
     * Stop: Counter task
     * */
    tt.stopCounter = function () {
        $timeout.cancel(timer);
        timer = null;
    };

    /*
     * Update: Counter task
     * */
    tt.updateCounter = function () {
        tt.timeCounter++;
        tt.values[tt.editTimeTaskID].time += 1;
        timer = $timeout(tt.startCounter, 1000);
    };


    /*
     * Update: Status task counter
     * */
    tt.updateStatusTaskCounter = function (id) {
        tt.values[id].status = (tt.values[id].status === 'open') ? 'progress' : 'progress';
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
     * Set number page pagination
     * */
    tt.setPage = function (number) {
        tt.currentPage = number;
    };

    /*
     * Change pagination item
     * */
    tt.pageChanged = function () {
        console.log('Page changed to: ' + tt.currentPage);
    };

    /*
     * Set count row tables
     * */
    tt.setItemsPerPage = function (number) {
        tt.itemsPerPage = number;
        tt.currentPage = 1; //reset to first page
    };

    /*
     * Get data for table with pagination
     * */
    tt.getDataTable = function () {
        return tt.values.slice(((tt.currentPage - 1) * tt.itemsPerPage), ((tt.currentPage) * tt.itemsPerPage));
    };

    /*
     * Update data for table with pagination
     * */
    tt.updateDataTable = function () {
        tt.dataTable = tt.getDataTable();
        tt.totalItems = tt.values.length;
        tt.itemsPerPage = tt.itemsPerPage ? tt.itemsPerPage : tt.tableLength;
    };

    /*
     * Sort table
     * */
    tt.sort = function (key) {
        $scope.sortKey = key;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    };

    /*
     * Init Time Tracker Controller
     * */
    tt.initTimeTrackerCtrl();

};

TimeTrackerCtrl.$inject = ['$scope', 'TimeTrackerService', '$q', '$http', '$timeout', '$uibModal'];
angular.module('app').controller('TimeTrackerCtrl', TimeTrackerCtrl);