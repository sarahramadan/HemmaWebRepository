angular.module('MetronicApp').factory('UserAccountFactory', ['$http', '$rootScope', 'appConfigs', 'RequestFactory', function ($http, $rootScope, appConfigs, RequestFactory) {
    return {
        RegisterAccount: function (Obj) {
            debugger;
            return RequestFactory.Request('POST', appConfigs.apiBaseURL + "UserAccount/RegisterAccount", Obj, null);
        },
        LoginAccount: function (username, password) {
            var result =
          $http({
              url: appConfigs.apiBaseURL + 'accesstoken',
              method: 'POST',
              data: "userName=" + username + "&password=" + password + "&grant_type=password"
          });
            return result;
        }
    }
}]);