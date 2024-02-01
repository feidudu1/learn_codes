#! /usr/bin/env node

const importLocal = require('import-local');
/** 
 * __filename：当前文件名称及其完成路径，上面执行require就会有的，类似__dirname等
 * /Users/yafei/learn/learn_codes/h5editor/imooc-cli-dev/core/cli/bin/index.js
*/
if (importLocal(__filename)) {
  require('npmlog').info('cli', '正在使用 imooc-cli-dev 本地版本');
} else {
  const a = process.argv.slice(2)
  require('../lib')(a);
}
