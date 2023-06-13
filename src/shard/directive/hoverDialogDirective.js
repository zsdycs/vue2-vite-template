import Vue from 'vue';
var flag = true;
var obj = null;
var btn = null;
var tag = '';
var ismove = false;
Vue.directive('hoverDialog', {
  bind(el, binding, vnode) {
    /**
     * 获取元素的css3 Translate偏移量
     * 只做了对标准和webkit内核兼容
     * 获取css属性摘自Zepto.js，做修改后只获得transform属性
     * 只处理 translate，如果有旋转或者缩放等，结果会不准确
     *
     * @param  {Object} element dom元素
     * @return {Array}          偏移量[x,y]
     */
    function getTranslate(element) {
      var transformMatrix =
        element.style['WebkitTransform'] ||
        getComputedStyle(element, '').getPropertyValue('-webkit-transform') ||
        element.style['transform'] ||
        getComputedStyle(element, '').getPropertyValue('transform');

      var matrix = transformMatrix.match(/\-?[0-9]+\.?[0-9]*/g);
      // if(matrix==null){
      //   return [1,1];
      // }
      // var x = parseInt(matrix[0] || 0); //translate x
      // var y = parseInt(matrix[3] || 0); //translate y
      return matrix;
    }

    function getElementTop(element) {
      var current = element.offsetParent; //这是获取父元素
      var actualTop, actualLeft;
      var matrix = getTranslate(current);
      if (matrix == null) {
        actualTop = element.offsetTop;
        actualLeft = element.offsetLeft;
      } else {
        actualTop = element.offsetTop * 0.86; //这是获取元素距父元素顶部的距离
        actualLeft = element.offsetLeft * 0.86 + current.offsetWidth * 0.07;
      }

      while (current !== null) {
        //当它上面有元素时就继续执行

        actualTop += current.offsetTop; //这是获取父元素距它的父元素顶部的距离累加起来
        actualLeft += current.offsetLeft;
        current = current.offsetParent; //继续找父元素
      }
      return {
        top: actualTop,
        left: actualLeft,
      };
    }

    if (flag) {
      let div = document.createElement('div');
      div.className = 'hover-div';
      div.id = 'hover-dialog';
      div.innerHTML =
        "<div class='top-div'><span>实时数据点</span><span id='hoverSpTag'>点ID:</span></div><button id='hover-btn'>历史</button>";
      div.style.display = 'none';
      document.body.appendChild(div);

      obj = document.getElementById('hover-dialog');
      btn = obj.children[1];

      obj.onmouseover = function () {
        ismove = true;
      };
      obj.onmouseleave = function () {
        ismove = false;
        obj.style.display = 'none';
      };
      flag = false;
    }
    btn.onclick = function () {
      eventBus.$emit('hoverSearch', tag);
      obj.style.display = 'none';
    };
    el.onmouseover = (e) => {
      ismove = false;
      tag = el.dataset.tag;
      if (tag == 'noDis') {
        return;
      }
      document.getElementById('hoverSpTag').innerHTML = '点ID:' + tag;

      let left = el.offsetWidth / 2;
      obj.style.top = getElementTop(el).top + 'px';
      obj.style.left = getElementTop(el).left + left + 'px';
      obj.style.display = 'block';
    };
    el.onmouseleave = (e) => {
      setTimeout(() => {
        if (!ismove) {
          obj.style.display = 'none';
        }
      }, 100);
    };
  },
  unbind: function (el, binding) {
    // el.onmouseover = null;
    // el.onmouseleave = null;
  },
});
