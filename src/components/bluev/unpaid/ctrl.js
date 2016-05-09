/**
 * 模块控制器
 * 确认展示信息
 */

module.exports = function(control) {
    control.set({
        data: '/v1/public/aj/bluev/unpaid',
        tpl: './tpl',
        logic: './logic',
        css: './css'
    });
};