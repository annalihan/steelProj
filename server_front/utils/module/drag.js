steel.d("utils/module/drag", ["utils/kit/dom/parseDOM","utils/kit/dom/firstChild","utils/kit/dom/parentElementBy"],function(require, exports, module) {
/**
 * 拖拽代理
 * @id $.utils.module.drag
 * @param {Object} node 组件最外节点
 * @param {String} conf.actType 拖拽对象的action-type
 * @param {Function} conf.dragNode return拖拽对象的Function
 * @return {Object} 实例
 * @author kongbo@staff.sina.com.cn
 * 
 * @example
 * $.utils.module.drag(node,'action-type value').land();
 *
 * var _drag = $.utils.module.drag(node,conf);
 * _drag.demo().land();
 -------------------------------------
 * _drag.demo({type:1,start:function(el,demoLay){},move:function(el,demoLay){},end:function(){}});
 * _drag.scroll(box);
 * $.custEvent.add(drag, 'dragStart', function(o,opts){//opts.el});
 * $.custEvent.add(drag, 'dragEnd', function(o,opts){//opts.el});
 * $.custEvent.add(drag, 'draging', function(o,opts){//opts.el});
 */

require("utils/kit/dom/parseDOM");
require("utils/kit/dom/firstChild");
require("utils/kit/dom/parentElementBy");

STK.register('utils.module.drag', function($) {

    //+++ 常量定义区 ++++++++++++++++++
    var $L = $.utils.kit.extra.language;
    //-------------------------------------------

    return function(node,conf) {
        var argsCheck, parseDOM, initPlugins, bindDOM, bindCustEvt, bindListener, destroy, delegate, init, that = {};
        conf.spaceTag = conf.spaceTag ? conf.spaceTag : 'div';
        conf.containment = conf.containment ? conf.containment : false;
        //+++ 变量定义区 ++++++++++++++++++
        var _this = {
            DOM : {}, //节点容器
            objs : {}, //组件容器
            DOM_eventFun : {//DOM事件行为容器
            },
            DeventFun : {
                drag : function(opts) {
                    node.style.position = 'relative';
                    var e = $.core.evt.getEvent();
                    if (conf.dragNode && !opts.el.dragDom) {
                        opts.el.dragDom = $.utils.kit.dom.parentElementBy(opts.el,node,function(o){
                            if(o.getAttribute('drag-node')){
                                return true;
                            }
                        });
                    }
                    _this.dragObj = {dom: opts.el,el:opts.el.dragDom||opts.el,target:e.target || $.core.evt.fixEvent().target};
                    _this.dragFun.start(e);
                }
            },
            /**
             * @param {booler} rows 拖拽列表的排列方式，true 列排列 false 行排列
             * @return {Object} that 实例
             * @example
             * that.land(true);
             */
            land: function(rows){
                conf.land = rows?1:2;
                return that;
            },
            /**
             * @param {Function} demoHtmlFun demo层显示HTML
             * @return {Object} that 实例
             * @example
             * var fireFun = {
             *  start: function(el,demoLay){return el.innerHTML;},
             *  move: function(el,demoLay,data){return el.innerHTML;},
             *  end: function(el,demoLay){el.style.border='';}
             * }
             * that.demo(funs);
             */
            demo: function(fireFun){
                conf.demo = true;
                if(!fireFun){
                    return;
                }
                (fireFun.type == 1) && (conf.dragSelf = true);
                if(fireFun.start && (typeof fireFun.start == 'function')){
                    conf.demoStart = fireFun.start;
                }
                if(fireFun.move && (typeof fireFun.move == 'function')){
                    conf.demoMove = fireFun.move;
                }
                if(fireFun.end && (typeof fireFun.end == 'function')){
                    conf.demoEnd = fireFun.end;
                }
                return that;
            },
            /**
             * @param {Function} outer overflow:auto 元素
             * @return {Object} that 实例
             * @example
             * that.scroll(dom);
             */
            scroll: function(outer){
                if(!outer){
                    return;
                }
                conf.outer = $.core.dom.isNode(outer)?[outer]:outer;
                $.core.arr.foreach(conf.outer,function(o,i){
                    var baseH = o.style.height;
                    o.style.height = 'auto';
                    o.h = o.offsetHeight;
                    o.style.height = baseH ;
                });
                return that;
            },
            dragFun : {
                start: function(e){
                    document.body.style.cursor = 'move';
                    document.body.onselectstart = function(){return false;};
                    $.addEvent(document,'mousemove',_this.dragFun.draging);
                    $.addEvent(document,'mouseup',_this.dragFun.end);
                    $.addEvent(document,'click',_this.dragFun.stopClick,true);

                    if(!$.IE){
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    return false;
                },
                go: function(e){
                    //存放action-type || drag-node
                    _this.actDOM = conf.dragNode?$.sizzle('[drag-node=true]',node):$.sizzle('[action-type='+ conf.actType +']',node);
                    //fireEvent
                    var args = _this.dragFun.pos(e,_this.dragObj);
                    $.custEvent.fire(that,'dragStart',args);
                    conf.demo && _this.demoFun.addDemo(args);
                },
                draging: function(e){
                    if(!_this||!_this.dragObj){
                        return;
                    }
                    !_this.dragFun.hasDraging && _this.dragFun.go(e)
                    _this.dragFun.hasDraging = true;
                    e.cancelBubble = true;
                    var args = _this.dragFun.pos(e,_this.dragObj);
                    //fireEvent
                    $.custEvent.fire(that,'draging',args);
                    //滚动框上下滚动
                    conf.outer && _this.dragFun.scroll(conf.outer,args);
                    conf.demo && _this.demoFun.dragDemo(args);
                    conf.land && _this.landFun.land(args);

                },
                end: function(e){
                    if(!_this||!_this.dragObj){
                        return;
                    }
                    if(!_this.dragObj.draging){
                        _this.dragFun.go(e);
                    }
                    document.body.style.cursor = 'auto';
                    document.body.onselectstart = function(){return true;};
                    conf.demo && _this.demoFun.removeDemo();
                    //fireEvent
                    var args = _this.dragFun.pos(e,_this.dragObj);
                    _this.dragFun.hasDraging && $.custEvent.fire(that,'dragEnd',args);
                    _this.dragFun.hasDraging = false;
                    _this.dragObj = null;
                    $.removeEvent(document,'mousemove',_this.dragFun.draging);
                    $.removeEvent(document,'mouseup',_this.dragFun.end);
                    $.removeEvent(document,'click',_this.dragFun.stopClick,true);
                },
                scroll: function(outer,data){
                    if(!outer){
                        return;
                    }
                    outer = $.core.dom.isNode(outer)?[outer]:outer;
                    $.core.arr.foreach(outer,function(o,i){
                        var _isBody = (o == document.body);
                        if(_isBody){
                            _this.dragFun.scrollBody(data);
                        }else{
                            var _pos = {t: $.core.dom.position(o).t,top: o.scrollTop,h: o.h,seeH: o.offsetHeight,fireH: 20};
                            if(_pos.top > 0 && (_pos.t + _pos.fireH) > data.pageY) {
                                _pos.scrollTo = _pos.top - 10;
                            } else if((parseInt(_pos.top + _pos.seeH) < _pos.h) && (_pos.t + _pos.seeH - _pos.fireH) < data.pageY) {
                                _pos.scrollTo = _pos.top + 10;
                            }
                            _pos.scrollTo && (o.scrollTop = (_pos.scrollTo > 0)?_pos.scrollTo:0);
                        }
                    });
                },
                scrollBody: function(data){
                    var _pos = {
                        t: $.scrollPos().top,
                        top: $.scrollPos().top,
                        h: STK.pageSize().page.height,
                        seeH: STK.pageSize().win.height,
                        fireH: 60
                    };
                    if(_pos.top > 0 && (_pos.t + _pos.fireH) > data.pageY) {
                        _pos.scrollTo = _pos.top - 10;
                    } else if((parseInt(_pos.top + _pos.seeH) < _pos.h) && (_pos.t + _pos.seeH - _pos.fireH) < data.pageY) {
                        _pos.scrollTo = _pos.top + 10;
                    }
                    _pos.scrollTo && window.scrollTo(0,(_pos.scrollTo > 0)?_pos.scrollTo:0);
                },
                pos : function(evt,args){
                    args = args || {};
                    args.clientX = evt.clientX;
                    args.clientY = evt.clientY;
                    var scrollPos = $.core.util.scrollPos();
                    args.pageX = evt.clientX + scrollPos.left;
                    args.pageY = evt.clientY + scrollPos.top;
                    return args;
                },
                stopClick: function(e){
                    e.cancelBubble = true;
                    return false;
                }
            },
            landFun: {
                land: function(data) {
                    var _li = {}, len = _this.actDOM.length;
                    if(len <= 1) {
                        return;
                    }
                    for(var i = 0; i < len; ++i) {
                        if(_this.actDOM[i] != _this.dragObj.el){
                            var _pos = _this.landFun.getPos(_this.actDOM[i], data);
                            if(!_li.pos || _li.pos.len > _pos.len){
                                    _li = {pos: _pos,dom: _this.actDOM[i]};
                            }
                        }
                    }
                    if(_li.dom == _this.dragObj.landing) {
                        return;
                    }
                    if(_li.pos.set == 1) {
                        if($.core.dom.next(_li.dom) == _this.dragObj.landing){
                            return;
                        }
                        _this.landFun.after(_li.dom,_this.dragObj.landing);
                    } else {
                        if($.core.dom.prev(_li.dom) == _this.dragObj.landing){
                            return;
                        }
                        _this.landFun.before(_li.dom,_this.dragObj.landing);
                    }
                },
                before: function(dom,el){
                    $.core.dom.insertBefore(el, dom);
                },
                after: function(dom,el){
                    $.core.dom.insertAfter(el, dom);
                },
                getPos: function(dom,data,inside) {
                    var _pos, _box = $.core.dom.position(dom);
                    _box.endL = _box.l + dom.offsetWidth/2;
                    _box.endT = _box.t + dom.offsetHeight/2;
                    var _l = data.pageX - _box.endL;
                    var _t = data.pageY - _box.endT;
                    _pos = {
                        len : Math.sqrt(_l * _l + _t * _t),
                        set : ((conf.land == 1?_l:_t) > 0) ? 1 : 2
                    };
                    return _pos;
                }
            },
            demoFun: {
                addDemo: function(data){
                    if(!_this.demoLay) {
                        _this.demoLay = $.C(conf.spaceTag);
                        document.body.appendChild(_this.demoLay);
                    }
                    if(conf.dragSelf){
                        $.core.dom.insertAfter(_this.demoLay,_this.dragObj.el);
                    }
                    var _pos = $.core.dom.position(_this.dragObj.el);
                    _this.dragObj.draging = conf.dragSelf?_this.dragObj.el:_this.demoLay;
                    _this.dragObj.landing = conf.dragSelf?_this.demoLay:_this.dragObj.el;
                    _this.demoLay.style.width = _this.dragObj.el.offsetWidth+'px';
                    _this.demoLay.style.height = _this.dragObj.el.offsetHeight+'px';
                    _this.demoLay.style.display = 'none';
                    _this.dragObj.draging.style.cssText = 'position:absolute;z-index:10100';
                    _this.dragObj.draging.pos = {
                        l : (data.pageX - _pos.l),
                        t : (data.pageY - _pos.t)
                    };
                    _this.demoFun.setPos(data);
                    _this.setOpacity(_this.dragObj.draging, 80);
                    _this.setOpacity(_this.dragObj.landing, 50);
                    if(conf.demoStart){
                        conf.demoStart(_this.dragObj.el,_this.demoLay);
                        //_this.demoLay.innerHTML = conf.demoStart(_this.dragObj.el,_this.demoLay);
                    }else{
                        _this.demoLay.style.background = '#99f';
                        _this.demoLay.style.width = _this.dragObj.el.offsetWidth + 'px';
                        _this.demoLay.style.height = _this.dragObj.el.offsetHeight + 'px';
                    }
                    if(_this.dragObj.draging.setCapture !== undefined) {
                        _this.dragObj.draging.setCapture();
                    }
                    //console.log("addDemo:",_this.dragObj.draging);
                },
                dragDemo: function(data){
                    _this.demoLay.style.display = '';
                    _this.demoFun.setPos(data);
                    conf.demoMove && conf.demoMove(_this.dragObj.el,_this.demoLay,data);
                },
                setPos: function(data){
                    if(!_this.dragObj.draging.pos){
                        return;
                    }
                    var _pos = conf.dragSelf?$.core.dom.position(node):{l:0,t:0};
                    var _offset = {x:(data.pageX-_pos.l),y:(data.pageY-_pos.t)};
                    var templeft = _offset.x-(_this.dragObj.draging.pos.l||0);
                    var tempTop = _offset.y-(_this.dragObj.draging.pos.t||0);
 
                    var _size = $.core.dom.getSize(node);
                    if(conf.containment){
                        if(templeft < 0){
                            templeft = 0;
                        }else if (_size.width < templeft + parseInt(_this.demoLay.style.width)){
                            templeft = _size.width - parseInt(_this.demoLay.style.width)
                        }

                        if(tempTop < 0){
                            tempTop = 0;
                        }else if (_size.height + 100 < tempTop + parseInt(_this.demoLay.style.height)){
                            tempTop = _size.height + 100 - parseInt(_this.demoLay.style.height)
                        }
                    }

                    _this.dragObj.draging.style.left = templeft + 'px';
                    _this.dragObj.draging.style.top = tempTop + 'px';
                },
                removeDemo: function(){
                    if(!_this.dragObj || !_this.dragObj.draging){
                        return;
                    }
                    if (_this.dragObj.draging.setCapture !== undefined) {
                        _this.dragObj.draging.releaseCapture();
                    }
                    if(conf.dragSelf){
                        $.core.dom.insertBefore(_this.dragObj.el,_this.demoLay);
                    }
                    _this.dragObj.draging.style.cssText = '';
                    _this.demoLay.style.display = 'none';
                    _this.setOpacity(_this.dragObj.landing, 100);
                    conf.demoEnd && conf.demoEnd(_this.dragObj.el,_this.demoLay);
                }
            },
            setOpacity: function(el, n) {
                if($.IE) {
                    el.style.filter = 'alpha(opacity=' + n + ')';
                } else {
                    el.style.opacity = n / 100;
                }
            }
        };
        //----------------------------------------------

        //+++ 参数的验证方法定义区 ++++++++++++++++++
        argsCheck = function() {
            if(!$.core.dom.isNode(node) || !conf) {
                throw "module.drag 需要传入外层节点对象和action-type名";
            }
        };
        //-------------------------------------------

        //+++ Dom的获取方法定义区 ++++++++++++++++++
        parseDOM = function() {
            //内部dom节点 最外层节点，不使用_this.DOM
            _this.DOM = $.utils.kit.dom.parseDOM($.builder(node).list);
            if(!1) {
                throw new Error('必需的节点 不存在');
            }
        };
        //-------------------------------------------

        //+++ 模块的初始化方法定义区 ++++++++++++++++++
        initPlugins = function() {
            if(typeof conf == 'string'){
                conf = {'actType':conf};
            }
        };
        //-------------------------------------------

        //+++ DOM事件绑定方法定义区 ++++++++++++++++++
        bindDOM = function() {
            $.custEvent.define(that,'dragStart');
            $.custEvent.define(that,'dragEnd');
            $.custEvent.define(that,'draging');
        };
        //-------------------------------------------

        //+++ 自定义事件绑定方法定义区 ++++++++++++++++++
        bindCustEvt = function() {
            _this.objs.delegate = $.core.evt.delegatedEvent(node);
            _this.objs.delegate.add( conf.actType, 'mousedown', _this.DeventFun.drag);
        };
        //-------------------------------------------

        //+++ 广播事件绑定方法定义区 ++++++++++++++++++
        bindListener = function() {
        };
        //-------------------------------------------

        //+++ 组件销毁方法的定义区 ++++++++++++++++++
        destroy = function() {
            if(_this) {
                $.foreach(_this.objs, function(o) {
                    if(o.destroy) {
                        o.destroy();
                    }
                });
                _this = null;
            }
        };
        //-------------------------------------------

        //+++ 组件的初始化方法定义区 ++++++++++++++++++
        init = function() {
            argsCheck();
            parseDOM();
            initPlugins();
            bindDOM();
            bindCustEvt();
            bindListener();
        };
        //-------------------------------------------
        //+++ 执行初始化 ++++++++++++++++++
        init();
        //-------------------------------------------

        //+++ 组件公开属性或方法的赋值区 ++++++++++++++++++
        that.destroy = destroy;
        that.demo = _this.demo;
        that.land = _this.land;
        that.scroll = _this.scroll;
        //-------------------------------------------

        return that;
    };
});
});