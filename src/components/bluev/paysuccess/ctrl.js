/**
 * 模块控制器
 */

module.exports = function(control) {
    control.set({
        data: '/v1/public/aj/bluev/paysuccess',
        tpl: './tpl',
        logic: './logic'
        // css: null  css要不没有，要不必须有路径
    });
};