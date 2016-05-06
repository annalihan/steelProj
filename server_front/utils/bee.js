steel.d("utils/bee", [],function(require, exports, module) {
module.exports = {
    log: function(code, msg, type, lv) {
        type = type || 'error';
        lv = lv || 'e';
        if (window.bee && window.bee[type]) {
            return window.bee[type]('[' + code + '] ' + msg, lv);
        }
    }, 
    timing: function(name, time) {
        if (window.bee && window.bee.timing) {
            return window.bee.timing(name, time);
        }
    }
};
});