/**
 * @fileoverview
 * 图文统计-图文群发列表模版
 * @author jianqing1@staff.sina.com.cn
 * @history
 */
STK.register("ui.graphicTemp", function($){
    var tmpl = '' +
    '<#et graphic data>' +
        '<div class="WB_cardwrap S_bg2">' +
            '<div class="wechat_diff ">' +
                '<div class="WB_cardtitle_b S_line2">' +
                    '<h4 class="obj_name"><span class="main_title W_fb W_f14 W_autocut">${data.title}</span><span class="subtitle S_txt2">${data.datetime}</span></h4>' +
                    '<div class="opt_page">' +
                        '<#if (data.contrast == 3)>'+
                            '&nbsp;<a href="javascript:void(0);" class="W_btn_b" action-type="contrast" action-data="id=${data.id}&t=3"><em class="W_ficon S_ficon ficon_add">+</em>取消图文对比</a>' +
                        '<#elseif (data.contrast == 2)>'+
                            '&nbsp;<a href="javascript:void(0);" class="W_btn_b" action-type="contrast" action-data="id=${data.id}&t=2"><em class="W_ficon S_ficon ficon_add">+</em>立即去图文对比</a>' +
                        '<#else>' +
                            '&nbsp;<a href="javascript:void(0);" class="W_btn_b" action-type="contrast" action-data="id=${data.id}&t=1"><em class="W_ficon S_ficon ficon_add">+</em>加入图文对比</a>' +
                        '</#if>'+
                    '</div>' +
                '</div>' +
                '<div class="WB_innerwrap">' +
                    '<div class="wechat_diff_content">' +
                        '<table class="diff_chart">' +
                            '<tbody>' +
                                '<tr>' +
                                    '<#if (data.contrast == 3)>' +
                                        '<td class="td1" action-data="id=trapezoid_${data.id}&t=0" id="trapezoid_${data.id}"></td>' +
                                    '<#else>' +
                                        '<td class="td1" action-data="id=trapezoid_${data.id}&t=1" id="trapezoid_${data.id}"></td>' +
                                    '</#if>'+
                                    '<td class="td2">' +
                                        '<ul>' +
                                            '<li><em>${data.reciveuser}</em>送达人数<div class="bg"><i class="W_ficon ficon_down ">Þ</i></div></li>' +
                                            '<li><em>${data.msgreaduser}</em>图文页阅读人数<div class="bg"><i class="W_ficon ficon_down ">Þ</i></div></li>' +
                                            '<li><em>${data.artreaduser}</em>原文页阅读人数<div class="bg"><i class="W_ficon ficon_down ">Þ</i></div></li>' +
                                            '<li><em>${data.shareuser}</em>分享转发人数</li>' +
                                        '</ul>' +
                                    '</td>' +
                                    '<td class="td3">' +
                                        '<div class="dropList ui_menu W_pr">' +
                                            '<#if (data.contrast == 3)>'+
                                                '<a href="javascript:void(0);" class="button button_link S_txt2" action-type="chartselect" action-data="id=chartselect_${data.id}&t=0">图文页阅读人数<em class="W_ficon ficon_arrow_down S_ficon W_f16 E_ML5">c</em></a>' +
                                                '<div class="layer_menu_list fs_layer_menu" action-type="charemenu" action-data="id=charemenu_${data.id}&t=0" style="display:none;position: absolute; top: 15px; left: 0; z-index: 99;width:150px;">'+
                                                    '<ul class="scroll_bar">'+
                                                        '<li><a href="javascript:;" action-type="menuselect" action-data="id=menuselect_${data.id}&t=0&v=1">图文页阅读人数</a></li>'+
                                                        '<li><a href="javascript:;" action-type="menuselect" action-data="id=menuselect_${data.id}&t=0&v=2">原文页阅读人数</a></li>' +
                                                        '<li><a href="javascript:;" action-type="menuselect" action-data="id=menuselect_${data.id}&t=0&v=3">分享转发人数</a></li>' +
                                                    '</ul>'+
                                                '</div>'+
                                            '<#else>' +
                                                '<a href="javascript:void(0);" class="button button_link S_txt2" action-type="chartselect" action-data="id=chartselect_${data.id}&t=1">图文页阅读人数<em class="W_ficon ficon_arrow_down S_ficon W_f16 E_ML5">c</em></a>' +
                                                '<div class="layer_menu_list fs_layer_menu" action-type="charemenu" action-data="id=charemenu_${data.id}&t=1" style="display:none;position: absolute; top: 15px; left: 0; z-index: 99;width:150px;">'+
                                                    '<ul class="scroll_bar">'+
                                                        '<li><a href="javascript:;" action-type="menuselect" action-data="id=menuselect_${data.id}&t=1&v=1">图文页阅读人数</a></li>'+
                                                        '<li><a href="javascript:;" action-type="menuselect" action-data="id=menuselect_${data.id}&t=1&v=2">原文页阅读人数</a></li>' +
                                                        '<li><a href="javascript:;" action-type="menuselect" action-data="id=menuselect_${data.id}&t=1&v=3">分享转发人数</a></li>' +
                                                    '</ul>'+
                                                '</div>'+
                                            '</#if>'+
                                        '</div>' +
                                        '<#if (data.contrast == 3)>'+
                                            '<div style="height: 120px;" class="chart_wrap" action-data="id=chart_${data.id}&t=0"></div>' +
                                        '<#else>' +
                                            '<div style="height: 120px;" class="chart_wrap" action-data="id=chart_${data.id}&t=1"></div>' +
                                        '</#if>'+
                                    '</td>' +
                                '</tr>' +
                            '</tbody>' +
                        '</table>' +
                        '<div class="deff_table show">' +
                            '<h6 id="in_${data.id}" style="display:none">数据明细</h6>' +
                            '<div class="table_wrap" style="display:none" id="content_${data.id}">' +
                                '<div class="gri_wrapper">' +
                                    '<table style="table-layout: auto;" class="gri_stable">' +
                                        '<colgroup span="9">' +
                                            '<col class="gri_TargetUser">' +
                                            '<col class="gri_IntPageReadUser">' +
                                            '<col class="gri_IntPageReadCount">' +
                                            '<col class="gri_PageConversion">' +
                                            '<col class="gri_OriPageReadUser">' +
                                            '<col class="gri_OriPageReadCount">' +
                                            '<col class="gri_Conversion">' +
                                            '<col class="gri_ShareUser">' +
                                            '<col class="gri_ShareCount">' +
                                        '</colgroup>' +
                                        '<thead>' +
                                            '<tr>' +
                                                '<th rowspan="2" colspan="1" style="text-align: center; border: 1px solid rgb(220, 220, 220);">送达人数</th>' +
                                                '<th colspan="3" style="text-align: center; border: 1px solid rgb(220, 220, 220);">图文页阅读</th>' +
                                                '<th colspan="3" style="text-align: center; border: 1px solid rgb(220, 220, 220);">原文页阅读</th>' +
                                                '<th colspan="2" style="text-align: center; border: 1px solid rgb(220, 220, 220);">分享转发</th>' +
                                            '</tr>' +
                                            '<tr>' +
                                                '<th style="text-align: center; border: 1px solid rgb(220, 220, 220);">人数</th>' +
                                                '<th style="text-align: center; border: 1px solid rgb(220, 220, 220);">次数</th>' +
                                                '<th style="text-align: center; border: 1px solid rgb(220, 220, 220);">图文转化率</th>' +
                                                '<th style="text-align: center; border: 1px solid rgb(220, 220, 220);">人数</th>' +
                                                '<th style="text-align: center; border: 1px solid rgb(220, 220, 220);">次数</th>' +
                                                '<th style="text-align: center; border: 1px solid rgb(220, 220, 220);">原文转化率</th>' +
                                                '<th style="text-align: center; border: 1px solid rgb(220, 220, 220);">人数</th>' +
                                                '<th style="text-align: center; border: 1px solid rgb(220, 220, 220);">次数</th>' +
                                            '</tr>' +
                                        '</thead>' +
                                        '<tbody>' +
                                            '<tr>' +
                                                '<td><div style="width: 100%; height: 100%;text-align:center;">${data.reciveuser}</div></td>' +
                                                '<td><div style="width: 100%; height: 100%;text-align:center;">${data.msgreaduser}</div></td>' +
                                                '<td><div style="width: 100%; height: 100%;text-align:center;">${data.msgreadtimes}</div></td>' +
                                                '<td><div style="width: 100%; height: 100%;text-align:center;">${data.msgreadpercent}</div></td>' +
                                                '<td><div style="width: 100%; height: 100%;text-align:center;">${data.artreaduser}</div></td>' +
                                                '<td><div style="width: 100%; height: 100%;text-align:center;">${data.artreadtimes}</div></td>' +
                                                '<td><div style="width: 100%; height: 100%;text-align:center;">${data.artreadpercent}</div></td>' +
                                                '<td><div style="width: 100%; height: 100%;text-align:center;">${data.shareuser}</div></td>' +
                                                '<td><div style="width: 100%; height: 100%;text-align:center;">${data.sharetimes}</div></td>' +
                                            '</tr>' +
                                        '</tbody>' +
                                    '</table>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div id="out_${data.id}"><a class="WB_cardmore S_txt1 S_line1 clearfix" href="javascript:void(0);" action-type="detail" action-data="id=${data.id}&t=open" > <span class="more_txt">展开数据明细<em class="W_ficon ficon_arrow_down S_ficon ">c</em></span></a></div>' +
                '<div style="display:none;" id="close_${data.id}"><a class="WB_cardmore S_txt1 S_line1 clearfix" href="javascript:void(0);" action-type="detail" action-data="id=${data.id}&t=close" > <span class="more_txt">收起数据明细<em class="W_ficon ficon_arrow_down S_ficon ">d</em></span></a></div>' +
            '</div>' +
        '</div>' +
    '</#et>';
    return tmpl;
});