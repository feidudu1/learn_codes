'use strict';

const path = require('path');
const Package = require('@imooc-cli-dev/package');
const log = require('@imooc-cli-dev/log');
const { exec: spawn } = require('@imooc-cli-dev/utils');

const SETTINGS = {
  // init: 'lodash', // 通过npm安装的包，不是 imooc-cli-dev/commands/init包 看安装nodemodules用这个例子，因为@imooc-cli-dev/init暂时还没有发布
  init: '@imooc-cli-dev/init', // 执行 imooc-cli-dev/commands/init包，启动时用本地代码（所以需要给到 targetPath）
};

const CACHE_DIR = 'dependencies';

async function exec() {
  // 1、根据targetPath拿到modulePath，如commonds/init的路径
  let targetPath = process.env.CLI_TARGET_PATH;
  const homePath = process.env.CLI_HOME_PATH;
  let storeDir = '';
  let pkg;
  // imooc-cli-dev init -tp /Users/yafei/learn/learn_codes/h5editor/imooc-cli-dev/commands/init/lib --debug
  log.verbose('targetPath', targetPath); // /Users/yafei/learn/learn_codes/h5editor/imooc-cli-dev/commands/init/lib 
  log.verbose('homePath', homePath); // /Users/yafei/.imooc-cli-dev
  const cmdObj = arguments[arguments.length - 1]; // Command
  const cmdName = cmdObj.name(); // 当前command的名称，如 init
  const packageName = SETTINGS[cmdName];
  const packageVersion = 'latest';
  // 2、根据modulePath安装package包（npm模块）
  if (!targetPath) {
    /** 
     * （1）
    */
    targetPath = path.resolve(homePath, CACHE_DIR); // Note: 生成缓存路径：/Users/yafei/.imooc-cli-dev/dependencies
    storeDir = path.resolve(targetPath, 'node_modules');
    log.verbose('targetPath', targetPath);
    log.verbose('storeDir', storeDir); // /Users/yafei/.imooc-cli-dev/dependencies/node_modules
    pkg = new Package({
      targetPath,
      storeDir,
      packageName,
      packageVersion,
    });
    // 4、Package.updata / Package.
    if (await pkg.exists()) {
      // 更新package
      await pkg.update();
    } else {
      // 安装package
      await pkg.install();
    }
  } else {
    /** 
     * （2）
     * Note: imooc-cli-dev init --debug -tp /Users/yafei/learn/learn_codes/h5editor/imooc-cli-dev/commands/init/lib 
     * 上面这条启动命令才会使安装@imooc-cli-dev/init包时进入到
     * /Users/yafei/learn/learn_codes/h5editor/imooc-cli-dev/commands/init/lib直接使用本地代码，
     * 而不是通过npm安装线上的npm包（线上没有该包，会报错）
    */
    pkg = new Package({
      targetPath, // /Users/yafei/learn/learn_codes/h5editor/imooc-cli-dev/commands/init/lib 
      packageName,
      packageVersion,
    });
  }
  // 3、提供Package.getRootFile（获取入口文件：如package.json中的main和module）
  const rootFile = pkg.getRootFilePath();
  // （1）/Users/yafei/.imooc-cli-dev/dependencies/node_modules/_lodash@4.17.21@lodash/lodash.js
  // （1）/Users/yafei/.imooc-cli-dev/dependencies/node_modules/_init@0.1.2@init/init.js
  // （2）/Users/yafei/learn/learn_codes/h5editor/imooc-cli-dev/commands/init/lib/index.js
  if (rootFile) {
    try {
      /**
       * NOTE: 1、在当前进程中调用，无法充分利用cpu资源
       */
      // require(rootFile).call(null, Array.from(arguments)); 
      /**
       * NOTE: 2、在node子进程中调用 用spawn
       */
      const args = Array.from(arguments);
      const cmd = args[args.length - 1];
      const o = Object.create(null);
      Object.keys(cmd).forEach(key => {
        if (cmd.hasOwnProperty(key) &&
          !key.startsWith('_') &&
          key !== 'parent') {
          o[key] = cmd[key];
        }
      });
      args[args.length - 1] = o;
      /** 
       * args内容：
       * commands: [],
          options: [ {
                      "flags":"-f, --force",
                      "required":false,
                      "optional":false,
                      "variadic":false,
                      "mandatory":false,
                      "short":"-f",
                      "long":"--force",
                      "negate":false,
                      "description":"是否强制初始化项目"
                    }],
          rawArgs: null,
          force: true,
          args: [ 'demo-project' ]
      */
      const execCode = `require('${rootFile}').call(null, ${JSON.stringify(args)})`; // rootFile的引号不能去掉？
      // Note：这里的spawn封装了对windows的兼容
      const child = spawn('node', ['-e', execCode], { // -e 代表 "evaluate"。这个选项后面跟着的 js 代码将被立即执行
        cwd: process.cwd(), // /Users/yafei/learn/learn_codes/h5editor/imooc-cli-dev ？？在不同文件启动都不一样
        stdio: 'inherit', // 默认是pipe，用inherit后，可以直接打印结果，而不用监听（即不用下面的on）。不要这里的话，子进程里面的打印不能打印
      });
      child.on('error', e => {
        log.error(e.message);
        process.exit(1);
      });
      child.on('exit', e => {
        log.verbose('命令执行成功:' + e);
        process.exit(e);
      });
    } catch (e) {
      log.error('执行命令过程中有错误：',e.message);
    }
  }
}

module.exports = exec;
