import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store/index.js';

import 'normalize.css/normalize.css';
import '@/styles/index.scss';

import '@/shard/global-components';
import '@/shard/icons';
import '@/shard/permission';
import '@/shard/filters';

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
});
