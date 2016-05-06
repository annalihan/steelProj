steel.d("utils/uploader", [],function(require, exports, module) {
/**
 * 上传图片组件
 * @Author MrGalaxyn
 */

STK.register('utils.uploader', function($) {
    var FILE_SIZE_MB = 1024 * 1024;
    var MIME_EXT_MAPPING = {
        //图像
        'gif'  : 'image/gif',
        'jpeg' : 'image/jpeg',
        'jpg'  : 'image/jpeg',
        'png'  : 'image/png',
        'tif'  : 'image/tiff',
        'tiff' : 'image/tiff',
        //文档
        'doc'  : 'application/msword',
        'docx' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'dot'  : 'application/msword',
        'ppt'  : 'application/vnd.ms-powerpoint',
        'pptx' : 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'pps'  : 'application/vnd.ms-powerpoint',
        'pot'  : 'application/vnd.ms-powerpoint',
        'xls'  : 'application/vnd.ms-excel',
        'xlsx' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'xlc'  : 'application/vnd.ms-excel',
        'xlm'  : 'application/vnd.ms-excel',
        'xlt'  : 'application/vnd.ms-excel',
        'pdf'  : 'application/pdf',
        'mpp'  : 'application/vnd.ms-project',
        'txt'  : 'text/plain',
        'text' : 'text/plain',
        'wps'  : 'application/vnd.ms-works',
        'wdb'  : 'application/vnd.ms-works',
        'rtf'  : 'application/rtf,text/rtf',
        'htm'  : 'text/html',
        'html' : 'text/html',
        'xhtml': 'application/xhtml+xml',
        'xml'  : 'application/xml,text/xml',
        'js'   : 'text/javascript,application/javascript',
        'json' : 'application/json',
        'css'  : 'text/css',
        'csv'  : 'text/csv',
        'zip'  : 'aplication/zip',
        'dtd'  : 'application/xml-dtd',
        'asf'  : 'application/vnd.ms-asf',
        //音频
        '3gpp' : 'audio/3gpp,video/3gpp',
        'ac3'  : 'audio/ac3',
        'ogg'  : 'application/ogg,audio/ogg',
        'mp3'  : 'audio/mpeg',
        'mp2'  : 'audio/mpeg,video/mpeg',
        'mp4'  : 'audio/mp4,video/mp4',
        'au'   : 'audio/basic',
        //视频
        'mpeg' : 'video/mpeg',
        'mpg'  : 'video/mpeg'
    };
    var FILE_FILTER = {
        img: "jpg,png,gif,jpeg,bmp",
        doc: "doc,docx,xls,xlsx,ppt,pptx,pdf,txt"
    };

    return function(node, opts) {
        if (!node) throw new Error('必需的node节点 不存在');

        var that = {}, 
            _uploadBtn,
            _image, _canvas,
            _fileTypeList, _fileList,
            _opts = $.parseParam({
                width: 230,
                height: 140,
                maxFileNum: 1,
                maxFileSize: 5,
                fileFilter: 'img',
                isOriginal: true,
                imgMaxWidth: 512,
                imgMaxHeight: 200,
                upServer: '',
                fileExtensions: '',
                uploaded: $.empty,
                loading: $.empty,
                error: $.empty,
                readed: $.empty,
                storageType: 1, // 1 = 图床，2 = 微盘
                callback: $.empty,
                data: {}
            }, opts);
        var eventFun = {
            fileSelected: function(evt) {
                evt.stopPropagation();
                evt.preventDefault();
                init();
                _fileList = $.toArray(evt.target.files || []);
                var fileNum = _fileList.length;
                if (!fileNum) return;
                //判断文件数量是否合法；
                if (fileNum > _opts.maxFileNum) {
                    var ret = {
                        msg: "[fileNumberError]最多选择" + _opts.maxFileNum + "个文件",
                        type: 'error',
                        code: '100002'
                    }
                    utilFun.trigger('error', ret);
                    _opts.error && _opts.error(ret);
                    return;
                }

                for (var i = 0; i < fileNum; i++) {

                    //判断是否有文件的大小不合法；
                    if (_fileList[i].size > _opts.maxFileSize * FILE_SIZE_MB) {
                        var ret = {
                            msg: "[fileSizeError]文件大小超出" + Math.round(_opts.maxFileSize) + "M",
                            type: 'error',
                            code: '100003'
                        }
                        utilFun.trigger('error', ret);
                        _opts.error && _opts.error(ret);
                        return;
                    }
                    //判断文件类型是否合法；
                    var type = utilFun.getFileExtType(_fileList[i].name);
                    if (_fileTypeList.indexOf(type) < 0) {
                        var ret = {
                            msg: "[fileTypeError]文件类型错误，仅支持上传" + _fileTypeList.join(',') + "类型文件",
                            type: 'error',
                            code: '100004'
                        }
                        utilFun.trigger('error', ret);
                        _opts.error && _opts.error(ret);
                        return;
                    }
                }
                //通知文件处理模块，文件已经选择完
                fileReaderFun.handleFile(_fileList);
                progressFun.uploading();
            }
        };

        var fileReaderFun = {
            handleFile: function() {
                if (_fileList.length == 0) return;

                var fileReader = new FileReader();
                fileReader.onload = fileReaderFun.onLoad;
                fileReader.onprogress = fileReaderFun.onProgress;
                var file = _fileList.shift();
                fileReader.filename = file.name;
                fileReader.readAsDataURL(file); //读取base64数据
            },
            onLoad: function(evt) {
                //如果是图片，且需要，则先裁剪再展示
                if (!_opts.isOriginal && _opts.imgMaxWidth && _opts.imgMaxHeight && !$.os.ios) {
                    imageHandler.crop(evt.target.result, evt.target.filename);
                } else {
                    progressFun.readed(evt.target.result, evt.target.filename)
                }
            },
            onProgress: function(evt) {
                if (evt.lengthComputable) {
                    var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
                    if (percentLoaded < 100) {
                        progressFun.uploading(percentLoaded);
                    }
                }
            }
        };

        var imageHandler = {
            crop: function(src, name) {
                var type = utilFun.getFileExtType(name);
                src = 'data:' + MIME_EXT_MAPPING[type] + ';base64,' + src.split(',')[1];
                if (!_image) _image = new Image();
                if (!_canvas) _canvas = $.C('canvas');
                _image.onload = function () {
                    var srcW = _image.width,
                        srcH = _image.height,
                        destW = _opts.imgMaxWidth,
                        destH = _opts.imgMaxHeight,
                        widthRatio = srcW / destW,
                        heightRatio = srcH / destH,
                        scale, //缩放比例，原图尺寸和目标尺寸的对比
                        sx, //原图采集开始的x坐标
                        sy, //原图采集开始的y坐标
                        swidth, //原图采集区域的宽度
                        sheight; //原图采集区域的高度
                   
                    _canvas.width = destW;
                    _canvas.height = destH;

                    //缩放后居中裁切
                    //匹配宽高比率小的那个边；
                    //如果宽度比大于高度比，说明要匹配高度，宽度裁切；反之亦然。
                    if (widthRatio > heightRatio) {
                        scale = heightRatio;
                        swidth = destW * scale;
                        sheight = destH * scale;
                        //居中的起始位置x坐标。
                        sx = Math.abs((swidth - srcW) / 2);
                        sy = 0;
                    } else {
                        scale = widthRatio;
                        swidth = destW * scale;
                        sheight = destH * scale;
                        //居中的起始位置y坐标。
                        sx = 0;
                        sy = Math.abs((sheight - srcH) / 2);
                    }
                    _canvas.getContext('2d').drawImage(_image, sx, sy, swidth, sheight, 0, 0, destW, destH);
                    progressFun.readed(_canvas.toDataURL(), name);
                }
                _image.src = src;
            }
        };

        var progressFun = {
            uploading: function(progress) {
                var ret = {
                    msg: "上传中",
                    type: 'uploading',
                    data: progress,
                    code: '100004'
                }
                utilFun.trigger('uploading', ret);
                _opts.uploading && _opts.uploading(ret);

            },
            uploaded: function(data) {
                var ret = {
                    msg: "上传完成",
                    type: 'uploaded',
                    data: data,
                    code: '100000'
                }
                utilFun.trigger('completed', ret);
                _opts.uploaded && _opts.uploaded(ret);
            },
            error: function(data) {
                var ret = {
                    msg: "网络繁忙，请重试！",
                    type: 'error',
                    data: data,
                    code: '100005'
                }
                utilFun.trigger('error', ret);
                _opts.error && _opts.error(ret);
            },
            readed: function(src, name) {
                var data = $.merge({
                    data: utilFun.encode(src),
                    storageType: _opts.storageType,
                    filename: name
                }, _opts.data);
                $.ajax({
                    type: 'post',
                    url: _opts.upServer || '/v1/widgets/interface/proxy?api=interface/picture/upload',
                    data: data,
                    timeout: 15000,
                    dataType: 'json',
                    onComplete: function(ret) {
                        progressFun.uploaded(ret.data);
                        // fileReaderFun.handleFile();
                    },
                    onFail: function(e) {
                        progressFun.error();
                        fileReaderFun.handleFile();
                    },
                    onTimeout: function() {
                        progressFun.error();
                        fileReaderFun.handleFile();
                    }
                });
                var ret = {
                    msg: "文件已获取",
                    type: 'readed',
                    data: src,
                    code: '100006'
                };
                _opts.readed && _opts.readed(ret);
                utilFun.trigger('readed', ret);
            }
        };

        var utilFun = {
            trigger: function(trigger, ret) {
                $.trigger(that, trigger, ret);
                _opts.callback && _opts.callback(ret);
            },
            encode: function(str) {
                return str.replace(/\&/g,'&amp;').
                    replace(/"/g,'&quot;').
                    replace(/\</g,'&lt;').
                    replace(/\>/g,'&gt;').
                    replace(/\'/g,'&#39;').
                    replace(/\u00A0/g,'&nbsp;').
                    replace(/(\u0020|\u000B|\u2028|\u2029|\f)/g,'&#32;');
            },
            getFileExtType: function(name) {
                var type = name.split('.')[1];
                // 小米2读不到图片正确名字
                if (_opts.fileFilter === 'img' && type === undefined) 
                    type = 'jpg';

                return type;
            }
        };

        var DOMFun = {
            setUploadBtnAttr: function() {
                var uploadBtn = $.$('input[node-type=uploadBtn]', node);
                if (!_fileTypeList) {
                    if (_opts.fileExtensions) _fileTypeList = _opts.fileExtensions.split(',');
                    else _fileTypeList = FILE_FILTER[_opts.fileFilter].split(',');

                    var acceptList = [];
                    for (var i = 0, len = _fileTypeList.length; i < len; i++) {
                        acceptList.push(MIME_EXT_MAPPING[_fileTypeList[i]]);
                    }
                    if (_opts.maxFileNum < 2) uploadBtn.removeAttribute("multiple");
                    uploadBtn.setAttribute('accept', acceptList.join(','));
                }
                
                $.once(uploadBtn, 'change', eventFun.fileSelected);
            }
        };
        
        function init() {
            var uploadBtn = $.$('input[node-type=uploadBtn]', node),
                uploaderContainer = uploadBtn.parentNode,
                html = uploaderContainer.innerHTML;
            uploaderContainer.innerHTML = html;
            DOMFun.setUploadBtnAttr();
        }

        init();
        that.destroy = function() {
            _image = _canvas = _fileTypeList = null;
            eventFun = progressFun = utilFun = null;
            DOMFun = fileReaderFun = imageHandler = null;
        }
        
        return that;
    };
});

});