/**
 * 
 * @id $.comp.edit.flashUploadPic
 * @param {Object} node 组件最外节点
 * @return {Object} 实例
 * @author jianqing1@staff.sina.com.cn
 * @example
 *
 ******************************************
 * @modify
 * 2015.04
 * 组件样式模板改为js传入，页面渲染时只要求php提供最外层节点node
 *
 * 修改/回填，从node中data-pid取回数据
 */
$Import('utils.kit.extra.language');
$Import('common.flash.fileUpload');

STK.register('common.edit.flashUploadPic', function($){

    //+++ 常量定义区 ++++++++++++++++++
    //-------------------------------------------
    //TEMPLATE = $common.template.flashUploadPic();

    return function(node, opts, initializer){
        var that = {};
        var lang = $.utils.kit.extra.language;

        //+++ 变量定义区 ++++++++++++++++++
        var _this = {
            DOM : {}, //节点容器
            objs : {} //组件容器
        };


        //----------------------------------------------

        var initUploaderWithCrop = function(){
            if($.core.util.swf.check() == '-1'){
                node.parentNode.innerHTML = lang('#L{您还没有安装flash播放器,请点击 <a target="_blank" href="http://www.adobe.com/go/getflash">这里</a> 安装}');
                return;
            }

            that.id = 'swf_upbtn_' + $.getUniqueKey();
            var _conf = $.parseParam({
                initializer: initializer || null,
                id:that.id,
                flashPath : opts.path || 'apps/enp_activity/static/swf/',
                h : opts.h || 100,
                w : opts.w || 100,
                imgMaxWidth : opts.imgMaxWidth,
                imgMaxHeight : opts.imgMaxHeight,
                showLoading : opts.showLoading || false,
                isOriginal : opts.isOriginal || false,
                isSetRelative : false,
                minSize : opts.minSize || false,
                size: 5242880 * 4,
                maxFileNum: opts['number']||1,
                fileFilter : opts['fileFilter'] || 'img',
                uploaded:function (obj, json) {
                    $.log("uploaded", arguments);
                    if(json.error.length > 0){
                        //_this.showErrTip($L("#L{上传失败！请上传5M以内的JPG、GIF、PNG图片。}"));
                        return;
                    }

                    //_this.addPic(json.data[0].pid);
                },
                uploading:function(){
                    console.log('uploading');
                },
                error:function (it, errorObj) {
                    switch(errorObj.type) {
                        case 'fileTypeError':
                            $.ui.alert('请上传png、jpg、gif、jpeg格式图片文件');
                            break;
                    }
                }
            }, opts);
            var dom = node;
            //创建flash占位dom
            var pdiv = $.C('div');
            //创建flash替换dom
            var fdiv = $.C('div');
            fdiv.setAttribute('id',_conf.id);
            pdiv.appendChild(fdiv);
            dom.appendChild(pdiv);
            //设定容器样式
            if(_conf.isSetRelative){
                dom.style.position = 'relative';
            }
                
            pdiv.setAttribute('node-type', 'cropper');
            pdiv.style.cssText = 'position:absolute;display:block;overflow:hidden;filter:alpha(opacity=0);-moz-opacity:0;z-index:90;left:0px;top:0px;';
            pdiv.style.width = _conf.w + "px";
            pdiv.style.height = _conf.h + "px";

            try {
                _this.objs.uploader = $.common.flash.fileUpload(_conf);
            } catch (e) {
                $.log("error:", e.message);
            }
        };

        initUploaderWithCrop();

        //+++ 组件销毁方法的定义区 ++++++++++++++++++
        var destroy = function(){
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


        //+++ 组件公开属性或方法的赋值区 ++++++++++++++++++
        that.destroy = destroy;
        
        //-------------------------------------------


        return that;
    };
    
});
