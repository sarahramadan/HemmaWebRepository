angular.module('MetronicApp').factory('LookupFactory', ['$http', '$rootScope', 'appConfigs', 'RequestFactory', function ($http, $rootScope, appConfigs, RequestFactory) {
    return {
        CountryList: function () {
            return RequestFactory.Request('GET', appConfigs.apiBaseURL + "LookUps/GetCountries", null, null);
        },
        GetCitiesByCountryID: function (id) {
            return RequestFactory.Request('GET', appConfigs.apiBaseURL + "LookUps/GetCities/" + id, null, null);
        },
        GetCities: function () {
            return RequestFactory.Request('GET', appConfigs.apiBaseURL + "LookUps/GetCities", null, null);
        },
        GetEventsByCityID: function (id) {
            return RequestFactory.Request('GET', appConfigs.apiBaseURL + "LookUps/GetEventsByCityID/" + id, null, null);
        }
    }
}]);