angular.module('MetronicApp').factory('CRUDFactory', ['$http', '$rootScope', 'appConfigs', 'RequestFactory', function ($http, $rootScope, appConfigs, RequestFactory) {
    return {
        getList: function (ControllerName) {
            return RequestFactory.Request('GET', appConfigs.apiBaseURL + ControllerName, null, null);
        },
        getPaginatedList: function (ControllerName, filterObject) {
            //filterObject.PageSize = settings.pageSize;
            return RequestFactory.Request('POST', appConfigs.apiBaseURL + ControllerName + "/FilteredList", filterObject, null);
        },
        getPaginatedListAndParameter: function (ControllerName, filterObject,UID) {
            //filterObject.PageSize = settings.pageSize;
            return RequestFactory.Request('POST', appConfigs.apiBaseURL + ControllerName + "/FilteredList/" + UID, filterObject, null);
        },
        get: function (ControllerName, id) {
            return RequestFactory.Request('GET', appConfigs.apiBaseURL + ControllerName + '/' + id, null, null);
        },
        add: function (ControllerName, addedObject) {
            return RequestFactory.Request('POST', appConfigs.apiBaseURL + ControllerName, addedObject, null);
        },
        edit: function (ControllerName, editedObject, id) {
            return RequestFactory.Request('PUT', appConfigs.apiBaseURL + ControllerName + '/' + id, editedObject, null);
        },
        delete: function (ControllerName, id) {
            return RequestFactory.Request('DELETE', appConfigs.apiBaseURL + ControllerName + '/' + id, null, null);
        },
    }
}]);

