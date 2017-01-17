var TimeTrackerModalCtrl = function ($uibModalInstance, TimeTrackerService) {
    var ttm = this;
    ttm.addTask = {};
    ttm.addTask.name = '';
    ttm.addTask.time = '';
    ttm.addTask.message = '';
    ttm.addTask.cost = '';
    ttm.values = TimeTrackerService.values;
    ttm.valuesAdd = [];


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
        ttm.addValuesArray(ttm.addTask.name, ttm.addTask.time, ttm.addTask.message, ttm.addTask.cost);

        TimeTrackerService.addValueLocalStorage(ttm.valuesAdd);
        // Clean form
        ttm.cleanForm();
        $uibModalInstance.close();
        ttm.getValue();
    };

    /*
     * Add value for array values
     * */
    ttm.addValuesArray = function (title, time, message, cost) {
        ttm.valuesAdd = [{'title': title, 'time': time, 'message': message, 'cost': cost}];
    };

    /*
     *  Get all tasks with LocalStorage
     * */
    ttm.getValue = function () {
        ttm.values = TimeTrackerService.values;
    };

    /*
     * Clean from create task
     * */
    ttm.cleanForm = function () {
        ttm.addTask.name = ttm.addTask.time = ttm.addTask.message = ttm.addTask.cost = '';
    };


};

TimeTrackerModalCtrl.$inject = ['$uibModalInstance', 'TimeTrackerService'];
angular.module('app').controller('TimeTrackerModalCtrl', TimeTrackerModalCtrl);