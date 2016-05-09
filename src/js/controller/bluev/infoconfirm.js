/**
 * 模块控制器
 */

module.exports = function(control) {
    control.set({
        data: '/v1/public/aj/bluev/infoconfirm',
        tpl: 'tpl/bluev/infoconfirm',
        logic: 'logic/bluev/infoconfirm',
        css: 'bluev/infoconfirm'
    });
};