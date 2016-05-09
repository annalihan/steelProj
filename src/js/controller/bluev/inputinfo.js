/**
 * 模块控制器
 */

module.exports = function(control) {
    control.set({
        data: '/v1/public/aj/bluev/inputinfo',
        tpl: 'tpl/bluev/inputinfo',
        logic: 'logic/bluev/inputinfo',
        css: 'bluev/inputinfo'
    });
};