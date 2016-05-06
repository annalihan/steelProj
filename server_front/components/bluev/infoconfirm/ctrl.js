steel.d("components/bluev/infoconfirm/ctrl", [],function(require, exports, module) {
/**
 * 模块控制器
 */

module.exports = function(control) {
    control.set({
        data: '/v1/public/aj/bluev/infoconfirm',
        tpl: './tpl',
        logic: './logic',
        css: './css'
    });
};
});