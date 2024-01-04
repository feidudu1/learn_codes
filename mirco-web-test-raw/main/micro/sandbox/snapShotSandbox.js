// 快照沙箱
// 应用场景：比较老版本的浏览器，以下写法比较耗性能，因为window本来就有n多属性
export class SnapShotSandbox {
  constructor() {
    // 1、代理对象
    this.proxy = window
    // 创建一个沙箱快照
    this.snapshot = new Map()
    this.active()
  }
  // 沙箱激活
  // 将window上的已经有的变量暂存在snapShot里
  // 之后子应用的window的变量直接使用window
  active() {
    // 遍历全局环境
    for (const key in window) {
      this.snapshot[key] = window[key]
    }
  }
  // 沙箱销毁
  // 销毁子应用时调用，将子应用的window上的变量保存到真实window上
  inactive() {
    for (const key in window) {
      // TODO: 这里是否存在后加载的子应用的全局变量改写掉前面加载的子应用的同名变量的情况？
      if (window[key] !== this.snapshot[key]) {
        // 还原操作
        window[key] = this.snapshot[key]
        
      }
    }
  }
}