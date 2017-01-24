var TimeTrackerService = function (LocalStorageService) {
    var tts = this;

    tts.KEY_LOCAL_TIME_TRACKER = 'timeTrackerData';
    tts.values = LocalStorageService.getObject(tts.KEY_LOCAL_TIME_TRACKER);

    /*
     *  Get all tasks with LocalStorage
     * */
    tts.getValue = function () {
        tts.values = LocalStorageService.getObject(tts.KEY_LOCAL_TIME_TRACKER);
    };

    /*
     *  Write tasks for LocalStorage
     * */
    tts.addValueLocalStorage = function (jsonValues) {
        if (tts.values === null) {
            tts.values = jsonValues;
        } else {
            tts.values = tts.values.concat(jsonValues);
        }

        LocalStorageService.setObject(tts.KEY_LOCAL_TIME_TRACKER, tts.values);
    };

    /*
     *  Update tasks for LocalStorage
     * */
    tts.updateValueLocalStorage = function (jsonValues) {
        // remove all task for LocalStorage
        // tts.removeValue();

        tts.values = jsonValues;

        LocalStorageService.setObject(tts.KEY_LOCAL_TIME_TRACKER, tts.values);
    };

    /*
     *  Remove all tasks with LocalStorage
     * */
    tts.removeValue = function () {
        tts.values = [];

        LocalStorageService.removeString(tts.KEY_LOCAL_TIME_TRACKER);
    };

    /*
     *  Remove one task with LocalStorage
     * */
    tts.removeTask = function (id) {
        tts.values.splice(id, 1);

        LocalStorageService.setObject(tts.KEY_LOCAL_TIME_TRACKER, tts.values);
    };

    tts.getValue();


};

TimeTrackerService.$inject = ['LocalStorageService'];
angular.module('app').service('TimeTrackerService', TimeTrackerService);