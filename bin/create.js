const fs = require('fs')
const path = require('path')
const util = require('util')
// 显示Loading效果
const ora = require('ora')
// chalk 输出字体样式
const chalk = require('chalk')
// 命令行交互式界面
const inquirer = require('inquirer')
const download = require('../utils/downloadGitRepo')
const install = require('../utils/install')
// 把异步回调方法改成返回 Promise 实例的方法
const promise = util.promisify(fs.stat)

const { PROJECT, PACKAGE } = require('../utils/constants')

const init = async (projectName) => {
	let projectExist = await promise(projectName).catch((error) => {
		if (error.code !== 'ENOENT') {
			console.log(chalk.redBright.bold(error))
		}
	})
	// 文件已存在
	if (projectExist) {
		return console.log(chalk.redBright.bold('Fail, The file has exited！'))
	}

	// 接收用户命令
	inquirer
		.prompt([
			{
				name: 'description',
				message: 'Please enter the project description',
			},
			{
				name: 'author',
				message: 'Please enter the project author',
			},
			{
				type: 'list',
				name: 'module',
				message: 'select the develop module',
				choices: Object.values(PROJECT),
			},
			{
				type: 'list',
				name: 'package',
				message: 'select the package management',
				choices: PACKAGE,
			},
		])
		.then((answer) => {
			let loading = ora('downloading template...')
			loading.start()
			loading.color = 'yellow'

			// 创建文件并下载指定模板
			download(projectName, answer.module)
				.then(async () => {
					// 关闭loading并获取下载模板后的package.json
					loading.succeed()
					const fileName = `${projectName}/package.json`

					if (await promise(fileName)) {
						// 读取package.json基本信息
						const json = JSON.parse(fs.readFileSync(fileName).toString())
						json.name = projectName
						json.description = answer.description
						json.author = answer.author

						// 更新package.json
						fs.writeFileSync(fileName, JSON.stringify(json, null, '\t', 'utf-8'))
						console.log(chalk.green('Project initialization finished!'))
						console.log('\n')
						console.log(chalk.yellowBright('start install dependencies...'))

						// 安装依赖
						const cwd = path.join(process.cwd(), projectName)
						const package = answer.package
						await install({
							cwd,
							package,
						}).then(() => {
							console.log('We suggest that you begin by typing:')
							console.log('\n')
							console.log(chalk.cyan(`cd ${projectName}`))
							console.log(`${chalk.cyan(`${answer.package} start`)} or ${chalk.cyan(`${answer.package} run serve`)}`)
							console.log('\n')
						})
					}
				})
				.finally(() => loading.succeed())
		})
}

module.exports = init
