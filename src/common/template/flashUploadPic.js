/*
存放并解析图片上传组件模板
*/
STK.register('common.template.flashUploadPic', function($){
    var TEMPLATE = {
        DEFAULT : '' +
                '<a class="upload_w" node-type="picbox" href="javascript:;">' +
                    '<span node-type="upfile_text" href="javascript:void(0);" class="W_btn_upload">' +
                        '<span class="txt1">JPG、GIF、PNG，<br/>不超过5M。<br/></span>'+
                        '<span href="#" class="W_btn_b btn_22px"><em class="W_ficon ficon_add S_ficon">+</em>上传</span>'+
                        '<span class="txt2">重新上传</span>'+
                        '<input type="hidden" node-type="filePid" name="pid" verify="acttype=flashPic">' +
                    '</span>' +
                    '<span class="imgbox">' +
                        '<img node-type="previewPic" src="http://img.t.sinajs.cn/t4/appstyle/e/images/admin/wallpaper2.png" />' +
                    '</span>' +
                '</a>' +
                '<span class="picmsg">' +
                    '<span class="img_err_info ">' +
                        '<span style="display: none;" node-type="upfile_ing">' +
                            '<img src="http://img.t.sinajs.cn/t4/appstyle/e/images/common/loading.gif">正在上传' +
                        '</span>' +
                        '<span class="S_spetxt" node-type="fidTip"></span>'+
                        '<span class="S_spetxt" node-type="upfile_error" style="display: none;">图片上传失败，请重新上传</span>' +
                    '</span>' +
                '</span>'
    }

    return function(node, template){
        if(template){
            //判断传入的是HTML模板string，还是存放在template文件里的模板名称
            var reg = new RegExp('^[A-Z_]+$');
            if(reg.test(template)){
                if(!TEMPLATE[template]){
                    alert("No such embedded '"+ template +"' template!")
                }
                template = TEMPLATE[template];
            }
        }
        template = template || TEMPLATE.DEFAULT;
        node.innerHTML = template;
        var DOM = $.utils.kit.dom.parseDOM($.builder(node).list);

        return DOM;
    }
 });