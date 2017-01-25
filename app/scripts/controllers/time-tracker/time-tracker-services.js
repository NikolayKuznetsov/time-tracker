var TimeTrackerService = function (LocalStorageService) {
    var service = this;

    service.KEY_LOCAL_TIME_TRACKER = 'timeTrackerData';
    service.values = [];

    /*
     *  Get all tasks with LocalStorage
     * */
    service.getValue = function () {
        service.values = service.getObjectTask() === null ? [] : service.getObjectTask();
    };

    /*
     *  Write tasks for LocalStorage
     * */
    service.addValueLocalStorage = function (jsonValues) {
        if (!service.values.length) {
            service.values = jsonValues;
        } else {
            service.values = service.values.concat(jsonValues);
        }
        service.setObjectTask(service.values);
    };

    /*
     *  Update tasks for LocalStorage
     * */
    service.updateValueLocalStorage = function (jsonValues) {
        service.values = jsonValues;

        service.setObjectTask(service.values);
    };

    /*
     *  Remove all tasks with LocalStorage
     * */
    service.removeValue = function () {
        service.values = [];

        LocalStorageService.removeString(service.KEY_LOCAL_TIME_TRACKER);
    };

    /*
     *  Remove one task with LocalStorage
     * */
    service.removeTask = function (id) {
        service.values.splice(id, 1);

        service.setObjectTask(service.values);
    };

    /*
     *  Set object json for LocalStorage
     * */
    service.setObjectTask = function (json) {
        LocalStorageService.setObject(service.KEY_LOCAL_TIME_TRACKER, json);
    };

    /*
     *  Get object json for LocalStorage
     * */
    service.getObjectTask = function () {
        var array = LocalStorageService.getObject(service.KEY_LOCAL_TIME_TRACKER);
        if (array === null) array = [];
        return array;
    };

    service.getValue();


};

TimeTrackerService.$inject = ['LocalStorageService'];
angular.module('app').service('TimeTrackerService', TimeTrackerService);