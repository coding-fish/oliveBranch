module.exports = {
	// publicPath:'/',
	// configureWebpack:{
	// 	resolve: {
	// 		alias: {
	// 			'assets': '@/assets',
	// 			'common': '@/common',
	// 			'components': '@/components',
	// 			'network': '@/network',
	// 			'views': '@/views',
	// 			'plugins': '@/plugins',
	// 		}
	// 	}
	// },

	// 公共路径(必须有的)
	publicPath: "./",
	// 输出文件目录
	outputDir: "dist",
	// 静态资源存放的文件夹(相对于ouputDir)
	assetsDir: "static",
	// eslint-loader 是否在保存的时候检查(果断不用，这玩意儿我都没装)
	lintOnSave:false,
	// 我用的only，打包后小些
	runtimeCompiler: false,
	productionSourceMap: true, // 不需要生产环境的设置false可以减小dist文件大小，加速构建

	devServer: {
		// open: true,
		// host: 'localhost',
		// port: 8081,
		// https: false,
		//以上的ip和端口是我们本机的;下面为需要跨域的
		proxy: {  //配置跨域
			'/apis': {
				target: 'http://47.95.233.29:9000/apis/',  //这里后台的地址模拟的;应该填写你们真实的后台接口
				ws: true,
				changOrigin: true,  //允许跨域
				pathRewrite: {
					'^/apis': ''  //请求的时候使用这个api就可以
				}
			}
		},
	},
	pwa: {
		iconPaths: {
			favicon32: 'favicon.ico',
			favicon16: 'favicon.ico',
			appleTouchIcon: 'favicon.ico',
			maskIcon: 'favicon.ico',
			msTileImage: 'favicon.ico'
		}
	},
}