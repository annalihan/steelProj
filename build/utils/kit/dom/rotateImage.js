steel.d("utils/kit/dom/rotateImage",[],function(t,e,i){STK.register("utils.kit.dom.rotateImage",function(t){function e(t,e){if(null!=t&&null!=e){t="string"==typeof t?document.getElementById(t):t;var a=t.getAttribute("dynamic-id");e=e.toLowerCase();var r=1*t.getAttribute("degree");r=r>3||0>r?0:r||0;var h={right:function(t){return 3==t?0:t+1},left:function(t){return 0==t?3:t-1}};r=h[e](r),t.setAttribute("degree",r),i(t,r,a)}}var i;return i=t.core.util.browser.IE?function(t,e){switch(t.style.filter="progid:DXImageTransform.Microsoft.BasicImage(rotation="+e+")",e){case 0:case 2:t.parentNode.style.height=t.height;break;case 1:case 3:t.parentNode.style.height=t.width}}:function(t,e,i){var a=document.getElementById("canvas_"+i);null==a&&(t.style.opacity="0",t.style.position="absolute",a=document.createElement("canvas"),a.setAttribute("id","canvas_"+i),t.parentNode.appendChild(a));var r=a.getContext("2d");switch(e){case 0:a.setAttribute("width",t.width),a.setAttribute("height",t.height),r.rotate(0*Math.PI/180),r.drawImage(t,0,0);break;case 1:a.setAttribute("width",t.height),a.setAttribute("height",t.width),r.rotate(90*Math.PI/180),r.drawImage(t,0,-t.height);break;case 2:a.setAttribute("width",t.width),a.setAttribute("height",t.height),r.rotate(180*Math.PI/180),r.drawImage(t,-t.width,-t.height);break;case 3:a.setAttribute("width",t.height),a.setAttribute("height",t.width),r.rotate(270*Math.PI/180),r.drawImage(t,-t.width,0)}},e})});