//后处理css, 优化css, 自动添加css浏览器前缀
const autoprefixer = require('autoprefixer')

module.exports = {
	plugs: [
		autoprefixer()
	]
}