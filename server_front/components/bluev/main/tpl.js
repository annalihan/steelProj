steel.d("components/bluev/main/tpl", ["tpl/runtime"],function(require, exports, module) {
var jade = require('tpl/runtime');
var undefined = void 0;
module.exports = function template(locals) {
var jade_debug = [{ lineno: 1, filename: "/Users/lihan/projects/js.wcdn.cn/t6/business/src/components/bluev/main/tpl.jade" }];
try {
var buf = [];
var jade_mixins = {};
var jade_interp;

jade_debug.unshift({ lineno: 0, filename: "/Users/lihan/projects/js.wcdn.cn/t6/business/src/components/bluev/main/tpl.jade" });
jade_debug.unshift({ lineno: 1, filename: "/Users/lihan/projects/js.wcdn.cn/t6/business/src/components/bluev/main/tpl.jade" });
buf.push("<input type=\"button\" node-type=\"aj\" value=\"aj测试\"/>");
jade_debug.shift();
jade_debug.unshift({ lineno: 2, filename: "/Users/lihan/projects/js.wcdn.cn/t6/business/src/components/bluev/main/tpl.jade" });
buf.push("<h2>");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 2, filename: jade_debug[0].filename });
buf.push("认证首页");
jade_debug.shift();
jade_debug.shift();
buf.push("</h2>");
jade_debug.shift();
jade_debug.shift();;return buf.join("");
} catch (err) {
  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "input(type=\"button\",node-type=\"aj\",value=\"aj测试\")\nh2 认证首页");
}
};
});