steel.d("ui/dialog", ["utils/kit/extra/language","utils/kit/extra/reuse","utils/module/dialog","utils/module/mask","utils/kit/dom/drag"],function(require, exports, module) {
require("utils/kit/extra/language");
require("utils/kit/extra/reuse");
require("utils/module/dialog");
require("utils/module/mask");
require("utils/kit/dom/drag");

/**
 * author Robin Young | yonglin@staff.sina.com.cn
 */

STK.register('ui.dialog',function($){
    var TEMP = '' +
    '<div class="W_layer" node-type="outer" style="display:none;position:absolute;z-index:10019">'+
        '<div class="content">'+
            '<div class="W_layer_title" node-type="title_content"></div>'+
            '<div class="W_layer_close"><a href="javascript:void(0);" class="W_ficon ficon_close S_ficon" title="#L{关闭}" node-type="close">X</a></div>'+
            '<div class="layer_point" node-type="inner"></div>'+
        '</div>'+
    '</div>';
    
    var lang = $.utils.kit.extra.language;
    
    var cache = null;
    
    var createDialog = function(){
        var dia = $.utils.module.dialog(lang(TEMP));
        $.custEvent.add(dia, 'show', function(){
            $.utils.module.mask.showUnderNode(dia.getOuter(),{
               opacity: 0.5,
               background: "#000000"
            });
        });
        $.custEvent.add(dia, 'hide', function(){
            $.utils.module.mask.back();
            dia.setMiddle();
        });
        /* 嵌入在iframe内部
         * 去掉拖拽
         */
        /*$.utils.kit.dom.drag(dia.getDom('title'),{
            'actObj' : dia,
            'moveDom' : dia.getOuter()
        });*/
        dia.destroy = function(){
            clearDialog(dia);
            try{
                dia.hide(true);
            }catch(exp){
            
            }
        };
        return dia;
    };
    
    var clearDialog = function(dia){
        dia.setTitle('').clearContent();
        cache.setUnused(dia);
    };
    
    return function(spec){
        var conf = $.parseParam({
            'isHold' : false
        },spec);
        var isHold = conf['isHold'];
        conf = $.core.obj.cut(conf,['isHold']);
        if(!cache){
            cache = $.utils.kit.extra.reuse(createDialog);
        }
        var that = cache.getOne();
        if(!isHold){
            $.custEvent.add(that, 'hide', function(){
                $.custEvent.remove(that,'hide',arguments.callee);
                clearDialog(that);
            });
            $.custEvent.add(that, 'show', function(){
                cache.setUsed(that);
            });
        }
        return that;
    };
});
});