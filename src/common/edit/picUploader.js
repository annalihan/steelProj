/*
*/
$Import('common.extra.imageURL');
$Import('common.edit.flashUploadPic');
$Import('common.template.flashUploadPic');

STK.register('common.edit.picUploader', function($){
    return function(node, template){
        var that = {};
        var container = node;

        var parseTemplate = function(){
            that.DOM = $.common.template.flashUploadPic(container, template);
            return that;
        }

        var initWidget = function(node, opts){
            var pid = container.getAttribute('data-pid');
            if(pid){
                that.DOM['filePid'].value = pid;
                var pURL = $.common.extra.imageURL(pid, {
                    size : 'small'
                });
                that.DOM['previewPic'].src = pURL;
                $.addClassName(that.DOM['picbox'], 'uploaded');
            }
            return $.common.edit.flashUploadPic(node, opts, that);
        }

        var errorTip = function(msg){
            if(!that.DOM['filePid'].value) {
                that.DOM['fidTip'].innerHTML = msg;
                return false;
            }else{
                return true;
            }
        }

        parseTemplate();

        that.initWidget = initWidget;
        that.errorTip = errorTip;
        return that;
    }
});