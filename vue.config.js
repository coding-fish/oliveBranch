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
	// 静态资源存放的文件夹(相对于outputDir)
	assetsDir: "static",
	// eslint-loader 是否在保存的时候检查(果断不用，这玩意儿我都没装)
	lintOnSave:false,
	// 我用的only，打包后小些
	runtimeCompiler: false,
	productionSourceMap: true, // 不需要生产环境的设置false可以减小dist文件大小，加速构建

	devServer: {
		// open: true,
		// host: 'localhost',
		port: 8081,
		// https: false,
		//以上的ip和端口是我们本机的;下面为需要跨域的
		proxy: {  //配置跨域
			// serve时下面这行要注释掉
			// publicPath: process.env.NODE_ENV === 'production'? './': '/',

			'/apis': {
				target: 'http://47.95.233.29:9000/apis',  // target后面的/apis有没有都能用
				ws: true,
				changeOrigin: true,  //允许跨域
				secure: false,// 允许运行在 HTTPS 上，且使用了无效证书的后端服务器
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