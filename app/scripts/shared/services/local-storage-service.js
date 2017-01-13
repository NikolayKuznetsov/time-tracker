var LocalStorageService = function () {
    var storage = this;

    storage.local = localStorage;

    storage.getString = function (key) {
        return storage.local.getItem(key);
    };

    storage.setString = function (key, value) {
        storage.local.setItem(key, value);
    };

    storage.getObject = function (key) {
        return JSON.parse(storage.local.getItem(key));
    };

    storage.setObject = function (key, value) {
        storage.local.setItem(key, JSON.stringify(value));
    };

    storage.removeString = function (key) {
        storage.local.removeItem(key);
    };

    storage.clear = function () {
        storage.local.clear();
    };

    return storage;
};

LocalStorageService.$inject = [];
angular.module('app').service('LocalStorageService', LocalStorageService);
