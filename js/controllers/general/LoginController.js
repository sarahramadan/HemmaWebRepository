angular.module('MetronicApp').controller('LoginController', function ($rootScope, $scope, $http, $timeout, CRUDFactory, $q, $filter, $state, $uibModal, $log, UserAccountFactory) {
    console.log("enter login controller");
    //redirect to login page 
    $scope.OpenLoginModel = function (IsRegister, IsEnterprise, IsGeneral) {
        $scope.MainObj = { PageType: IsRegister, PersonType: IsEnterprise, General: IsGeneral };
        var modalInstance = $uibModal.open({
            templateUrl: 'views/general/Login.html',
            controller: 'LoginModelController',
            size: 'lg',
            resolve: {
                MainObj: function () {
                    return $scope.MainObj;
                }
            }
        });

        //modalInstance.result.then(function (selectedItem) {
        //    $scope.selected = selectedItem;
        //}, function () {
        //    // $log.info('Modal dismissed at: ' + new Date());
        //});
    }
    $scope.OpenLoginModel();
    //if login is correct redirect to right page
});

//var LoginModelController =
angular.module('MetronicApp').controller('LoginModelController', function ($scope, $modalInstance, UserAccountFactory, MainObj, $cookieStore, $rootScope, $state) {

    console.log("enter login model new");
    $scope.edit = false;
    $scope.loginObj = {};
    $scope.newTeacherObj = {};
    $scope.newEnterpriseObj = {};
    $scope.ErrorMessage = [];
    $rootScope.showLoader = false;

    $scope.saveData = function (formValid, type, obj) {
        $scope.edit = true;
        if (formValid && obj) {
            $rootScope.showLoader = true;
            obj.IsEnterprise = type;
            UserAccountFactory.RegisterAccount(obj).then(function (data) {
                if (data.data.ErrorMessage && data.data.ErrorMessage.length > 0) {
                    $scope.ErrorMessage = data.data.ErrorMessage;
                } else {
                    //login
                    $scope.login(formValid, data.data.Result.UserEmail, data.data.Result.UserPassword);
                }
                $rootScope.submitted = false;
            });
        }
    };
    $scope.login = function (formValid, usermail, password) {
        $scope.edit = true;
        if (formValid) {
            $rootScope.showLoader = true;
            UserAccountFactory.LoginAccount(usermail, password).success(function (data, status, headers, config) {
                $cookieStore.put('key', data.access_token);
                //document.getElementsByClassName('page-spinner-bar');
                //var element = angular.element(document.getElementsByClassName('page-spinner-bar')[0]);
                //element.removeClass('hide');
                //window.location = "index.html";
                $scope.GetAuthRedirectPage();
            })
            .error(function (data, status, headers, config) {
                if (data && data.error) {
                    var obj = {};
                    obj.UserEmail=usermail;
                    obj.UserPassword = password;
                    $scope.GetUnAuthRedirectPage(obj,data);
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
        $rootScope.showLoader = false;
        $scope.addForm.$setPristine();
        $scope.addForm.$setUntouched();
    };
    $scope.GetAuthRedirectPage = function () {
        UserAccountFactory.GetAuthUserRole().then(function (data) {
            $scope.CloseModel();
            if (data.data == RoleEnum.SystemAdmin) {
                $state.go("ManageAccounts");
            } else if (data.data == RoleEnum.AdminRole) {
                $state.go("EnterpriseProfile");
            }else if (data.data == RoleEnum.TeacherRole) {
                $state.go("TeacherProfile");
            }else {
                $state.go("Home");
            }
        });
    };

    $scope.GetUnAuthRedirectPage = function (obj,data) {
        UserAccountFactory.GetUnAuthUser(obj).then(function (data) {
            debugger;
            if (data.data!=null && data.data.ID && data.data.RoleID == RoleEnum.AdminRole && data.data.IsActive == false) {
                $scope.CloseModel();
                $state.go("AdminWelcome", { id: data.data.ID, UnAuthUserObj: data.data});
            } else {
                var errorMsg = data.error;
                $scope.ErrorMessage = ["كلمة المرور او البريد الالكتروني غير صحيحين من فضلك تاكد منهم"];
            }
        });
    }

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