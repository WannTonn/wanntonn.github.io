---
title: "pnpm - 遇到的问题与解决方案"
date: 2022-10-17T13:35:24+08:00
draft: false
tags:
 - MacOS
image: '/images/Code/javascript.png'
---

前言：在使用 React + antd@latest 开发时，遇到了缺少 'rc-table' 之类的报错

<!--more-->
症状：在node_modules下，确实没有rc-* 相关的依赖。

解决方案：
在执行 pnpm install的时候， 加一串配置参数 `--shamefully-hoist`，安装完毕后，重启vscode即可
