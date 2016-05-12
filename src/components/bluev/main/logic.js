/**
 * author fangshu1@staff.weibo.com
 */

//---常量定义区----------------------------------
require('utils/kit/dom/parseDOM');
require('ui/alert');
require('common/suda');
require('common/trans/bluev');

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
            verifyFun: function(spec) {
                if (spec.data.is_orange_v == "true") {
                    $.ui.alert("抱歉！您已经是个人微博认证用户，不能重复申请微博官方认证！如有任何问题，请与微博客服联系：4000 980 980");
                } else if (spec.data.is_agent_account == "true") {
                    $.ui.alert("抱歉！您已由代理开通统一账户，如要开通蓝V认证，请联系您的代理开通，谢谢！");
                }
            },
            addFun: function(e) {
                $.common.trans.bluev.getTrans("add", {
                    onSuccess: function(res) {
                        e.target.parentNode.innerHTML = '<span class="focus W_btn_b"><em class = "W_ficon S_ficon ficon_right">Y</em>已关注</span>'
                    },
                    onError: function(res) {
                        $.ui.alert(res.msg);
                    },
                    onFail: function(res) {
                        $.ui.alert(res.msg);
                    }
                }).request({ a: 1 });

            }
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

    };
    //-------------------------------------------

    //---DOM事件绑定方法定义区-------------------------
    var bindDOM = function() {
        $.addEvent(_this.DOM.add, 'click', _this.DOM_eventFun.addFun);
    };
    //-------------------------------------------

    //---自定义事件绑定方法定义区------------------------
    var bindCustEvt = function() {

    };
    //-------------------------------------------

    //---代理事件绑定方法定义区------------------------
    var bindDelegatedEvt = function() {
        dvt.add('verify', 'click', _this.DOM_eventFun.verifyFun);
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
