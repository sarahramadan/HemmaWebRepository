angular.module('MetronicApp').controller('LoginController', function ($rootScope, $scope, $http, $timeout, CRUDFactory, $q, $filter, $state, $uibModal, $log, UserAccountFactory) {
    console.log("enter login controller");
    $rootScope.ShowLoader = true;
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
    }

    //login
    $scope.OpenLoginModel = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/general/Login.html',
            controller: 'LoginModelController',
            size: 'lg'
        });

    }


    //Register Teacher
    $scope.OpenRegisterTeacherModel = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/general/RegisterTeacher.html',
            controller: 'LoginModelController',
            size: 'lg'
        });

    }


    //Register enterprise
    $scope.OpenRegisterEnterpriseModel = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/general/RegisterEnterprise.html',
            controller: 'LoginModelController',
            size: 'lg'
        });

    }
    $scope.OpenLoginModel();
});

angular.module('MetronicApp').controller('LoginModelController', function ($scope, $modalInstance, UserAccountFactory, $cookieStore, $rootScope, $state) {

    console.log("enter login model new");
    $scope.edit = false;
    $scope.loginObj = {};
    $scope.newTeacherObj = {};
    $scope.newEnterpriseObj = {};
    $scope.ErrorMessage = [];
    $rootScope.showLoader = false;
    $scope.ForgetPassowrdFlag = false;
    //$rootScope.submitted = true;

    $scope.saveData = function (formValid, type, obj) {
        $scope.edit = true;
        if (formValid && obj) {
            $rootScope.showLoader = true;
            obj.IsEnterprise = type;
            UserAccountFactory.RegisterAccount(obj).then(function (data) {
                console.log("data", data);
                $rootScope.showLoader = false;
                if (data.data.ErrorMessage && data.data.ErrorMessage.length > 0) {
                    $scope.ShowMessage = type;
                    $scope.ErrorMessage = data.data.ErrorMessage;
                } else {
                    if($cookieStore.get("key")){
                        $cookieStore.remove("key");
                    }
                    var page = data.data.Result.RedirectPage;
                    if (data.data.Result.Token && data.data.Result.Token != null && data.data.Result.RoleID != RoleEnum.AdminRole) {
                        var token = JSON.parse(data.data.Result.Token);
                        $cookieStore.put('key', token.access_token);
                    }
                    $scope.CloseModel();
                    $state.go(page,{id:data.data.Result.UserAccountUID});
                }
            });
        } else {
            angular.element('input.ng-invalid').first().focus();
        }
    };

    $scope.login = function (formValid,obj) {
        $scope.edit = true;
        if (formValid) {
            $rootScope.showLoader = true;
            UserAccountFactory.SiginInAccount(obj).success(function (data, status, headers, config) {
                $rootScope.showLoader = false;
                if (data.ErrorMessage && data.ErrorMessage.length > 0) {
                    $scope.ErrorMessageLogin = data.ErrorMessage;
                } else {
                    if ($cookieStore.get("key")) {
                        $cookieStore.remove("key");
                    }
                    var page = data.Result.RedirectPage;
                    if (data.Result.Token && data.Result.Token != null) {
                        var token = JSON.parse(data.Result.Token);
                        $cookieStore.put('key', token.access_token);
                    }
                    $scope.CloseModel();
                    $state.go(page, { id: data.Result.UserAccountUID });

                    //$state.go(page);
                }
            });
        } else {
            angular.element('input.ng-invalid').first().focus();
        }
    };

    $scope.hasError = function (form, field, validation) {
        $scope.addForm = form;
        if (validation) {
            return ($scope.addForm[field].$dirty && $scope.addForm[field].$error[validation]) || ($scope.edit && $scope.addForm[field].$error[validation]);
        }
        return ($scope.addForm[field].$dirty && $scope.addForm[field].$invalid) || ($scope.edit && $scope.addForm[field].$invalid);
    };

    $scope.CloseModel = function () {
        $modalInstance.close();
    };

    $scope.ResetModel = function () {
        $scope.edit = false;
        $rootScope.showLoader = false;
        $scope.addForm.$setPristine();
        $scope.addForm.$setUntouched();
        $scope.ErrorMessage = [];
    };

    //$scope.GetAuthRedirectPage = function () {
    //    UserAccountFactory.GetAuthUserRole().then(function (data) {
    //        $scope.CloseModel();
    //        if (data.data == RoleEnum.SystemAdmin) {
    //            $state.go("ManageAccounts");
    //        } else if (data.data == RoleEnum.AdminRole) {
    //            $state.go("EnterpriseProfile");
    //        }else if (data.data == RoleEnum.TeacherRole) {
    //            $state.go("TeacherProfile");
    //        }else {
    //            $state.go("Home");
    //        }
    //    });
    //};

    //$scope.GetUnAuthRedirectPage = function (obj,data) {
    //    UserAccountFactory.GetUnAuthUser(obj).then(function (data) {
    //        debugger;
    //        if (data.data!=null && data.data.ID && data.data.RoleID == RoleEnum.AdminRole && data.data.IsActive == false) {
    //            $scope.CloseModel();
    //            $state.go("AdminWelcome", { id: data.data.ID, UnAuthUserObj: data.data});
    //        } else {
    //            var errorMsg = data.error;
    //            $scope.ErrorMessage = ["كلمة المرور او البريد الالكتروني غير صحيحين من فضلك تاكد منهم"];
    //        }
    //    });
    //}

    $scope.ForgetPasswordToggle = function (form) {
        $scope.addForm = form;
        $scope.ForgetPassowrdFlag = !$scope.ForgetPassowrdFlag;
        $scope.ResetModel();
    };

    $scope.ChangePassword = function (formValid, obj) {
        $scope.edit = true;
        if (formValid && obj) {
            $rootScope.showLoader = true;
            UserAccountFactory.ForgetPassword(obj).then(function (data) {
                if (data.data.ErrorMessage && data.data.ErrorMessage.length > 0) {
                    $scope.ShowMessage = type;
                    $scope.ErrorMessage = data.data.ErrorMessage;
                } else {
                    //close model
                    $scope.CloseModel();
                }
                $rootScope.showLoader = false;
            });
        } else {
            angular.element('input.ng-invalid').first().focus();
        }
    }
});

