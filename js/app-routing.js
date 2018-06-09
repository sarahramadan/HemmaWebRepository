/// <reference path="../assets/js/owl.carousel.js" />
/// <reference path="../assets/js/jquery-ui.js" />
/// <reference path="../assets/js/easing.js" />
/// <reference path="../assets/js/bootstrap.js" />
/// <reference path="../assets/js/bootstrap.js" />
/// <reference path="factories/UserAccountFactory.js" />
/// <reference path="../views/Common/PrivateLayout.html" />
/* Setup Rounting For All Pages */
MetronicApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    //$httpProvider.interceptors.push('sessionInjector');
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/Public/Home");

    $stateProvider
       /* Layout */
       .state('Public', {
           url: '/Public',
           abstract: true,
           templateUrl: 'views/layout/PublicLayout.html'/*,
           controller: 'AppController'*/
       })
        .state('Admin', {
            url: '/Admin',
            abstract: true,
            templateUrl: 'views/layout/PrivateLayout.html'/*,
            controller: 'AppController'*/
        })
        /* End Layout */
        //sarah state
        .state('Home', {
            url: "/Home",
            templateUrl: "views/general/Home.html",
            parent: "Public",
            data: { pageTitle: 'الصفحة الرئيسية' },
            controller: "HomeController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            //'js/controllers/general/HomePageController.js'
                            //'assets/CSS/bootstrap-rtl.min.css',
                            //'assets/CSS/bootstrap.css',
                            //'assets/CSS/flexslider.css',
                            ////'assets/CSS/font-awesome.css',
                            //'assets/CSS/jquery-ui.css',
                            //'assets/CSS/lightbox.css',
                            //'assets/CSS/mislider-custom.css',
                            //'assets/CSS/mislider.css',
                            //'assets/CSS/student-style.css',
                            'assets/CSS/style.css',
                            'assets/CSS/zoomslider.css',
                            //'assets/js/bootstrap.js',
                            //'assets/js/easing.js',
                            //'assets/js/easyResponsiveTabs.js',
                            //'assets/js/jquery-2.1.4.min.js',
                            //'assets/js/jquery-2.2.3.min.js',
                            //'assets/js/jquery-ui.js',
                            //'assets/js/jquery.flexslider.js',
                            'assets/js/jquery.zoomslider.min.js',
                            //'assets/js/lightbox-plus-jquery.min.js',
                            //'assets/js/modernizr-2.6.2.min.js',
                            //'assets/js/move-top.js',
                            //'assets/js/numscroller-1.0.js',
                            //'assets/js/owl.carousel.js',
                            //'assets/js/SmoothScroll.min.js',
                            'js/controllers/general/HomeController.js',
                            'js/controllers/Security/LoginController.js',
                             'js/factories/UserAccountFactory.js'
                        ]
                    });
                }]
            }
        })
        /*Start public*/

            //.state('HomePage', {
            //    url: "/HomePage",
            //    templateUrl: "views/general/HomePage.html",
            //    parent: "Admin",
            //    data: { pageTitle: 'الصفحة الرئيسية' },
            //    controller: "HomePageController",
            //    resolve: {
            //        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
            //            return $ocLazyLoad.load({
            //                name: 'MetronicApp',
            //                insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
            //                files: [
            //                    'js/controllers/general/HomePageController.js'
            //                ]
            //            });
            //        }]
            //    }
            //})
        /*End public*/
        /*Start Student */
                .state('StudentRegister', {
                    url: "/StudentRegister",
                    templateUrl: "views/Student/RegisterStudent.html",
                    parent: "Public",
                    data: { pageTitle: 'تسجيل طالب في يوم الهمة' },
                    controller: "StudentRegisterController",
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'MetronicApp',
                                insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                                files: [
                                    /*'assets/global/plugins/angularjs/plugins/ui-select/select.min.css',
                                    'assets/global/plugins/angularjs/plugins/ui-select/select.min.js',*/
                                    'js/controllers/Student/StudentRegisterController.js',
                                ]
                            });
                        }]
                    }
                })
         .state('Login', {
             url: "/Login",
             templateUrl: "views/general/HomePage.html",
             parent: "Public",
             data: { pageTitle: 'تسجيل دخول' },
             controller: "LoginController",
             resolve: {
                 deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                     return $ocLazyLoad.load({
                         name: 'MetronicApp',
                         insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                         files: [
                             'js/controllers/Security/LoginController.js',
                             'js/factories/UserAccountFactory.js'
                         ]
                     });
                 }]
             }
         })
        /* End Student*/
        // Dashboard
        .state('dashboard', {
            url: "/dashboard.html",
            templateUrl: "views/test.html",
            parent: "Admin",
            data: { pageTitle: 'Admin Dashboard Template' },
            controller: "DashboardController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'assets/global/plugins/morris/morris.css',
                            'assets/global/plugins/morris/morris.min.js',
                            'assets/global/plugins/morris/raphael-min.js',
                            'assets/global/plugins/jquery.sparkline.min.js',

                            /*'assets/pages/scripts/dashboard.min.js',*/
                            'js/controllers/DashboardController.js',
                        ]
                    });
                }]
            }
        })

        // AngularJS plugins
        .state('fileupload', {
            url: "/file_upload.html",
            templateUrl: "views/file_upload.html",
            data: { pageTitle: 'AngularJS File Upload' },
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'angularFileUpload',
                        files: [
                            'assets/global/plugins/angularjs/plugins/angular-file-upload/angular-file-upload.min.js',
                        ]
                    }, {
                        name: 'MetronicApp',
                        files: [
                            'js/controllers/GeneralPageController.js'
                        ]
                    }]);
                }]
            }
        })

        // UI Select
        .state('uiselect', {
            url: "/ui_select.html",
            templateUrl: "views/ui_select.html",
            data: { pageTitle: 'AngularJS Ui Select' },
            controller: "UISelectController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'ui.select',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/angularjs/plugins/ui-select/select.min.css',
                            'assets/global/plugins/angularjs/plugins/ui-select/select.min.js'
                        ]
                    }, {
                        name: 'MetronicApp',
                        files: [
                            'js/controllers/UISelectController.js'
                        ]
                    }]);
                }]
            }
        })

        // UI Bootstrap
        .state('uibootstrap', {
            url: "/ui_bootstrap.html",
            templateUrl: "views/ui_bootstrap.html",
            data: { pageTitle: 'AngularJS UI Bootstrap' },
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        files: [
                            'js/controllers/GeneralPageController.js'
                        ]
                    }]);
                }]
            }
        })

        // Tree View
        .state('tree', {
            url: "/tree",
            templateUrl: "views/tree.html",
            data: { pageTitle: 'jQuery Tree View' },
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/jstree/dist/themes/default/style.min.css',

                            'assets/global/plugins/jstree/dist/jstree.min.js',
                            /*'assets/pages/scripts/ui-tree.min.js',*/
                            'js/controllers/GeneralPageController.js'
                        ]
                    }]);
                }]
            }
        })

        // Form Tools
        .state('formtools', {
            url: "/form-tools",
            templateUrl: "views/form_tools.html",
            data: { pageTitle: 'Form Tools' },
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
                            'assets/global/plugins/bootstrap-switch/css/bootstrap-switch-rtl.min.css',
                            'assets/global/plugins/bootstrap-markdown/css/bootstrap-markdown.min.css',
                            'assets/global/plugins/typeahead/typeahead.css',

                            'assets/global/plugins/fuelux/js/spinner.min.js',
                            'assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',
                            'assets/global/plugins/jquery-inputmask/jquery.inputmask.bundle.min.js',
                            'assets/global/plugins/jquery.input-ip-address-control-1.0.min.js',
                            'assets/global/plugins/bootstrap-pwstrength/pwstrength-bootstrap.min.js',
                            'assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js',
                            'assets/global/plugins/bootstrap-maxlength/bootstrap-maxlength.min.js',
                            'assets/global/plugins/bootstrap-touchspin/bootstrap.touchspin.js',
                            'assets/global/plugins/typeahead/handlebars.min.js',
                            'assets/global/plugins/typeahead/typeahead.bundle.min.js',
                            /*'assets/pages/scripts/components-form-tools-2.min.js',*/

                            'js/controllers/GeneralPageController.js'
                        ]
                    }]);
                }]
            }
        })

        // Date & Time Pickers
        .state('pickers', {
            url: "/pickers",
            templateUrl: "views/pickers.html",
            data: { pageTitle: 'Date & Time Pickers' },
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/clockface/css/clockface.css',
                            'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                            'assets/global/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css',
                            'assets/global/plugins/bootstrap-colorpicker/css/colorpicker.css',
                            'assets/global/plugins/bootstrap-daterangepicker/daterangepicker-bs3.css',
                            'assets/global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css',

                            'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                            'assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js',
                            'assets/global/plugins/clockface/js/clockface.js',
                            'assets/global/plugins/moment.min.js',
                            'assets/global/plugins/bootstrap-daterangepicker/daterangepicker.js',
                            'assets/global/plugins/bootstrap-colorpicker/js/bootstrap-colorpicker.js',
                            'assets/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js',

                            /*'assets/pages/scripts/components-date-time-pickers.min.js',*/

                            'js/controllers/GeneralPageController.js'
                        ]
                    }]);
                }]
            }
        })

        // Custom Dropdowns
        .state('dropdowns', {
            url: "/dropdowns",
            templateUrl: "views/dropdowns.html",
            data: { pageTitle: 'Custom Dropdowns' },
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/bootstrap-select/css/bootstrap-select-rtl.min.css',
                            'assets/global/plugins/select2/css/select2.min.css',
                            'assets/global/plugins/select2/css/select2-bootstrap.min.css',

                            'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
                            'assets/global/plugins/select2/js/select2.full.min.js',

                            //'assets/pages/scripts/components-bootstrap-select.min.js',
                            //'assets/pages/scripts/components-select2.min.js',

                            'js/controllers/GeneralPageController.js'
                        ]
                    }]);
                }]
            }
        })

        // Advanced Datatables
        .state('datatablesAdvanced', {
            url: "/datatables/managed.html",
            templateUrl: "views/datatables/managed.html",
            data: { pageTitle: 'Advanced Datatables' },
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/datatables/datatables.min.css',
                            'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap-rtl.css',

                            'assets/global/plugins/datatables/datatables.all.min.js',

                           // 'assets/pages/scripts/table-datatables-managed.min.js',

                            'js/controllers/GeneralPageController.js'
                        ]
                    });
                }]
            }
        })

        // Ajax Datetables
        .state('datatablesAjax', {
            url: "/datatables/ajax.html",
            templateUrl: "views/datatables/ajax.html",
            data: { pageTitle: 'Ajax Datatables' },
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/datatables/datatables.min.css',
                            'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap-rtl.css',
                            'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',

                            'assets/global/plugins/datatables/datatables.all.min.js',
                            'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                            'assets/global/scripts/datatable.min.js',

                            'js/scripts/table-ajax.js',
                            'js/controllers/GeneralPageController.js'
                        ]
                    });
                }]
            }
        })

        // User Profile
        .state("profile", {
            url: "/profile",
            templateUrl: "views/profile/main.html",
            data: { pageTitle: 'User Profile' },
            controller: "UserProfileController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
                            //'assets/pages/css/profile-rtl.min.css',

                            'assets/global/plugins/jquery.sparkline.min.js',
                            'assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',

                            //'assets/pages/scripts/profile.min.js',

                            'js/controllers/UserProfileController.js'
                        ]
                    });
                }]
            }
        })

        // User Profile Dashboard
        .state("profile.dashboard", {
            url: "/dashboard",
            templateUrl: "views/profile/dashboard.html",
            data: { pageTitle: 'User Profile' }
        })

        // User Profile Account
        .state("profile.account", {
            url: "/account",
            templateUrl: "views/profile/account.html",
            data: { pageTitle: 'User Account' }
        })

        // User Profile Help
        .state("profile.help", {
            url: "/help",
            templateUrl: "views/profile/help.html",
            data: { pageTitle: 'User Help' }
        })

        // Todo
        .state('todo', {
            url: "/todo",
            templateUrl: "views/todo.html",
            data: { pageTitle: 'Todo' },
            controller: "TodoController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                            'assets/apps/css/todo-2-rtl.min.css',
                            'assets/global/plugins/select2/css/select2.min.css',
                            'assets/global/plugins/select2/css/select2-bootstrap.min.css',

                            'assets/global/plugins/select2/js/select2.full.min.js',

                            'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',

                            'assets/apps/scripts/todo-2.min.js',

                            'js/controllers/TodoController.js'
                        ]
                    });
                }]
            }
        })

}]);