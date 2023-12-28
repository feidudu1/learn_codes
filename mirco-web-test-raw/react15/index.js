import React from 'react'
import ReactDOM from 'react-dom'
import BasicMap from './src/router/index.jsx';
import "./index.scss"
import { setMain } from './src/utils/global'

const render = () => {
  ReactDOM.render((
    <BasicMap />
  ), document.getElementById('app-react'))
}

if (!window.__MICRO_WEB__) {
  render()
}

/**
 * 微前端环境
 */
export async function bootstrap() {
  console.log('react bootstrap')
}

export async function mount(app) {
  setMain(app) // 记录主应用传过来的方法
  console.log('react mount')
  render()
}

export async function unmount(ctx) {
  console.log('react unmout')
  // ReactDOM.render 返回的不是对象，所以卸载时只能将容器里的内容清空
  const { container } = ctx
  if (container) {
    document.querySelector(container).innerHTML = ''
  }
}
