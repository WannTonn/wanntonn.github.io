---
title: '解决react-router-dom创建router后刷新页面404的问题'
date: 2023-02-08T08:30:24+08:00
draft: false
tags:
 - Code
 - React
image: '/images/Code/react.jpg'
---
<!-- more -->
使用BrowserRouter创建路由，并且进行页面跳转后，刷新页面或直接输入路由的path，会出现Cannot GET /test 的情况。

原因：使用browserHistory时，会创建真实的URL，在路由跳转之后，刷新页面就会出现404的情况

解决方法： 
  - 修改 webpack.config.js ，配置devServer字段
    ```javascript
    // webpack.config.js
    export default {
      output: {
        publicPath: '/'
      },
      devServer {
        historyApiFallback: true
      }
      // 这里的路径对应 output.publicPath的值, 如果output.publicPath有修改过值，则需要配置以下字段,此处我保留output.publicPath默认配置，就没有打开以下配置
      // historyApiFallback: {
      //  index: '/'
      // },
    }
    ```

