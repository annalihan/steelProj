/**
 * 应用入口文件
 */

var loadingHTML = require('tpl/common/loading')();
var errFn = require('common/error/pageErr');
/* 合并资源区 end*/
var utilBee = require('utils/bee');

var pathnameAnalysis = '/v1/public/bluev/';
var pathnameAnalysis_online = '/t6/business/src/_html/bluev/';
//首页前端假数据访问地址http://js.t.sinajs.cn/t6/business/src/_html/bluev/

var mainBox = document.body;
var timer = null;
var version = window.$CONFIG && $CONFIG['version'];
steel.config({
    version: version,
    basePath: '/',
    jsPath: 'http://js.t.sinajs.cn/t6/business/js/',
    cssPath: 'http://img.t.sinajs.cn/t6/business/css/',
    ajaxPath: '/',
    mainBox: mainBox,
    router: [
            [pathnameAnalysis_online, 'controller/bluev/main'],//蓝V认证-认证首页
            [pathnameAnalysis_online + 'inputinfo', 'controller/bluev/inputinfo'],//蓝V认证-填写资料
            [pathnameAnalysis_online + 'protocol', 'controller/bluev/protocol'],//蓝V认证-step1同意协议
            [pathnameAnalysis_online + 'showinfo', 'controller/bluev/showinfo'],//蓝V认证-step2确认展示信息
            [pathnameAnalysis_online + 'infoconfirm', 'controller/bluev/infoconfirm'],//蓝V认证-step4信息确认
            [pathnameAnalysis_online + 'paysuccess', 'controller/bluev/paysuccess'],//蓝V认证-支付成功
            [pathnameAnalysis_online + 'identifysuccess', 'controller/bluev/identifysuccess'],//蓝V认证-认证成功
            [pathnameAnalysis_online + 'payinfo', 'controller/bluev/payinfo'],//蓝V认证-step5支付费用
            [pathnameAnalysis_online + 'unpaid', 'controller/bluev/unpaid'],//蓝V认证-step5未支付  
            [pathnameAnalysis_online + 'identifyStatus', 'controller/bluev/identifyStatus'],//蓝V认证-step6等待审核  
    ]
});

//监听loading事件
steel.on('stageChange', function(node){
    clearTimeout(timer);
    steel._destroyByNode(node);
    node.innerHTML = loadingHTML || '';
});
//监听error事件

steel.on('renderError', function(node){
    dataErr = errFn(pathnameAnalysis_online + 'main');
    timer = dataErr.timer;
});
//监听最后一个模块domready完成事件
steel.on('allDomReady', function() {
    if (steel.isDebug) {
        return;
    }
    utilBee.timing('domReadyTime', new Date().getTime());//抛给监控系统domeread时间
    STK.scriptLoader({url:'http://js.t.sinajs.cn/t6/apps/enp_bee/js/bee.min.js?version=' + version});
});