import { fetchResource } from "../utils/fetchResource"
import { sandBox } from "../sandbox"

// 加载html的方法
export const loadHtml = async (app) => {
  /**
   * entry 子应用的入口
   * container 子应用需要显示在哪里
   */
  const {container, entry} = app
  // 1、加载和解析子应用内容
  const [dom, scripts] = await parseHtml(entry)
  // 2、子应用显示
  const ctx = document.querySelector(container)
  if (!ctx) {
    throw new Error('容器不存在，请查看！')
  }
  ctx.innerHTML = dom
  scripts.forEach(item => {
    sandBox(app, item)
  })
  // 这里返回的app已经通过 sandBox 挂载上了生命周期如 mount 等
  return app
}

const parseHtml = async (entry) => {
  // 这里加载的html是字符串形式，还原成html如文件./demohtml.html所示
  const html = await fetchResource(entry)  
  // 这里的html包含了标签、link、script(src,js)等
  // 下面需要对其进行处理
  let allScript = []
  // 去掉html的 DOCTYPE、html、head 标签
  const div = document.createElement('div')
  div.innerHTML = html
  const [dom, scriptUrl, script] = await getResources(div, entry) // 这里的 dom 为 div.outerHTML
  const fetchedScripts = await Promise.all(scriptUrl.map(async item => await fetchResource(item)))
  allScript = script.concat(fetchedScripts)
  return [dom, allScript]
}

const getResources = async (root, entry) => {
  const scriptUrl = [] // 通过url获取脚本
  const script = [] // 直接编写的脚本
  const dom = root.outerHTML

  // 深度解析
  function deepParse(element) {
    const {children, parent} = element
    // 1、处理位于script中的内容
    if (element.nodeName.toLowerCase() === 'script') {
      const src = element.getAttribute('src')
      if (!src) {
        script.push(element.outerHTML)
      } else {
        if(src.startsWith('http')) {
          scriptUrl.push(src)
        } else {
          scriptUrl.push(`http:${entry}/${src}`)
        }
      }

      if (parent) {
        parent.replaceChild(document.createComment('此js文件已经被微前端替换，可以看下源码什么时候会存在parent！'), element)
      }
    }
    // 2、link 也会有js内容
    if (element.nodeName.toLowerCase() === 'link') {
      const href = element.getAttribute('href')
      if (href.endsWith('.js')) {
        if(href.startsWith('http')) {
          scriptUrl.push(href) 
        } else {
          scriptUrl.push(`http:${entry}/${href}`)
        }
      }
    }

    // 对于每个子元素再处理一遍子子元素
    for (let i = 0; i < children.length; i++) {
      deepParse(children[i])
    }
  }

  deepParse(root)

  return [dom, scriptUrl, script]
}