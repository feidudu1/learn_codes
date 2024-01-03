import {registerMicroApps, start} from '../../micro'
import {loading} from '../store'

export const registerApp = (list) => {
  // 注册到微前端框架里
  registerMicroApps(list, {
    beforeLoad: 
      [() => {
        loading.changeLoading(true)
        console.log('主应用开始加载')
      }]
    ,
    mounted: 
      [() => {
        loading.changeLoading(false)
        console.log('主应用渲染完成')
      }]
    ,
    destoryed: 
      [() => {
        console.log('主应用卸载完成')
      }]
    
  })
  // 开启微前端框架
  start()
}