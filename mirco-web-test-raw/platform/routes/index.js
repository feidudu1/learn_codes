var express = require('express');
var router = express.Router();
const fs = require('fs')
const path = require('path')
const execSync = require('child_process').execSync
const root = path.join(__dirname, '../version')
const initVersion = '1.0.0.0'

/* GET home page. */
router.get('/start', function(req, res, next) {
  let newVersion
  const name = req.query.name
  // 处理版本号
  function changeVersion () {
    const changeUrl = path.join(root, name)
    try{
      let version
      version = fs.readFileSync(changeUrl).toString()
      version = +(version.replace(/\./g, '')) + 1
      newVersion = `${version}`.split('').join('.')
      fs.writeFileSync(changeUrl, newVersion)
    } catch (e) {
      fs.writeFileSync(changeUrl, initVersion)
      changeVersion()
    }
  }
  // 发布打包
  function startBuild() {
    const originPath = path.join(__dirname, '../../', name)
    const originDist = path.join(originPath, '/dist')
    const bagPath = path.join(__dirname, '../bag')

    // 清空当前项目下所有资源
    execSync(`rm -rf ${bagPath}/${name}`)
    // 首先创建项目目录
    execSync(`mkdir -p ${bagPath}/${name}`)

    // TODO:最大包的数量 > 3，则删除最先生成的那个包

    try{
      // 进入项目并执行打包
      execSync(`cd ${originPath} && npm run build`)
    } catch (e) {
      console.log('打包执行错误！！！');
    }

    // 重新创建新的资源包
    // react15和react16的package.json没有配置 npm run build，所以打包会失败
    execSync(`cd ${bagPath} && mkdir -p ./${name}/${newVersion}`)

    const lastDist = path.join(bagPath, `./${name}/${newVersion}`)
    try {
      execSync(`mv ${originDist} ${lastDist}`)
    } catch (e) {
      console.log('移动打包后的文件错误！！！');
    }
  }

  changeVersion()
  startBuild()

  res.send({
    version: newVersion,
  })
});

module.exports = router;
