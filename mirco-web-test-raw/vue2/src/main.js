import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';

Vue.config.productionTip = false

let instance = null
const render = () => {
  instance = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app-vue')
}

// 不在微前端，单独启用时调用
if (!window.__MICRO_WEB__) {
  render()
}

/**
 * 微前端环境 TODO: important!!!
 */

// 开始加载结构
export async function bootstrap() {
  // 加载之前需要做处理的话，可以写在这里
  console.log('vue app bootstraped');
}

// 渲染
export async function mount() {
  console.log('vue2 mount', instance)
  render()
}

// 卸载
// 卸载时需要处理监听事件什么的可以写这里
export async function unmount(ctx) {
  instance = null;
  const { container } = ctx
  if (container) {
    document.querySelector(container).innerHTML = ''
  }
}
