steel.d("utils/kit/dom/drag",[],function(e,t,o){STK.register("utils.kit.dom.drag",function(e){return function(t,o){var a,d,p,r,n,u,i,s,l=function(){c(),g()},c=function(){a=e.parseParam({moveDom:t,perchStyle:"border:solid #999999 2px;",dragtype:"perch",actObj:{},pagePadding:5},o),p=a.moveDom,d={},r={},n=e.drag(t,{actObj:a.actObj}),"perch"===a.dragtype&&(u=e.C("div"),i=!1,s=!1,p=u),t.style.cursor="move"},g=function(){e.custEvent.add(a.actObj,"dragStart",h),e.custEvent.add(a.actObj,"dragEnd",m),e.custEvent.add(a.actObj,"draging",y)},h=function(o,d){document.body.style.cursor="move";var p=e.core.util.pageSize().page;if(r=e.core.dom.position(a.moveDom),r.pageX=d.pageX,r.pageY=d.pageY,r.height=a.moveDom.offsetHeight,r.width=a.moveDom.offsetWidth,r.pageHeight=p.height,r.pageWidth=p.width,"perch"===a.dragtype){var n=[];n.push(a.perchStyle),n.push("position:absolute"),n.push("z-index:"+(a.moveDom.style.zIndex+10)),n.push("width:"+a.moveDom.offsetWidth+"px"),n.push("height:"+a.moveDom.offsetHeight+"px"),n.push("left:"+r.l+"px"),n.push("top:"+r.t+"px"),u.style.cssText=n.join(";"),s=!0,setTimeout(function(){s&&(document.body.appendChild(u),i=!0)},100)}void 0!==t.setCapture&&t.setCapture()},m=function(e,o){document.body.style.cursor="auto",void 0!==t.setCapture&&t.releaseCapture(),"perch"===a.dragtype&&(s=!1,a.moveDom.style.top=u.style.top,a.moveDom.style.left=u.style.left,i&&(document.body.removeChild(u),i=!1))},y=function(e,t){var o=r.t+(t.pageY-r.pageY),d=r.l+(t.pageX-r.pageX),n=o+r.height,u=d+r.width,i=r.pageHeight-a.pagePadding,s=r.pageWidth-a.pagePadding;i>n&&o>0?p.style.top=o+"px":(0>o&&(p.style.top="0px"),n>=i&&(p.style.top=i-r.height+"px")),s>u&&d>0?p.style.left=d+"px":(0>d&&(p.style.left="0px"),u>=s&&(p.style.left=s-r.width+"px"))};return l(),d.destroy=function(){document.body.style.cursor="auto","function"==typeof p.setCapture&&p.releaseCapture(),"perch"===a.dragtype&&(s=!1,i&&(document.body.removeChild(u),i=!1)),e.custEvent.remove(a.actObj,"dragStart",h),e.custEvent.remove(a.actObj,"dragEnd",m),e.custEvent.remove(a.actObj,"draging",y),n.destroy&&n.destroy(),a=null,p=null,r=null,n=null,u=null,i=null,s=null},d.getActObj=function(){return a.actObj},d}})});