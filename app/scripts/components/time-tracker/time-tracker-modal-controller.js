var TimeTrackerModalCtrl = function ($uibModalInstance, TimeTrackerService, data, moment, $filter) {
    var vm = this;
    var dateEdit = data ? new Date(data.time * 1000) : undefined;
    vm.addTask = {};
    vm.addTask.name = data ? data.name : '';
    vm.addTask.time = data ? new Date(dateEdit.getUTCFullYear(), dateEdit.getUTCMonth(), dateEdit.getUTCDate(), dateEdit.getUTCHours(), dateEdit.getUTCMinutes(), dateEdit.getUTCSeconds()) : '';
    vm.addTask.message = data ? data.message : '';
    vm.addTask.cost = data ? data.cost : '';
    vm.addTask.status = data ? data.status : '';
    vm.valuesAdd = [];
    vm.id = data ? data.id : -1;

    /*
     * Validation from create task
     * */
    vm.validationForm = function () {
        if (vm.addTask.name == '' || vm.addTask.time == '' || vm.addTask.message == '' || vm.addTask.cost == '' || vm.addTask.status == '') {
            return true;
        }
    };

    /*
     *  Add new task for list and LocalStorage
     * */
    vm.addNewTask = function () {

        vm.addValuesArray(TimeTrackerService.values === null ? 0 : TimeTrackerService.values.length, vm.addTask.name, vm.convertDateToSeconds(vm.addTask.time), vm.addTask.message, vm.addTask.cost, vm.addTask.status, new Date());

        TimeTrackerService.addValueLocalStorage(vm.valuesAdd);
        // Clean form
        vm.cleanForm();
        $uibModalInstance.close();
    };

    /*
     * Add value for array values
     * */
    vm.addValuesArray = function (id, name, time, message, cost, status, dateCreate) {
        vm.addValuesJSON(id, name, time, message, cost, status, dateCreate);
        vm.valuesAdd = [vm.valuesAdd];
    };

    /*
     * Add value for JSON values
     * */
    vm.addValuesJSON = function (id, name, time, message, cost, status, dateCreate) {
        vm.valuesAdd = {
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
    vm.editTask = function (id) {
        vm.addValuesJSON(id, vm.addTask.name, vm.convertDateToSeconds(vm.addTask.time), vm.addTask.message, vm.addTask.cost, vm.addTask.status, TimeTrackerService.values[id].dateCreate);
        TimeTrackerService.values[id] = vm.valuesAdd;
        TimeTrackerService.updateValueLocalStorage(TimeTrackerService.values);
        // Clean form
        vm.cleanForm();
        $uibModalInstance.close();
    };

    /*
     * Clean from create task
     * */
    vm.cleanForm = function () {
        vm.addTask.name = vm.addTask.time = vm.addTask.message = vm.addTask.cost = vm.addTask.status = '';
    };

    /*
     * Convert date to seconds
     * */
    vm.convertDateToSeconds = function (date) {
        // var newDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
        return moment.duration($filter('date')(new Date(date), 'HH:mm:ss'), "HH:mm:ss").asSeconds();
    };

    /*
     * convertDateUTC
     * */
    vm.convertDateUTC = function (date) {
        // return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
        var d = new Date(date * 1000);
        return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());
    };

};

TimeTrackerModalCtrl.$inject = ['$uibModalInstance', 'TimeTrackerService', 'data', 'moment', '$filter'];
angular.module('app').controller('TimeTrackerModalCtrl', TimeTrackerModalCtrl);