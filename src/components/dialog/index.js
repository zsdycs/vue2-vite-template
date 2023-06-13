import alertComponent from './Dialog.vue';

//生成随机GUID
function GUID() {
  var G1 =
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1) +
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  var G2 =
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1) +
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  return G1 + G2;
}

const install = function (Vue) {
  // 必须要使用这个方法挂载到 vue 上
  Vue.prototype.$showDialog = function (options) {
    var _Vue = this;
    options = options || {
      template: '<div>nothing...</div>',
    };

    options.id = GUID();
    var list = _Vue.$store.state.dialogTitle;
    var titleIndex = list.indexOf(options.title);
    if (titleIndex >= 0) {
      if (
        options.isOpenMulti == true ||
        typeof options.isOpenMulti == 'undefined'
      ) {
        return;
      }
    }

    var ModalDialog = Vue.component(
      'dcom-modal-dialog',
      Vue.extend(alertComponent),
    );

    // options._Vue = this;
    var dialog = new ModalDialog(options);

    for (var k in options) {
      dialog.$props[k] = options[k];
    }

    if (!dialog.$store) {
      if (_Vue.$store) {
        dialog.$store = _Vue.$store =
          typeof _Vue.$store === 'function' ? _Vue.$store() : _Vue.$store;
      } else {
        dialog.$store = {};
      }
    }
    dialog.$mount();
    dialog.$props.id = options.id;
    dialog.$el.id = options.id;
    document.body.appendChild(dialog.$el);

    if (dialog.isOpenMulti) {
      list.push(dialog.title);
      _Vue.$store.commit('setDialog', list);
    }
    var list = _Vue.$store.state.zIndexList;
    list.push(dialog.$el.style.zIndex);
    _Vue.$store.commit('setIndexList', list);
  };
};

export default install;
