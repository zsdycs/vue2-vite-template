import store from '@/store';
import Vue from 'vue';

Vue.directive('zindexClick', {
  bind(el, binding, vnode) {
    function documentHandler(e) {
      if (binding.expression) {
        binding.value(e);
      }
      var indexlist = store.state.zindexList;
      var indexmax = Math.max(...indexlist);
      var zindex = el.style.zIndex;
      if (indexmax != zindex) {
        var max = indexmax + 1;
        el.style.zIndex = max;
        var index2 = indexlist.indexOf(indexmax.toString());
        if (index2 > -1) {
          indexlist.splice(index2, 1, max.toString());
          store.commit('setIndexList', indexlist);
        }
      }
    }
    el.__vueClickOutside__ = documentHandler;
    el.addEventListener('mousedown', documentHandler);
  },
  unbind: function (el, binding) {
    document.removeEventListener('mousedown', el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  },
});
