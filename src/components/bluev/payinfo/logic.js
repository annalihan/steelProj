//---常量定义区----------------------------------
require('utils/kit/dom/parseDOM');
require('ui/alert');
require('common/suda');
require('common/trans/bluev');
require('ui/dialog');
require('ui/confirm');
require('ui/bubble');
var $ = STK;

//支付弹出层模版
var PAYING_TEMP =
    '<div class="layer_point">\
        <div>\
            <p class=" W_f14 W_texta">请在新开页面进行支付，支付完成前请不要关闭该窗口。</p>\
        </div>\
    </div>\
    <div class="W_layer_btn S_bg1">\
        <a href="javascript:void(0);" class="W_btn_a btn_34px" node-type="ok"><span>付款成功</span></a>\
        <a href="javascript:void(0);" class="W_btn_b btn_34px" node-type="cancel"><span>放弃付款</span></a>\
    </div>';
var COMFIRM_TEMP =
    '<div class="layer_point">\
        <div>\
            <p class=" W_f14 W_texta">还没有收到您的支付信息，请确认是否付款成功。</p>\
        </div>\
    </div>\
    <div class="W_layer_btn S_bg1">\
        <a href="javascript:void(0);" class="W_btn_a btn_34px" node-type="ok"><span>付款成功</span></a>\
        <a href="javascript:void(0);" class="W_btn_b btn_34px" node-type="cancel"><span>放弃付款</span></a>\
    </div>';
var CANCEL_TEMP =
    '<div class="layer_point">\
        <div>\
            <p class=" W_f14 W_texta">确定要取消本次认证？</p>\
        </div>\
    </div>\
    <div class="W_layer_btn S_bg1">\
        <a href="javascript:void(0);" class="W_btn_a btn_34px" node-type="ok"><span>确定</span></a>\
        <a href="javascript:void(0);" class="W_btn_b btn_34px" node-type="cancel"><span>取消</span></a>\
    </div>';

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
            selectOp1Fun:function(){
                $.addClassName(_this.DOM.op1,'sel');
                $.removeClassName(_this.DOM.op2,'sel');
                _this.DOM.price.innerHTML = '¥5000/年';
                _this.DOM.original.innerHTML = '¥5300/年';
                _this.DOM.notice.innerHTML = '返2000现金红包';
                _this.DOM.item01.setAttribute('src','http://img.t.sinajs.cn/t6/business/src/css/bluev/img/temp01.png');
            },
            selectOp2Fun:function(){
                $.removeClassName(_this.DOM.op1,'sel');
                $.addClassName(_this.DOM.op2,'sel');
                _this.DOM.price.innerHTML = '¥10000/年';
                _this.DOM.original.innerHTML = '¥10100/年';
                _this.DOM.notice.innerHTML = '返3000现金红包';
                _this.DOM.item01.setAttribute('src','temp02.png');
            },
            payFun:function(){
                _this.objs.confirmDia = $.ui.dialog();
                _this.objs.confirmDia.setTitle('');
                _this.objs.confirmDia.setContent(PAYING_TEMP);
                _this.objs.confirmDia.show().setMiddle();
                var confirmDOM = $.utils.kit.dom.parseDOM($.builder(_this.objs.confirmDia.getInner()).list) || {};
                $.addEvent(confirmDOM.cancel, 'click', function() {
                    _this.objs.confirmDia.hide();
                });
                $.addEvent(confirmDOM.ok, 'click', function() {
                    _this.objs.confirmDia.hide();
                    var opts = {
                        ok : $.empty,
                        cancel : $.empty,
                        content : '',
                        okTxt : '确定',
                        cancelTxt : '取消',
                        speed: 0
                    };
                    var confirm = $.ui.confirm('取消成功', opts);
                });
            }
        },
        ajFun: {
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
        $.addEvent(_this.DOM.op1, 'click', _this.DOM_eventFun.selectOp1Fun);
        $.addEvent(_this.DOM.op2, 'click', _this.DOM_eventFun.selectOp2Fun);
        $.addEvent(_this.DOM.payBtn, 'click', _this.DOM_eventFun.payFun);
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
        $.remove(_this.DOM.op1, 'click', _this.DOM_eventFun.selectOp1Fun);
        $.remove(_this.DOM.op2, 'click', _this.DOM_eventFun.selectOp2Fun);
        $.remove(_this.DOM.payBtn, 'click', _this.DOM_eventFun.payFun);
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
