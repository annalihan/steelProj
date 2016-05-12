/**
 * 应用入口文件
 */

var loadingHTML = require('common/loading/tpl')();
var errFn = require('common/pageError/logic');
/* 合并资源区 end*/
var utilBee = require('utils/bee');

var pathnameAnalysis = '/v1/public/bluev/';
var pathnameAnalysis_online = '/v1/public/bluev/';
// var pathnameAnalysis_online = '/t6/business/src/_html/bluev/';
//首页前端假数据访问地址http://js.t.sinajs.cn/t6/business/src/_html/bluev/

var mainBox = document.body;
var timer = null;
var version = window.$CONFIG && $CONFIG['version'];
steel.config({
    version: version,
    basePath: '/',
    jsPath: 'http://js.t.sinajs.cn/t6/business/',
    cssPath: 'http://js.t.sinajs.cn/t6/business/',
    ajaxPath: '/',
    mainBox: mainBox,
    useCssPrefix: false,
    router: [
            ['/home', 'components/home/ctrl'],
            [pathnameAnalysis_online, 'components/bluev/main/ctrl'],//蓝V认证-认证首页
            [pathnameAnalysis_online + 'inputinfo', 'components/bluev/inputinfo/ctrl'],//蓝V认证-step3填写资料
            [pathnameAnalysis_online + 'protocol', 'components/bluev/protocol/ctrl'],//蓝V认证-step1同意协议
            [pathnameAnalysis_online + 'showinfo', 'components/bluev/showinfo/ctrl'],//蓝V认证-step2确认展示信息
            [pathnameAnalysis_online + 'infoconfirm', 'components/bluev/infoconfirm/ctrl'],//蓝V认证-step4信息确认
            [pathnameAnalysis_online + 'paysuccess', 'components/bluev/paysuccess/ctrl'],//蓝V认证-支付成功
            [pathnameAnalysis_online + 'identifysuccess', 'components/bluev/identifysuccess/ctrl'],//蓝V认证-认证成功
            [pathnameAnalysis_online + 'payinfo', 'components/bluev/payinfo/ctrl'],//蓝V认证-支付费用
            [pathnameAnalysis_online + 'identifyStatus', 'components/bluev/identifyStatus/ctrl'],//蓝V认证-等待审核
            [pathnameAnalysis_online + 'unpaid', 'components/bluev/unpaid/ctrl']//蓝V认证-等待审核
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
    console.log('renderError');
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