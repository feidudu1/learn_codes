// 执行js脚本
// 有 new Function 和 eval两种处理方式
export const performScript = (script) => {
  // 1、eval
  eval(script)

  // 2、new Function
  // new Function(script).call(window, window)
}