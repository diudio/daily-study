/*
    webpack.json 文件中, cross-env 是为了在不同的操作系统平台上统一启动命令,而不用设置多个启动命令
    将库代码和业务代码拆分开来, 以便浏览器打包
*/

const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ExtractPlugin=require('extract-text-webpack-plugin')   //单独打包css 


const isDev = process.env.NODE_ENV === 'development'

const config = {
    target: 'web',  //webpack编译目标 web平台
    //将entry文件编译输出到output文件
    entry: path.join(__dirname, 'src/index.js'),
    output: {
    	filename: 'bundle[hash:8].js',		//bundle 翻译为 捆，打包
    	path: path.join(__dirname, 'dist')
    },
    module: {
    	rules: [
    		{
    			test: /\.vue$/,
    			loader: 'vue-loader'
    		},
        {
          test: /\.jsx$/,
          loader: 'babel-loader'
        },
        {
          test: /\.css/,
          use: [  //配置多个loader
            'style-loader', //将css作为一段js代码出现
            'css-loader'   //只读取到内容
          ]
        },
        {
          test: /\.(gif|jpg|jpeg|png|svg)$/,
          use: [  //配置多个loader并为loader配置选项
            {
              loader: 'url-loader',
              options: {
                limit: 1024, //小于1024不单独生成文件
                name: '[name]-zwj.[ext]'  //文件名字
              }
            }
          ]
        }
    	]
    },
    plugins:[
        new VueLoaderPlugin(),
        // 给webpack编译过程中, 以及在页面上 都可以访问 process.env.NODE_ENV 这个变量
        // webpack根据此变量进行 开发版本或者 生产版本的打包
        // 开发版本与生产版本不同, 例如开发版本需要一些错误提示
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:isDev?'"development"':'"production"'
            }
        }),
        //生成一个html文件, 并容纳其他js和css文件
        new HTMLPlugin()
    ]
}

if (isDev) {
    config.module.rules.push({
      test:/\.styl/,
      use:[
        'style-loader',
        'css-loader',
        {
          loader:'postcss-loader',  //给css代码添加浏览器兼容性前缀
          options:{
            sourceMap:true, //用stylus-loader生成的sourceMap, 不用再自己去生成sourceMap
          }
        },
        'stylus-loader' //将stylus文件解析为css代码
      ]
    })
    //帮助在页面上调试代码, 调试时看到是是原来的而不是编译后的代码
    config.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
        port: 8000,
        host: '0.0.0.0',   //这样设置可以同时用localhost 和内网访问
       // webpack 编译时出错 显示到网页上
        overlay: {  
            errors: true
        },
       // 启动服务时自动打开浏览器
        // open: true,
       // 把一些未做映射的地址引导到主页
        // historyFallback: {

        // },
        //组件改动后, 只重新渲染该组件, 而不重新渲染整个页面
        hot:true
    };
    config.plugins.push(    //对应上面hot,局部更新组建，不刷新网页
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
} else {
  config.entry = {  //拆分业务代码和库代码
    app: path.join(__dirname, 'src/index.js'), //打包成app.js
    vendor: ['vue'] //库文件
  }
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push(
    {
      test: /\.styl/,
      use: ExtractPlugin.extract({
        fallback: 'style-loader', //将css代码作为标签引入到html
        use:[
          'css-loader',
          {
              loader:'postcss-loader',
              options:{
                  sourceMap:true,
              }
          },
          'stylus-loader'
        ]
      })
    }
  )
  config.plugins.push(
    new ExtractPlugin('styles.[chunkhash:8].css'),  //将styles文件单独打包成css文件
    
    // 提示用 config.optimization.splitChunks
    // new webpack.optimize.CommonsChunkPlugin({ //单独打包vander的配置
    //   name: 'vender'
    // })
  )
  config.optimization = {
      splitChunks: {
          cacheGroups: {                  // 这里开始设置缓存的 chunks
              commons: {
                  chunks: 'initial',      // 必须三选一： "initial" | "all" | "async"(默认就是异步)
                  minSize: 0,             // 最小尺寸，默认0,
                  minChunks: 2,           // 最小 chunk ，默认1
                  maxInitialRequests: 5   // 最大初始化请求书，默认1
              },
              vendor: {
                  test: /node_modules/,   // 正则规则验证，如果符合就提取 chunk
                  chunks: 'initial',      // 必须三选一： "initial" | "all" | "async"(默认就是异步)
                  name: 'vendor',         // 要缓存的 分隔出来的 chunk 名称
                  priority: 10,           // 缓存组优先级
                  enforce: true
              }
          }
      },
      runtimeChunk: true
  }
}

module.exports = config
