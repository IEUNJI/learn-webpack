const path = require('path');
const webpack = require('webpack');
const TerserWebpackPlugin = require('terser-webpack-plugin');

// 要实现一个库
// 压缩版 和 非压缩版
// CJS/ESM

module.exports = {
  entry: {
    'ieunji': './lib/index.js',
    'ieunji.min': './lib/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'lib-dist'),
    filename: '[name].js',
    // globalObject: 'this', // 不指定就是默认window
    library: 'ieunji', // 导出库的名字
    // libraryTarget: 'var', // var ieunji = 这样就有全局变量了，全局变量为结果
    // libraryTarget: 'commonjs', // exports["ieunji"] = 导出对象的ieunji属性上是结果
    // libraryTarget: 'commonjs2', // module.exports = 导出对象上是结果
    // libraryTarget: 'this', // this["ieunji"] =
    // libraryTarget: 'window', // window["ieunji"] = 挂在window上
    libraryTarget: 'umd', // umd universal 通用的，cjs esm 都支持
    // 其实umd打包好的文件也不能直接在webpack下引入使用
    // commonjs2只是node，浏览器需要暴露全局变量
    // 所以umd就是兼容node和浏览器（全局）
    // if(typeof exports === 'object' && typeof module === 'object')
		// module.exports = factory(); // commonjs2
    // else if(typeof define === 'function' && define.amd)
		// define([], factory); // amd
    // else if(typeof exports === 'object')
		// exports["ieunji"] = factory(); // commonjs
    // else
		// root["ieunji"] = factory(); // window
    libraryExport: 'default', // 导出哪个属性
    // 如果是 export default 那么写default，如果导出接口 export 则不用写空字符串
    // 如果是 module.exports 也写空字符串，即不用写
  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        include: /\.min.js$/
      })
    ]
  }
};
