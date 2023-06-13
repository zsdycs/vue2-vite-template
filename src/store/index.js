import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';

Vue.use(Vuex);

const modulesFiles = import.meta.globEager('./modules/*.js');

const modules = [];
for (const path in modulesFiles) {
  modules.push(modulesFiles[path].default);
}

const store = new Vuex.Store({
  modules,
  getters,
});

export default store;
