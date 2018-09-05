/// <reference path="../assets/js/easyResponsiveTabs.js" />
/// <reference path="../assets/js/calender/jquery.calendars.min.js" />
/// <reference path="../assets/js/ngTable.js" />
/* Setup Rounting For All Pages */
MetronicApp.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.interceptors.push('sessionInjector');
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
         .state('System', {
             url: '/System',
             abstract: true,
             templateUrl: 'views/layout/SystemLayout.html'/*,
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
                            'assets/CSS/style.css',
                            'assets/CSS/zoomslider.css',                  
                            'assets/js/jquery.zoomslider.min.js',
                            'assets/global/plugins/bootstrap-switch/css/bootstrap-switch-rtl.min.css',
                            'assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js',          
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
          .state('AdminWelcome', {
              url: "/AdminWelcome/:id",
              templateUrl: "views/general/AdminWelcomePage.html",
              parent: "Public",
              data: { pageTitle: 'صفحة الترحيب' },
              params : { UnAuthUserObj: null},
              controller: "AdminWelcomeController",
              resolve: {
                  deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                      return $ocLazyLoad.load({
                          name: 'MetronicApp',
                          insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                          files: [
                              'js/controllers/general/AdminWelcomeController.js'
                          ]
                      });
                  }]
              }
          })
             .state('ActivateAccount', {
                 url: "/ActivateAccount/:id",
                 templateUrl: "views/general/ActivateAccount.html",
                 data: { pageTitle: 'صفحة الترحيب' },
                 params: { UnAuthUserObj: null },
                 controller: "ActivateAccountController",
                 resolve: {
                     deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                         return $ocLazyLoad.load({
                             name: 'MetronicApp',
                             insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                             files: [
                                 'js/controllers/general/ActivateAccountController.js',
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
                      url: "/AdminProfile",
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
                                       'js/factories/UserAccountFactory.js'
                                  ]
                              });
                          }]
                      }
                  })

          .state('AddEvent', {
              url: "/AddEvent",
              templateUrl: "views/Admin/AddEvent.html",
              parent: "Admin",
              data: { pageTitle: 'إضافة يوم همة' },
              controller: "AddEventController",
              resolve: {
                  deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                      return $ocLazyLoad.load({
                          name: 'MetronicApp',
                          insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                          files: [
                              'assets/CSS/jquery.calendars.picker.css',                           
                              //'assets/Calender/js/jquery.calendars.min.js',
                              // 'assets/Calender/js/jquery.calendars-ar.js',
                              // 'assets/Calender/js/jquery.calendars-ar-EG.js',
                              // 'assets/Calender/js/jquery.plugin.min.js',
                              // 'assets/Calender/js/jquery.calendars.picker.min.js',
                              // 'assets/Calender/js/jquery.calendars.picker-ar.js',
                              // 'assets/Calender/js/jquery.calendars.picker.lang.min.js',
                              //  'assets/Calender/js/jquery.calendars.ummalqura.min.js',
                              //   'assets/Calender/js/jquery.calendars.ummalqura-ar.js',
                              //   'assets/Calender/js/jquery.calendars.plus.min.js',
                                  'js/controllers/Admin/AddEventController.js',

                          ]
                      });
                  }]
              }
          })
         .state('EnterpriseProfile/PersonalInfo', {
             url: "EnterpriseProfile/PersonalInfo",
             templateUrl: "views/Admin/AdminProfile.html",
             parent: "Admin",
             data: { pageTitle: 'ملف تعريفي للموسسة' },
             controller: "PersonalInfoController",
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
        /*=========================Start System Admin==========================*/
                  .state('ManageAccounts', {
                      url: "/ManageAccounts",
                      templateUrl: "views/SystemAdmin/ManageAccounts.html",
                      parent: "System",
                      data: { pageTitle: 'ادارة الحسابات' },
                      controller: "ManageAccountsController",
                      resolve: {
                          deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                              return $ocLazyLoad.load({
                                  name: 'MetronicApp',
                                  insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                                  files: [
                                      'js/controllers/SystemAdmin/ManageAccountsController.js',
                                      'js/factories/SystemAdminFactoey.js'
                                  ]
                              });
                          }]
                      }
                  })
    /*=========================End system Admin==========================*/

}]);