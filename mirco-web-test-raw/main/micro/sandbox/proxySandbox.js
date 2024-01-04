// 子应用的沙箱容器
let defaultValue = {}

/**
 * 代理沙箱
 */
export class ProxySandbox {
  constructor() {
    // 1、代理对象
    this.proxy = null
    this.active()
  }
  /**
   * 沙箱激活
   * 不像快照沙箱一样都直接挂载到window上
   */
  active() {
    this.proxy = new Proxy(window, {
      // 这里的target是window
      get(target, key) {
        if (typeof target[key] === 'function') {
          return target[key].bind(target)
        }
        return defaultValue[key] || target[key]
      },
      set(target, key, value) {
        defaultValue[key] = value
        return true
      }
    })
  }
  // 沙箱销毁
  inactive() {
    defaultValue = {}
  }
}
