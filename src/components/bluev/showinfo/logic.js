//---常量定义区---------------------------------- 
require('utils/kit/dom/parseDOM');
require('common/form/verify');
require('common/bluevSelectData/enterprise');

var $ = STK;
var ADDRESSDATA = $.common.bluevSelectData.enterprise();

module.exports = function(node) {

    var documentFragment = document.createDocumentFragment();
    var EMPTYSELECT = '<option value="">--请选择--</option>';

    var NAMEGUIDE = {
        "1461": "请基于机构、场馆名称填写",
        "2559": "请基于基于粉丝团名称填写",
        "3490": "请基体育俱乐部名称填写",
        "3495": "请基于基于明星工作室名称填写",
    };

    var INFOGUIDE = {
        "1461": "说明为机构、场馆名，不要使用修饰性质的形容词。不超过30个字。",
        "2559": "说明为粉丝团名，不要使用修饰性质的形容词。不超过30个字。",
        "3490": "说明为球迷俱乐部名，不要使用修饰性质的形容词。不超过30个字。",
        "3495": "说明为明星工作室名，不要使用修饰性质的形容词。不超过30个字。"
    };
    //---变量定义区---------------------------------
    var that = {};
    var draft;
    var dvt = $.delegatedEvent(node);
    var ajLock = false;
    var _this = {
        DOM: {}, //节点容器
        objs: {}, //组件容器
        DOM_eventFun: {
            textInputFun: function(evt) {
                var nodeTarget = evt.target.getAttribute('node-type');
                _this.DOM[nodeTarget][1].innerHTML = evt.target.value;
            },
            typeSelectFun: function(spec) {
                var value = spec.el.value;
                if (value) {
                    _this.switchText(value);
                    _this.appendTypeList(spec, value);
                } else {
                    _this.DOM[spec.data.target].innerHTML = EMPTYSELECT;
                    if (spec.data.target == "agencySecond") {
                        _this.DOM.nameGuide.innerHTML = NAMEGUIDE["1461"];
                        _this.DOM.infoGuide.innerHTML = INFOGUIDE["1461"];
                    }

                }
            },
            addressSecondFun: function(e) {
                if (e.target.value) {
                    if (e.target.value == 1000) {
                        _this.DOM.addressThird.style.display = 'none';
                    } else {
                        _this.appendAddressList(e);
                    }
                } else {
                    _this.DOM.addressThird.innerHTML = EMPTYSELECT;
                }
            },
            nextFun: function() {
                var _post = _this.objs.verify.json();
                if (!_post) {
                    return;
                }
                _this.DOM.formInfo.submit();
            },
            floatTipFun:function(spec){
                console.log(spec);
            }
        },
        bindFormFun: {
            getTip: 'dd [errtip]',
            rules: {
                format: function(el) {
                    var _value = el.value;
                    var reg = /[^\w\d_\u4e00-\u9fa5]/g;
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
        switchText: function(value) {
            switch (value) {
                case "1461":
                    _this.DOM.nameGuide.innerHTML = NAMEGUIDE["1461"];
                    _this.DOM.infoGuide.innerHTML = INFOGUIDE["1461"];
                    break;
                case "2559":
                    _this.DOM.nameGuide.innerHTML = NAMEGUIDE["2559"];
                    _this.DOM.infoGuide.innerHTML = INFOGUIDE["2559"];
                    break;
                case "3490":
                    _this.DOM.nameGuide.innerHTML = NAMEGUIDE["3490"];
                    _this.DOM.infoGuide.innerHTML = INFOGUIDE["3490"];
                    break;
                case "3495":
                    _this.DOM.nameGuide.innerHTML = NAMEGUIDE["3495"];
                    _this.DOM.infoGuide.innerHTML = INFOGUIDE["3495"];
                    break;
            }
        },
        appendTypeList: function(spec, value) {
            for (var i in $CONFIG["$second_type"][value]) {
                var nOption = $.C('option');
                nOption.innerHTML = $CONFIG["$second_type"][value][i];
                nOption.value = i;
                documentFragment.appendChild(nOption);
            }
            _this.DOM[spec.data.target].innerHTML = '';
            _this.DOM[spec.data.target].appendChild(documentFragment);
        },
        appendAddressList: function(e) {
            var oData = {};
            var aName = ADDRESSDATA['prov' + e.target.value].split(',');
            var aNum = ADDRESSDATA['code' + e.target.value].split(',');
            for (var j = 0, len = aName.length; j < len; j++) {
                oData[aNum[j]] = aName[j];
            }
            for (var i in oData) {
                var nOption = $.C('option');
                nOption.innerHTML = oData[i];
                nOption.value = i;
                documentFragment.appendChild(nOption);
            }
            _this.DOM.addressThird.style.display = '';
            _this.DOM.addressThird.innerHTML = '';
            _this.DOM.addressThird.appendChild(documentFragment);
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
    var bindDOM = function() {
        $.addEvent(_this.DOM.nickname[0], 'keyup', _this.DOM_eventFun.textInputFun);
        $.addEvent(_this.DOM.verifyInfo[0], 'keyup', _this.DOM_eventFun.textInputFun);
        $.addEvent(_this.DOM.addressSecond, 'change', _this.DOM_eventFun.addressSecondFun);
        $.addEvent(_this.DOM.next, 'click', _this.DOM_eventFun.nextFun);
    };
    //-------------------------------------------

    //---自定义事件绑定方法定义区------------------------
    var bindCustEvt = function() {

    };
    //-------------------------------------------

    //---代理事件绑定方法定义区------------------------
    var bindDelegatedEvt = function() {
        dvt.add('typeSelect', 'change', _this.DOM_eventFun.typeSelectFun);
        dvt.add('floatTip', 'click', _this.DOM_eventFun.floatTipFun);
    };

    //---广播事件绑定方法定义区------------------------
    var bindListener = function() {
        //页面显示的时候调用，以便对页面处理
    };
    //-------------------------------------------

    //---组件公开方法的定义区---------------------------
    var destroy = function() {
        $.remove(_this.DOM.nickname[0], 'keyup', _this.DOM_eventFun.textInputFun);
        $.remove(_this.DOM.verifyInfo[0], 'keyup', _this.DOM_eventFun.textInputFun);
        $.remove(_this.DOM.addressSecond, 'change', _this.DOM_eventFun.addressSecondFun);
        $.remove(_this.DOM.next, 'click', _this.DOM_eventFun.nextFun);
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
