import {registerMicroApps, start, createStore} from '../../micro'
import {loading} from '../store'


/**
 * 全局store创建，可用于子应用调用
 */
const store = createStore()
const storeData =  store.getStore()
store.subscribe((newVal, oldVal) => {
  console.log('订阅回调函数', newVal, oldVal);
})
store.update({
  ...storeData,
  a: 1
})
window.store = store

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