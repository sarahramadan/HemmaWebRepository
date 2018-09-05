angular.module('MetronicApp').controller('ActivateAccountController', function ($rootScope, $scope, $http, $timeout, $state, $stateParams, UserAccountFactory, $cookieStore) {
    console.log("ActivateAccountController");
    if ($stateParams.id) {
        console.log("id", $stateParams.id)
        UserAccountFactory.ActivateAccount($stateParams.id).then(function (data) {
            debugger;
            if (data.data.ErrorMessage.length > 0) {
                $state.go("Login");
            } else {
                var tokenObj = JSON.parse(data.data.Result);
                $cookieStore.put('key', tokenObj.access_token);
                if ($cookieStore.get('key')) {
                    $state.go("EnterpriseProfile");
                } 
            }
        });
    }


});