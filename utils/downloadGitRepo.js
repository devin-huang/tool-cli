const downloadGitRepo = require('download-git-repo')
const { BASE_PATH, LIBRARY } = require('./constants')

const download = (fileName, module) => {
	//根据api地址下载对应的Github库
	const api = BASE_PATH + LIBRARY[module]

	return new Promise((resolve, reject) => {
		downloadGitRepo(api, fileName, (error) => {
			if (error) {
				reject(error)
			}
			resolve()
		})
	})
}
module.exports = download
