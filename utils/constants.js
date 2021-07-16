const VERSION = '1.0.0'

const BASE_PATH = 'devin-huang/'

const PROJECT = {
	vue2: 'vue2',
	vue3: 'vue3',
	react: 'react',
}

const LIBRARY = {
	[PROJECT.vue2]: 'vue2-base',
	[PROJECT.vue3]: 'vue-next-template',
	[PROJECT.react]: 'react',
}

const PACKAGE = ['npm', 'yarn']

module.exports = {
	VERSION,
	BASE_PATH,
	PROJECT,
	LIBRARY,
	PACKAGE,
}
