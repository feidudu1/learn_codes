const childProcess = require('child_process')

const spawn = childProcess.spawn
const spawnSync = childProcess.spawnSync

module.exports.runShell = (shell) => {
  // 一旦子进程成功生成，就会触发 'spawn' 事件
  /** 
   * stdio: 子进程的标准输入输出配置
   * shell: 如果是 true，则在 shell 内运行 command
  */
  spawn(shell, { stdio: ['inherit', 'inherit', 'inherit'], shell: true })
}

module.exports.runShellSync = (shell) => {
  spawnSync(shell, { stdio: ['inherit', 'inherit', 'inherit'], shell: true })
}
