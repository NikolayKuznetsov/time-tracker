var TimeTrackerCtrl = function (TimeTrackerService, $q, $http, $timeout, $uibModal) {
    var vm = this;

    vm.jsonLocalTimeTrackerGeneration = [];
    vm.title = 'List tasks';
    
    vm.btnStartTask = [];
    vm.btnDisableStartTimeTracker = true;
    vm.devProgress = true;
    vm.editTimeTaskID = 0;
    var timer = true;

    /* variables for pagination */
    vm.tableLength = 5;
    vm.currentPage = 1;
    vm.totalItems = TimeTrackerService.values.length;
    vm.itemsPerPage = vm.tableLength;

    /*
     * Function init controller
     * */
    vm.initTimeTrackerCtrl = function () {
        vm.generationValueJson();
    };

    /*
     * Generation Value JSON
     * */
    vm.generationValueJson = function () {
        $http.get("/api/mainTimeTracking.json")
            .then(
                function (response) {
                    vm.jsonLocalTimeTrackerGeneration = response.data;
                },
                function (error) {
                    console.log("The request failed: " + error);
                });
    };

    /*
     *  Generation tasks
     * */
    vm.generationValue = function () {
        TimeTrackerService.addValueLocalStorage(vm.jsonLocalTimeTrackerGeneration);
        vm.getValue();
    };

    /*
     *  Get all list tasks
     * */
    vm.getValue = function () {
        vm.updateDataTable();
    };

    /*
     *  Remove all tasks with LocalStorage
     * */
    vm.removeValue = function () {
        TimeTrackerService.removeValue();
        vm.getValue();
    };

    /*
     *  Remove element from values tasks
     * */
    vm.removeTask = function (id) {
        TimeTrackerService.removeTask(id);
        vm.getValue();
    };

    /*
     *  Get index remove task
     * */
    vm.getRemoveTask = function (index) {
        return index + ((vm.currentPage - 1) * vm.itemsPerPage);
    };

    /*
     *  Start timer time tasks
     * */
    vm.startTimerTask = function (id) {
        vm.btnDisableStartTimeTracker = false;
        vm.btnStartTask[id] = true;
        vm.editTimeTaskID = id;
        vm.updateStatusTaskCounter(id);
        vm.startCounter(id);
    };

    /*
     *  Stop timer time tasks
     * */
    vm.stopTimerTask = function (id) {
        vm.btnDisableStartTimeTracker = true;
        vm.btnStartTask[id] = false;
        vm.stopCounter();
        vm.updateStatusTaskCounter(id);
        // method update task for LocalStorage
        TimeTrackerService.updateValueLocalStorage(TimeTrackerService.values);
    };

    /*
     * Start: Counter task
     * */
    vm.startCounter = function () {
        if (timer) {
            vm.updateCounter();
        }
    };

    /*
     * Stop: Counter task
     * */
    vm.stopCounter = function () {
        $timeout.cancel(timer);
        timer = true;
    };

    /*
     * Update: Counter task
     * */
    vm.updateCounter = function () {
        TimeTrackerService.values[vm.editTimeTaskID].time += 1;
        timer = $timeout(vm.startCounter, 1000);
    };


    /*
     * Update: Status task counter
     * */
    vm.updateStatusTaskCounter = function (id) {
        TimeTrackerService.values[id].status = (TimeTrackerService.values[id].status === 'open') ? 'progress' : 'progress';
    };

    /*
     * Modal Add Task
     * */
    vm.openModalAddTask = function (size) {
        var modalInstance = $uibModal.open({
            templateUrl: 'scripts/components/time-tracker/modal/add-time-tracker.html',
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
            vm.getValue();
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    };

    /*
     * Modal Edit Task
     * */
    vm.editTask = function (id) {
        var modalInstance = $uibModal.open({
            templateUrl: 'scripts/components/time-tracker/modal/add-time-tracker.html',
            controller: 'TimeTrackerModalCtrl',
            controllerAs: '$ctrl',
            size: 'sm',
            resolve: {
                data: function () {
                    return TimeTrackerService.values[id];
                }
            }
        });
        modalInstance.result.then(function () {
            vm.getValue();
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    };

    /*
     * Set number page pagination
     * */
    vm.setPage = function (number) {
        vm.currentPage = number;
    };

    /*
     * Change pagination item
     * */
    vm.pageChanged = function () {
        console.log('Page changed to: ' + vm.currentPage);
    };

    /*
     * Set count row tables
     * */
    vm.setItemsPerPage = function (number) {
        vm.itemsPerPage = number;
        vm.currentPage = 1; //reset to first page
    };

    /*
     * Get data for table with pagination
     * */
    vm.getDataTable = function () {
        return vm.totalItems === 0 ? [] : TimeTrackerService.values.slice(((vm.currentPage - 1) * vm.itemsPerPage), ((vm.currentPage) * vm.itemsPerPage));
    };

    /*
     * Update data for table with pagination
     * */
    vm.updateDataTable = function () {
        vm.totalItems = TimeTrackerService.values.length;
        vm.currentPage = vm.totalItems == 0 ? 1 : vm.itemsPerPage * (vm.currentPage - 1) == vm.totalItems ? vm.currentPage - 1 : vm.currentPage;
    };

    /*
     * Sort table
     * */
    vm.sort = function (key) {
        vm.sortKey = key;   //set the sortKey to the param passed
        vm.reverse = !vm.reverse; //if true make it false and vice versa
    };

    /*
     * Init Time Tracker Controller
     * */
    vm.initTimeTrackerCtrl();

};

TimeTrackerCtrl.$inject = ['TimeTrackerService', '$q', '$http', '$timeout', '$uibModal'];
angular.module('app').controller('TimeTrackerCtrl', TimeTrackerCtrl);