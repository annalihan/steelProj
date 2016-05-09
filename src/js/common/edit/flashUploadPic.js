/**
 * 
 * @id $.comp.edit.flashUploadPic
 * @param {Object} node �������ڵ�
 * @return {Object} ʵ��
 * @author jianqing1@staff.sina.com.cn
 * @example
 *
 ******************************************
 * @modify
 * 2015.04
 * �����ʽģ���Ϊjs���룬ҳ����ȾʱֻҪ��php�ṩ�����ڵ�node
 *
 * �޸�/�����node��data-pidȡ������
 */
$Import('utils.kit.extra.language');
$Import('common.flash.fileUpload');

STK.register('common.edit.flashUploadPic', function($){

    //+++ ���������� ++++++++++++++++++
    //-------------------------------------------
    //TEMPLATE = $common.template.flashUploadPic();

    return function(node, opts, initializer){
        var that = {};
        var lang = $.utils.kit.extra.language;

        //+++ ���������� ++++++++++++++++++
        var _this = {
            DOM : {}, //�ڵ�����
            objs : {} //�������
        };


        //----------------------------------------------

        var initUploaderWithCrop = function(){
            if($.core.util.swf.check() == '-1'){
                node.parentNode.innerHTML = lang('#L{����û�а�װflash������,���� <a target="_blank" href="http://www.adobe.com/go/getflash">����</a> ��װ}');
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
                        //_this.showErrTip($L("#L{�ϴ�ʧ�ܣ����ϴ�5M���ڵ�JPG��GIF��PNGͼƬ��}"));
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
                            $.ui.alert('���ϴ�png��jpg��gif��jpeg��ʽͼƬ�ļ�');
                            break;
                    }
                }
            }, opts);
            var dom = node;
            //����flashռλdom
            var pdiv = $.C('div');
            //����flash�滻dom
            var fdiv = $.C('div');
            fdiv.setAttribute('id',_conf.id);
            pdiv.appendChild(fdiv);
            dom.appendChild(pdiv);
            //�趨������ʽ
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

        //+++ ������ٷ����Ķ����� ++++++++++++++++++
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


        //+++ ����������Ի򷽷��ĸ�ֵ�� ++++++++++++++++++
        that.destroy = destroy;
        
        //-------------------------------------------


        return that;
    };
    
});
