import Vue from 'vue';
import SvgIcon from '@/components/SvgIcon/index.vue';
import 'virtual:svg-icons-register';

// 全局注册
Vue.component('svg-icon', SvgIcon);

// import ids from 'virtual:svg-icons-names'
// console.log("已注册的 svg-icons-name：", ids);
