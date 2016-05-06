steel.d("components/bluev/common/top_position", ["tpl/runtime"],function(require, exports, module) {
var jade = require('tpl/runtime');
var undefined = void 0;
module.exports = function template(locals) {
var jade_debug = [{ lineno: 1, filename: "/Users/lihan/projects/js.wcdn.cn/t6/business/src/components/bluev/common/top_position.jade" }];
try {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (dapart) {
jade_debug.unshift({ lineno: 0, filename: "/Users/lihan/projects/js.wcdn.cn/t6/business/src/components/bluev/common/top_position.jade" });
jade_debug.unshift({ lineno: 1, filename: "/Users/lihan/projects/js.wcdn.cn/t6/business/src/components/bluev/common/top_position.jade" });
buf.push("<p class=\"top_position\">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 2, filename: "/Users/lihan/projects/js.wcdn.cn/t6/business/src/components/bluev/common/top_position.jade" });
buf.push("<a href=\"http://verified.weibo.com/verify\" target=\"_blank\" class=\"W_f14 varifyindex\">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 2, filename: jade_debug[0].filename });
buf.push("认证首页");
jade_debug.shift();
jade_debug.shift();
buf.push("</a>");
jade_debug.shift();
jade_debug.unshift({ lineno: 3, filename: "/Users/lihan/projects/js.wcdn.cn/t6/business/src/components/bluev/common/top_position.jade" });
buf.push("<span class=\"W_f14\">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 3, filename: jade_debug[0].filename });
buf.push(" ");
jade_debug.shift();
jade_debug.unshift({ lineno: 4, filename: "/Users/lihan/projects/js.wcdn.cn/t6/business/src/components/bluev/common/top_position.jade" });
if(dapart == "enterprise")
{
jade_debug.unshift({ lineno: 5, filename: "/Users/lihan/projects/js.wcdn.cn/t6/business/src/components/bluev/common/top_position.jade" });
jade_debug.unshift({ lineno: 5, filename: "/Users/lihan/projects/js.wcdn.cn/t6/business/src/components/bluev/common/top_position.jade" });
buf.push(">企业认证");
jade_debug.shift();
jade_debug.shift();
}
else if(dapart = "group")
{
jade_debug.unshift({ lineno: 7, filename: "/Users/lihan/projects/js.wcdn.cn/t6/business/src/components/bluev/common/top_position.jade" });
jade_debug.unshift({ lineno: 7, filename: "/Users/lihan/projects/js.wcdn.cn/t6/business/src/components/bluev/common/top_position.jade" });
buf.push(">机构认证");
jade_debug.shift();
jade_debug.shift();
}
jade_debug.shift();
jade_debug.shift();
buf.push("</span>");
jade_debug.shift();
jade_debug.unshift({ lineno: 8, filename: "/Users/lihan/projects/js.wcdn.cn/t6/business/src/components/bluev/common/top_position.jade" });
buf.push("<a href=\"http://help.weibo.com/newtopic/e\" target=\"_blank\" class=\"W_fr\">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 8, filename: jade_debug[0].filename });
buf.push("认证帮助»");
jade_debug.shift();
jade_debug.shift();
buf.push("</a>");
jade_debug.shift();
jade_debug.shift();
buf.push("</p>");
jade_debug.shift();
jade_debug.shift();}.call(this,"dapart" in locals_for_with?locals_for_with.dapart:typeof dapart!=="undefined"?dapart:undefined));;return buf.join("");
} catch (err) {
  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "p.top_position\n    a.W_f14.varifyindex(href='http://verified.weibo.com/verify',target='_blank') 认证首页\n    span.W_f14 \n        - if(dapart == \"enterprise\")\n            |>企业认证\n        - else if(dapart = \"group\")\n            |>机构认证\n    a.W_fr(href=\"http://help.weibo.com/newtopic/e\",target='_blank') 认证帮助»");
}
};
});