import React from 'react';
import $ from 'jquery';

console.log('login.js');

/**
 * @babel/cli babel 命令行工具
 * 
 * babel本身对类语法，箭头函数，生成器函数，async函数做语法转换
 * 
 * core-js和regenerator-runtime则是对api，promise，重写了生成器运行时的转换
 * 
 * 默认这些api是重写全局的，污染了全局变量
 * 
 * 如何解决污染全局变量的问题呢？答案就是runtime
 * 首先需要引入运行时依赖：@babel/runtime-corejs3 和 @babel/runtime
 * 前者是针对core-js@3 的辅助函数的包
 * 后者是针对一些语法的辅助函数的包和生成器函数的辅助包
 * 需要使用@babel/plugin-transform-runtime插件
 * 将原本的内联函数（体积大）（语法类的辅助函数），污染全局的corejs（api类的）
 * 改造成内联（不污染全局）且（引入外部的包，体积小）
 * 只需要 ["@babel/plugin-transform-runtime", { "corejs": 3 }] 即可
 * 
    babel 要排除node_modules文件夹，否则会出问题
 * 
 * 关于类属性的插件：
 * 之前是松散模式loose true
 * 现在是：
 * "assumptions": {
    "setPublicClassFields": true
  }
  松散模式是定义属性和方法时直接赋值，而不是使用Object.defineProperty
 */