angular.module('MetronicApp').controller('AddEventController', function ($rootScope, $scope, $http, $timeout, $filter) {
    console.log("AddEventController");
    // $scope.EventProgram = [ProgramName:"",ProgramQuantity:,ProgramQuantityValue]
    $scope.EventProgram = [{}];
    //$scope.DayPlanRecord = [{}, {}, {}];
    $scope.EventPlans = [{ DayPlanRecord: [{}] }, { DayPlanRecord: [{}] }, { DayPlanRecord: [{}] }, { DayPlanRecord: [{}] }];;
    $scope.obj = [];
    $scope.DayPlanobj = [];
    $scope.hideAddButton = false;
    $scope.hideRemoveButton = true;
    $scope.DayOrderEnum = DayOrderEnum;
    $scope.SamePlane = false;
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

    $scope.removePlaneRecord = function (type,parent,index) {
        $scope[type][parent].DayPlanRecord.splice(index, 1);
        var x = $scope.obj[parent + '-' + index];
        var k = $scope.obj[parent + '-' + index].key;
        //var lst = $filter('filter')($scope.obj, function (item) {
        //    console.log("item", item);
        //    var xx = item.key
        //    console.log("x", xx);
        //    return item.key != x;
        //});
        var index =  $filter('filter')($scope.obj,function (item, i) {
            console.log("item", item, "i", i);
            console.log("Object.keys(object1)", Object.keys(item));
            return Object.keys(item) == x;
        });


    }
    $scope.AddPlaneRecord = function (type, num, parent, index) {
        if ($scope[type][parent].DayPlanRecord.length <= num) {
            $scope[type][parent].DayPlanRecord.push({});
        }
    }
    $scope.sumbitTest = function () {
        console.log("$scope.EventProgram", $scope.EventProgram);
        console.log("$scope.addEvent", $scope.addEvent);
        console.log("$scope.addEvent", $scope.EventPlans);
        console.log("$scope.obj", $scope.obj);

    }
    $scope.showCalendar=function(vm){
        console.log("this", vm);
        var x = $('#datetimepicker2');
        console.log("x", x);
    }

    $scope.changeDate = function (event, e) {
        console.log("event", event);
        var x = $('#datetimepicker2');
        console.log("x", x);
    }

    $scope.initJqueryComponent = function () {
        ////um qura calender
        //$('#datetimepicker2').datetimepicker({
        //    locale: { calender: 'ummalqura', lang: 'ar', format: 'MM dd, yy' }
        //});
        //Default
        $('#datetimepicker1').datetimepicker();

        // Umm ALqura Calendar
        $('#datetimepicker2').datetimepicker({
            locale: { calender: 'ummalqura', lang: 'ar' }
        });
    }
    $scope.initJqueryComponent();
    $scope.DateSet=function() {
        var today = new Date();
        var saudDate = today.toLocaleDateString("ar-SA");
        var saudDateTime = today.toLocaleString("ar-SA");
        var formateDate = $filter('date')(new Date, 'yyyy-MM-dd HH:mm:ss');
        var hijriCurrentDate= moment(y, 'YYYY-M-D HH:mm:ss').format('iYYYY/iM/iD HH:mm:ss');
        var addHijriDays = moment(y).add(20, 'days').format('iYYYY/iM/iD');
        var addDays = moment(y).add(20, 'days').format('YYYY/M/D');

        console.log("saudDate", saudDate);
        console.log("saudDateTime", saudDateTime);
        console.log("formateDate", formateDate);
        console.log("hijriCurrentDate", hijriCurrentDate);
        console.log("addDays", addDays);
        console.log("addHijriDays", addHijriDays);
    }
    $scope.DateSet();
});


