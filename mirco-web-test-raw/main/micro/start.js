import {setList, getList} from './const/subApps'
import {rewriteRouter} from './router/rewriteRouter'
import { currentApp } from './utils'
import {setMainLifeCycle} from './const/mainLifeCycle'

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
}
