angular.module('MetronicApp').controller('StudentRegisterController', function ($rootScope, $scope, $http, $timeout, CRUDFactory, $q, $filter,$state) {
    $scope.StudentObj = { GenderID: 1, StudentEventRegisters :[]};
    $scope.edit = false;
    $scope.EventProgram = [];
    $scope.GetAllLookups = function () {
        $scope.p1 = CRUDFactory.getList("LookUps/GetAllNationality");
        $scope.p2 = CRUDFactory.getList("LookUps/GetAllGradeClassification");
        $scope.p3 = CRUDFactory.getList("LookUps/GetAvailableEvents");
        $q.all([$scope.p1, $scope.p2, $scope.p3]).then(function (data) {
            $scope.Nationalites = data[0].data;
            $scope.GradeClassification = data[1].data;
            $scope.Events = data[2].data;
        });
    };
    
    $scope.Events=[{HemmaEventAr:"سوم الهمة الاول",Enterprise:{EnterpriseAr:"الموسسة الازلي"}},{HemmaEventAr:"سوم الهمة التاني",Enterprise:{EnterpriseAr:"الموسسة الازلي"}}]
    $scope.SelectEvent = function (eventID) {
        if (eventID) {
            $scope.EventProgram = $filter('filter')($scope.Events, function (item) { return item.HemmaEventID === eventID; })[0].HemmaEventPrograms;
        }
    }
    $scope.Cancel = function () {
        $scope.edit = false;
        $scope.addStudentForm.$setPristine();
        $scope.addStudentForm.$dirty();
        $scope.StudentObj = { GenderID: 1, StudentEventRegisters: [] };
    }
    $scope.saveStudentData = function () {
        $scope.edit = true;
        if ($scope.addStudentForm.$valid) {
            $rootScope.submitted = true;
            CRUDFactory.add("Registers/Student", $scope.StudentObj).then(function (data) {
                $rootScope.submitted = false;
                $state.go("HomePage");
            })
        } else {
            angular.element('input.ng-invalid').first().focus();
        }  
    }
    $scope.hasError = function (field, validation) {

        if (validation) {
            return ($scope.addStudentForm[field].$dirty && $scope.addStudentForm[field].$error[validation]) || ($scope.edit && $scope.addStudentForm[field].$error[validation]);
        }
        return ($scope.addStudentForm[field].$dirty && $scope.addStudentForm[field].$invalid) || ($scope.edit && $scope.addStudentForm[field].$invalid);
    };
$scope.GetAllLookups();
});