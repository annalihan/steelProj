steel.d("_html/common/loading", ["tpl/runtime"],function(require, exports, module) {
var jade = require('tpl/runtime');
var undefined = void 0;
module.exports = function template(locals) {
var jade_debug = [{ lineno: 1, filename: "/Users/lihan/Documents/projects/js.wcdn.cn/t6/steelProj/src/_html/common/loading.jade" }];
try {
var buf = [];
var jade_mixins = {};
var jade_interp;

jade_debug.unshift({ lineno: 0, filename: "/Users/lihan/Documents/projects/js.wcdn.cn/t6/steelProj/src/_html/common/loading.jade" });
jade_debug.unshift({ lineno: 1, filename: "/Users/lihan/Documents/projects/js.wcdn.cn/t6/steelProj/src/_html/common/loading.jade" });
buf.push("<html>");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 2, filename: "/Users/lihan/Documents/projects/js.wcdn.cn/t6/steelProj/src/_html/common/loading.jade" });
buf.push("<style>");
jade_debug.unshift({ lineno: 2, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 2, filename: jade_debug[0].filename });
buf.push("/*css3 loading样式部分 start*/");
jade_debug.shift();
buf.push("\n");
jade_debug.unshift({ lineno: 2, filename: jade_debug[0].filename });
buf.push(".webapp_spinner { margin: 100px auto; width: 60px; height: 60px; position: relative; }");
jade_debug.shift();
buf.push("\n");
jade_debug.unshift({ lineno: 2, filename: jade_debug[0].filename });
buf.push(".webapp_container1 > div, .webapp_container2 > div, .webapp_container3 > div { width: 14px; height: 14px; background-color: #333; border-radius: 100%; position: absolute; -webkit-animation: bouncedelay 1.2s infinite ease-in-out; animation: bouncedelay 1.2s infinite ease-in-out; -webkit-animation-fill-mode: both; animation-fill-mode: both; }");
jade_debug.shift();
buf.push("\n");
jade_debug.unshift({ lineno: 2, filename: jade_debug[0].filename });
buf.push(".webapp_spinner .webapp_spinner-container { position: absolute; width: 100%; height: 100%; }");
jade_debug.shift();
buf.push("\n");
jade_debug.unshift({ lineno: 2, filename: jade_debug[0].filename });
buf.push(".webapp_container2 { -webkit-transform: rotateZ(45deg); transform: rotateZ(45deg); }");
jade_debug.shift();
buf.push("\n");
jade_debug.unshift({ lineno: 2, filename: jade_debug[0].filename });
buf.push(".webapp_container3 { -webkit-transform: rotateZ(90deg); transform: rotateZ(90deg); }");
jade_debug.shift();
buf.push("\n");
jade_debug.unshift({ lineno: 2, filename: jade_debug[0].filename });
buf.push(".webapp_circle1 { top: 0; left: 0; }");
jade_debug.shift();
buf.push("\n");
jade_debug.unshift({ lineno: 2, filename: jade_debug[0].filename });
buf.push(".webapp_circle2 { top: 0; right: 0; }");
jade_debug.shift();
buf.push("\n");
jade_debug.unshift({ lineno: 2, filename: jade_debug[0].filename });
buf.push(".webapp_circle3 { right: 0; bottom: 0; }");
jade_debug.shift();
buf.push("\n");
jade_debug.unshift({ lineno: 2, filename: jade_debug[0].filename });
buf.push(".webapp_circle4 { left: 0; bottom: 0; }");
jade_debug.shift();
buf.push("\n");
jade_debug.unshift({ lineno: 2, filename: jade_debug[0].filename });
buf.push(".webapp_container2 .webapp_circle1 { -webkit-animation-delay: -1.1s; animation-delay: -1.1s; }");
jade_debug.shift();
buf.push("\n");
jade_debug.unshift({ lineno: 2, filename: jade_debug[0].filename });
buf.push(".webapp_container3 .webapp_circle1 { -webkit-animation-delay: -1.0s; animation-delay: -1.0s; }");
jade_debug.shift();
buf.push("\n");
jade_debug.unshift({ lineno: 2, filename: jade_debug[0].filename });
buf.push(".webapp_container1 .webapp_circle2 { -webkit-animation-delay: -0.9s; animation-delay: -0.9s; }");
jade_debug.shift();
buf.push("\n");
jade_debug.unshift({ lineno: 2, filename: jade_debug[0].filename });
buf.push(".container2 .circle2 { -webkit-animation-delay: -0.8s; animation-delay: -0.8s; }");
jade_debug.shift();
buf.push("\n");
jade_debug.unshift({ lineno: 2, filename: jade_debug[0].filename });
buf.push(".webapp_container3 .webapp_circle2 { -webkit-animation-delay: -0.7s; animation-delay: -0.7s; }");
jade_debug.shift();
buf.push("\n");
jade_debug.unshift({ lineno: 2, filename: jade_debug[0].filename });
buf.push(".webapp_container1 .webapp_circle3 { -webkit-animation-delay: -0.6s; animation-delay: -0.6s; }");
jade_debug.shift();
buf.push("\n");
jade_debug.unshift({ lineno: 2, filename: jade_debug[0].filename });
buf.push(".webapp_container2 .webapp_circle3 { -webkit-animation-delay: -0.5s; animation-delay: -0.5s; }");
jade_debug.shift();
buf.push("\n");
jade_debug.unshift({ lineno: 2, filename: jade_debug[0].filename });
buf.push(".webapp_container3 .webapp_circle3 { -webkit-animation-delay: -0.4s; animation-delay: -0.4s; }");
jade_debug.shift();
buf.push("\n");
jade_debug.unshift({ lineno: 2, filename: jade_debug[0].filename });
buf.push(".webapp_container1 .webapp_circle4 { -webkit-animation-delay: -0.3s; animation-delay: -0.3s; }");
jade_debug.shift();
buf.push("\n");
jade_debug.unshift({ lineno: 2, filename: jade_debug[0].filename });
buf.push(".webapp_container2 .webapp_circle4 { -webkit-animation-delay: -0.2s; animation-delay: -0.2s; }");
jade_debug.shift();
buf.push("\n");
jade_debug.unshift({ lineno: 2, filename: jade_debug[0].filename });
buf.push(".webapp_container3 .webapp_circle4 { -webkit-animation-delay: -0.1s; animation-delay: -0.1s; }");
jade_debug.shift();
buf.push("\n");
jade_debug.unshift({ lineno: 2, filename: jade_debug[0].filename });
buf.push("@-webkit-keyframes bouncedelay {");
jade_debug.shift();
buf.push("\n");
jade_debug.unshift({ lineno: 2, filename: jade_debug[0].filename });
buf.push("0%, 80%, 100% { -webkit-transform: scale(0.0) }");
jade_debug.shift();
buf.push("\n");
jade_debug.unshift({ lineno: 2, filename: jade_debug[0].filename });
buf.push("40% { -webkit-transform: scale(1.0) }");
jade_debug.shift();
buf.push("\n");
jade_debug.unshift({ lineno: 2, filename: jade_debug[0].filename });
buf.push("}");
jade_debug.shift();
buf.push("\n");
jade_debug.unshift({ lineno: 2, filename: jade_debug[0].filename });
buf.push("@keyframes bouncedelay {");
jade_debug.shift();
buf.push("\n");
jade_debug.unshift({ lineno: 2, filename: jade_debug[0].filename });
buf.push("0%, 80%, 100% {");
jade_debug.shift();
buf.push("\n");
jade_debug.unshift({ lineno: 2, filename: jade_debug[0].filename });
buf.push("transform: scale(0.0);");
jade_debug.shift();
buf.push("\n");
jade_debug.unshift({ lineno: 2, filename: jade_debug[0].filename });
buf.push("-webkit-transform: scale(0.0);");
jade_debug.shift();
buf.push("\n");
jade_debug.unshift({ lineno: 2, filename: jade_debug[0].filename });
buf.push("} 40% {");
jade_debug.shift();
buf.push("\n");
jade_debug.unshift({ lineno: 2, filename: jade_debug[0].filename });
buf.push("transform: scale(1.0);");
jade_debug.shift();
buf.push("\n");
jade_debug.unshift({ lineno: 2, filename: jade_debug[0].filename });
buf.push("-webkit-transform: scale(1.0);");
jade_debug.shift();
buf.push("\n");
jade_debug.unshift({ lineno: 2, filename: jade_debug[0].filename });
buf.push("}");
jade_debug.shift();
buf.push("\n");
jade_debug.unshift({ lineno: 2, filename: jade_debug[0].filename });
buf.push("}");
jade_debug.shift();
buf.push("\n");
jade_debug.unshift({ lineno: 2, filename: jade_debug[0].filename });
buf.push("/*css3 loading样式部分 end*/");
jade_debug.shift();
jade_debug.shift();
buf.push("</style>");
jade_debug.shift();
jade_debug.unshift({ lineno: 3, filename: "/Users/lihan/Documents/projects/js.wcdn.cn/t6/steelProj/src/_html/common/loading.jade" });
buf.push("<body>");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 4, filename: "/Users/lihan/Documents/projects/js.wcdn.cn/t6/steelProj/src/_html/common/loading.jade" });
buf.push("<div class=\"webapp_spinner\">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 5, filename: "/Users/lihan/Documents/projects/js.wcdn.cn/t6/steelProj/src/_html/common/loading.jade" });
buf.push("<div class=\"webapp_spinner-container webapp_container1\">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 6, filename: "/Users/lihan/Documents/projects/js.wcdn.cn/t6/steelProj/src/_html/common/loading.jade" });
buf.push("<div class=\"webapp_circle1\">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.unshift({ lineno: 7, filename: "/Users/lihan/Documents/projects/js.wcdn.cn/t6/steelProj/src/_html/common/loading.jade" });
buf.push("<div class=\"webapp_circle2\">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.unshift({ lineno: 8, filename: "/Users/lihan/Documents/projects/js.wcdn.cn/t6/steelProj/src/_html/common/loading.jade" });
buf.push("<div class=\"webapp_circle3\">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.unshift({ lineno: 9, filename: "/Users/lihan/Documents/projects/js.wcdn.cn/t6/steelProj/src/_html/common/loading.jade" });
buf.push("<div class=\"webapp_circle4\">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.unshift({ lineno: 10, filename: "/Users/lihan/Documents/projects/js.wcdn.cn/t6/steelProj/src/_html/common/loading.jade" });
buf.push("<div class=\"webapp_spinner-container webapp_container2\">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 11, filename: "/Users/lihan/Documents/projects/js.wcdn.cn/t6/steelProj/src/_html/common/loading.jade" });
buf.push("<div class=\"webapp_circle1\">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.unshift({ lineno: 12, filename: "/Users/lihan/Documents/projects/js.wcdn.cn/t6/steelProj/src/_html/common/loading.jade" });
buf.push("<div class=\"webapp_circle2\">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.unshift({ lineno: 13, filename: "/Users/lihan/Documents/projects/js.wcdn.cn/t6/steelProj/src/_html/common/loading.jade" });
buf.push("<div class=\"webapp_circle3\">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.unshift({ lineno: 14, filename: "/Users/lihan/Documents/projects/js.wcdn.cn/t6/steelProj/src/_html/common/loading.jade" });
buf.push("<div class=\"webapp_circle4\">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.unshift({ lineno: 15, filename: "/Users/lihan/Documents/projects/js.wcdn.cn/t6/steelProj/src/_html/common/loading.jade" });
buf.push("<div class=\"spinner-container container3\">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 16, filename: "/Users/lihan/Documents/projects/js.wcdn.cn/t6/steelProj/src/_html/common/loading.jade" });
buf.push("<div class=\"webapp_circle1\">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.unshift({ lineno: 17, filename: "/Users/lihan/Documents/projects/js.wcdn.cn/t6/steelProj/src/_html/common/loading.jade" });
buf.push("<div class=\"webapp_circle2\">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.unshift({ lineno: 18, filename: "/Users/lihan/Documents/projects/js.wcdn.cn/t6/steelProj/src/_html/common/loading.jade" });
buf.push("<div class=\"webapp_circle3\">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.unshift({ lineno: 19, filename: "/Users/lihan/Documents/projects/js.wcdn.cn/t6/steelProj/src/_html/common/loading.jade" });
buf.push("<div class=\"webapp_circle4\">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.shift();
buf.push("</body>");
jade_debug.shift();
jade_debug.shift();
buf.push("</html>");
jade_debug.shift();
jade_debug.shift();;return buf.join("");
} catch (err) {
  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "html\r\n    style.\r\n        /*css3 loading样式部分 start*/\r\n        .webapp_spinner { margin: 100px auto; width: 60px; height: 60px; position: relative; }\r\n        .webapp_container1 > div, .webapp_container2 > div, .webapp_container3 > div { width: 14px; height: 14px; background-color: #333; border-radius: 100%; position: absolute; -webkit-animation: bouncedelay 1.2s infinite ease-in-out; animation: bouncedelay 1.2s infinite ease-in-out; -webkit-animation-fill-mode: both; animation-fill-mode: both; }\r\n        .webapp_spinner .webapp_spinner-container { position: absolute; width: 100%; height: 100%; }\r\n        .webapp_container2 { -webkit-transform: rotateZ(45deg); transform: rotateZ(45deg); }\r\n        .webapp_container3 { -webkit-transform: rotateZ(90deg); transform: rotateZ(90deg); }\r\n        .webapp_circle1 { top: 0; left: 0; }\r\n        .webapp_circle2 { top: 0; right: 0; }\r\n        .webapp_circle3 { right: 0; bottom: 0; }\r\n        .webapp_circle4 { left: 0; bottom: 0; }\r\n        .webapp_container2 .webapp_circle1 { -webkit-animation-delay: -1.1s; animation-delay: -1.1s; }\r\n        .webapp_container3 .webapp_circle1 { -webkit-animation-delay: -1.0s; animation-delay: -1.0s; }\r\n        .webapp_container1 .webapp_circle2 { -webkit-animation-delay: -0.9s; animation-delay: -0.9s; }\r\n        .container2 .circle2 { -webkit-animation-delay: -0.8s; animation-delay: -0.8s; }\r\n        .webapp_container3 .webapp_circle2 { -webkit-animation-delay: -0.7s; animation-delay: -0.7s; }\r\n        .webapp_container1 .webapp_circle3 { -webkit-animation-delay: -0.6s; animation-delay: -0.6s; }\r\n        .webapp_container2 .webapp_circle3 { -webkit-animation-delay: -0.5s; animation-delay: -0.5s; }\r\n        .webapp_container3 .webapp_circle3 { -webkit-animation-delay: -0.4s; animation-delay: -0.4s; }\r\n        .webapp_container1 .webapp_circle4 { -webkit-animation-delay: -0.3s; animation-delay: -0.3s; }\r\n        .webapp_container2 .webapp_circle4 { -webkit-animation-delay: -0.2s; animation-delay: -0.2s; }\r\n        .webapp_container3 .webapp_circle4 { -webkit-animation-delay: -0.1s; animation-delay: -0.1s; }\r\n        @-webkit-keyframes bouncedelay {\r\n        0%, 80%, 100% { -webkit-transform: scale(0.0) }\r\n        40% { -webkit-transform: scale(1.0) }\r\n        }\r\n        @keyframes bouncedelay {\r\n        0%, 80%, 100% {\r\n        transform: scale(0.0);\r\n        -webkit-transform: scale(0.0);\r\n        } 40% {\r\n        transform: scale(1.0);\r\n        -webkit-transform: scale(1.0);\r\n        }\r\n        }\r\n        /*css3 loading样式部分 end*/\r\n    body\r\n        .webapp_spinner\r\n            .webapp_spinner-container.webapp_container1\r\n                .webapp_circle1\r\n                .webapp_circle2\r\n                .webapp_circle3\r\n                .webapp_circle4\r\n            .webapp_spinner-container.webapp_container2\r\n                .webapp_circle1\r\n                .webapp_circle2\r\n                .webapp_circle3\r\n                .webapp_circle4\r\n            .spinner-container.container3\r\n                .webapp_circle1\r\n                .webapp_circle2\r\n                .webapp_circle3\r\n                .webapp_circle4\r\n");
}
};
});