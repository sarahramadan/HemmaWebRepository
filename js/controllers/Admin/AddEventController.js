angular.module('MetronicApp').controller('AddEventController', function ($rootScope, $scope, $http, $timeout, $filter, $q, CRUDFactory, $location, $anchorScroll, EnterpriseFactory, $stateParams) {
    console.log("AddEventController");
    $scope.EventProgram = [{}];
    $scope.obj = {};
    $scope.DayPlanobj = [];
    $scope.hideAddButton = false;
    $scope.hideRemoveButton = true;
    $scope.DayOrderEnum = DayOrderEnum;
    $scope.SamePlane = false;
    $scope.eventDate = {};
    $scope.dayCount = 0;
    //$scope.validDateFlag = true;
    $scope.ErrorMessage = {};
    $scope.edit = false;
    $scope.EventPlane = [];
    $scope.ShowEventPlanData = false;
    $scope.ShowEventinfo = true;
    $scope.ShowEventProgramData = false;
    $scope.showNotificationMsg = false;
    $scope.validDateFlag = false;
    $scope.EventProgramobj = [];
    $scope.shift = new Date();
    $scope.edit1 = false;
    $scope.form = {};
    $scope.form1 = {};
    $scope.form3 = {};
    $scope.validForm1 = false;
    $scope.validForm2 = false;
    $scope.validForm3 = false;
    $scope.Date = {};
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
        if ($scope.Date.From != undefined && $scope.Date.From != "" && ($scope.Date.To == undefined || $scope.Date.To == "") && $scope.validDateFlag == true) {
            $scope.dayCount = 1;
            return $scope.dayCount = 1;
        }
        if ($scope.Date.From != undefined && $scope.Date.From != "" && $scope.Date.To != undefined && $scope.Date.To != "" && new Date($scope.Date.From) < new Date($scope.Date.To) && $scope.validDateFlag == true) {
            var x = new Date($scope.Date.From);
            var y = new Date($scope.Date.To);
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
        if (new Date($scope.Date.From) <= new Date()) {
            $scope.validDateFlag = false;
            $scope.ErrorMessage= "من فضلك بداية  الحدث يجب ان تكون اكبر من تاريخ اليوم"
        }
        else if (new Date($scope.Date.To) <= new Date()) {
            $scope.validDateFlag = false;
            $scope.ErrorMessage = "من فضلك نهاية الحدث يجب ان تكون اكبر من تاريخ اليوم"
        }
        else if (new Date($scope.Date.From) >= new Date($scope.Date.To)) {
            $scope.validDateFlag = false;
            $scope.ErrorMessage= "من فضلك نهاية الحدث يجب ان تكون اكبر من تاريخ بداية الحدث"
        }
        return !$scope.validDateFlag;
    }

    $scope.PrepareEventDate = function () {
        if ($scope.eventDate.from != undefined) {
            $scope.obj.StarDate = new Date($scope.Date.From);
            $scope.obj.StartHijirDate = $scope.eventDate.from;
        }
        if ($scope.eventDate.to != undefined) {
            $scope.obj.EndDate = new Date($scope.Date.To);
            $scope.obj.EndHijirData = $scope.eventDate.to;
        }
    }
    $scope.PrepareEventPlane = function () {
        var oldEvent = [];
        if ($scope.EventPlane.length > 0) {
            oldEvent = angular.copy($scope.EventPlane);
        }
        $scope.EventPlane = [];
        for (var i = 0; i < $scope.dayCount; i++) {
            var oldDay = oldEvent[i];
            if (oldDay) {
                $scope.EventPlane.push(oldDay)
            } else {
                var st = new Date($scope.Date.From);
                var addHijriDays = $scope.ChangeDate(new Date(moment(st).add(i, 'days')));/* moment(st).add(i, 'days').format('iYYYY/iM/iD');*/
                //var addDays = moment(st).add(i, 'days').format('YYYY/M/D');
                var addDays = new Date(moment(st).add(i, 'days'));
                $scope.EventPlane.push({ EventDate: addDays, EventHijriDate: addHijriDays, HemmaEventPlane: [{}] });
            }
        }
    }
    $scope.hasError = function (name,from, field, validation) {
        if (validation) {

            return ($scope[name][from][field].$dirty && $scope[name][from][field].$error[validation]) || ($scope.edit && $scope[name][from][field].$error[validation]);
        }
        return ($scope[name][from][field].$dirty && $scope[name][from][field].$invalid) || ($scope.edit && $scope[name][from][field].$invalid);
    };
    //$scope.hasError1 = function (name,from, field, validation) {
    //    if (validation) {
    //        return ($scope.form3,AddProgramPlane[field].$dirty && $scope.AddProgramPlane[field].$error[validation]) || ($scope.edit && $scope.AddProgramPlane[field].$error[validation]);
    //    }
    //    return ($scope.AddProgramPlane[field].$dirty && $scope.AddProgramPlane[field].$invalid) || ($scope.edit && $scope.AddProgramPlane[field].$invalid);
    //};
    $scope.CheckValidDatewhenClick = function () {
        if ($scope.validDateFlag == true && $scope.dayCount>0) {
            $scope.PrepareEventPlane();
            //$scope.ShowEventPlanData = !$scope.ShowEventPlanData;
        } else {
            $scope.ErrorPopUp("لاستكمال ملئ بيانات الحدث من فضلك تاكد من اختيارات تاريخ الحدث");
            //bootbox.dialog({
            //    message: '<p class="text-info">لاستكمال ملئ بيانات الحدث من فضلك تاكد من اختيارات تاريخ الحدث </p>'
            //});
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
        if ($scope.form.addEventPrincipleData.$valid) {
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
        debugger;
        $scope.edit = true;
        $scope.edit1 = true;
        console.log("form", $scope.form3.AddProgramPlane);
       // if ((($scope.form.addEventPrincipleData && $scope.form.addEventPrincipleData.$valid) || $scope.validForm1) && (($scope.form1.addEventProgram && $scope.form1.addEventProgram.$valid) || $scope.validForm2) && (($scope.form3.AddProgramPlane && $scope.form3.AddProgramPlane.$valid) || $scope.validForm3) && $scope.validDateFlag) {
            //if ($scope.eventDate.from) {
            //    $scope.obj.StarDate = $filter('date')($scope.eventDate.from, "MM/dd/yyyy");
            //}
            //if ($scope.eventDate.to) {
            //    $scope.obj.EndDate = $filter('date')($scope.eventDate.to, "MM/dd/yyyy");
            //}
            $scope.PrepareEventDate();
            //$scope.obj.EventProgram = $scope.EventProgramo;
           $scope.obj.EventProgram = $scope.EventProgram;
           $scope.obj.EventPlane = $scope.EventPlane;
           $scope.obj.UserAccountUID = $stateParams.id;
           console.log("$scope.obj", $scope.obj);
            EnterpriseFactory.AddEvent($scope.obj).then(function (data) {
                console.log(data);
          });
     //   } else {
        //   angular.element('input.ng-invalid').first().focus();
      //  }
    }
    $scope.ScrollTo = function (x,flag) {
        $scope.showNotificationMsg = false;
        if (flag) {
            $scope.edit1 = true;
            $scope.edit = true;
        } else {
            $scope.edit1 = false;
            $scope.edit = false;
        }
        if ($scope.form.addEventPrincipleData && $scope.form.addEventPrincipleData.$valid==true) {
            $scope.validForm1 = true;
        }
        if ($scope.form.addEventPrincipleData && $scope.form.addEventPrincipleData.$valid == false) {
            $scope.validForm1 = false;
        }
        if ($scope.form1.addEventProgram && $scope.form1.addEventProgram.$valid == true) {
            $scope.validForm2 = true;
        }
        if ($scope.form1.addEventProgram && $scope.form1.addEventProgram.$valid == false) {
            $scope.validForm2 = false;
        }
        if ($scope.form3.AddProgramPlane && $scope.form3.AddProgramPlane.$valid == true) {
            $scope.validForm3 = true;
        }
        if ($scope.form3.AddProgramPlane && $scope.form3.AddProgramPlane.$valid == false) {
            $scope.validForm3 = false;
        }
        switch (x) {
            case 2:
                if ($scope.validForm1 && $scope.validDateFlag == true && $scope.dayCount > 0) {
                    $scope.ShowEventPlanData = false;
                    $scope.ShowEventinfo = false;
                    $scope.ShowEventProgramData = true;
                } else {
                    $scope.showNotificationMsg = true;
                }
                break;
            case 3:
                $scope.CheckValidDatewhenClick();
                if ($scope.validForm1 && $scope.validDateFlag == true && $scope.dayCount > 0) {
                $scope.ShowEventPlanData = true;
                $scope.ShowEventinfo = false;
                $scope.ShowEventProgramData = false;
                } else {
                    $scope.showNotificationMsg = true;
                }
                break;
            default:
                $scope.edit1 = true;
                $scope.ShowEventPlanData = false;
                $scope.ShowEventinfo = true;
                $scope.ShowEventProgramData = false;
                break;
        }
        //var newHash = 'anchor' + x;
        //if ($location.hash() !== newHash) {
        //    $location.hash('anchor' + x);
        //} else {
        //    $anchorScroll();
        //}
    }
    $scope.ChangeDateFrom = function (date) {
        if (date) {
            $scope.Date.From = new Date($scope.eventDate.from);
            var event = new Date($scope.eventDate.from);
            var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            $scope.eventDate.from = event.toLocaleDateString('ar-SA', options);
        }

    }
    $scope.ChangeDateTo = function (date) {
        if (date) {
            $scope.Date.To = new Date($scope.eventDate.to);
            var event = new Date($scope.eventDate.to);
            var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            $scope.eventDate.to = event.toLocaleDateString('ar-SA', options);
        }
    }
    $scope.ChangeDate = function (date) {
        if (date) {
            var event = new Date(date);
            var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            var dateString = event.toLocaleDateString('ar-SA', options);
            return dateString;
        }
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
    $scope.getAllQuantity();
    $scope.GetHours();
    $scope.GetMinutes();
});




