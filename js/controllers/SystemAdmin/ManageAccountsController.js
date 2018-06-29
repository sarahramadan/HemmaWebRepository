angular.module('MetronicApp').controller('ManageAccountsController', function ($rootScope, $scope, $http, $timeout) {
    console.log("ManageAccountsController");
    $scope.getAllBooking = function () {
        //var initialParams = {
        //    count: settings.pageSize
        //};
        //var initialSettings = {
        //    counts: [],
        //    paginationMaxBlocks: 13,
        //    paginationMinBlocks: 2,
        //    getData: function (params) {
        //        $rootScope.showLoader = true;
        //        var orderBy = params.orderBy();
        //        var OrderByParam = GridService.getSortExpression(orderBy, 'CreationDate');
        //        var OrderByDirection = null
        //        if (orderBy.length > 0)
        //            OrderByDirection = GridService.getSortDirection(orderBy);
        //        else
        //            OrderByDirection = 'DESC'
        //        $scope.filterObject.PageNumber = params.page();
        //        $scope.filterObject.SortBy = OrderByParam;
        //        $scope.filterObject.SortDirection = OrderByDirection;
        //        if ($scope.date.dateFrom) {
        //            $scope.filterObject.SearchObject.DateTimeFrom = new $filter('date')($scope.date.dateFrom, settings.ServerFormat);
        //        } else {
        //            $scope.filterObject.SearchObject.DateTimeFrom = null;
        //        }
        //        if ($scope.date.dateTo) {
        //            $scope.filterObject.SearchObject.DateTimeTo = new $filter('date')($scope.date.dateTo, settings.ServerFormat);
        //        } else {
        //            $scope.filterObject.SearchObject.DateTimeTo = null;
        //        }
        //        if ($scope.bookingRef) {
        //            $scope.filterObject.SearchObject.BookingRef = $scope.bookingRef;
        //        } else {
        //            $scope.filterObject.SearchObject.BookingRef = null;
        //        }
        //        if ($scope.bookingStatus.bookingStatusId) {
        //            $scope.filterObject.SearchObject.BookingStatusId = $scope.bookingStatus.bookingStatusId
        //        } else {
        //            $scope.filterObject.SearchObject.BookingStatusId = 0
        //        }
        //        return CRUDFactory.getPaginatedList("AirBooking", $scope.filterObject).then(function (result) {
        //            $rootScope.showLoader = false;
        //            params.total(result.data.Results.TotalRecords);
        //            $scope.totalRecords = result.data.Results.TotalRecords;
        //            return $scope.bookings = result.data.Results.Results;
        //        });
        //    }
        //}
        //$scope.bookingsTable = new NgTableParams(initialParams, initialSettings);
    }
});