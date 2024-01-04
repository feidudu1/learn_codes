import {registerMicroApps, start} from '../../micro'
import {loading} from '../store'

export const registerApp = (list) => {
  // 注册到微前端框架里
  registerMicroApps(list, {
    beforeLoad: 
      [() => {
        loading.changeLoading(true)
        console.log('========= 主应用 beforeLoad')
      }]
    ,
    mounted: 
      [() => {
        loading.changeLoading(false)
        console.log('========= 主应用 mounted')
      }]
    ,
    destoryed: 
      [() => {
        console.log('========= 主应用 destoryed')
      }]
    
  })
  // 开启微前端框架
  start()
}