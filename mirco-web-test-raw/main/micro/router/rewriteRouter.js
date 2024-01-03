import {patchRouter} from '../utils'
import {trunApp} from './routerHandle'

export const rewriteRouter = () => {
  window.history.pushState = patchRouter(window.history.pushState, 'micro_push')
  window.history.replaceState = patchRouter(window.history.replaceState, 'micro_replace')
  window.addEventListener('micro_push', () => {
    // console.log(1111);
    // push 会触发replace，然后触发push，所以micro_push和micro_replace都会执行到
    trunApp()
  })
  window.addEventListener('micro_replace', () => {
    // console.log(22222);
    trunApp()
  })

  // 点击浏览器返回触发
  window.onpopstate = function () {
    trunApp()
  }
}
