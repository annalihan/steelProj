steel.d("utils/kit/dom/upDown", [],function(require, exports, module) {
/**
 * 上下移动动画
 * @param {cfg} opts
 * @author zhaobo | zhaobo@staff.sina.com.cn
 */

STK.register('utils.kit.dom.upDown', function($) {
	var parent = function (el, tag, classname) {
		if (el.nodeName.toLowerCase() == tag) {
			var cla = new RegExp(classname);
			if (!classname || cla.test(el.className)) {
				return el;
			}
		}
		if (el.nodeName.toLowerCase() == "body") {
			return false;
		}
		return arguments.callee(el.parentNode, tag, classname);

	};
	return function(cfg) {
		var that = {};


		var upBtn = cfg.upBtn;
		$.log("init", upBtn);
		var downBtn = cfg.downBtn;
		var BtnNormal = cfg.BtnNormal;
		var BtnDisable = cfg.BtnDisable;

		var container = cfg.container;
		var listTagName = cfg.listTagName;
		var listSelect = cfg.listSelect;
		var hoverClass = cfg.hoverClass;
		var selectClass = cfg.selectClass;
		var callback = cfg.callback;
		var lock1 = false;
		var lock2 = false;
		var bindContainerEvent = function () {
			$.addEvent(container, "click", function () {
				var ev = $.core.evt.getEvent();
				$.core.evt.fixEvent(ev);
				var _tag = ev.target;
				var node = parent(_tag, listTagName);
				// var lock = node.getAttribute("lock");
				// if (lock) {
				//     return false;
				// }
				if (!node) {
					return;
				}
				setSelect(node);//设置 选中
				checkBtn(node); //检查  btn
			});
		};


		var bindBtnEvent = function () {
			$.addEvent(upBtn, "click", function () {
				var ele = getSelect();
				if (!ele) {
					return
				}
				var lock = ele.getAttribute("lock");
				if (lock == 1) {
					return false;
				}
				if (ele && upBtn.className == BtnNormal) {
					moveUp(ele);
				}
			});

			$.addEvent(downBtn, "click", function () {
				var ele = getSelect();
				if (!ele) {
					return
				}
				var lock = ele.getAttribute("lock");
				if (lock == 1) {
					return false;
				}
				if (ele && downBtn.className == BtnNormal) {
					that.moveDown(ele);
				}
			});
		};

		var getSelect = function () {
			var list = $.sizzle(listSelect, container);
			for (var i = 0, len = list.length; i < len; i++) {
				if ($.core.dom.hasClassName(list[i] , selectClass)) {
					return list[i];
				}
			}
			return null;
		};

		var checkBtn = function (node) {
			var lock = node.getAttribute("lock");
			if (lock == 1) {
				upBtn.className = BtnDisable;
				downBtn.className = BtnDisable;
				return false;
			}


			var list = $.sizzle(listSelect, container);
			for (var i = 0, len = list.length; i < len; i++) {
				if (list[i] == node) {
					break;
				}
			}
			if (i == 0) {
				upBtn.className = BtnDisable;
			}
			else {
				upBtn.className = BtnNormal;
			}
			if (i == (len - 1)) {
				downBtn.className = BtnDisable;
			}
			else {
				downBtn.className = BtnNormal;
			}
		}
		var setSelect = function (node) {
			var list = $.sizzle(listSelect, container);
			for (var i = 0, len = list.length; i < len; i++) {
				$.core.dom.removeClassName(list[i], selectClass);
			}
			$.core.dom.addClassName(node,selectClass);
		};

		var setLock = function (node) {
			var list = parent(node, listTagName);
			list.setAttribute("lock", 1);
			list.setAttribute("draggable", "false");
			that.checkBtn(node);
		};


		var setFree = function (node) {
			var list = parent(node, listTagName);
			list.setAttribute("lock", 0);
			list.setAttribute("draggable", "true");
			that.checkBtn(node);
		};
		var setBtnDisable = function () {
			upBtn.className = BtnDisable;
			downBtn.className = BtnDisable;
		};

		var updateBtn = function () {
			var node = getSelect();
			if (node) {
				checkBtn(node);
			}
		};
		var moveUp = function (node) {
			var list = $.sizzle(listSelect, container);
			var index = null;
			for (var i = 0, len = list.length; i < len; i++) {
				if (list[i] == node) {
					index = i;
				}
			}

			var ele = list[index - 1];
			tween(node, ele, function () {
				checkBtn(node);
			});
		};

		var init = function () {
			bindBtnEvent();
			bindContainerEvent();
		};

		var moveDown = function (node) {
						//   console.log("down");
			var list = $.sizzle(listSelect, container);
			var index = null;
			for (var i = 0, len = list.length; i < len; i++) {
				if (list[i] == node) {
					index = i;
				}
			}

			var ele = list[index + 1];
			tween(ele, node, function () {
				checkBtn(node);
			});
		};
		var tween = function (node1, node2, cb) {
			if(lock1 || lock2) return;
			lock1 = true;
			lock2 = true;
						//设置 假的节点
			var ele1 = node1.cloneNode(true);
			var ele2 = node2.cloneNode(true);


//			$.log(container, $.sizzle(">div", container.parentNode));
//			$.log($.core.dom.getSize($.sizzle(">div", container.parentNode)[0]).height);
			var rela = $.position(container).t - $.core.dom.getSize($.sizzle(">div", container.parentNode)[0]).height;
			var top1 = $.position(node1).t - rela;
			var top2 = $.position(node2).t - rela;
			node1.style.visibility = "hidden";
			node2.style.visibility = "hidden";
			container.appendChild(ele1);
			container.appendChild(ele2);
			container.parentNode.style.position = "relative";//木办法啊 只能设置ul的父节点div了
			//this.container.style.height = this.container.parentNode.clientHeight;
			//this.container.style.overflow="hidden";
			ele1.style.position = "absolute";
			ele2.style.position = "absolute";
			ele1.style.top = top1 + "px";
			ele2.style.top = top2 + "px";
			ele1.style.width = node1.clientWidth + "px";
			ele2.style.width = node2.clientWidth + "px";
			// return
			var t = $.core.ani.tween;
			node1.parentNode.insertBefore(node1, node2);
			$.log(top1, top2);
			t(ele1, {'end':function (el) {
				ele1.parentNode.removeChild(ele1);
				node1.style.visibility = "visible";
				cb && cb();
				lock1 = false;
				callback && callback();
			}
			}).play({
					'top':top2
				});
			t(ele2, {'end':function (el) {
				node2.style.visibility = "visible";
				ele2.parentNode.removeChild(ele2);
				cb && cb();
				lock2 = false;
				callback && callback();
			}
			}).play({
					'top':top1
				});


			/*t(ele1, ["top"], [top2], 0.2, "simple", {
				"end":function () {
					ele1.parentNode.removeChild(ele1);
					// node1.parentNode.insertBefore(node2);
					node1.style.visibility = "visible";
					//that.container.style.position = "";
					cb && cb();
				}
			});
			t(ele2, ["top"], [top1], 0.2, "simple", {
				"end":function () {
					node2.style.visibility = "visible";
					ele2.parentNode.removeChild(ele2);
					cb && cb();
				}
			});*/
		};


		init();

		that.setFree = setFree;
		that.setBtnDisable = setBtnDisable;
		that.updateBtn = updateBtn;
		that.moveUp = moveUp;
		that.moveDown = moveDown;
		that.setLock = setLock;
		that.setSelect = setSelect;
		that.getSelect = getSelect;
		that.checkBtn = checkBtn;

		return that;
	};

});
});