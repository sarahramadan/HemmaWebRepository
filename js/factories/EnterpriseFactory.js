angular.module('MetronicApp').factory('EnterpriseFactory', ['$http', '$rootScope', 'appConfigs', 'RequestFactory', function ($http, $rootScope, appConfigs, RequestFactory) {
    return {
        ActivateAccount: function (AccountUID) {
            return RequestFactory.Request('POST', appConfigs.apiBaseURL + "AccountManagment/ActivateAccount/" + AccountUID, null, null);
        },
        upload: function (file, UID) {
            debugger;
            var data = { path: UID };
            return RequestFactory.upload('POST', appConfigs.apiBaseURL + 'Upload/AddLogo/' + UID, data, file, null);
        },
    }
}]);