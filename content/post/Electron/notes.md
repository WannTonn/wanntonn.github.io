---
title: 'Electron学习笔记'
date: 2022-02-14T11:30:45+08:00
draft: false
tags:
  - Electron
image: '/images/Post/Electron/bg.jpg'
---

<!--more-->

> 项目中引用`electron-store`，项目运行起来之后，控制台报错，报错内容`WebContents #1 called ipcRenderer.sendSync() with 'electron-store-get-data' channel without listeners.`
> 解决方法

- 在主进程中写入以下初始化代码
- ```javascript
  const ElectronStore = require('electron-store');
  ElectronStore.initRenderer();
  ```
