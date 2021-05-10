const express = require('express');
const app = express();

// 这样比直接webpack dev server 更灵活，可以在前面加一些账号登录的逻辑

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config');
const webpack = require('webpack');

// 代表整个编译对象
const compiler = webpack(webpackConfig);
// 中间件里到底做了什么？
// 1. 启动编译 compiler.run
// 2. 使用一个中间件，用来响应客户端对打包后的文件的请求，就是静态资源服务
app.use(webpackDevMiddleware(compiler, {}));

app.get('/users', (req, res) => {
  console.log('收到请求');
  res.json([
     { id: 0, name: 'express' }
  ]);
});

app.listen(5000, () => {
  console.log('监听5000端口');
});
