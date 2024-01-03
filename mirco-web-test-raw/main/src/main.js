import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {registerApp} from './utils'
import {navList} from './store/leftNav'

// import { starMicroApp } from './utils/startMicroApp';

// 注册、加载、启动子应用
// starMicroApp();

registerApp(navList)

createApp(App).use(router()).mount('#micro_web_main_app')
