import * as loading from './loading'

// NOTE: 【主子应用通信】把主应用store里的所有状态都传给了微应用-->在生命周期下发到各子应用
import * as appInfo from '../store'

export const navList = [
  {
    name: 'react15',// 唯一
    entry: '//localhost:9002/',
    loading,
    container: '#micro-container',
    activeRule: '/react15',
    appInfo,
  },
  {
    name: 'react16',
    entry: '//localhost:9003/',
    loading,
    container: '#micro-container',
    activeRule: '/react16',
    appInfo,
  },
  {
    name: 'vue2',
    entry: '//localhost:9004/',
    loading,
    container: '#micro-container',
    activeRule: '/vue2',
    appInfo,
  },
  {
    name: 'vue3',
    entry: '//localhost:9005/',
    loading,
    container: '#micro-container',
    activeRule: '/vue3',
    appInfo,
  },
];
