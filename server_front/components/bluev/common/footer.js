steel.d("components/bluev/common/footer", ["tpl/runtime"],function(require, exports, module) {
var jade = require('tpl/runtime');
var undefined = void 0;
module.exports = function template(locals) {
var jade_debug = [{ lineno: 1, filename: "/Users/lihan/projects/js.wcdn.cn/t6/business/src/components/bluev/common/footer.jade" }];
try {
var buf = [];
var jade_mixins = {};
var jade_interp;

jade_debug.unshift({ lineno: 0, filename: "/Users/lihan/projects/js.wcdn.cn/t6/business/src/components/bluev/common/footer.jade" });
jade_debug.unshift({ lineno: 1, filename: "/Users/lihan/projects/js.wcdn.cn/t6/business/src/components/bluev/common/footer.jade" });
buf.push("<div class=\"footer\">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 2, filename: "/Users/lihan/projects/js.wcdn.cn/t6/business/src/components/bluev/common/footer.jade" });
buf.push("<a href=\"javascript:window.history.back()\" class=\"W_btn_b btn_22px\">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 2, filename: jade_debug[0].filename });
buf.push("上一步");
jade_debug.shift();
jade_debug.shift();
buf.push("</a>");
jade_debug.shift();
jade_debug.unshift({ lineno: 3, filename: "/Users/lihan/projects/js.wcdn.cn/t6/business/src/components/bluev/common/footer.jade" });
buf.push("&nbsp;&nbsp;&nbsp;");
jade_debug.shift();
jade_debug.unshift({ lineno: 4, filename: "/Users/lihan/projects/js.wcdn.cn/t6/business/src/components/bluev/common/footer.jade" });
buf.push("<a href=\"javascript:void(0)\" node-type=\"next\" class=\"W_btn_a btn_22px\">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 4, filename: jade_debug[0].filename });
buf.push("下一步");
jade_debug.shift();
jade_debug.shift();
buf.push("</a>");
jade_debug.shift();
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.shift();;return buf.join("");
} catch (err) {
  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, ".footer\n    a.W_btn_b.btn_22px(href='javascript:window.history.back()') 上一步\n    | &nbsp;&nbsp;&nbsp;\n    a.W_btn_a.btn_22px(href='javascript:void(0)',node-type='next') 下一步");
}
};
});