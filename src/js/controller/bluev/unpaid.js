/**
 * 模块控制器
 */
module.exports = function(control) {
    control.set({
        data: '/v1/public/aj/bluev/unpaid',
        tpl: 'tpl/bluev/unpaid',
        logic: 'logic/bluev/unpaid',
        css: 'bluev/unpaid'
    });
};