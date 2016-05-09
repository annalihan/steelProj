/**
 * 模块控制器
 */

module.exports = function(control) {
    control.set({
        data: '/v1/public/aj/bluev/identifysuccess',
        tpl: 'tpl/bluev/identifysuccess',
        logic: 'logic/bluev/identifysuccess',
        css: 'bluev/identifysuccess'
    });
};