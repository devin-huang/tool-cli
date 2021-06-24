// 自动执行Node 命令
const spawn = require('cross-spawn')

const install = async ({ cwd, package }) =>
  new Promise((resolve, reject) => {
    // 依赖安装指定版本--save-exact
    const args = ['install', '--save', '--save-exact', '--loglevel', 'error']

    const child = spawn(package, args, {
      cwd,
      stdio: ['pipe', process.stdout, process.stderr],
    })
    child.once('close', (code) => {
      if (code !== 0) {
        reject({
          command: `${package} ${args.join(' ')}`,
        })
        return
      }
      resolve()
    })
    child.once('error', reject)
  })

module.exports = install
