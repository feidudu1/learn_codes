import {isTurnChild} from '../utils'
import { lifeCycle } from '../lifeCycle'

export const trunApp = async () => {
  if (isTurnChild()) { // 避免多次触发函数
    console.log('路由切换了！')
    // 微前端的生命周期执行
    await lifeCycle()
  }
}