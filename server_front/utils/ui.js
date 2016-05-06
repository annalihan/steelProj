steel.d("utils/ui", [],function(require, exports, module) {
/**
 * UI库的基础,封装了基础的展示、隐藏的方法
 * @Author MrGalaxyn
 */

STK.register('utils.ui', function($) {
    return function(opts) {
        opts = $.parseParam({
            tpl: "",
            show: $.empty,
            hide: $.empty
        }, opts);
        if (!opts.tpl) throw "utils.ui need a tpl param!";

        var dom = $.builder(opts.tpl),
            outer = dom.list['outer'][0],
            mask = $.fragment('<div style="position:fixed;left:0px;top:0px;z-index:10000;opacity:0;background-color:#000;"></div>')[0],
            useMask = true,
            preventDefault = function(e) {e.preventDefault();},
            that = {};

        function anim(el, speed, opacity, scale, callback) {
            var opts = {
                duration: speed,
                onComplete: callback
            };
            if (opacity !== undefined) opts.opacity = opacity;
            if (scale) {
                opts.scale = scale;
                opts.origin = '0 0';
            }
            $.animate(el, opts);
            return that;
        }

        function preventTouchMove(e) {
            e.preventDefault();
            hide();
        }

        function addMask() {
            var winSize = $.getSize(window);
            $.setStyle(mask, {
                width : winSize.w,
                height : winSize.h
            })
            $.on(mask, 'touchstart', preventTouchMove);
            document.body.appendChild(mask);
        }

        function removeMask() {
            $.off(mask, 'touchstart');
            $.removeNode(mask);
        }

        function show() {
            if (that.showFlag) return that;
            that.showFlag = true;
            document.body.appendChild(outer);
            $.setStyle(outer, 'z-index', 10001);
            $.on(outer, 'touchmove', preventDefault);
            if (useMask) addMask();
            opts.show && opts.show(that);
            return that;
        };

        function hide() {
            that.showFlag = false;
            document.body.removeChild(outer);
            $.off(outer, 'touchmove', preventDefault);
            if (useMask) removeMask();
            opts.hide && opts.hide(that);
            return that;
        };

        /**
         * 添加蒙层 组件默认是展示蒙层的,使用此方法来重新绘制蒙层
         * @method addMask
         * @return {Object} this
         */
        that.addMask = function() {
            $.removeNode(mask);
            addMask();
            return that;
        }

        /**
         * 取消蒙层 组件默认是展示蒙层的,使用此方法来去掉蒙层
         * @method removeMask
         * @return {Object} this
         */
        that.removeMask = function() {
            useMask = false;
            $.removeNode(mask);
            return that;
        }

        /**
         * 设置蒙层样式
         * @method show
         * @return {Object} this
         */
        that.setMaskStyle = function(name, value) {
            $.setStyle(mask, name, value);
            return that;
        }

        /**
         * 显示
         * @method show
         * @return {Object} this
         */
        that.show = show;

        /**
         * 隐藏
         * @method hide
         * @return {Object} this
         */
        that.hide = hide;

        /**
         * 刷新蒙层, 可用于修复一些由于虚拟键盘产生的定位问题
         * @method refresh
         * @return {Object} this
         */
        that.refresh = function() {
            if (useMask) {
                var winSize = $.getSize(window);
                $.setStyle(mask, {
                    position: 'fixed',
                    left: '0px',
                    top: '0px',
                    width : winSize.w,
                    height : winSize.h
                });
            }
            return that;
        }

        /**
         * 渐进
         * @method hide
         * @return {Object} this
         */
        that.fadeIn = function(speed, opacity, scale, callback) {
            var argArr = $.slice(arguments, 0, 4),
                target,
                callback = argArr.pop();
            if (!$.isFunction(callback)) {
                argArr.push(callback);
                callback = undefined;
            }

            target = outer.style.opacity;
            $.setStyle(outer, 'opacity', 0);
            if (!target) target = argArr[1] || 1;
            show();
            anim(outer, argArr[0], target, argArr[2], callback);
            return that;
        }

        /**
         * 渐出
         * @method hide
         * @return {Object} this
         */
        that.fadeOut = function(speed, opacity, scale, callback) {
            var argArr = $.slice(arguments, 0, 4),
                callback = argArr.pop();
            if (!$.isFunction(callback)) {
                argArr.push(callback);
                callback = null;
            }

            opacity = argArr[1] || 0;
            anim(outer, argArr[0], opacity, argArr[2], function() {
                hide();
                callback && callback.call(outer);
            });
            return that;
        }

        /**
         * 层位置获取
         * @method getPosition
         * @param {String} key
         *      topleft: 左上 topright: 右上 bottomleft: 左下 bottomright: 右下
         * @return {Object} 
         * {
         *  l: ,//左位置
         *  t: //上位置
         * }
         */
        that.getPosition = function(key) {
            var pos = $.core.dom.position(el),
                size = getSize(el),
                key = key || 'topleft';

            switch(key) {
                case 'topright':
                    pos['l'] = pos['l'] + size['w'];
                    break;
                case 'bottomleft':
                    pos['t'] = pos['t'] + size['h'];
                    break
                case 'bottomright':
                    pos['l'] = pos['l'] + size['w'];
                    pos['t'] = pos['t'] + size['h'];
                    break;
                default:
                    return {};
            }

            return pos;
        };

        /**
         * 层大小获取
         * @method getSize
         * @param {Boolean} isFlash 是否重新获取大小
         * @return {Object} 
         * {
         *  w: ,//宽度
         *  h: //高度
         * }
         */
        that.getSize = function() {
            var ret = {};
            ret.w = outer.offsetWidth;
            ret.h = outer.offsetHeight;
            return ret;
        };

        /**
         * 添加子节点
         * @method appendChild
         * @param {Node} node 子节点
         * @return {Object} this
         */
        that.appendChild = function(node) {
            outer.appendChild(node);
            return that;
        };

        /**
         * 返回outer
         * @method getOuter
         * @return {Node} outer
         */
        that.getOuter = function() {
            return outer;
        };

        /**
         * 返回outer node的父节点
         * @method getParentNode
         * @return {Node} outer的父节点 
         */
        that.getParentNode = function() {
            return outer.parentNode;
        };

        /**
         * 返回节点node-type列表对象
         * @method getDomList
         * @return {Object} 列表对象
         */
        that.getDomList = function() {
            for(var a in dom.list) {
                if(dom.list[a] && (dom.list[a].length == 1)){
                    dom.list[a] = dom.list[a][0];
                }
            }
            return dom.list;
        };

        that.setPosition = function(pos) {
            $.setStyle(outer, pos)
            return that;
        };

        that.setMiddle = function() {
            var layerSize = that.getSize(),
                winSize = $.getSize(window),
                _top = $.scrollPos().t + (winSize.h - layerSize.h) / 2;

            that.setPosition({
                top : (parseInt(_top) > 30) ? _top : 30,
                left : (winSize.w - layerSize.w) / 2
            });

            return that;
        };
        
        return that;
    };
});

});