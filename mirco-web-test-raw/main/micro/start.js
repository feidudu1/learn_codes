import {setList, getList} from './const/subApps'
import {rewriteRouter} from './router/rewriteRouter'
import { currentApp } from './utils'
import {setMainLifeCycle} from './const/mainLifeCycle'
import { Custom } from './customevent'
import {prefetch} from './loader/prefetch'

/**
 * 主子应用间通信&子应用间通信
 */
const custom = new Custom()
custom.on('test', (e, data) => {
  console.log(77777, data);
})
custom.emit('test', '事件bus')
window.custom = custom

// 拦截路由，引用该文件就会执行
rewriteRouter()

export const registerMicroApps = (appList, lifeCycle) => {
  setList(appList)
  setMainLifeCycle(lifeCycle)
}

// 启动微前端框架
export const start = () => {
  // 首先验证当前子应用列表是否为空
  const apps = getList()
  if (!apps.length) {
    // 子应用列表为空
    console.error('子应用列表为空，请正确注册！')
    return;
  }

  // 有子应用的内容，查找到符合当前路由的子应用
  const app = currentApp()
  if (app) {
    const {pathname, hash} = window.location
    const url = pathname + hash
    window.__CURRENT_SUB_APP__ = app.activeRule
    window.history.pushState('', '', url) // 主要是为了触发turnApp方法
  }

  // 预加载：加载接下来的所有子应用，但是不显示
  prefetch()
}
