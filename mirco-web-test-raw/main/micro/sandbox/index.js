import {performScript} from '../sandbox/performScrpt'
// import { SnapShotSandbox } from './snapShotSandbox'
import { ProxySandbox } from './proxySandbox'

const checkLifeCycle = (lifecycle) => {
  return lifecycle && lifecycle.bootstrap
  && lifecycle.mount
  && lifecycle.unmount
}

// 子应用生命周期处理和环境变量设置
export const sandBox = (app, scriptItem) => {
  const proxy = new ProxySandbox()
  if (!app.proxy) {
    app.proxy = proxy
  }

  // 1、设置环境变量
  window.__MICRO_WEB__ = true
  // 2、运行js文件
  const lifecycle = performScript(scriptItem, app.name, app.proxy.proxy)
  // 生命周期，挂载到app上
  if (checkLifeCycle(lifecycle)) {
    app.bootstrap = lifecycle.bootstrap
    app.mount = lifecycle.mount
    app.unmount = lifecycle.unmount
  }
}