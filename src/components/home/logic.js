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

        },
        requestData:function(start,count){
            $.common.trans.bluev.getTrans("square", {
                onSuccess: function(res) {
                    _this.objs.scroll.updateCache(start, data);                },
                onError: function(res) {
                    console.log("Error");
                },
                onFail: function(res) {
                    console.log("Fail");
                }
            }).request();
        },
        updateContent:function(el,data){
            el.innerHTML = data;
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
        // var pullDownOffset = _this.DOM['scroll-loader']
        var pullDownEl = _this.DOM['scroll-loader'];
        _this.objs.iscroll = $.ui.iscroll(_this.DOM['wrapper_list'],{
            // scrollbarClass: 'myScrollbar', /* 重要样式 */
            // topOffset: pullDownOffset,
            infiniteElements: '#content .itemWrapper',
            dataset:_this.requestData,
            dataFilter:_this.updateContent,
            infiniteLimit:100,
            onPullDown:function(){
                alert(1);
            },
            onRefresh: function () {
                alert(111);
               /* if (pullDownEl.className.match('loading')) {
                    pullDownEl.className = '';
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
                } else if (pullUpEl.className.match('loading')) {
                    pullUpEl.className = '';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                }*/
            },
            onScrollMove: function () {
                console.log(222);
                /*if (this.y > 5 && !pullDownEl.className.match('flip')) {
                    pullDownEl.className = 'flip';
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
                    this.minScrollY = 0;
                } else if (this.y < 5 && pullDownEl.className.match('flip')) {
                    pullDownEl.className = '';
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
                    this.minScrollY = -pullDownOffset;
                } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                    pullUpEl.className = 'flip';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
                    this.maxScrollY = this.maxScrollY;
                } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                    pullUpEl.className = '';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                    this.maxScrollY = pullUpOffset;
                }*/
            },
            onScrollEnd: function () {
                console.log(333);
               /* if (pullDownEl.className.match('flip')) {
                    pullDownEl.className = 'loading';
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
                    pullDownAction();   // Execute custom function (ajax call?)
                } else if (pullUpEl.className.match('flip')) {
                    pullUpEl.className = 'loading';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
                    pullUpAction(); // Execute custom function (ajax call?)
                }*/
            }
        });
    };
    //-------------------------------------------

    //---DOM事件绑定方法定义区-------------------------
    var bindDOM = function() {
        // $.addEvent(_this.DOM.aj, 'click', _this.ajFun.sendFun);
        $.addEvent(document, 'touchmove', function (e) { e.preventDefault(); });
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
