angular.module('MetronicApp').controller('HomeController', function ($rootScope, $scope, $http, $timeout, $uibModal, UserAccountFactory) {
    $rootScope.ShowLoader = true;

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
});