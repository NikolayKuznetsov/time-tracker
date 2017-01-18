var TimeTrackerModalCtrl = function ($uibModalInstance, TimeTrackerService, data) {
    var ttm = this;
    ttm.addTask = {};
    ttm.addTask.name = data ? data.name : '';
    ttm.addTask.time = data ? data.time : '';
    ttm.addTask.message = data ? data.message : '';
    ttm.addTask.cost = data ? data.cost : '';
    ttm.values = TimeTrackerService.values;
    ttm.valuesAdd = [];
    ttm.id = data ? data.id : null;

    console.log(ttm.values);

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
        ttm.addValuesArray(ttm.values.length, ttm.addTask.name, ttm.addTask.time, ttm.addTask.message, ttm.addTask.cost);

        TimeTrackerService.addValueLocalStorage(ttm.valuesAdd);
        // Clean form
        ttm.cleanForm();
        $uibModalInstance.close();
        ttm.getValue();
    };

    /*
     * Add value for array values
     * */
    ttm.addValuesArray = function (id, name, time, message, cost) {
        ttm.addValuesJSON(id, name, time, message, cost);
        ttm.valuesAdd = [ttm.valuesAdd];
    };

    /*
     * Add value for JSON values
     * */
    ttm.addValuesJSON = function (id, name, time, message, cost) {
        ttm.valuesAdd = {'id': id, 'name': name, 'time': time, 'message': message, 'cost': cost};
    };

    /*
     *  Edit task for list and LocalStorage
     * */
    ttm.editTask = function (id) {
        ttm.addValuesJSON(id, ttm.addTask.name, ttm.addTask.time, ttm.addTask.message, ttm.addTask.cost);
        ttm.values[id] = ttm.valuesAdd;
        TimeTrackerService.updateValueLocalStorage(ttm.values);
        // Clean form
        ttm.cleanForm();
        $uibModalInstance.close();
        ttm.getValue();
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

TimeTrackerModalCtrl.$inject = ['$uibModalInstance', 'TimeTrackerService', 'data'];
angular.module('app').controller('TimeTrackerModalCtrl', TimeTrackerModalCtrl);