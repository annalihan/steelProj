//---常量定义区----------------------------------
require('utils/kit/dom/parseDOM');
require('ui/alert');
require('common/suda');
require('common/trans/bluev');
require('ui/dialog');
require('ui/confirm');
require('common/form/verify');
require('common/edit/picUploader');

var $ = STK;

module.exports = function(node) {
    //---变量定义区---------------------------------
    var that = {};
    var optSize = {
        imgMaxHeight: '640',
        imgMaxWidth: '640',
        flashWidth: '110',
        flashHeight: '110'
    };
    var draft;
    var dvt = $.delegatedEvent(node);
    var ajLock = false;
    var _this = {
        DOM: {}, //节点容器
        objs: {}, //组件容器
        DOM_eventFun: {
            getVerifyCode: function() {
                console.log('....');
            },
            imgUploadInit: function() {
                if (!_this.DOM['pirzePic']) {
                    return;
                }
                _this.objs.uploadPic = $.common.edit.picUploader(_this.DOM['pirzePic']);
                _this.objs.uploadPic.initWidget(_this.objs.uploadPic.DOM['upfile_text'], {
                    imgMaxWidth : optSize.imgMaxWidth,
                    imgMaxHeight : optSize.imgMaxHeight,
                    w: 110,
                    h: 110,
                    size: 5 * 1024 * 1024,
                    uploading: function(it, json, initializer){
                        initializer.DOM.upfile_ing.style.display = '';
                        initializer.DOM.fidTip.innerHTML = "";
                    },
                    uploaded: function(obj, json, initializer) {
                        console.log(initializer);
                        var pid = (json.data[0] && json.data[0].pid) || "";
                        if (pid) {
                            initializer.DOM.filePid.setAttribute('value', pid);
                            initializer.DOM.fidTip.innerHTML = "";
                            var pUrl = $.common.extra.imageURL(pid, {
                                size: 'small'
                            });
                            initializer.DOM.previewPic.src = pUrl;
                            $.addClassName(initializer.DOM['picbox'], 'uploaded')
                            initializer.DOM.upfile_error.style.display = 'none';
                        } else {
                            initializer.DOM.upfile_error.style.display = '';
                        }
                        initializer.DOM.upfile_ing.style.display = 'none';
                    },
                    error: function(it, errorObj, initializer) {
                        switch (errorObj.type) {
                            case 'fileTypeError':
                                $.ui.alert('请上传png、jpg、gif格式图片文件');
                                break;
                            case 'fileSizeErr':
                                $.ui.alert('图片大于5M啦，有点大哦，换一张上传吧');
                                break;
                        }
                    }
                });
            },
        },
        ajFun: {},
        bindFormFun: {
            getTip: 'td span[errtip]',
            tipTemp: function(msg, type) {
                var tmpl;
                if (type == 1) {
                    tmpl =
                        '<div class="WB_outReset W_layer W_layer_pop tipbox" style="top:-35px;">\
                            <div class="content layer_mini_info">\
                                <p class="main_txt">\
                                    <i class="W_icon icon_rederrorS"></i>\
                                    <span class="txt S_txt1" node-type="errorTipText">' + msg + '</span>\
                                </p>\
                                <div class="W_layer_arrow">\
                                        <span class="W_arrow_bor W_arrow_bor_b">\
                                            <i class="S_line3"></i><em class="S_bg2_br"></em>\
                                        </span>\
                                </div>\
                            </div>\
                        </div>';
                } else if (type == 2) {
                    tmpl =
                        '<span class="M_notice_succ">\
                            <span class="W_icon icon_succ"></span>\
                            <span class="txt">' + (msg == 'true' ? '' : msg) + '</span>\
                        </span>';
                }
                return tmpl;
            },
            showTip: true,
            forceCheck: true //强制check，包括disable和hidden的
        }
    };
    //---参数的验证方法定义区---------------------------
    var argsCheck = function() {
        if (node == null || (node != null && !$.isNode(node))) {
            throw "[]:argsCheck()-The param node is not a DOM node.";
        }
    };
    //-------------------------------------------

    //---Dom的获取方法定义区---------------------------
    var parseDOM = function() {
        _this.DOM = $.utils.kit.dom.parseDOM($.builder(node).list);
    };
    //-------------------------------------------

    //---模块的初始化方法定义区-------------------------
    var initPlugins = function() {
        // _this.objs.recordForm = $.common.form.bindFormV2(_this.DOM.recordForm, {}, _this.bindFormFun);
        _this.objs.recordForm = $.common.form.verify(node, _this.bindFormFun);
        _this.DOM_eventFun.imgUploadInit();
    };
    //-------------------------------------------

    //---DOM事件绑定方法定义区-------------------------
    var bindDOM = function() {
        // $.addEvent(_this.DOM.aj, 'click', _this.ajFun.sendFun);
        $.addEvent(_this.DOM.getverifycode, 'click', _this.DOM_eventFun.getVerifyCode);
        dvt.add('uploadPic', 'click', _this.DOM_eventFun.uploadPicFun);
    };
    //-------------------------------------------

    //---自定义事件绑定方法定义区------------------------
    var bindCustEvt = function() {

    };
    //-------------------------------------------

    //---广播事件绑定方法定义区------------------------
    var bindListener = function() {
        //页面显示的时候调用，以便对页面处理
    };
    //-------------------------------------------

    //---组件公开方法的定义区---------------------------
    var destroy = function() {
        dvt.destroy();
        if (_this) {
            $.forEach(_this.objs, function(o) {
                if (o && o.destroy) {
                    o.destroy();
                }
            });
            _this = null;
        }
    };
    //-------------------------------------------
    //---组件的初始化方法定义区-------------------------
    var init = function() {
        argsCheck();
        parseDOM();
        initPlugins();
        bindDOM();
        bindCustEvt();
        bindListener();
    };
    //-------------------------------------------
    //---执行初始化---------------------------------
    init();
    //-------------------------------------------

    //---组件公开属性或方法的赋值区----------------------
    that.destroy = destroy;
    //-------------------------------------------

    return that;
};
