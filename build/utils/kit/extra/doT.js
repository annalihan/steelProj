steel.d("utils/kit/extra/doT",[],function(e,t,n){!function(){"use strict";function e(){var e={"&":"&#38;","<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","/":"&#47;"},t=/&(?!#?\w+;)|<|>|"|'|\//g;return function(){return this?this.replace(t,function(t){return e[t]||t}):this}}function t(e,n,r){return("string"==typeof n?n:n.toString()).replace(e.define||u,function(t,n,o,a){return 0===n.indexOf("def.")&&(n=n.substring(4)),n in r||(":"===o?(e.defineParams&&a.replace(e.defineParams,function(e,t,o){r[n]={arg:t,text:o}}),n in r||(r[n]=a)):new Function("def","def['"+n+"']="+a)(r)),""}).replace(e.use||u,function(n,o){e.useParams&&(o=o.replace(e.useParams,function(e,t,n,o){if(r[n]&&r[n].arg&&o){var a=(n+":"+o).replace(/'|\\/g,"_");return r.__exp=r.__exp||{},r.__exp[a]=r[n].text.replace(new RegExp("(^|[^\\w$])"+r[n].arg+"([^\\w$])","g"),"$1"+o+"$2"),t+"def.__exp['"+a+"']"}}));var a=new Function("def","return "+o)(r);return a?t(e,a,r):a})}function r(e){return e.replace(/\\('|\\)/g,"$1").replace(/[\r\t\n]/g," ")}var o,a={version:"1.0.1",templateSettings:{evaluate:/\{\{([\s\S]+?(\}?)+)\}\}/g,interpolate:/\{\{=([\s\S]+?)\}\}/g,encode:/\{\{!([\s\S]+?)\}\}/g,use:/\{\{#([\s\S]+?)\}\}/g,useParams:/(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,define:/\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,defineParams:/^\s*([\w$]+):([\s\S]+)/,conditional:/\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,iterate:/\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,varname:"it",strip:!0,append:!0,selfcontained:!1},template:void 0,compile:void 0};"undefined"!=typeof n&&n.exports?n.exports=a:"function"==typeof define&&define.amd?define(function(){return a}):(o=function(){return this||(0,eval)("this")}(),o.doT=a),String.prototype.encodeHTML=e();var i={append:{start:"'+(",end:")+'",endencode:"||'').toString().encodeHTML()+'"},split:{start:"';out+=(",end:");out+='",endencode:"||'').toString().encodeHTML();out+='"}},u=/$^/;a.template=function(n,o,c){o=o||a.templateSettings;var s,p,l=o.append?i.append:i.split,d=0,f=o.use||o.define?t(o,n,c||{}):n;f=("var out='"+(o.strip?f.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g," ").replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g,""):f).replace(/'|\\/g,"\\$&").replace(o.interpolate||u,function(e,t){return l.start+r(t)+l.end}).replace(o.encode||u,function(e,t){return s=!0,l.start+r(t)+l.endencode}).replace(o.conditional||u,function(e,t,n){return t?n?"';}else if("+r(n)+"){out+='":"';}else{out+='":n?"';if("+r(n)+"){out+='":"';}out+='"}).replace(o.iterate||u,function(e,t,n,o){return t?(d+=1,p=o||"i"+d,t=r(t),"';var arr"+d+"="+t+";if(arr"+d+"){var "+n+","+p+"=-1,l"+d+"=arr"+d+".length-1;while("+p+"<l"+d+"){"+n+"=arr"+d+"["+p+"+=1];out+='"):"';} } out+='"}).replace(o.evaluate||u,function(e,t){return"';"+r(t)+"out+='"})+"';return out;").replace(/\n/g,"\\n").replace(/\t/g,"\\t").replace(/\r/g,"\\r").replace(/(\s|;|\}|^|\{)out\+='';/g,"$1").replace(/\+''/g,"").replace(/(\s|;|\}|^|\{)out\+=''\+/g,"$1out+="),s&&o.selfcontained&&(f="String.prototype.encodeHTML=("+e.toString()+"());"+f);try{return new Function(o.varname,f)}catch(g){throw"undefined"!=typeof console&&console.log("Could not create a template function: "+f),g}},a.compile=function(e,t){return a.template(e,null,t)},"undefined"!=typeof STK&&STK.register("utils.kit.extra.doT",function(e){return a})}()});