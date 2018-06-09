//angular.module('MetronicApp').controller('LoginController', function ($rootScope, $scope, $http, $timeout, CRUDFactory, $q, $filter, $state, $uibModal, $log, UserAccountFactory) {
//    console.log("enter login controller");
//    //redirect to login page 
//    $scope.items = [{ "id": 1, "name": "sarah" }];
//    //open model
//    $scope.OpenLoginModel = function () {
//        console.log("enter model");
//        var modalInstance = $uibModal.open({
//            templateUrl: 'views/Security/Login.html',
//            controller: 'LoginModelController',
//            size: 'lg',
//            resolve: {
//                items: function () {
//                    return $scope.items;
//                }
//            }
//        });

//        modalInstance.result.then(function (selectedItem) {
//            $scope.selected = selectedItem;
//        }, function () {
//           // $log.info('Modal dismissed at: ' + new Date());
//        });
//    };
//    $scope.OpenLoginModel();
//    //if login is correct redirect to right page
//});

//var LoginModelController =
angular.module('MetronicApp').controller('LoginModelController', function ($scope, $modalInstance, UserAccountFactory, MainObj, $cookieStore) {

    console.log("enter login model new");
    $scope.edit = false;
    $scope.loginObj = {};
    $scope.newTeacherObj = {};
    $scope.newEnterpriseObj = {};
    $scope.ErrorMessage = [];

    $scope.saveData = function (formValid, type, obj) {
        $scope.edit = true;
        if (formValid && obj) {
            obj.IsEnterprise = type;
            UserAccountFactory.RegisterAccount(obj).then(function (data) {
                console.log("data", data);
                if (data.data.ErrorMessage && data.data.ErrorMessage.length > 0) {
                    $scope.ErrorMessage = data.data.ErrorMessage;
                } else {
                    //login
                    $scope.login(formValid, data.data.Result.UserEmail, data.data.Result.UserPassword);
                }
            });
        }
    };
    $scope.login = function (formValid, usermail, password) {
        $scope.edit = true;
        if (formValid) {
            UserAccountFactory.LoginAccount(usermail, password).success(function (data, status, headers, config) {
                console.log("rettrun from login", data, status, headers, config);
                $cookieStore.put('key', data.access_token);
                document.getElementsByClassName('page-spinner-bar');
                var element = angular.element(document.getElementsByClassName('page-spinner-bar')[0]);
                element.removeClass('hide');
                //window.location = "index.html";
            })
            .error(function (data, status, headers, config) {
                var errorMsg = data.error;
                if (data && data.error) {
                    $scope.ErrorMessage =["كلمة المرور او البريد الالكتروني غير صحيحين من فضلك تاكد منهم"];
                }
            });
            //reset form
            $scope.loginObj = {};         
            $scope.ResetModel();
        }
    };
    $scope.hasError = function (form, field, validation) {
        $scope.addForm = form;
        if (validation) {
            return ($scope.addForm[field].$dirty && $scope.addForm[field].$error[validation]) || ($scope.edit && $scope.addForm[field].$error[validation]);
        }
        return ($scope.addForm[field].$dirty && $scope.addForm[field].$invalid) || ($scope.edit && $scope.addForm[field].$invalid);
    };
    $scope.HeaderTitel = function () {
        var type = '';
        if (!$scope.IsEnterprise) {
            type = " معلم ";
        } else {
            type = " دار ";
        }
        if ($scope.RegisterNew) {
            return  " تسجيل" + type + "جديد";
        } else {
            return  "تسجيل دخول مستخدم";
        }
    };
    $scope.toggleRegister = function (IsEnterprise) {
        $scope.IsEnterprise = IsEnterprise;
        $scope.RegisterNew = !$scope.RegisterNew;
        $scope.ResetModel();
    };
    $scope.CloseModel = function () {
        $modalInstance.close();
    };
    $scope.ResetModel = function () {
        $scope.edit = false;
        $scope.addForm.$setPristine();
        $scope.addForm.$setUntouched();
    };

    if (MainObj) {
        $scope.RegisterNew = MainObj.PageType;
        $scope.IsEnterprise = MainObj.PersonType;
        $scope.IsGeneral = MainObj.General
    }
});

MetronicApp.directive("compareTo", function () {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function (scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function (modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function () {
                ngModel.$validate();
            });
        }
    };
});