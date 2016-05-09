/**
 * 模块控制器
 */
module.exports = function(control) {
    control.set({
        data: '/v1/public/aj/bluev/payinfo',
        tpl: 'tpl/bluev/payinfo',
        logic: 'logic/bluev/payinfo',
        css: 'bluev/payinfo'
    });
};