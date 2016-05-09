/**
 * 模块控制器
 * 确认展示信息
 */

module.exports = function(control) {
    control.set({
        data: '/v1/public/aj/bluev/showinfo',
        tpl: 'tpl/bluev/showinfo',
        logic: 'logic/bluev/showinfo',
        css: 'bluev/showinfo'
    });
};