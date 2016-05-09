/**
 * liufei5@staff.weibo.com
 * 蓝V认证-认证成功页
 */

//---常量定义区----------------------------------
require('utils/kit/dom/parseDOM');
require('common/trans/bluev');
require('common/form/verify');

var $ = STK;

module.exports = function(node) {
    //---变量定义区---------------------------------
    var that = {};
    var draft;
    var dvt = $.delegatedEvent(node);
    var orginalValue;
    var ajLock = false;
    var _this = {
        DOM: {}, //节点容器
        objs: {}, //组件容器
        //直接与dom操作相关的方法都存放在DOM_eventFun
        DOM_eventFun: {

        },
        bindCustEvtFuns: {

        },
        bindDelegatedEvtFuns: {
            editInfoFun: function(spec) {
                orginalValue = $.sizzle('input', _this.getDom(spec))[0].value;
                _this.getDom(spec).style.display = '';
                _this.getDom(spec, 'Display').style.display = 'none';
            },
            closeFun: function(spec) {
                _this.getDom(spec).style.display = 'none';
                _this.getDom(spec, 'Display').style.display = '';
            },
            rightFun: function(spec) {
                var _post = _this.objs.verify.json();
                if (!_post) {
                    return;
                }
                var input = $.sizzle('input', spec.el.parentNode)[0];
                var inputValue = input.value;
                var postData = {};
                postData[spec.data.type] = inputValue;
                if (inputValue != orginalValue) {
                    $.common.trans.bluev.getTrans("modify", {
                        onSuccess: function(res) {
                            _this.getDom(spec).style.display = 'none';
                            _this.getDom(spec, 'Display').style.display = '';
                            $.sizzle('.verify', _this.getDom(spec, 'Display'))[0].style.display = '';
                            $.sizzle('a', _this.getDom(spec, 'Display'))[0].style.display = 'none';
                            _this.getDom(spec, 'Text').innerHTML = inputValue;
                        },
                        onError: function(res) {
                            $.ui.alert(res.msg);
                        },
                        onFail: function(res) {
                            $.ui.alert(res.msg);
                        }
                    }).request(postData);
                } else {
                    _this.getDom(spec).style.display = 'none';
                    _this.getDom(spec, 'Display').style.display = '';
                }

            }
        },
        bindListenerFuns: {

        },
        bindFormFun: {
            getTip: 'dd [errtip]',
            rules: {
                format: function(el) {
                    var _value = el.value;
                    var reg = /[^\w\d_\s\u4e00-\u9fa5]/g;
                    if (reg.test(_value)) {
                        return "只支持中英文，数字或者“_”";
                    }
                }
            },
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
            }
        },
        getDom: function(spec, name) {
            return name ? _this.DOM[spec.data.type + name] : _this.DOM[spec.data.type];
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
        _this.objs.verify = $.common.form.verify(node, _this.bindFormFun);
    };
    //-------------------------------------------

    //---DOM事件绑定方法定义区-------------------------
    var bindDOM = function() {};
    //-------------------------------------------

    //---自定义事件绑定方法定义区------------------------
    var bindCustEvt = function() {

    };
    //-------------------------------------------

    //---代理事件绑定方法定义区------------------------
    var bindDelegatedEvt = function() {
        dvt.add('editInfo', 'click', _this.bindDelegatedEvtFuns.editInfoFun);
        dvt.add('close', 'click', _this.bindDelegatedEvtFuns.closeFun);
        dvt.add('right', 'click', _this.bindDelegatedEvtFuns.rightFun);
    };

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
        bindDelegatedEvt();
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
