angular.module('MetronicApp').service('GeneralService', function ($filter) {
    getSortExpression = function(orderByParams, defaultOrderBy) {
        var OrderBy = defaultOrderBy;
        if (orderByParams && orderByParams.length > 0) {
            OrderBy = orderByParams[0].substring(1);
        }
        return OrderBy;
    };
    getSortDirection = function (orderByParams) {
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
    dateUiFormat = function (date) {
        if (date) {
            var date = new Date(date);
            var event = new Date(date);
            var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            var options1 = { year: 'numeric', month: 'long', day: 'numeric' };
            var dateHijri = event.toLocaleDateString('ar-SA', options);
            var dateArabic = event.toLocaleDateString('ar-EG', options1);
            return dateHijri + " الموافق " + dateArabic;
        }

    }
    return {
        getSortExpression: getSortExpression,
        getSortDirection: getSortDirection,
        dateUiFormat: dateUiFormat
    };
});