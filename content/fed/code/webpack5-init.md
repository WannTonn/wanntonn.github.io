---
title: "当SyntaxError: Cannot use 'import.meta' outside a module的时候，该怎么办"
date: 2023-01-07T23:35:24+08:00
draft: false
---
前言：在初始化webpack5 + React + Typescript项目的时候，遇到了标题上的问题，查了各种方法（例子：在package.json 中将"type"的值改成"module"等）。
<!--more-->

以上方法都不太适用。后来找到了一个方法，如下

```javascript
// webpack.config.js
module.exports = {
  output: {
    // ...省略其他代码
    scriptType: 'text/javascript', // 添加这句
  }
  
}

```
重新执行 `npm run dev`,会有惊喜。