steel.d("components/bluev/inputinfo/logic", ["utils/kit/dom/parseDOM","ui/alert","common/suda","common/trans/bluev","ui/dialog","ui/confirm","common/form/verify"],function(require, exports, module) {
//---常量定义区---------------------------------- 
require('utils/kit/dom/parseDOM');
require('ui/alert');
require('common/suda');
require('common/trans/bluev');
require('ui/dialog');
require('ui/confirm');
require('common/form/verify');

var $ = STK;

module.exports = function(node) {
    //---变量定义区---------------------------------
    var that = {};
    var draft;
    var dvt = $.delegatedEvent(node);
    var ajLock = false;
    var _this = {
        DOM: {}, //节点容器
        objs: {}, //组件容器
        DOM_eventFun: {
            getVerifyCode: function(){
                console.log('....');
            }
        },
        ajFun: {
        },
        bindFormFun: {
            // getTip: function(el) {
            //     return $.sizzle('[err-tips]', el.parentNode)[0];
            // },
            // tipTemp: function(msg, type) {
            //     if (type == 1) {
            //         return '<span class="W_icon icon_rederrorS"></span>' + msg;
            //     } else {
            //         return '<span class="W_icon"></span>' + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + msg;
            //     }
            // }
            rules:{
                newRule:function(el){
                    return true//发生错误
                },
            },
            //getTip不存在按照唯一弹层方式进行
            getTip: 'td span[err-tips]',
            // tipTemp: function(msg, type){
            //     return msg;
            // },
            showTip: true,
            forceCheck: true  //强制check，包括disable和hidden的
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
        _this.objs.recordForm = $.common.form.verify(node, {}, _this.bindFormFun);
    };
    //-------------------------------------------

    //---DOM事件绑定方法定义区-------------------------
    var bindDOM = function() {
        // $.addEvent(_this.DOM.aj, 'click', _this.ajFun.sendFun);
        $.addEvent(_this.DOM.getverifycode, 'click', _this.DOM_eventFun.getVerifyCode);
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

});