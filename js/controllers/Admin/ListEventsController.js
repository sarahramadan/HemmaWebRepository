angular.module('MetronicApp').controller('ListEventsController', function ($rootScope, $scope, $http, $timeout, $filter, $q, CRUDFactory, $location, $anchorScroll, EnterpriseFactory, $stateParams, GeneralService, NgTableParams, settings, $state) {
    console.log("Controllr list events");
    $scope.filterObject = {};
    $scope.filterObject.SearchObject = {};
    $scope.eventDate = {};
    $scope.Date = {};
    $rootScope.showLoader = false;
    $scope.getList = function () {
        var initialParams = {
            count: settings.pageSize
        };
        var initialSettings = {
            counts: [],
            paginationMaxBlocks: 13,
            paginationMinBlocks: 2,
            getData: function (params) {
                $rootScope.showLoader = true;
                var orderBy = params.orderBy();
                var OrderByParam = GeneralService.getSortExpression(orderBy, 'HemmaEventID');
                var OrderByDirection = null
                if (orderBy.length > 0)
                    OrderByDirection = GeneralService.getSortDirection(orderBy);
                else
                    OrderByDirection = 'DESC'
                $scope.filterObject.PageNumber = params.page();
                $scope.filterObject.PageSize = settings.pageSize;
                $scope.filterObject.SortBy = OrderByParam;
                $scope.filterObject.SortDirection = OrderByDirection;
                //Date
                if ($scope.Date.From) {
                    $scope.filterObject.SearchObject.StartDateUI = new Date($scope.Date.From)
                }
                if ($scope.Date.To) {
                    $scope.filterObject.SearchObject.EndDateUI = new Date($scope.Date.To)

                }
                return CRUDFactory.getPaginatedListAndParameter("Enterprise", $scope.filterObject,$stateParams.id).then(function (result) {
                    $rootScope.showLoader = false;
                    params.total(result.data.TotalRecords);
                    $scope.totalRecords = result.data.TotalRecords;
                    return $scope.eventList = result.data.Results;
                });
            }
        }
        $scope.eventsTable = new NgTableParams(initialParams, initialSettings);
    };
    $scope.formateDate = function (date) {
        if (date) {
         return  GeneralService.dateUiFormat(date);
        }
    }
    $scope.addEventFun = function () {
        $state.go("AddEvent", { id: $stateParams.id });
    }
    $scope.deleteEvent = function (row) {
        bootbox.dialog({
            message: " هل انت متاكد من مسح " + row.HemmaEventAr  + " هذا ؟",
            buttons: {
                cancel: {
                    label: "إلغاء",
                    className: 'btn_default',
                    callback: function () {
                    }
                },
                ok: {
                    label: "مسح",
                    className: 'btn-danger',
                    callback: function () {
                        Example.show('Custom OK clicked');
                    }
                }
            }
        });
    }
    $scope.search = function () {
        $scope.getList();
    }
    $scope.clearSearch = function () {
        $scope.filterObject = {};
        $scope.filterObject.SearchObject = {};
        $rootScope.showLoader = false;
        $scope.eventDate = {};
        $scope.Date = {};
        $scope.getList();

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
    $scope.getList();
});
