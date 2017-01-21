var TimeTrackerModalCtrl = function ($uibModalInstance, TimeTrackerService, data, moment, $filter) {
    var ttm = this;
    var dateEdit = data ? new Date(data.time * 1000) : undefined;
    ttm.addTask = {};
    ttm.addTask.name = data ? data.name : '';
    ttm.addTask.time = data ? new Date(dateEdit.getUTCFullYear(), dateEdit.getUTCMonth(), dateEdit.getUTCDate(), dateEdit.getUTCHours(), dateEdit.getUTCMinutes(), dateEdit.getUTCSeconds()) : '';
    ttm.addTask.message = data ? data.message : '';
    ttm.addTask.cost = data ? data.cost : '';
    ttm.addTask.status = data ? data.status : '';
    ttm.values = TimeTrackerService.values;
    ttm.valuesAdd = [];
    ttm.id = data ? data.id : -1;

    /*
     * Validation from create task
     * */
    ttm.validationForm = function () {
        if (ttm.addTask.name == '' || ttm.addTask.time == '' || ttm.addTask.message == '' || ttm.addTask.cost == '' || ttm.addTask.status == '') {
            return true;
        }
    };

    /*
     *  Add new task for list and LocalStorage
     * */
    ttm.addNewTask = function () {

        ttm.addValuesArray(ttm.values == null ? 0 : ttm.values.length, ttm.addTask.name, ttm.convertDateToSeconds(ttm.addTask.time), ttm.addTask.message, ttm.addTask.cost, ttm.addTask.status, new Date());

        TimeTrackerService.addValueLocalStorage(ttm.valuesAdd);
        // Clean form
        ttm.cleanForm();
        $uibModalInstance.close();
        ttm.getValue();
    };

    /*
     * Add value for array values
     * */
    ttm.addValuesArray = function (id, name, time, message, cost, status, dateCreate) {
        ttm.addValuesJSON(id, name, time, message, cost, status, dateCreate);
        ttm.valuesAdd = [ttm.valuesAdd];
    };

    /*
     * Add value for JSON values
     * */
    ttm.addValuesJSON = function (id, name, time, message, cost, status, dateCreate) {
        ttm.valuesAdd = {
            'id': id,
            'name': name,
            'time': time,
            'message': message,
            'cost': cost,
            'status': status,
            'dateCreate': dateCreate
        };
    };

    /*
     *  Edit task for list and LocalStorage
     * */
    ttm.editTask = function (id) {
        ttm.addValuesJSON(id, ttm.addTask.name, ttm.convertDateToSeconds(ttm.addTask.time), ttm.addTask.message, ttm.addTask.cost, ttm.addTask.status, ttm.values[id].dateCreate);
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
        ttm.addTask.name = ttm.addTask.time = ttm.addTask.message = ttm.addTask.cost = ttm.addTask.status = '';
    };

    /*
     * Convert date to seconds
     * */
    ttm.convertDateToSeconds = function (date) {
        console.log(date);
        // var newDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
        return moment.duration($filter('date')(new Date(date), 'HH:mm:ss'), "HH:mm:ss").asSeconds();
    };

    /*
     * convertDateUTC
     * */
    ttm.convertDateUTC = function (date) {
        // return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
        var d = new Date(date * 1000);
        return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());
    };

};

TimeTrackerModalCtrl.$inject = ['$uibModalInstance', 'TimeTrackerService', 'data', 'moment', '$filter'];
angular.module('app').controller('TimeTrackerModalCtrl', TimeTrackerModalCtrl);