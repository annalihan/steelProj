/**
 * 模块控制器
 * 同意协议页
 */

module.exports = function(control) {
    control.set({
        data: '/v1/public/aj/bluev/protocol',
        tpl: 'tpl/bluev/protocol',
        logic: 'logic/bluev/protocol',
        css: 'bluev/protocol'
    });
};