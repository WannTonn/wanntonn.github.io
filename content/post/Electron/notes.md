---
title: 'Electron学习笔记'
date: 2022-02-14T11:30:45+08:00
draft: false
tags:
  - Electron
image: '/images/Post/Electron/bg.jpg'
---

<!--more-->
### 背景（electron-store）
> 项目用的是Electron开发，原来数据是放在Electron（即Chrome）的Storage下，而APP需要上线App Store，所以该应用为沙盒应用，在App Store更新的时候，有几率会将Electron的RootPath下的所有文件覆写，就会导致数据丢失，所以采用Electron-Store 方案，将需要缓存的数据写入磁盘。
### 遇到的问题（electron-store）
> 项目中引用`electron-store`，项目运行起来之后，控制台报错，报错内容`WebContents #1 called ipcRenderer.sendSync() with 'electron-store-get-data' channel without listeners.`

### 解决方法（electron-store）

- 在主进程中写入以下初始化代码
- ```javascript
  const ElectronStore = require('electron-store');
  ElectronStore.initRenderer();
  ```
