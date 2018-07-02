/* Setup Rounting For All Pages */
MetronicApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    //$httpProvider.interceptors.push('sessionInjector');
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/Public/Home");

    $stateProvider
       /*=========================Start Layout=========================*/
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
        /*=========================End Layout==========================*/
        /*=========================Start public=========================*/
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
                            'assets/global/plugins/bootstrap-switch/css/bootstrap-switch-rtl.min.css',
                            'assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js',
                            //'assets/js/lightbox-plus-jquery.min.js',
                            //'assets/js/modernizr-2.6.2.min.js',
                            //'assets/js/move-top.js',
                            //'assets/js/numscroller-1.0.js',
                            //'assets/js/owl.carousel.js',
                            //'assets/js/SmoothScroll.min.js',
                            'js/controllers/general/HomeController.js',
                            'js/controllers/general/LoginController.js',
                            'js/factories/UserAccountFactory.js'
                        ]
                    });
                }]
            }
        })
            .state('OrganizeEvent', {
                url: "/OrganizeEvent",
                templateUrl: "views/general/OrganizeEvent.html",
                parent: "Public",
                data: { pageTitle: 'محتوي يوم الهمة' },
                controller: "OrganizeEventController",
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'MetronicApp',
                            insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                            files: [
                                'js/controllers/general/OrganizeEventController.js'
                            ]
                        });
                    }]
                }
            })
        .state('About', {
            url: "/About",
            templateUrl: "views/general/About.html",
            parent: "Public",
            data: { pageTitle: 'محتوي يوم الهمة' },
            controller: "AboutController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'js/controllers/general/AboutController.js'
                        ]
                    });
                }]
            }
        })
                 .state('Login', {
                     url: "/Login",
                     templateUrl: "views/general/Home.html",
                     parent: "Public",
                     data: { pageTitle: 'تسجيل دخول' },
                     controller: "LoginController",
                     resolve: {
                         deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                             return $ocLazyLoad.load({
                                 name: 'MetronicApp',
                                 insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                                 files: [
                                     'js/controllers/general/LoginController.js',
                                     'js/factories/UserAccountFactory.js'
                                 ]
                             });
                         }]
                     }
                 })
        /*=========================End public==========================*/
        /*=========================Start Student==========================*/
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

    /*=========================End Student==========================*/
    /*=========================Start Teacher==========================*/
         .state('TeacherProfile', {
             url: "/TeacherProfile",
             templateUrl: "views/Teacher/TeacherProfile.html",
             parent: "Admin",
             data: { pageTitle: 'ملف تعريفي للمعلم' },
             controller: "TeacherProfileController",
             resolve: {
                 deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                     return $ocLazyLoad.load({
                         name: 'MetronicApp',
                         insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                         files: [
                             /*'assets/global/plugins/angularjs/plugins/ui-select/select.min.css',
                             'assets/global/plugins/angularjs/plugins/ui-select/select.min.js',*/
                             'js/controllers/Teacher/TeacherProfileController.js',
                         ]
                     });
                 }]
             }
         })
    /*=========================End Teacher==========================*/
    /*=========================Start Admin==========================*/
                  .state('EnterpriseProfile', {
                      url: "/EnterpriseProfile",
                      templateUrl: "views/Admin/AdminProfile.html",
                      parent: "Admin",
                      data: { pageTitle: 'ملف تعريفي للموسسة' },
                      controller: "AdminProfileController",
                      resolve: {
                          deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                              return $ocLazyLoad.load({
                                  name: 'MetronicApp',
                                  insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                                  files: [
                                      /*'assets/global/plugins/angularjs/plugins/ui-select/select.min.css',
                                      'assets/global/plugins/angularjs/plugins/ui-select/select.min.js',*/
                                      'js/controllers/Admin/AdminProfileController.js',
                                  ]
                              });
                          }]
                      }
                  })
    /*=========================End Admin==========================*/

}]);