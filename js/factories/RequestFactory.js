MetronicApp.factory('RequestFactory', ['$http', '$rootScope', 'appConfigs', '$state', 'Upload', function ($http, $rootScope, appConfigs, $state, Upload) {
    return {
        Request: function (method, url, data, responseType) {
            var header = {};
            header['method'] = method;
            header['url'] = url;
            if (data) {
                header['data'] = data;
            }
            if (responseType) {
                header['responseType'] = responseType;
            }

            $('.page-spinner-bar').removeClass("hide");
            var request = $http(header).success(function () {

                $('.page-spinner-bar').addClass("hide");
            }).error(function (data, status, headers, config) {

                $('.page-spinner-bar').addClass("hide");

                if (status === 401) {
                    // window.location = "/Login";
                    $state.go('Login');
                }
                else if (status === 400) {
                    debugger;
                    $rootScope.submitted = false;
                    var message = "<ul><li>بيانات الاستمارة غير صحيح</li></ul>";
                    var dataSeralize = JSON.parse(data.Message);
                    if (dataSeralize.ErrorMessage.length > 0) {
                        message = "<ul>"
                        dataSeralize.ErrorMessage.forEach(function (msg) { message += "<li>" + msg + "</li>"; });
                        message += "</ul>"
                    }
                    bootbox.alert({
                        message: message,
                        buttons: {
                            ok: {
                                label: "اغلاق"
                            }
                        },
                        callback: function () {
                            return;
                        }
                    });
                }
                else if (status === 409) {
                    $rootScope.submitted = false;
                    bootbox.alert({
                        message: "لا يمكن مسح البيانات ",
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
                else if (status === 500) {
                    $rootScope.submitted = false;
                    bootbox.alert({
                        message: "حدث خطأ برجاء محاولة مرة اخري او مخاطبة المختص",
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

            });
            return request;

        },
        upload: function (method, url, data, file, responseType) {

            var header = {};
            header['method'] = method;
            header['url'] = url; //+ '?token=' + $cookieStore.get('key');

            if (data) {
                header['fields'] = data;
            }
            if (file) {
                header['file'] = file;
            }
            if (responseType) {
                header['responseType'] = responseType;
            }
            $('.page-spinner-bar').removeClass("hide");
            var result = Upload.upload(header).error(function (data, status, headers, config) {
                $('.page-spinner-bar').addClass("hide");
                if (status == 401){
                    $state.go('Login');
                }
                else if (status == 500) {
                    $rootScope.submitted = false;
                    bootbox.alert({
                        message: "حدث خطأ برجاء محاولة مرة اخري او مخاطبة المختص",
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
            }).success(function (data, status, headers, config) {
                $('.page-spinner-bar').addClass("hide");
            });
            return result;
        }
    }
}]);

MetronicApp.factory('sessionInjector', ['$cookieStore', function ($cookieStore) {
    var sessionInjector = {
        request: function (config) {
            // if (!SessionService.isAnonymus) {
            config.headers['cache'] = false;
            //config.headers['foobar'] = new Date().getTime();
            if ($cookieStore.get('key')) {
                config.headers['Authorization'] = 'Bearer ' + $cookieStore.get('key');
            }
            //  }
            return config;
        }
    };
    return sessionInjector;
}]);