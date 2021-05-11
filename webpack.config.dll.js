const path = require('path');
const DllPlugin = require('webpack/lib/DllPlugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    react: [
      'react',
      'react-dom'
    ],
    utils: [
      'jquery',
      'lodash'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dll-dist'),
    filename: '[name].dll.js',
    library: '_dll_[name]',
  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true,
      }),
      new OptimizeCSSAssetsWebpackPlugin()
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader?cacheDirectory',
      },
    ]
  },
  plugins: [
    new DllPlugin({
      name: '_dll_[name]',
      path: path.resolve(__dirname, 'dll-dist', '[name].manifest.json'),
    }),
  ]
};
