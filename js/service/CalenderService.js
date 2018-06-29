angular.module('MetronicApp').service('CalenderService', function () {
    getDateToday = function () {
        debugger;
        var fulClientDateObj = new Date();

        var dateOnly = new Date(fulClientDateObj.toDateString());

        return dateOnly;
    }

    return {
        getDateToday: getDateToday
    };

});