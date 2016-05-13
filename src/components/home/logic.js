//---常量定义区----------------------------------
require('utils/kit/dom/parseDOM');
require('ui/alert');
require('common/trans/bluev');
require('ui/dialog');
require('ui/iscroll');

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
        //直接与dom操作相关的方法都存放在DOM_eventFun
        DOM_eventFun: {

        },
        bindCustEvtFuns: {

        },
        bindDelegatedEvtFuns: {

        },
        bindListenerFuns: {

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
        _this.objs.scroll = $.ui.iscroll(_this.DOM['page_wrap']);
    };
    //-------------------------------------------

    //---DOM事件绑定方法定义区-------------------------
    var bindDOM = function() {
        // $.addEvent(_this.DOM.aj, 'click', _this.ajFun.sendFun);
    };
    //-------------------------------------------

    //---自定义事件绑定方法定义区------------------------
    var bindCustEvt = function() {

    };
    //-------------------------------------------

    //---代理事件绑定方法定义区------------------------
    var bindDelegatedEvt = function() {
        //_this.obj_deleEvt = $.delegatedEvent(node);
        //_this.obj_deleEvt.add('eleDrag', 'click', _this.DOM_eventFun.dragstart);
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
