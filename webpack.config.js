const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  // mode: 'production',
  entry: {
    index: './src/index.js',
    login: './src/login.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:8].bundle.js', // hash指的是每次构建时产生的哈希值
    publicPath: '/', // 会拼接在模块路径的前面。默认是空字符串，即相对路径
  },
  devServer: {
    port: 8080,
    compress: true, // gzip压缩等
    contentBase: path.resolve(__dirname, 'dist'), // 将dist目录作为服务目录
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // css-loader 处理css文件中的url路径（是借助file-loader处理的）
        // style-loader 将样式内容作为style标签插入到html head中
        // use: ['style-loader', 'css-loader'],
        use: [MiniCssExtractPlugin.loader, 'css-loader'], // 抽取css，同时需要配置插件，指定文件名
      },
      {
        test: /\.(jpg|png|gif|jpeg|svg)$/,
        // url-loader 是对file-loader的增强（基于file-loader），可以转换文件为base64
        // 写url-loader就不用写file-loader了
        use: {
          loader: 'url-loader',
          options: {
            limit: 100 * 1000
          }
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      // 这个hash是在文件名后面加上查询字符串
      hash: true, // <script src="index.cd10f204.bundle.js?cd10f2049f1e19ddd144"></script>
      chunks: ['login', 'index'], // 指定引入html中的入口文件
      chunksSortMode: 'manual', // 手动排序，对引入的代码块进行排序
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css', // name是chunk的名字
      chunkFilename: '[id].css', // 在异步加载时使用id
    }),
  ]
};
