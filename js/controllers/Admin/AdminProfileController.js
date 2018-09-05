angular.module('MetronicApp').controller('AdminProfileController', function ($rootScope, $scope, $http, $timeout,UserAccountFactory,$q) {
    console.log("AdminProfileController");
    $scope.personalInfoFlag = true;
    $scope.edit3 = false;

    $scope.ShowTabs = function (tabName) {
        $scope.personalInfoFlag = false;
        $scope.changeImgFlag = false;
        $scope.changeAccountInfoFlag = false;
        switch (tabName) {
            case 'PersonalInfo':
                $scope.personalInfoFlag = true;
                break;
            case 'ChangeImg':
                $scope.changeImgFlag = true;
                break;
            case 'ChangePassword':
                $scope.changeAccountInfoFlag = true;
                break;
            default:
                $scope.personalInfoFlag = true;
                break;
        }
    }
    $scope.hasError = function (form, field, validation) {
        // $scope.addForm = form;
        console.log("form", $scope[form]);
        if (validation) {
            return ($scope[form][field].$dirty && $scope[form][field].$error[validation]) || ($scope.edit && $scope[form][field].$error[validation]);
        }
        return ($scope[form][field].$dirty && $scope[form][field].$invalid) || ($scope.edit && $scope[form][field].$invalid);
    };

    $scope.editAccountInfo = function (form,obj) {
        $scope.edit3 = true;
        console.log("")
        if (form.$valid) {
            //send edit functionallity
        }

    }
    $scope.GetUserAccountInfo = function () {
        if ($rootScope.user && $rootScope.user.UserAccountUID) {
            $scope.p1 = UserAccountFactory.GetUserAccountInfo($rootScope.user.UserAccountUID);
        }
    }

    $scope.GetAllData = function () {
        $scope.GetUserAccountInfo();
        $q.all([$scope.p1]).then(function (data) {
            console.log("data", data);
            $scope.editAcccount = data[0].data;
            debugger;
        })
    }
   // $scope.GetAllData();
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
