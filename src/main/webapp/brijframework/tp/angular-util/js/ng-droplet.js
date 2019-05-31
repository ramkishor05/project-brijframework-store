(function($angular) {
angular.module("ng-droplet",[]);
angular.module("ng-droplet").directive('droplet', ['$rootScope', '$window', '$timeout', '$q','dropletFilesSvcs',
        function DropletDirective($rootScope, $window, $timeout, $q,dropletFilesSvcs) {
            return {
                restrict: 'EA',
                require: '?ngModel',
                scope: {
                    interface: '=ngModel'
                },
                controller: ['$scope', function DropletController($scope) {
                    $scope.FILE_TYPES = { VALID: 1, INVALID: 2, DELETED: 4, UPLOADED: 8 };
                    $scope.FILE_TYPES.ALL = Object.keys($scope.FILE_TYPES).reduce(function map(current, key) {
                        return (current |= $scope.FILE_TYPES[key]);
                    }, 0);
                    $scope.files = [];
                    $scope.isUploading = false;
                    $scope.isError = false;
                    var _isValid = function _isValid(value, values) {
                        var conditionallyLowercase = function conditionallyLowercase(value) {
                            if (typeof value === 'string') {
                                return value.toLowerCase();
                            }
                            return value;
                        };

                        return values.some(function some(currentValue) {
                            var isRegExp = (currentValue instanceof $window.RegExp);
                            if (isRegExp) {
                                var aaa =currentValue.test(conditionallyLowercase(value));
                                return aaa;
                            }
                            var bb=conditionallyLowercase(currentValue) === conditionallyLowercase(value)
                            return bb;
                        });
                    };

                    $scope.getEvent = function getEvent(event) {
                        if ('originalEvent' in event) {
                            return event.originalEvent;
                        }
                        return event;
                    };

                    $scope.isValidExtension = function isValidExtension(extension) {
//                    return _isValid(extension, $scope.options.extensions);
                        return true;
                    };
                    
                    $scope.getDateString =function(dateObj){
                        if(typeof dateObj=="string")
                            return new Date(dateObj).formatter("m/d/Y h:i a");
                        return dateObj.formatter("m/d/Y h:i p");
                    };

                    $scope.options = {
                        useArray: true,
                        extensions: []
                    };
                    $scope.requestProgress = { percent: 0, total: 0, loaded: 0 };
                    $scope.listeners = {
                        files: [],
                        deferred: null,
                        success: function success() {
                            $rootScope.$broadcast('$dropletSuccess', this.files);
                            return true;
                        },
                        error: function error() {
                        },
                        progress: function progress() {
                            var requestLength = $scope.getRequestLength(this.files);
                        }
                    };
                    (function createModelBlueprint() {
                        $scope.DropletModel = function DropletModel() {};
                        $scope.DropletModel.prototype = {
                            load: function load(file) {
                                this.file      = file;
                                this.date      = new $window.Date();
                                this.attachedAt =$scope.getDateString(this.date);
                                this.mimeType  = file.type;
                                this.iconCss = dropletFilesSvcs.getFileIconCss(this.mimeType);
                                this.extension = $scope.getExtension(file);
                                this.uniqueFileNumber = dropletFilesSvcs.getUniqueFileNumber();
                                $rootScope.$broadcast('$dropletFileAdded', this);
                            },
                            deleteFile: function deleteFile() {
                                this.setType($scope.FILE_TYPES.DELETED);
                                dropletFilesSvcs.removeUniqueFileArray(this);
                                $rootScope.$broadcast('$dropletFileDeleted', this);
                            },
                            setType: function setType(type) {
                                this.type = type;
                            }
                        };
                    })();
                    $scope.finishedUploading = function finishedUploading() {
                        $scope.progress    = { percent: 0, total: 0, loaded: 0 };
                        $scope.isUploading = false;
                    };
                    $scope.forEachFile = function forEachFile(type, callbackFn) {
                        $angular.forEach($scope.filterFiles(type || $scope.FILE_TYPES.VALID), function forEach(model) {
                            callbackFn(model);
                        });
                    };
                    $scope.addFile = function addFile(file, type) {
                        type = type || $scope.FILE_TYPES.VALID;
                        var model = new $scope.DropletModel();
                        model.load(file);
                        model.setType(type);
                        $scope.files.push(model);
                        return model;
                    };
                    $scope.filterFiles = function filterFiles(type) {
                        return $scope.files.filter(function filter(file) {
                            return type & file.type;
                        });
                    };
                    $scope.getExtension = function getExtension(file) {
                        var str, separator;
                        if ( typeof file.name !== 'undefined' ) {
                            str = file.name;
                            separator = '.';
                        } else {
                            str = file.type;
                            separator = '/';
                        }
                        if (str.indexOf(separator) === -1) {
                            return '';
                        }
                        return str.split(separator).pop().trim().toLowerCase();
                    };

                    $scope.traverseFiles = function traverseFiles(files) {
                        for (var index = 0, numFiles = files.length; index < numFiles; index++) {
                            var file      = files[index],
                                extension = $scope.getExtension(file),
                                type      = $scope.FILE_TYPES.VALID;
                            if (!$scope.isValidExtension(extension)) {
                                type = $scope.FILE_TYPES.INVALID;
                            }
                            $scope.addFile(file, type);
                        }
                    };
                    $scope.uploadFiles = function uploadFiles() {
                        $scope.isError = false;
                        var queuedFiles   = $scope.filterFiles($scope.FILE_TYPES.VALID),
                            fileProperty  = $scope.options.useArray ? 'file[]' : 'file',
                            deferred      = $q.defer();
                        (function attachEventListeners() {
                            $scope.listeners.files       = queuedFiles;
                            $scope.listeners.deferred    = deferred;
                            $scope.listeners.progress();
                            $scope.listeners.success();
                            $scope.listeners.error();
                        })();
                        return deferred.promise;
                    };

                    $scope.getRequestLength = function getRequestLength(files) {
                        var allFiles = files || $scope.filterFiles($scope.FILE_TYPES.VALID);
                        return allFiles.reduce(function reduce(previousValue, currentModel) {
                            return previousValue + currentModel.file.size;
                        }, 0);
                    };

                    $scope.throwException = function throwException(message) {
                        throw "ngDroplet: " + message + ".";
                    };
                    (function setupDirectiveInterface() {
                        $scope.interface = {
                         FILE_TYPES: $scope.FILE_TYPES,
                            uploadFiles: $scope.uploadFiles,
                            progress: $scope.requestProgress,
                            useParser: function useParser(parserFn) {
                                if (typeof parserFn !== 'function') {
                                    $scope.throwException('Parser function must be typeof "function"');
                                }
                                $scope.options.parserFn = parserFn;
                            },
                            isUploading: function isUploading() {
                                return $scope.isUploading;
                            },
                            isError: function isError() {
                                return $scope.isError;
                            },
                            isReady: function isReady() {
                                return !!$scope.filterFiles($scope.FILE_TYPES.VALID).length;
                            },
                            addFile: $scope.addFile,
                            traverseFiles: $scope.traverseFiles,
                            disableXFileSize: function disableXFileSize() {
                                $scope.options.disableXFileSize = true;
                            },
                            useArray: function useArray(value) {
                                $scope.options.useArray = !!value;
                            },
                            getFiles: function getFiles(type) {
                                if (type) {
                                    return $scope.filterFiles(type);
                                }
                                return $scope.files;
                            },
                            allowedExtensions: function allowedExtensions(extensions) {
                                if (!angular.isArray(extensions)) {
                                    $scope.throwException('Extensions must be an array');
                                }
                                $scope.options.extensions = extensions;
                            }
                        };
                        $timeout(function timeout() {
                            $rootScope.$broadcast('$dropletReady', $scope.interface);
                        });
                    })();
                }],

                link: function link(scope, element) {
                    var _preventDefault = function _preventDefault(event) {
                        event = scope.getEvent(event);
                        element.removeClass('event-dragleave');
                        element.removeClass('event-dragenter');
                        element.removeClass('event-dragover');
                        element.removeClass('event-drop');
                        element.addClass('event-' + event.type);
                        event.preventDefault();
                        event.stopPropagation();
                    };
                    element.bind('dragover dragenter dragleave', _preventDefault);
                    element.bind('drop', function onDrop(event) {
                        _preventDefault(event);
                        scope.$apply(function apply() {
                            event = scope.getEvent(event);
                            scope.traverseFiles(event.dataTransfer.files);
                        });
                    });
                }
            }
        }]);
angular.module("ng-droplet").directive('dropletPreview', ['$window','dropletFilesSvcs', function DropletPreviewDirective($window,dropletFilesSvcs) {
        return {
            scope: {
                model: '=ngModel'
            },
            restrict: 'EA',
            replace: true,
            template: '<img class="droplet-preview" />',
            link: function link(scope) {
                scope.fileContent = '';
                var fileReader = new $window.FileReader();
                fileReader.readAsDataURL(scope.model.file);
                fileReader.onload = function onload(event) {
                    scope.$apply(function apply() {
                        scope.fileContent = event.target.result;
                        dropletFilesSvcs.setUniqueFileArray({"fileDetails":scope.model,"fileContent":scope.fileContent})
                    });
                };
            }
        }

    }
]);

    /**
     * @method createInputElements
     * @return {void}
     */
    (function createInputElements() {
        var createDirective = function createDirective(name, htmlMarkup) {
           angular.module("ng-droplet").directive(name, function DropletUploadSingleDirective() {
                return {
                    restrict: 'EA',
                    require: 'ngModel',
                    replace: true,
                    template: htmlMarkup,
                    scope: {
                        interface: '=ngModel'
                    },
                    link: function link(scope, element) {
                        element.bind('change', function onChange() {

                            scope.$apply(function apply() {
                                scope.interface.traverseFiles(element[0].files);
                            });
                        });
                        element.bind('click', function onClick() {
                            this.value = null;
                        });
                    }
                }
            });
        };
        // Create the actual input elements.
        createDirective('dropletUploadSingle', '<input class="droplet-upload droplet-single" type="file" />');
        createDirective('dropletUploadMultiple', '<input class="droplet-upload droplet-multiple" type="file" multiple="multiple" title="" value=""/>');

    })();
})(window.angular);

angular.module("ng-droplet").factory('dropletFilesSvcs',function(altaFileSvcs){
    var uniqueFileNumber = 0;
    var UniqueFileArray =[];
    var dummyFileArray =[];
    var resetFilesFactory = function(){
        uniqueFileNumber = 0;
        UniqueFileArray =[];
    }
    var getUniqueFileNumber =function(){
        uniqueFileNumber++;
        return uniqueFileNumber;
    }
    var setFileArray = function(fileArray){
        UniqueFileArray = fileArray;
    }
    var getUniqueFileArray = function(){
        return UniqueFileArray;
    }
    var setUniqueFileArray = function(val){
        UniqueFileArray.push(val);
    }
    var removeUniqueFileArray = function(val){
        dummyFileArray =[];
        angular.forEach(UniqueFileArray,function(file){
            if(file.fileDetails.uniqueFileNumber != val.uniqueFileNumber){
                dummyFileArray.push(file);
            }
        })
        UniqueFileArray = dummyFileArray;
    }
    var getFileIconCss = function(mimeString){
		if(mimeString === undefined || mimeString === ''){
			return 'fa-file-text-o black';
		}
		return altaFileSvcs.getFileIconCss(mimeString);
	};
    return  {
        resetFilesFactory:resetFilesFactory,
        getUniqueFileNumber :getUniqueFileNumber,
        getUniqueFileArray : getUniqueFileArray,
        setUniqueFileArray : setUniqueFileArray,
        setFileArray : setFileArray,
        removeUniqueFileArray :removeUniqueFileArray,
        getFileIconCss:getFileIconCss
    }
});