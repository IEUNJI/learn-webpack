const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: 'development',
  // mode: 'production',
  optimization: { // 放优化的内容
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true, // 开启多进程并行压缩
        cache: true, // 开启缓存
      }),
      new OptimizeCSSAssetsWebpackPlugin()
    ]
  },
  entry: {
    index: './src/index.js',
    // login: './src/login.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash:8].js', // hash指的是每次构建时产生的哈希值
    publicPath: '/', // 会拼接在模块路径的前面。默认是空字符串，即相对路径
  },
  devtool: 'source-map', // 最完美的映射，但是每次编译不能缓存，需要重新生成，所以只适用于生产 //# sourceMappingURL=index.0afd008e.js.map
  // devtool: 'cheap-module-source-map', // 在source-map基础上，去掉了列信息，但还是源码
  // devtool: 'eval', // 最好的性能，可以缓存，但是只能映射到每个模块`编译后`的代码 //# sourceURL=webpack:///./src/index.js?
  // devtool: 'none', // 调试时看不到源代码
  // sourceMap文件对映规则，VLQ编码：http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html
  devServer: {
    port: 8080,
    compress: true, // gzip压缩等
    contentBase: path.resolve(__dirname, 'dist'), // 将dist目录作为服务目录
  },
  module: {
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
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      // 这个hash是在文件名后面加上查询字符串
      hash: true, // <script src="index.cd10f204.bundle.js?cd10f2049f1e19ddd144"></script>
      // chunks: ['login', 'index'], // 指定引入html中的入口文件
      // chunksSortMode: 'manual', // 手动排序，对引入的代码块进行排序
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // 为css指定文件夹
      filename: 'css/[name].[contenthash:8].css', // name是chunk的名字
      // chunkFilename: '[id].css', // 在异步加载时使用id
    }),
  ]
};

/**
 * hash 代表本次的编译，每当编译一次，hash值都会变，所有的产出的资源，hash都一样
 * chunkhash 代码块的hash，一般来说，每个entry都会产出一个chunk，chunk代表一组模块
 * 比如index.js引入了index.css，如果js变了，那整个chunk就变了，css的也会跟着变化
 * contenthash 则是模块本身的hash，即使chunk变了，我这个小模块没变，hash就不变
 *
 * 总体来说这3个hash的范围越来越小了
 */
