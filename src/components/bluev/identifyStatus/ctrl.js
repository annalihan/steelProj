/**
 * 模块控制器
 */
module.exports = function(control) {
    control.set({
        data: '/v1/public/aj/bluev/identifyStatus',
        tpl: './tpl',
        logic: './logic',
        css: './css'
    });
};