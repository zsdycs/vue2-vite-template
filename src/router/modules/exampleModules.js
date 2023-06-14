// 例子
export default [
  {
    meta: { keepAlive: false },
    path: 'examplePage',
    name: 'examplePage',
    component: () => import('@/views/exampleModules/examplePage/index.vue'),
  },
  {
    meta: { keepAlive: false },
    path: 'homePage',
    name: 'homePage',
    component: () => import('@/views/exampleModules/homePage/index.vue'),
  },
];
