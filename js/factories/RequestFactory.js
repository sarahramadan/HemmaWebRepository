MetronicApp.factory('RequestFactory', ['$http', '$rootScope', 'appConfigs', function ($http, $rootScope, appConfigs) {
    return {
        Request: function (method,url,data,responseType) {
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
                    // window.location = "login.html";
                    $state.go('login');
                }
                else if (status === 400) {
                    $rootScope.submitted = false;
                    bootbox.alert({
                        message: "بيانات الاستمارة غير صحيحة",
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
          
        }
    }
}]);

//MetronicApp.factory('sessionInjector', ['$cookieStore', function ($cookieStore) {
//    var sessionInjector = {
//        request: function (config) {
//            // if (!SessionService.isAnonymus) {
//            config.headers['cache'] = false;
//            //config.headers['foobar'] = new Date().getTime();
//            if ($cookieStore.get('key')) {
//                config.headers['Authorization'] = 'Bearer ' + $cookieStore.get('key');
//            }
//            //  }
//            return config;
//        }
//    };
//    return sessionInjector;
//}]);