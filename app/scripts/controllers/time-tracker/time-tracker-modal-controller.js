var TimeTrackerModalCtrl = function ($uibModalInstance, LocalStorageService) {
    ttm = this;

    ttm.KEY_LOCAL_TIME_TRACKER = 'timeTrackerData';
    ttm.addTask = {};
    ttm.addTask.name = '';
    ttm.addTask.time = '';
    ttm.addTask.message = '';
    ttm.addTask.cost = '';
    ttm.values = [];

    /*
     * Validation from create task
     * */
    ttm.validationForm = function () {
        if (ttm.addTask.name == '' || ttm.addTask.time == '' || ttm.addTask.message == '' || ttm.addTask.cost == '') {
            return true;
        }
    };

    /*
     *  Add new task for list and LocalStorage
     * */
    ttm.addNewTask = function () {
        ttm.getValue();
        if (ttm.values === null) {
            ttm.addValuesNewArray(ttm.addTask.name, ttm.addTask.time, ttm.addTask.message, ttm.addTask.cost);
        } else {
            ttm.addValuesArray(ttm.addTask.name, ttm.addTask.time, ttm.addTask.message, ttm.addTask.cost);
        }
        ttm.addValueLocalStorage(ttm.values);
        // Clean form
        ttm.cleanForm();
        $uibModalInstance.close();
    };

    /*
     *  Get all tasks with LocalStorage
     * */
    ttm.getValue = function () {
        ttm.values = LocalStorageService.getObject(ttm.KEY_LOCAL_TIME_TRACKER);
    };

    /*
     * Add value for new array values
     * */
    ttm.addValuesNewArray = function (title, time, message, cost) {
        ttm.values = [{'title': title, 'time': time, 'message': message, 'cost': cost}];
    };

    /*
     * Add value for array values
     * */
    ttm.addValuesArray = function (title, time, message, cost) {
        ttm.values.push({'title': title, 'time': time, 'message': message, 'cost': cost});
    };

    /*
     *  Write tasks for LocalStorage
     * */
    ttm.addValueLocalStorage = function (jsonValues) {
        LocalStorageService.setObject(ttm.KEY_LOCAL_TIME_TRACKER, jsonValues);
    };

    /*
     * Clean from create task
     * */
    ttm.cleanForm = function () {
        ttm.addTask.name = ttm.addTask.time = ttm.addTask.message = ttm.addTask.cost = '';
    };


};

TimeTrackerModalCtrl.$inject = ['$uibModalInstance', 'LocalStorageService'];
angular.module('app').controller('TimeTrackerModalCtrl', TimeTrackerModalCtrl);