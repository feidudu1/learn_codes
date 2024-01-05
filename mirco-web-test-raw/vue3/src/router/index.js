import Index from '../pages/index/index.vue';
import Select from '../pages/select/index.vue'
import { createRouter, createWebHashHistory } from 'vue-router';

const baseUrl = '/vue3/'

const routes = [
  // 首页
  {
    path: '/index',
    name: 'Index',
    component: Index
  },
  // 选车内容
  {
    path: '/select',
    name: 'Select',
    component: Select
  },
];

export default createRouter({
  history: createWebHashHistory(baseUrl),
  routes,
});
