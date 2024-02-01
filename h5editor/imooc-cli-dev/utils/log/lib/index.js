'use strict';

const log = require('npmlog');

// 只用imooc-cli-dev时process.env.LOG_LEVEL的值为undefined，所以为info模式，不能打印log.verbose
log.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info'; // 判断debug模式

log.heading = 'imooc'; // 修改前缀
log.addLevel('success', 2000, { fg: 'green', bold: true }); // 添加自定义命令

// test
// log.info('cli', 'test')
// log.verbose('error hi')

module.exports = log;
