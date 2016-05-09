/**
 * 模块控制器
 */
module.exports = function(control) {
    control.set({
        data: '/v1/public/aj/bluev/identifyStatus',
        tpl: 'tpl/bluev/identifyStatus',
        logic: 'logic/bluev/identifyStatus',
        css: 'bluev/identifyStatus'
    });
};