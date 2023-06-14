import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// modules {
const modules = [];
const modulesFiles = import.meta.globEager('./modules/*.js');
for (const path in modulesFiles) {
  modules.push(...modulesFiles[path].default);
}
// modules }

export const routes = [
  {
    path: '/',
    meta: {},
    component: () => import('@/views/public.vue'),
    children: modules,
  },
];

const router = new VueRouter({
  base: '/',
  mode: 'hash', // 或者 'history'
  routes,
});

export default router;
