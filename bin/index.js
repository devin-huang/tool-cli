#!/usr/bin/env node

const commander = require('commander')
const program = new commander.Command()
const create = require('./create')
const { VERSION } = require('../utils/constants')

// 输入规定命令，<projectName> 代表创建文件名称
program
	.command('create <projectName>')
	.description('tool-cli init')
	.action(() => {
		// 执行命令成功回调处理
		create(...process.argv.slice(3))
	})

// cli版本号查看，如：project-cli -v
program.version(VERSION, '-v --version')
program.parse(process.argv)
