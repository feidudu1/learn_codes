import {findAppByRoute} from '../utils'
import { getMainLifeCycle } from '../const/mainLifeCycle'
import { loadHtml } from '../loader'

export const lifeCycle = async () => {
  // 获取到上一个子应用
  const prevApp = findAppByRoute(window.__ORIGIN_APP__)

  // 获取到要跳转到的子应用
  const nextApp = findAppByRoute(window.__CURRENT_APP__)

  if (!nextApp) {
    return
  }
  if (prevApp && prevApp.destoryed) {
    await destoryed(prevApp)
  }
  const app = beforeLoad(nextApp)

  await mounted(app)
}

export const beforeLoad = async (app) => {
  await runMainLifeCyle('beforeLoad')
  app && app.beforeLoad && app.beforeLoad()

  // 获取子应用需要显示的内容
  const subApp = await loadHtml(app) // 获取的是子应用的内容
  console.log('----------------', `子应用${app.name}加载完成`);
  subApp && subApp.beforeLoad && subApp.beforeLoad()
  return subApp
}

export const mounted = async (app) => {
  app && app.mounted && app.mounted()
  await runMainLifeCyle('mounted')
}

export const destoryed = async (app) => {
  app && app.destoryed && app.destoryed()
  // 对应的执行下主应用的生命周期
  await runMainLifeCyle('destoryed')
}

export const runMainLifeCyle = async (type) => {
  const mainLife = getMainLifeCycle()
  await Promise.all(mainLife[type].map(async item => await item()))
}