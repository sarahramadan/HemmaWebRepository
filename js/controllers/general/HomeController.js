angular.module('MetronicApp').controller('HomeController', function ($rootScope, $scope, $http, $timeout, $uibModal, UserAccountFactory) {
    //$(document).ready(function () {
    //    $('#horizontalTab').easyResponsiveTabs({
    //        type: 'default', //Types: default, vertical, accordion           
    //        width: 'auto', //auto or any width like 600px
    //        fit: true   // 100% fit in a container
    //    });
    //});
    //$(document).ready(function () {
    //    $("#owl-demo").owlCarousel({
    //        autoPlay: true, //Set AutoPlay to 3 seconds
    //        items: 3,
    //        itemsDesktop: [640, 2],
    //        itemsDesktopSmall: [414, 1],
    //        navigation: true,
    //        // THIS IS THE NEW PART
    //        afterAction: function (el) {
    //            //remove class active
    //            this
    //            .$owlItems
    //            .removeClass('active')
    //            //add class active
    //            this
    //            .$owlItems //owl internal $ object containing items
    //            .eq(this.currentItem + 1)
    //            .addClass('active')
    //        }
    //        // END NEW PART

    //    });

    //});

    //$(document).ready(function () {
    //    /*
    //        var defaults = {
    //        containerID: 'toTop', // fading element id
    //        containerHoverID: 'toTopHover', // fading element hover id
    //        scrollSpeed: 1200,
    //        easingType: 'linear' 
    //        };
    //    */

    //    $().UItoTop({ easingType: 'easeOutQuart' });

    //});

    //$(window).load(function () {
    //    $('.flexslider').flexslider({
    //        animation: "slide",
    //        start: function (slider) {
    //            $('body').removeClass('loading');
    //        }
    //    });
    //});

    //Register/login enterprise/Teacher
    $scope.OpenLoginModel = function (IsRegister, IsEnterprise,IsGeneral) {
        $scope.MainObj = { PageType: IsRegister, PersonType: IsEnterprise, General: IsGeneral };
        var modalInstance = $uibModal.open({
            templateUrl: 'views/Security/Login.html',
            controller: 'LoginModelController',
            size: 'lg',
            resolve: {
                MainObj: function () {
                    return $scope.MainObj;
                }
            }
        });

        //modalInstance.result.then(function (selectedItem) {
        //    $scope.selected = selectedItem;
        //}, function () {
        //    // $log.info('Modal dismissed at: ' + new Date());
        //});
    }
});