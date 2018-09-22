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
        $scope.StudentObj = { GenderID: 1};
    }
    $scope.saveStudentData = function () {
        $scope.edit = true;
        if ($scope.addStudentForm.$valid) {
            $rootScope.submitted = true;
            CRUDFactory.add("Registers/Student", $scope.StudentObj).then(function (data) {
                $rootScope.submitted = false;
                if (data.data.ErrorMessage.length > 0) {
                    var errorMsg = "";
                    data.data.ErrorMessage.forEach(function (item) {
                        errorMsg += "<h5>" + item + "</h5>"
                    });
                    $scope.ErrorPopUp(errorMsg);
                } else {
                    $scope.SuccessPopUp();
                }

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

    $scope.SuccessPopUp = function () {
        bootbox.dialog({
            message: "<div class='text-center'><span style='font-size: 100px;color: yellow' class='fa fa-bell-o text-center'></span><h4>تم الحفظ بنجاح</h4><h3>من فضلك انتظر  بريد الكتروني يفيد انضمامك الي يوم الهمة</h3></div>",
            buttons: {
                ok: {
                    label: "إغلاق",
                    className: "btn-default",
                    callback: function () {
                        return;
                    }
                },
                back: {
                    label: "الصفحة الرئيسية",
                    className: "btn blue",
                    callback: function () {
                        $state.go("HomePage");
                    }
                }
            },

        });
    }

    $scope.ErrorPopUp = function (errorMsg) {
        bootbox.dialog({
            message: "<div class='text-center'><span style='font-size: 100px;color: red' class='fa fa-times-circle-o text-center'></span><h4>!حدث خطا</h4>" + errorMsg + "</div>",
            buttons: {
                ok: {
                    label: "إغلاق"
                }
            },
            callback: function () {
                return;
            }
        });
    }
$scope.GetAllLookups();
});