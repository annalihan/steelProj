/**
 * 创建活动 dom节点的常用操作 - - 可操作数组
 * @
 * @param {Object}
 * @return {Object} 实例
 * @author ganshuai | ganshuai@staff.sina.com.cn
 * @example
 *
 */

STK.register('utils.kit.dom.domFuns', function($){

    //+++ 常量定义区 ++++++++++++++++++
    //-------------------------------------------
    function getFirstEl(el){
        // 获取数组中得第一个元素
        if($.getType(el) == "array" && el[0]){
            return el[0];
        }else{
            return el;
        }
    }

    function toggleSingleClassName(el, className){
        // 切换el元素的className, el是一个节点
        if($.hasClassName(el, className)){
            $.removeClassName(el, className);
            el.className = $.trim(el.className);
        }else{
            $.addClassName(el, className);
        }
    }

    function getNodeChildren(el){
        // 后去el元素的所有子节点, el是一个节点
        var children = el.childNodes;
        var childArr = [];
        for(var i = 0, len = children.length; i < len; i++){
            if(children[i].nodeType == 1){
                childArr.push(children[i]);
            }
        }

        return childArr;
    }

    return function(){

        function siblings(el){
            // 所有兄弟节点, 如果el是数组, 返回第一个节点的结果
            el = getFirstEl(el);
            return nextAll(el).concat(prevAll(el));
        }

        function nextAll(el){
            // 所有el之后的兄弟节点, 如果el是数组, 返回第一个节点的结果
            var elArr = [];
            el = getFirstEl(el);
            el = el.nextSibling;
            while(el){
                if(el.nodeType == 1){
                    elArr.push(el);
                }
                el = el.nextSibling;
            }

            return elArr;
        }

        function prevAll(el){
            // 所有el之前的兄弟节点, 如果el是数组, 返回第一个节点的结果
            var elArr = [];
            el = getFirstEl(el);
            el = el.previousSibling;
            while(el){
                if(el.nodeType == 1){
                    elArr.push(el);
                }
                el = el.previousSibling;
            }

            return elArr;
        }

        function prevSibling(el){
            // 获取el节点的上一个兄弟节点元素, 如果el为数组, 返回数组第一个节点的兄弟节点
            el = getFirstEl(el).previousSibling;
            while(el){
                if(el.nodeType == 1){
                    return el;
                }else{
                    el = el.previousSibling;
                }
            }

            return -1;
        }

        function nextSibling(el){
            // 获取el节点的下一个兄弟节点元素, 如果el为数组, 返回数组第一个节点的兄弟节点
            el = getFirstEl(el).nextSibling;
            while(el){
                if(el.nodeType == 1){
                    return el;
                }else{
                    el = el.nextSibling;
                }
            }

            return -1;
        }

        function toggleClassName(el, className){
            // 切换类名 el可以是数组
            if($.getType(el) == "array"){
                for(var i = 0, len = el.length; i < len; i++){
                    toggleSingleClassName(el[i], className);
                }
            }else{
                toggleSingleClassName(el, className);
            }

            return el;
        }

        function removeClassName(el, className){
            // 删除类名, el可以是数组
            if($.getType(el) == "array"){
                for(var i = 0, len = el.length; i < len; i++){
                    $.removeClassName(el[i], className);
                }
            }else{
                $.removeClassName(el, className);
            }

            return el;
        }

        function addClassName(el, className){
            // 添加类名, el可以是数组
            if($.getType(el) == "array"){
                for(var i = 0, len = el.length; i < len; i++){
                    $.addClassName(el[i], className);
                }
            }else{
                $.addClassName(el, className);
            }

            return el;
        }

        function setStyle(el, obj){
            // 设置样式, el可以是数组
            // obj = { width : 100px }
            if($.getType(el) == "array"){
                for(var i = 0, len = el.length; i < len; i++){
                    $.foreach(obj, function(value, key){
                        $.setStyle(el[i], key, value);
                    });
                }
            }else{
                $.foreach(obj, function(value, key){
                    $.setStyle(el, key, value);
                });
            }

            return el;
        }

        function getChildren(el){
            // 获取el节点的所有子节点, el可以是数组
            var elArr = [];
            if($.getType(el) == "array"){
                for(var i = 0, len = el.length; i < len; i++){
                    elArr = elArr.concat(getNodeChildren(el[i]));
                }
            }else{
                elArr = elArr.concat(getNodeChildren(el));
            }

            return elArr;
        }

        function getIndex(el){
            // 获取el在兄弟节点中排第几, 如果el是数组, 则返回第一个节点在兄弟节点中得位置
            var _el = getFirstEl(el);
            var child = getChildren(_el.parentNode);

            for(var i = 0, len = child.length; i < len; i++){
                if(child[i] == _el){
                    return i;
                }
            }

            return -1;
        }

        return {
            siblings : siblings,    //所有兄弟节点
            prevAll : prevAll,  //所有之前的兄弟节点
            nextAll : nextAll,  //所有之后的兄弟节点
            toggleClassName : toggleClassName,  //切换类名
            removeClassName : removeClassName,  //删除类名
            addClassName : addClassName,        //添加类名
            setStyle : setStyle,            //设置样式
            getChildren : getChildren,      //获取子节点
            getIndex : getIndex,            //当前节点在兄弟节点中的位置 0, 1, 2, 3, 4, 5
            nextSibling : nextSibling,      //当前节点的下一个兄弟节点
            prevSibling : prevSibling       //当前节点的上一个兄弟节点
        };
    };

});