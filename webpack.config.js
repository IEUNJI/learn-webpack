const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const PurgecssWebpackPlugin = require('purgecss-webpack-plugin');
const glob = require('glob');
const smp = new SpeedMeasureWebpackPlugin({
  disable: false
});

module.exports = (env, args) => {
  const isDev = env === 'development';

  return smp.wrap({
    // mode会自动向前端文件定义process.env.NODE_ENV变量（DefinePlugin）
    mode: isDev ? 'development' : 'production',
    // mode为开发时不会走这个优化，所以这里就不用判断环境了
    optimization: { // 放优化的内容
      minimizer: [
        new TerserWebpackPlugin({
          parallel: true, // 开启多进程并行压缩
          cache: true, // 开启缓存
        }),
        new OptimizeCSSAssetsWebpackPlugin()
      ],
      // https://segmentfault.com/a/1190000013476837
      // 默认配置即可，all代表异步加载和初始化的都进行抽离
      splitChunks: {
        chunks: 'all',
      }
    },
    // stats: 'normal',
    entry: {
      index: './src/index.js',
      // login: './src/login.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash:8].js', // hash指的是每次构建时产生的哈希值
      chunkFilename: '[name].[contenthash:8].js',
      publicPath: '/', // 会拼接在模块路径的前面。默认是空字符串，即相对路径
    },
    // 定制了一些查找文件的规则
    resolve: {
      // 省略拓展名
      extensions: ['.js', '.jsx', '.json'],
      // 别名
      alias: {
        '@': path.resolve(__dirname, 'src')
      },
      // 可以额外增加依赖目录
      modules: [path.resolve(__dirname, 'my-modules'), 'node_modules']
    },
    // 自定义loader的查找规则时使用
    // resolveLoader: {
    //   modules: ['node_modules'],
    //   extensions: ['.js', '.json'],
    //   mainFields: ['loader', 'main'],
    // },
    devtool: isDev ? 'source-map' : 'none', // 最完美的映射，但是每次编译不能缓存，需要重新生成，所以只适用于生产 //# sourceMappingURL=index.0afd008e.js.map
    // devtool: 'cheap-module-source-map', // 在source-map基础上，去掉了列信息，但还是源码
    // devtool: 'eval', // 最好的性能，可以缓存，但是只能映射到每个模块`编译后`的代码 //# sourceURL=webpack:///./src/index.js?
    // devtool: 'none', // 调试时看不到源代码
    // sourceMap文件对映规则，VLQ编码：http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html
    devServer: {
      port: 8080,
      compress: true, // gzip压缩等
      contentBase: path.resolve(__dirname, 'dist'), // 将dist目录作为服务目录
      // 有后端服务器（不支持跨域），需要proxy代理
      // proxy: {
      //   '/api': {
      //     target: 'http://localhost:3456',
      //     // 路径重写 以/api开头的请求走代理，且重写路径，将/api去掉，因为后端接口没有/api
      //     pathRewrite: {
      //       '^/api': ''
      //     }
      //   }
      // }
      // 没后端服务器，需要前端自己mock数据
      // webpack-dev-server内部就是express服务器
      // before(app) {
      //   app.get('/api/users', (req, res) => {
      //     console.log('收到请求');
      //     res.json([
      //       { id: 0, name: 'webpack' }
      //     ]);
      //   })
      // }
    },
    // 如果想要某些包用cdn引入，但是在使用的时候还是import导入，使用 externals
    // 左边是依赖包名，右边是全局变量
    // 但是这样还需要手动配置cdn，为了更进一步，可以使用这个HtmlWebpackExternalsPlugin插件
    // externals: {
    //   'jquery': 'jQuery',
    //   'lodash': '_',
    //   'react': 'React'
    // },
    module: {
      // noParse: /jquery/,
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader?cacheDirectory',
          exclude: /node_modules/
        },
        {
          test: /\.(css|less)$/,
          // css-loader 处理css文件中的url路径（是借助file-loader处理的）
          // style-loader 将样式内容作为style标签插入到html head中
          // use: ['style-loader', 'css-loader'],
          // 抽取css，同时需要配置插件，指定文件名
          use: [
            MiniCssExtractPlugin.loader,
            // 需要在每个loader都配置sourceMap才生效
            // 当然，如果devtools为none，这里也不会生成sourceMap文件了
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'postcss-loader', options: { sourceMap: true } },
            { loader: 'less-loader', options: { sourceMap: true } },
          ],
        },
        {
          test: /\.(jpg|png|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
          // url-loader 是对file-loader的增强（基于file-loader），可以转换文件为base64
          // 写url-loader就不用写file-loader了
          use: {
            loader: 'url-loader',
            options: {
              limit: 10 * 1000,
              // 自定义图片的名字
              name: '[name].[contenthash:8].[ext]',
              // 图片输出目录
              outputPath: 'images',
              publicPath: '/images', // 其实默认值就是外面的output.publicPath + outputPath
              esModule: false, // 为了支持html-withimg-loader，默认为true，
              // img标签编译为<img src={"default":"/images/logo.75c38761.jpg"} alt="logo">不行
            }
          }
        },
        {
          test: /\.(html|htm)$/,
          // 处理html模板中使用相对路径引入资源的问题
          use: 'html-withimg-loader'
        }
      ]
    },
    plugins: [
      // 不是挂载到window上，而是在每个模块前导入这些依赖
      // 当然是按需引入，模块没用到则不会引
      // new webpack.ProvidePlugin({
      //   _: 'lodash',
      //   $: 'jquery',
      //   React: 'react'
      // }),
      // new webpack.BannerPlugin('ieunji'), // 在打包后的js文件顶部加一个注释
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        // 这个hash是在文件名后面加上查询字符串
        hash: true, // <script src="index.cd10f204.bundle.js?cd10f2049f1e19ddd144"></script>
        // chunks: ['index'], // 指定引入html中的入口文件
        // chunksSortMode: 'manual', // 手动排序，对引入的代码块进行排序
      }),
      // new HtmlWebpackPlugin({
      //   template: './src/login.html',
      //   filename: 'login.html',
      //   hash: true,
      //   chunks: ['login'], // 指定引入html中的入口文件
      //   chunksSortMode: 'manual', // 手动排序，对引入的代码块进行排序
      // }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        // 为css指定文件夹
        filename: 'css/[name].[contenthash:8].css', // name是chunk的名字
        // chunkFilename: '[id].css', // 在异步加载时使用id
      }),
      // 不止扫描css文件，还扫描js文件，对于类名出现过的，则不清理，即使类名和变量名同名了，也不清理
      // 为了安全
      new PurgecssWebpackPlugin({
        paths: glob.sync(`${path.resolve(__dirname, 'src')}/**/*`, { nodir: true })
      }),
      // new CopyWebpackPlugin({
      //   patterns: [
      //     {
      //       from: path.resolve(__dirname, 'src/images'),
      //       to: 'images'
      //     }
      //   ]
      // }),
      // new HtmlWebpackExternalsPlugin({
      //   hash: true, // script标签缓存破坏
      //   // 不管代码里引入没，肯定会被插入script
      //   externals: [
      //     {
      //       module: 'jquery',
      //       // entry: 'https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.js',
      //       // 除了cdn方式，还可以写一个该模块在node_modules中的路径，会自动拷贝到
      //       // /vendor/jquery/dist/jquery.js，然后创建cdn引入
      //       entry: 'dist/jquery.js',
      //       global: 'jQuery',
      //     },
      //     {
      //       module: 'lodash',
      //       // entry: 'https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.js',
      //       entry: 'lodash.js',
      //       global: '_',
      //     },
      //     {
      //       module: 'react',
      //       // entry: 'https://cdn.bootcdn.net/ajax/libs/react/17.0.2/umd/react.development.js',
      //       entry: 'umd/react.development.js',
      //       global: 'React',
      //     },
      //   ]
      // }),
      // 为什么要JSON.stringify ？
      // 因为在前端页面的值都经过了JSON.parse
      // 这些变了并不存在于运行时，而是在编译阶段就被替换成值了
      new webpack.DefinePlugin({
        version: JSON.stringify('1.0'),
        isDev: JSON.stringify(true),
        num: JSON.stringify(2),
        jsonName: JSON.stringify('2.0')
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled', // 不自动打开浏览器
        generateStatsFile: true, // 生成stats.json文件
        // "analyz": "webpack-bundle-analyzer --port 8888 ./dist/stats.json",
        // 使用命令查看打包分析
      }),
    ]
  });
};

/**
 * hash 代表本次的编译，每当编译一次，hash值都会变，所有的产出的资源，hash都一样
 * chunkhash 代码块的hash，一般来说，每个entry都会产出一个chunk，chunk代表一组模块
 * 比如index.js引入了index.css，如果js变了，那整个chunk就变了，css的也会跟着变化
 * contenthash 则是模块本身的hash，即使chunk变了，我这个小模块没变，hash就不变
 *
 * 总体来说这3个hash的范围越来越小了
 */
