import React from 'react'
import "./index.scss"
import ReactDOM from 'react-dom'
import BasicMap from './src/router';
import { setMain } from './src/utils/global'

export const render = () => {
  ReactDOM.render(<BasicMap />, document.getElementById('app-react'))
}

if (!window.__MICRO_WEB__) {
  render()
}

/**
 * 微前端环境
 */

export async function bootstrap() {
  console.log('----', 'react16 bootstrap');
}

export async function mount(app) {
  setMain(app)
  render()
  console.log('----', 'react16 mount');


  // setTimeout(() => {
  //   // 调用隐藏底部方法 false 隐藏  true 显示
  //   app.appInfo.footerState.changeFooter(false)
  //
  //   // 调用隐藏头部方法 false 隐藏  true 显示
  //   app.appInfo.headerState.changeHeader(false)
  // }, 3000)
}

export async function unmount(ctx) {
  console.log('----', 'react16 unmout');
  const { container } = ctx
  if (container) {
    document.querySelector(container).innerHTML = ''
  }
}
