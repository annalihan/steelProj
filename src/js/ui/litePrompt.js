/**
 * author wk | wukan@staff.sina.com.cn
 */

$Import('utils.kit.extra.language');
$Import('utils.module.layer');

STK.register('ui.litePrompt',function($){

    var lang = $.utils.kit.extra.language;
    var $easyT = $.core.util.easyTemplate;

    return function(msg, spec){
        var conf, that, layer, tm,box;
        var spec = $.parseParam({
            //direct:"up",
            //showCallback:$.core.func.empty,
            hideCallback:$.core.func.empty,
            type: "succM",//del/succ/error/warn
            msg: "",//信息
            'timeout':''
        }, spec);
        var template = spec.template ||
        '<#et temp data>'+
            '<div class="W_layer W_layer_pop" node-type="outer">'+
                '<div class="content layer_mini_opt" node-type="inner">'+
                    '<p class="main_txt"><span class="txt S_txt1">${data.msg}</span></p>'+  
                '</div>'+
            '</div>'+
        '</#et>;'
        var finalTemplate = $easyT(template, {
            type: spec.type,
            msg: msg
        }).toString();
    
        that = {};
        layer = $.utils.module.layer(finalTemplate);
        box = layer.getOuter();
        $.custEvent.add(layer, 'hide', function(){
            $.utils.module.mask.hide();
            spec.hideCallback && spec.hideCallback();
            $.custEvent.remove(layer,'hide',arguments.callee);
            clearTimeout(tm);
        });
        $.custEvent.add(layer, 'show', function(){
            document.body.appendChild(box);
            $.utils.module.mask.showUnderNode(box);
        });
        layer.show();

        if(spec['timeout']){
            tm = setTimeout(layer.hide,spec['timeout']);
        }

        var win = $.core.util.winSize();
        var dia = layer.getSize(true);

        box.style.left = (win.width - dia.w)/2 + 'px';

        var _top;
        if(window.FrameInner && window.FrameInner.outInfo){
            var opts = FrameInner.outInfo;
            if(typeof opts == 'string'){
                opts = $.strToJson(opts);
            }
            var scrollTop = opts.parent.scroll.top;
            var iframeTop = opts.iframe.position.top;
            var parentHeight = opts.parent.size.height;
            _top = (scrollTop - iframeTop) + (parentHeight - dia.h)/2;
            var limit = win.height - dia.h;
            if(limit < _top){
                _top = limit;
            }
        }else{
            _top = $.core.util.scrollPos()['top'] + (win.height - dia.h)/2;
        }
        box.style.top = _top + 'px';

        that.layer = layer;
        return that;
    };
});


