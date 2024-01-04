// 执行js脚本
// 有 new Function 和 eval两种处理方式
export const performScript = (script, appName, global) => {
  /**
   * 1、eval
   * library window.appName
   */
  // const scriptText = `
  //   () => {
  //     ${script}
  //     return window['${appName}']
  //   }
  // `

// 因为使用proxySandbox代替了snapShotSandbox，所以上面return window[appname]会有问题，应该改为下面这样
  window.proxy = global
  const scriptText = `
    ((window) => {
      ${script}
      return window['${appName}']
    })(window.proxy)
  `
 return eval(scriptText)

  /**
   * 2、new Function
   */
  // const scriptText = `
  //     ${script}
  //     return window['${appName}']
  // `

  // 因为使用proxySandbox代替了snapShotSandbox，所以上面return window[appname]会有问题，应该改为下面这样
  // window.proxy = global
  // const scriptText = `
  //   return ((window) => {
  //     ${script}
  //     return window['${appName}']
  //   })(window.proxy)
  // `
  // return new Function(scriptText).call(global, global)
}