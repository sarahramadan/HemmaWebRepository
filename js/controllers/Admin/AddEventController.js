angular.module('MetronicApp').controller('AddEventController', function ($rootScope, $scope, $http, $timeout, $filter, $q, CRUDFactory, $location, $anchorScroll) {
    console.log("AddEventController");
    $scope.EventProgram = [{}];
    $scope.obj = [];
    $scope.DayPlanobj = [];
    $scope.hideAddButton = false;
    $scope.hideRemoveButton = true;
    $scope.DayOrderEnum = DayOrderEnum;
    $scope.SamePlane = false;
    $scope.eventDate = {};
    $scope.dayCount = 0;
    $scope.validDateFlag = true;
    $scope.ErrorMessage = {};
    $scope.edit = false;
    $scope.EventPlane = [];
    $scope.ShowEventPlanData = false;
    $scope.validDateFlag = false;
    $scope.EventProgramobj = [];
    $scope.shift= new Date();
    $scope.AddRecord = function (type, num) {
        if ($scope[type].length  <= num) {
            $scope[type].push({});
            $scope.hideAddButton = false;
        } else {
            $scope.hideAddButton = true;
        }
        if ($scope[type].length > 1) {
            $scope.hideRemoveButton = false;
        } else {
            $scope.hideRemoveButton = true;

        }
    }
    $scope.removeRecord = function (type, index) {
        if ($scope[type].length > 1) {
            $scope[type].splice(index, 1);
            $scope.hideAddButton = false;
        }
        if ($scope[type].length < 2) {
            $scope.hideRemoveButton = true;
        } 
    }

    $scope.removePlaneRecord = function (type, parent, index) {
        if ($scope.EventPlane[parent].HemmaEventPlane.length>1) {
            $scope.EventPlane[parent].HemmaEventPlane.splice(index, 1);
            $scope.hideAddPlaneButton = false;
        }
        if ($scope.EventPlane[parent].HemmaEventPlane.length<2) {
            $scope.hideRemovePlaneButton = true;
        }
    }
    $scope.AddPlaneRecord = function (type, num, parent, index) {
        if ($scope[type][parent].HemmaEventPlane.length <= num) {
            $scope[type][parent].HemmaEventPlane.push({});
            $scope.hideAddPlaneButton=false;
        } else {
            $scope.hideAddPlaneButton = true;
        }
        if ($scope[type][parent].HemmaEventPlane.length > 1) {
            $scope.hideRemovePlaneButton = false;
        } else {
            $scope.hideRemovePlaneButton = true;
        }
    }
    $scope.countNumberOfDate = function (from, to) {
        $scope.dayCount = 0;
        if (from != undefined && from != "" && (to == undefined || to == "") && $scope.validDateFlag == true) {
            $scope.dayCount = 1;
            return $scope.dayCount = 1;
        }
        if (from != undefined && from != "" && to != undefined && to != "" && new Date(from) < new Date(to) && $scope.validDateFlag==true) {
            var x = new Date(from);
            var y = new Date(to);
            if (x < y) {
                var days = (y - x) / 1000 / 60 / 60 / 24;
               $scope.dayCount = Math.abs(days) + 1;
               return $scope.dayCount = Math.abs(days) + 1;;
            } else {
                $scope.dayCount = 0;
                return $scope.dayCount=0;
            }
        }
        return $scope.dayCount;
    }
    $scope.validateDate = function (from, to) {
        $scope.validDateFlag = true;
        if (new Date(from) <= new Date()) {
            $scope.validDateFlag = false;
            $scope.ErrorMessage= "من فضلك بداية  الحدث يجب ان تكون اكبر من تاريخ اليوم"
        }
        else if (new Date(to) <= new Date()) {
            $scope.validDateFlag = false;
            $scope.ErrorMessage = "من فضلك نهاية الحدث يجب ان تكون اكبر من تاريخ اليوم"
        }
        else if (new Date(from) >= new Date(to)) {
            $scope.validDateFlag = false;
            $scope.ErrorMessage= "من فضلك نهاية الحدث يجب ان تكون اكبر من تاريخ بداية الحدث"
        }
        return !$scope.validDateFlag;
    }

    $scope.PrepareEventDate = function () {
        if ($scope.eventDate.from != undefined) {
            $scope.obj.StartHijirDate = $scope.eventDate.from.toLocaleDateString("ar-SA");
            $scope.obj.StarDate = new Date($scope.eventDate.from);
        }
        if ($scope.eventDate.to != undefined) {
            $scope.obj.EndHijirData = $scope.eventDate.to.toLocaleDateString("ar-SA");
            $scope.obj.EndDate = new Date($scope.eventDate.to);
        }
    }
    $scope.PrepareEventPlane = function () {
        $scope.EventPlane = [];
        for (var i = 0; i < $scope.dayCount; i++) {
            var st = new Date($scope.eventDate.from);
            var addHijriDays = moment(st).add(i, 'days').format('iYYYY/iM/iD');
            var addDays = moment(st).add(i, 'days').format('YYYY/M/D');
            $scope.EventPlane.push({ EventDate: addDays, EventHijriDate: addHijriDays, HemmaEventPlane: [{}] });
        }
    }
    $scope.hasError = function (from, field, validation) {
        if (validation) {

            return ($scope[from][field].$dirty && $scope[from][field].$error[validation]) || ($scope.edit && $scope[from][field].$error[validation]);
        }
        return ($scope[from][field].$dirty && $scope[from][field].$invalid) || ($scope.edit && $scope[from][field].$invalid);
    };
    $scope.hasError1 = function (from, field, validation) {
        if (validation) {
            return ($scope.AddProgramPlane[field].$dirty && $scope.AddProgramPlane[field].$error[validation]) || ($scope.edit && $scope.AddProgramPlane[field].$error[validation]);
        }
        return ($scope.AddProgramPlane[field].$dirty && $scope.AddProgramPlane[field].$invalid) || ($scope.edit && $scope.AddProgramPlane[field].$invalid);
    };
    $scope.CheckValidDatewhenClick = function () {
        if ($scope.validDateFlag == true && $scope.dayCount>0) {
            $scope.PrepareEventPlane();
            $scope.ShowEventPlanData = !$scope.ShowEventPlanData;
        } else {
            bootbox.dialog({
                message: '<p class="text-info">لاستكمال ملئ بيانات الحدث من فضلك تاكد من اختيارات تاريخ الحدث </p>'
            });
        }
    }
    $scope.getAllQuantity = function () {
        CRUDFactory.getList("LookUps/GetQuantity").then(function (data) {
            $scope.originalList = data.data;
            $scope.FromQuantities = data.data;
            $scope.ToQuntities = data.data;
        });
    }
    $scope.MenueSelection2 = function (id) {
        if (id) {
            $scope.FromQuantities = $scope.originalList.filter(function (item) { return item.VerseID != id });
        }
    }
    $scope.MenueSelection = function (id) {
        if (id) {
            $scope.ToQuntities = $scope.originalList.filter(function (item) { return item.VerseID != id });
        }
    }
    $scope.GetMaxPage = function (obj) {
        if (obj) {
            return obj.ProgramQuantity * 20 + 1;
        }
    }
    $scope.SavePricipleData = function () {
        $scope.edit = true;
        $scope.edit1 = true;
        if ($scope.addEventPrincipleData.$valid) {
            $scope.PrepareEventPlane();
        }
    }
    $scope.GetHours = function () {
        $scope.HourList = []
        for (var i = 0; i < 24; i++) {
            $scope.HourList.push({ id: i, name: i < 10 ? "0" + i.toString() : i.toString() });
        }
        $scope.FromHourList = $scope.HourList;
        $scope.ToHourList = $scope.HourList;

    };
    $scope.GetMinutes = function () {
        $scope.MinutesList = []

        for (var i = 0; i < 60; i++) {
            $scope.MinutesList.push({ id: i, name: i < 10 ? "0" + i.toString() : i.toString() });
        }
        $scope.FromMinutes = $scope.MinutesList;
        $scope.ToMinutes = $scope.MinutesList;

    }
    $scope.sumbit = function () {
        $scope.edit = true;
        $scope.edit1 = true;
        console.log("form", $scope.AddProgramPlane);
        if ($scope.addEventPrincipleData.$valid && $scope.addEventProgram.$valid && $scope.validDateFlag && $scope.AddProgramPlane.$valid) {
            $scope.obj.EventProgram = $scope.EventProgramo;
            $scope.obj.EventProgram = $scope.EventProgram;
            $scope.obj.EventPlane = $scope.EventPlane;
            console.log("$scope.obj", $scope.obj);

            alert("valid");
        } else {
            angular.element('input.ng-invalid').first().focus();
            //if (!$scope.addEventPrincipleData.$valid) {
            //    bootbox.dialog({
            //        message: '<p class="text-info">لاستكمال ملئ بيانات الحدث من فضلك تاكد من اختيارات تاريخ الحدث </p>'
            //    });
            //}
            //if (!$scope.addEventProgram.$valid) {
            //    bootbox.dialog({
            //        message: '<p class="text-info">لاستكمال ملئ بيانات الحدث من فضلك تاكد من اختيارات تاريخ الحدث </p>'
            //    });
            //}
            //if (!$scope.addEventPrincipleData.$valid) {
            //    bootbox.dialog({
            //        message: '<p class="text-info">لاستكمال ملئ بيانات الحدث من فضلك تاكد من اختيارات تاريخ الحدث </p>'
            //    });
            //}
        }
    }
    $scope.ScrollTo = function (x) {
        var newHash = 'anchor' + x;
        if ($location.hash() !== newHash) {
            $location.hash('anchor' + x);
        } else {
            $anchorScroll();
        }
    }
    $scope.getAllQuantity();
    $scope.GetHours();
    $scope.GetMinutes();
});




