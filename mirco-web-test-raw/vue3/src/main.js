import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { setMain } from './utils/global'

let instance = null;

function render() {
  instance = createApp(App);
  instance
    .use(router)
    .mount('#app');
}

if (!window.__MICRO_WEB__) {
  render();
}

/**
 * 微前端环境
 */

export async function bootstrap() {
  window.a = 1
  console.log('----','vue3 bootstrap');
}

export async function mount(app) {
  console.log('----', 'vue3 mount');
  setMain(app)
  render();
}

export async function unmount(ctx) {
  instance = null;
  const { container } = ctx
  if (container) {
    document.querySelector(container).innerHTML = ''
  }
}
