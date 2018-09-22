angular.module('MetronicApp').factory('EnterpriseFactory', ['$http', '$rootScope', 'appConfigs', 'RequestFactory', function ($http, $rootScope, appConfigs, RequestFactory) {
    return {
        ActivateAccount: function (AccountUID) {
            return RequestFactory.Request('POST', appConfigs.apiBaseURL + "AccountManagment/ActivateAccount/" + AccountUID, null, null);
        },
        upload: function (file, UID) {
            var data = { path: UID };
            return RequestFactory.upload('POST', appConfigs.apiBaseURL + 'Upload/AddLogo/' + UID, data, file, null);
        },
        GetEnterpriseInfo: function (UID) {
            return RequestFactory.upload('GET', appConfigs.apiBaseURL + 'Enterprise/EnterpriseInfo/' + UID, null, null);
        },
        AddEvent: function (obj) {
            return RequestFactory.Request('POST', appConfigs.apiBaseURL + "Enterprise/AddEvent", obj, null);
        }
    }
}]);