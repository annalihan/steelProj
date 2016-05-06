steel.d("components/bluev/paysuccess/tpl", ["tpl/runtime"],function(require, exports, module) {
var jade = require('tpl/runtime');
var undefined = void 0;
module.exports = function template(locals) {
var jade_debug = [{ lineno: 1, filename: "/Users/lihan/projects/js.wcdn.cn/t6/business/src/components/bluev/paysuccess/tpl.jade" }];
try {
var buf = [];
var jade_mixins = {};
var jade_interp;

jade_debug.unshift({ lineno: 0, filename: "/Users/lihan/projects/js.wcdn.cn/t6/business/src/components/bluev/paysuccess/tpl.jade" });
jade_debug.unshift({ lineno: 1, filename: "/Users/lihan/projects/js.wcdn.cn/t6/business/src/components/bluev/paysuccess/tpl.jade" });
buf.push("<h2>");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 1, filename: jade_debug[0].filename });
buf.push("支付成功");
jade_debug.shift();
jade_debug.shift();
buf.push("</h2>");
jade_debug.shift();
jade_debug.shift();;return buf.join("");
} catch (err) {
  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "h2 支付成功");
}
};
});