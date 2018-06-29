angular.module('MetronicApp').factory('UserAccountFactory', ['$http', '$rootScope', 'appConfigs', 'RequestFactory', function ($http, $rootScope, appConfigs, RequestFactory) {
    return {
        RegisterAccount: function (Obj) {
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
        },
        getCurrentUser: function () {
            return RequestFactory.Request('GET', appConfigs.apiBaseURL + "UserAccount/CurrentUser", null, null);
        },
        SideMenu: function () {
            return RequestFactory.Request('GET', appConfigs.apiBaseURL + "UserAccount/SideMenu", null, null);
        },
        GetAuthUserRole: function () {
            return RequestFactory.Request('GET', appConfigs.apiBaseURL + "UserAccount/AuthUserRole", null, null);
        },
        GetUnAuthUser: function (obj) {
            return RequestFactory.Request('POST', appConfigs.apiBaseURL + "UserAccount/UnAuthUser", obj, null);
    }
    }
}]);