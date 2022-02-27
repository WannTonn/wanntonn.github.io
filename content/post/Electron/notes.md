---
title: 'Electron学习笔记'
date: 2022-02-14T11:30:45+08:00
draft: false
tags:
  - Electron
image: '/images/Post/Electron/bg.jpg'
---

<!--more-->

## 安装 Electron

### 在项目中想安装 Electron，运行`npm install electron -D` 的时候，一直卡进度条，或者下载十分缓慢，可以尝试以下方法解决。

- Ctrl + c，停止当前安装。
- 到 Electron 的国内镜像去寻找与项目版本一致的二进制镜像包，[地址](https://npm.taobao.org/mirrors/electron/)，这里我将下载当前最新的`17.1.0`版本做示范，[镜像地址](https://registry.npmmirror.com/-/binary/electron/17.1.0/electron-v17.1.0-darwin-x64.zip)。
- 将`electron-v17.1.0-darwin-x64.zip`文件下载完成之后，打开项目，找到`node_modules/electron/`文件夹，将刚才下载好的二进制压缩包文件`electron-v17.1.0-darwin-x64.zip`复制到`node_modules/electron/`下。
- 找到`node_modules/electron/install.js`，打开这个文件进行编辑
- 找到文件第 22 行左右的位置，找到`downloadArtifact`方法，将其注释，具体可以看以下代码
- ```javascript
  /* downloadArtifact({
  version,
  artifactName: 'electron',
  force: process.env.force_no_cache === 'true',
  cacheRoot: process.env.electron_config_cache,
  platform: process.env.npm_config_platform || process.platform,
  arch: process.env.npm_config_arch || process.arch
  }).then(extractFile).catch(err => {
  console.error(err.stack);
  process.exit(1);
  }); */
  const path_ = path.join('electron-v17.1.0-darwin-x64.zip'); // 指定二进制压缩文件路径
  extractFile(path_); // 将二进制压缩文件路径进行解压操作
  ```
- 在控制台敲入以下代码，回车即可完成离线安装。
- ```shell
  node node_modules/electron/install.js
  ```
- 看到`node_modules/electron/dist` 和 `node_modules/electron/path.txt` 就代表安装成功。

## Electron-Store

### 背景（electron-store）

> 项目用的是 Electron 开发，原来数据是放在 Electron（即 Chrome）的 Storage 下，而 APP 需要上线 App Store，所以该应用为沙盒应用，在 App Store 更新的时候，有几率会将 Electron 的 RootPath 下的所有文件覆写，就会导致 Storage 数据丢失，所以采用 Electron-Store 方案，将需要缓存的数据写入磁盘。

### 遇到的问题（electron-store）

- 项目中引用`electron-store`，项目运行起来之后，控制台报错，报错内容`WebContents #1 called ipcRenderer.sendSync() with 'electron-store-get-data' channel without listeners.`
- electro-store 生成的文件存放路径的问题。

### 分析

- 初始化报错是由于...文档没看完，底下有强调要在主进程进行初始化。
- MacOS 上的应用来源分为 App Store 商店下载与打包成`.dmg`镜像的压缩包(解压到 Applications/ 或任意文件夹就可以运行)与打包成 `.pkg`的执行安装的安装包文件 等。App Store 下载的应用都是一个独立的沙盒程序（需要上架到 App Store 就需要打开沙盒）,具体可参考[Apple Store 审核指南](https://developer.apple.com/cn/app-store/review/guidelines/)。言归正传，强调沙盒程序就是因为开启了沙盒之后，程序（Electron）默认的位置(app.getPath('appData'))就会在 `~/Library/Containers/appName/Data/Library/Application Support/appName/`，而非沙盒应用的路径是在`~/Library/Application Support/appName/`。要规避 Electron 应用因为更新导致数据被覆盖，可以利用沙盒下的路径，将数据放置在与`appName`同级。

### 解决方法（electron-store）

- 解决初始化报错。在主进程中代码写入以下初始化代码
- ```javascript
  // main.js
  const ElectronStore = require('electron-store');
  ElectronStore.initRenderer();
  ```

- 修改 electron-store 文件存放路径
- ```javascript
  // 初始化store的时候，修改cwd字段的配置
  import Store from 'electron-store';
  import path from 'path';

  const store = new Store({
    cwd: path.join(
      '/Users/mac/Library/Containers/appName/Data/Library/Application Support/',
      'appData'
    ), // 这里需要以实际在main.js 中获取到的path为准（app.getPath('appData')）;
    name: 'cacheData', // 重新命名配置文件名字，自行修改
  });
  ```


