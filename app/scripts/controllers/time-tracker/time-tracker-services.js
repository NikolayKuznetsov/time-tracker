var TimeTrackerService = function (LocalStorageService) {
    var tts = this;

    tts.KEY_LOCAL_TIME_TRACKER = 'timeTrackerData';
    tts.values = [];

    /*
     *  Get all tasks with LocalStorage
     * */
    tts.getValue = function () {
        console.log('getValue');

        tts.values = LocalStorageService.getObject(tts.KEY_LOCAL_TIME_TRACKER);
    };

    /*
     *  Write tasks for LocalStorage
     * */
    tts.addValueLocalStorage = function (jsonValues) {
        tts.values = tts.values.concat(jsonValues);

        LocalStorageService.setObject(tts.KEY_LOCAL_TIME_TRACKER, jsonValues);
    };

    /*
     *  Remove all tasks with LocalStorage
     * */
    tts.removeValue = function () {
        LocalStorageService.removeString(tts.KEY_LOCAL_TIME_TRACKER);
    };

    tts.removeTask = function (id) {
        tts.values.splice(id, 1);

        LocalStorageService.setObject(tts.KEY_LOCAL_TIME_TRACKER, tts.values);
    };

    return tts;

};

TimeTrackerService.$inject = ['LocalStorageService'];
angular.module('app').service('TimeTrackerService', TimeTrackerService);