angular.module('MetronicApp').factory('EnterpriseFactory', ['$http', '$rootScope', 'appConfigs', 'RequestFactory', function ($http, $rootScope, appConfigs, RequestFactory) {
    return {
        ActivateAccount: function (AccountUID) {
            return RequestFactory.Request('POST', appConfigs.apiBaseURL + "AccountManagment/ActivateAccount/" + AccountUID, null, null);
        }
    }
}]);