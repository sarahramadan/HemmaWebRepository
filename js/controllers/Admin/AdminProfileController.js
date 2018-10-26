angular.module('MetronicApp').controller('AdminProfileController', function ($rootScope, $scope, $http, $timeout, UserAccountFactory, $q, $stateParams, EnterpriseFactory, appConfigs) {
    console.log("AdminProfileController");
    $scope.personalInfoFlag = true;
    $scope.edit3 = false;
    $scope.DisabledAccountTab = false;
    $scope.edit = false;
    $scope.DisabledUpdateAccountBtn = false;
    $scope.uploadFiles = [];
    $scope.URL = appConfigs.imagesBaseURL;
    $scope.enterpriseInfo = { Logo :'image'};

    $scope.ShowTabs = function (tabName) {
        $scope.personalInfoFlag = false;
        $scope.changeImgFlag = false;
        $scope.changeAccountInfoFlag = false;
        switch (tabName) {
            case 'PersonalInfo':
                $scope.personalInfoFlag = true;
                break;
            case 'ChangeImg':
                $scope.changeImgFlag = true;
                break;
            case 'ChangePassword':
                if ($scope.DisabledAccountTab == true) {
                    $scope.changeAccountInfoFlag = false;

                } else {
                    $scope.changeAccountInfoFlag = true;

                }
                //$scope.changeAccountInfoFlag = true;
                break;
            default:
                $scope.personalInfoFlag = true;
                break;
        }
    }

    $scope.hasError = function (form, field, validation) {
        $scope.addForm = form;
        if (validation) {
            return ($scope.addForm[field].$dirty && $scope.addForm[field].$error[validation]) || ($scope.edit && $scope.addForm[field].$error[validation]);
        }
        return ($scope.addForm[field].$dirty && $scope.addForm[field].$invalid) || ($scope.edit && $scope.addForm[field].$invalid);
    };

    $scope.editAccountInfo = function (form, obj) {
        $scope.edit = true;
        $scope.edit3 = true;
        
        if (form.$valid && obj) {
            $scope.DisabledUpdateAccountBtn = true;
            obj.UserAccountUID = $stateParams.id;
            UserAccountFactory.UpdateAccount(obj).then(function (data) {
                $scope.edit = false;
                $scope.edit3 = false;
                $scope.DisabledUpdateAccountBtn = false;

                if (data.data.ErrorMessage && data.data.ErrorMessage.length > 0) {
                    var errorMsg = "";
                    data.data.ErrorMessage.forEach(function (item) {
                        errorMsg += "<h5>" + item + "</h5>"
                    });
                    $scope.ErrorPopUp(errorMsg);
                } else {
                    $scope.SuccessPopUp();
                }
            });
        } else {
            angular.element('input.ng-invalid').first().focus();
        }

    }

    $scope.GetUserAccountInfo = function () {
        //if ($rootScope.user && $rootScope.user.UserAccountUID) {
            console.log("enter here   dddd0");
            $scope.p1 = UserAccountFactory.GetUserAccountInfo($stateParams.id).then(function (data) {
                console.log("newEnterpriseObj", data);
                if (data.data.ErrorMessage && data.data.ErrorMessage.length > 0) {
                    $scope.DisabledAccountTab = true;
                } else {
                    $scope.editAcccount = data.data.Result;
                }
            });
       // }
    }

    $scope.GetEnterpriseInfo = function () {
        $scope.p2 = EnterpriseFactory.GetEnterpriseInfo($stateParams.id).then(function (data) {
            $scope.enterpriseInfo = data.data.Result;
            $scope.BindImage(data.data.Result.Logo);
        });

    }

    $scope.GetAllData = function () {
        $scope.GetUserAccountInfo();
        $scope.GetEnterpriseInfo();
        $q.all([$scope.p1, $scope.p2]).then(function (data) {
            console.log("q", data);
            //$scope.editAcccount = data[0].data;
        })
    }

    //Dropzone.autoDiscover = false;

    $scope.dzOptions = {
        url: '/alt_upload_url',
        paramName: 'photo',
        dictDefaultMessage: 'اضغط لإضافة الصورة أو سحب وإدراج',
        maxFilesize: '10',
        maxFiles: '1',
        paramName: 'photo',
        acceptedFiles: 'image/jpeg, images/jpg, image/png',
        addRemoveLinks: true,
        dictResponseError: 'لا سمكن رفع هذة الصورة',
        autoProcessQueue: false,
        thumbnailWidth: '200',
        thumbnailHeight: '150',
        autoDiscover :false,
        resize: function(file) {
            var resizeInfo = {
                srcX: 0,
                srcY: 0,
                trgX: 0,
                trgY: 0,
                srcWidth: file.width,
                srcHeight: file.height,
                trgWidth: this.options.thumbnailWidth,
                trgHeight: this.options.thumbnailHeight
            };

            return resizeInfo;
        },
        init: function () {
            this.on("maxfilesexceeded", function(file) {
                this.removeAllFiles();
                this.addFile(file);
            });
            //this.on("success", function(file, response) {
            //    console.log("response",response);
            //});
        }   ,
        removedfile: function (file) {
            debugger;
            var todelete = file instanceof File
            //if (!todelete) {
            //    $scope.deletedFiles.push(file);

            //}
            //$scope.manufactureOrder.Attachments.pop();
            //$scope.uploadedfiles.pop();
            $scope.uploadFiles.pop();
            var _ref;
            return (_ref = file.previewElement) !== null ? _ref.parentNode.removeChild(file.previewElement) : void 0;
        }
    };

    $scope.removeNewFile = function () {
        $scope.dzMethods.removeFile($scope.newFile); //We got $scope.newFile from 'addedfile' event callback
    };

    $scope.dzCallbacks = {
        'addedfile' : function(file){
            console.log('File added from dropzone 1.', file);
            $scope.myDz = $scope.dzMethods.getDropzone();
            if ($scope.myDz.files.length > 1) {
                $scope.myDz.files = [];
                $scope.myDz.files.push(file);
            }
            $scope.newFile = file;
            $scope.uploadFiles.push(file);
        },
        'error': function (file,xhr) {
            console.log("error",file,xhr)
            $(".dz-error-mark svg").css("background", "red");
            $(".dz-success-mark").css("display", "none");
        },
        'success': function (file, xhr) {
            console.log("success", file, xhr);
            $(".dz-success-mark svg").css("background", "green");
            $(".dz-error-mark").css("display", "none");        }

    };
    $scope.editLogoInfo = function () {
        //upload image
        if ($scope.uploadFiles.length > 0) {
            EnterpriseFactory.upload($scope.uploadFiles, $stateParams.id).then(function (data) {
                if (data.data.ErrorMessage.length > 0) {
                    var errorMsg = "";
                    data.data.ErrorMessage.forEach(function (item) {
                        errorMsg += "<h5>" + item + "</h5>"
                    });
                    $scope.ErrorPopUp(errorMsg);
                } else {
                    $scope.enterpriseInfo.Logo = appConfigs.imagesBaseURL + data.data.Result;
                    $scope.SuccessPopUp();
                }
            });
        } else {
            var errorMsg = "من فضلك اختر صورة الشعار "
            $scope.ErrorPopUp(errorMsg);
        }

    };
  
    $scope.SuccessPopUp = function () {
        bootbox.dialog({
            message: "<div class='text-center'><span style='font-size: 100px;color: lightgreen' class='fa fa-check-circle-o text-center'></span><h4>تم الحفظ بنجاح</h4></div>",
            buttons: {
                ok: {
                    label: "إغلاق"
                }
            },
            callback: function () {
                return;
            }
        });
        //$timeout(function () {
        //    bootbox.hideAll();
        //}, 2000);
    }

    $scope.ErrorPopUp = function (errorMsg) {
        bootbox.dialog({
            message: "<div class='text-center'><span style='font-size: 100px;color: red' class='fa fa-times-circle-o text-center'></span><h4>!حدث خطا</h4>" + errorMsg + "</div>",
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

    $scope.BindImage = function (path) {
        if (path) {
            filePath = appConfigs.imagesBaseURL + path;
            $scope.myDz = $scope.dzMethods.getDropzone();
            var mockFile = {
                name: 'Img',
                url: filePath,
                type: 'image/png , image/jpg',
                status: Dropzone.ADDED,
                id: $stateParams.id,
                path_thumbnail: filePath,
                //    path_medium: image.medium_image,
            };
            $scope.myDz.emit('addedfile', mockFile);
            $scope.myDz.emit('complete', mockFile);
            $scope.myDz.options.maxFiles = $scope.myDz.options.maxFiles - 1;
            $scope.myDz.createThumbnailFromUrl(mockFile, filePath, null, true);
            $scope.myDz.files.push(mockFile);
        }
    }
    $scope.GetAllData();
    //$scope.init = function () {
    //    var options = {
    //        center: new google.maps.LatLng(40.7127837, -74.00594130000002),
    //        zoom: 13,
    //        disableDefaultUI: true
    //    }
    //    this.map = new google.maps.Map(
    //        document.getElementById("map"), options
    //    );
    //    this.places = new google.maps.places.PlacesService(this.map);
    //}
    //$scope.init();
});
