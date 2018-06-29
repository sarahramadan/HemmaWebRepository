/***
Metronic AngularJS App Main Script
***/

/* Metronic App */
var MetronicApp = angular.module("MetronicApp", [
    "ui.router", 
    "ui.bootstrap", 
    "oc.lazyLoad",  
    "ngSanitize",
    "ui.select",
    "ngCookies",
    "ngTable"
]); 

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
MetronicApp.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);

/********************************************
 BEGIN: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/
/**
`$controller` will no longer look for controllers on `window`.
The old behavior of looking on `window` for controllers was originally intended
for use in examples, demos, and toy apps. We found that allowing global controller
functions encouraged poor practices, so we resolved to disable this behavior by
default.

To migrate, register your controllers with modules rather than exposing them
as globals:

Before:

```javascript
function MyController() {
  // ...
}
```

After:

```javascript
angular.module('myApp', []).controller('MyController', [function() {
  // ...
}]);

Although it's not recommended, you can re-enable the old behavior like this:

```javascript
angular.module('myModule').config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);
**/

//AngularJS v1.3.x workaround for old style controller declarition in HTML
MetronicApp.config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);

/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/

/* Setup global settings */
MetronicApp.factory('settings', ['$rootScope', function($rootScope) {
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        assetsPath: 'assets',
        globalPath: 'assets/global',
        layoutPath: 'assets/layouts/layout2',
        dateFormat:"dd/MM/yyyy"
    };

    $rootScope.settings = settings;

    return settings;
}]);

/* Setup App Main Controller */
MetronicApp.controller('AppController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function() {
        App.initComponents(); // init core components
        //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive 
    });
}]);

/***
Layout Partials.
By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial 
initialization can be disabled and Layout.init() should be called on page load complete as explained above.
***/

/* Setup Layout Part - Header */
MetronicApp.controller('HeaderController', ['$scope', '$state', '$uibModal', '$rootScope', function ($scope, $state, $uibModal, $rootScope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initHeader(); // init header
    });
    //open login model
    $scope.OpenLoginModel = function (IsRegister, IsEnterprise, IsGeneral) {
        $scope.MainObj = { PageType: IsRegister, PersonType: IsEnterprise, General: IsGeneral };
        var modalInstance = $uibModal.open({
            templateUrl: 'views/general/Login.html',
            controller: 'LoginModelController',
            size: 'lg',
            resolve: {
                MainObj: function () {
                    return $scope.MainObj;
                }
            }
        });
    }
    //redirect to About page
    $scope.RedirectToAbout = function () {
        $state.go("About");
    }
    //log out function
    $scope.Logout = function () {
        $rootScope.user = undefined;
        $rootScope.features = undefined;
        $cookieStore.remove("key");
        $state.go("Home");
    }



}]);

/* Setup Layout Part -Admin  Header */
MetronicApp.controller('AdminHeaderController', ['$scope', '$state', '$uibModal', 'UserAccountFactory', '$rootScope','$cookieStore', function ($scope, $state, $uibModal, UserAccountFactory, $rootScope, $cookieStore) {
    $scope.$on('$includeContentLoaded', function () {
        Layout.initHeader(); // init header
        if ($cookieStore.get("key")) {
            //getCurrent user 
            UserAccountFactory.getCurrentUser().success(function (data, status, headers, config) {
                $rootScope.user = data;
                console.log("user", $rootScope.user);
            });
        } else {
            $state.go("Login");
        }

    });
    //open login model
    $scope.OpenLoginModel = function (IsRegister, IsEnterprise, IsGeneral) {
        $scope.MainObj = { PageType: IsRegister, PersonType: IsEnterprise, General: IsGeneral };
        var modalInstance = $uibModal.open({
            templateUrl: 'views/general/Login.html',
            controller: 'LoginModelController',
            size: 'lg',
            resolve: {
                MainObj: function () {
                    return $scope.MainObj;
                }
            }
        });
    }
    //redirect to About page
    $scope.RedirectToAbout = function () {
        $state.go("About");
    }
    //log out function
    $scope.Logout = function () {
        $rootScope.user = undefined;
        $rootScope.features = undefined;
        $cookieStore.remove("key");
        $state.go("Home");
    }



}]);

/* Setup Layout Part - Sidebar */
MetronicApp.controller('SidebarController', ['$scope', 'UserAccountFactory', '$rootScope', function ($scope, UserAccountFactory, $rootScope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initSidebar(); // init sidebar
        UserAccountFactory.SideMenu().success(function (data, status, headers, config) {
            $rootScope.features = data;
            console.log("features", $rootScope.features);
        });
    });
}]);

/* Setup Layout Part - Quick Sidebar */
MetronicApp.controller('QuickSidebarController', ['$scope', function($scope) {    
    $scope.$on('$includeContentLoaded', function() {
       setTimeout(function(){
            QuickSidebar.init(); // init quick sidebar        
        }, 2000)
    });
}]);

/* Setup Layout Part - Theme Panel */
MetronicApp.controller('ThemePanelController', ['$scope', function($scope) {    
    $scope.$on('$includeContentLoaded', function() {
        Demo.init(); // init theme panel
    });
}]);

/* Setup Layout Part - Footer */
MetronicApp.controller('FooterController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initFooter(); // init footer
    });
}]);



/* Init global settings and run the app */
MetronicApp.run(["$rootScope", "settings", "$state", function($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = settings; // state to be accessed from view

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        // redirect to login page if not logged in    
        //$rootScope.checkAccess(event, toState, toParams, fromState, fromParams);
        //console.log("event", event);
        //console.log("toState", toState);
        //console.log("toParams", toParams);
        //console.log("fromState", fromState);
        //console.log("fromParams", fromParams);
    });
}]);