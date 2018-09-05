angular.module('MetronicApp').controller('ManageAccountsController', function ($rootScope, $scope, $http, $timeout, settings, NgTableParams, CRUDFactory, SystemAdminFactory,$filter) {
    console.log("ManageAccountsController");
    $scope.Accounts = [];
    $rootScope.showLoader = false;
    $scope.filterObject = {};
    $scope.getAllAccounts = function () {
        debugger;
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
                var OrderByParam = $scope.getSortExpression(orderBy, 'EnterpriseID');
                var OrderByDirection = null
                if (orderBy.length > 0)
                    OrderByDirection = $scope.getSortDirection(orderBy);
                else
                    OrderByDirection = 'DESC'
                $scope.filterObject.PageNumber = params.page();
                $scope.filterObject.PageSize = settings.pageSize;
                $scope.filterObject.SortBy = OrderByParam;
                $scope.filterObject.SortDirection = OrderByDirection;
                return CRUDFactory.getPaginatedList("AccountManagment", $scope.filterObject).then(function (result) {
                    $rootScope.showLoader = false;
                    params.total(result.data.TotalRecords);
                    $scope.totalRecords = result.data.TotalRecords;
                    debugger;
                    return $scope.Accounts = result.data.Results;
                });
            }
        }
        $scope.bookingsTable = new NgTableParams(initialParams, initialSettings);
    }
    $scope.getSortExpression = function (orderByParams, defaultOrderBy) {
        var OrderBy = defaultOrderBy;
        if (orderByParams && orderByParams.length > 0) {
            OrderBy = orderByParams[0].substring(1);
        }
        return OrderBy;
    };
    $scope.getSortDirection = function (orderByParams) {
        var OrderByDirection = 'ASC';
        var OrderByDirection = 'DESC'
        if (orderByParams && orderByParams.length > 0) {
            OrderByDirection = orderByParams[0].charAt(0);

            if (OrderByDirection == '+')
                OrderByDirection = 'ASC';
            else
                OrderByDirection = 'DESC';
        }

        return OrderByDirection;
    };
    $scope.ActivateAccount = function (UserAccountUID) {
    
        if (UserAccountUID) {
            $rootScope.showLoader = true;
            SystemAdminFactory.ActivateAccount(UserAccountUID).then(function (data) {
                $rootScope.showLoader = false;
                if (data.data.Result == false || data.data.ErrorMessage.length>0){
                    var erorMsg = '';
                    data.data.ErrorMessage.forEach(function (item) {
                        erorMsg += item + '.';
                    })
                    bootbox.alert(erorMsg);
                } else {
                    bootbox.dialog({
                        message: '<p class="text-info">تم بنجاح تفعيل الحساب</p>'
                    });
                    $scope.getAllAccounts();
                }
            });
        } else {
            bootbox.dialog({
                title: '<div class="caption font-red-sunglo font-lg align-right"><span class="caption-subject bold uppercase">تنبيه!!!</span></div>',
                message: '<div class="has-info col-xs-12"><p>رقم الحساب غير موجود</p></div>',
                buttons: {
                    cancel: {
                        label: '<i class="fa fa-times align-right"></i> غلق'
                    }
                }
            });
        }
    }
    $scope.DeActivateAccount = function (UserAccountUID) {

    }
    $scope.FormatDate = function (date) {
        if (date) {
            debugger
            var date=new Date(date)
            var MeladyDate = $filter('date')(date, settings.mediumDate);
            var saudDateTime = $filter('date')(date.toLocaleDateString("ar-SA"), 'MMMM d, y');
            return MeladyDate + " الموافق" + saudDateTime;
        }
    }
    $scope.getAllAccounts();
  
});