---
title: '自己搭建一个Electron + React + umi 的通用模板'
date: 2022-03-06T11:30:45+08:00
draft: false
tags:
  - Electron
image: '/images/Post/Electron/bg.jpg'
---

> 前言：想自己构建一个通用模板。减去重复开发工作，并且可以在其中学习到更多知识。

<!--more-->

[先上链接](https://github.com/WannTonn/electron-umi-template?_blank)
<a href="https://github.com/WannTonn/electron-umi-template" target="_blank">先上链接</a>
### 使用 Umi 创建 React 项目(此处为 MacOS 环境)

```bash
$ mkdir umi-demo  # 创建umi-demo文件夹
$ cd umi-demo # 到umi-demo 文件夹下
$ yarn create umi # 用yarn 创建umi项目, yarn的安装方法此处不做讨论

$ [1/4] 🔍  Resolving packages...
warning create-umi > sylvanas > @umijs/fabric > stylelint > @stylelint/postcss-markdown@0.36.2: Use the original unforked package instead: postcss-markdown
warning create-umi > yeoman-environment > globby > fast-glob > micromatch > snapdragon > source-map-resolve@0.5.3: See https://github.com/lydell/source-map-resolve#deprecated
warning create-umi > yeoman-environment > globby > fast-glob > micromatch > snapdragon > source-map-resolve > resolve-url@0.2.1: https://github.com/lydell/resolve-url#deprecated
warning create-umi > yeoman-environment > globby > fast-glob > micromatch > snapdragon > source-map-resolve > urix@0.1.0: Please see https://github.com/lydell/urix#deprecated
warning create-umi > yeoman-environment > globby > fast-glob > micromatch > snapdragon > source-map-resolve > source-map-url@0.4.1: See https://github.com/lydell/source-map-url#deprecated
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 🔨  Building fresh packages...
success Installed "create-umi@0.27.0" with binaries:
      - create-umi

$ ? Select the boilerplate type app   # 选择模板，此处选择了普通app模板
? Do you want to use typescript? Yes  # 启用typescript
? What functionality do you want to enable? # 此处选择antd
   create package.json
   create src/assets/yay.jpg
   create .gitignore
   create .editorconfig
   create .env
   create .eslintrc
   create .prettierignore
   create .prettierrc
   create .umirc.ts
   create mock/.gitkeep
   create src/global.css
   create src/layouts/__tests__/index.test.tsx
   create src/layouts/index.css
   create src/layouts/index.tsx
   create src/pages/__tests__/index.test.tsx
   create src/pages/index.css
   create src/pages/index.tsx
   create tsconfig.json
   create typings.d.ts
✨ File Generate Done
✨  Done in 74.72s.
```

### 安装依赖与运行项目

```bash
$ yarn
yarn install v1.22.17
info No lockfile found.
[1/5] 🔍  Validating package.json...
[2/5] 🔍  Resolving packages...
warning babel-eslint@9.0.0: babel-eslint is now @babel/eslint-parser. This package will no longer receive updates.
...此处省略N行
[5/5] 🔨  Building fresh packages...
success Saved lockfile.
✨  Done in 89.98s.

$ yarn start
yarn run v1.22.17
$ umi dev

✔ Webpack
  Compiled successfully in 3.56s

Starting the development server...

 DONE  Compiled successfully in 3566ms


  App running at:
  - Local:   http://localhost:8000/ (copied to clipboard)
  - Network: http://10.100.8.41:8000/

 WAIT  Compiling...


✔ Webpack
  Compiled successfully in 166.94ms

 DONE  Compiled successfully in 168ms
```

这里 umi 项目就已经安装并成功运行了。

### 准备安装 Electron

> 在安装 Electron 之前，先调整项目的目录，这里分析一下为什么要调整项目的目录以及操作以下动作。
>
> 1. 为了优化 Electron 的安装包的体积，

1. 按下 `ctrl + c` ,先停止本地服务
2. 在项目根目录创建 `renderer` 文件夹(可以理解为 Electron 中的渲染进程)
3. 将刚刚生成的所有文件(`.gitignore`文件除外)移动到`renderer`文件夹下。
4. 在项目中创建`main`文件夹(Electron 项目的主进程)
5. 在项目根目录创建`index.js`
6. 在终端输入以下指令

```bash
  $ npm init (初始化项目，用于安装Electron，根据需要初始化)
```

#### 安装 Electron

```bash
$ yarn add electron -D
```

#### 配置`main/main.js` 主进程内容

<details><summary>点击查看</summary>
<p>

```javascript
const {
  app,
  BrowserWindow,
  ipcMain,
  nativeTheme,
  Menu,
  MenuItem,
  Notification,
  globalShortcut,
  webContents,
  ipcRenderer,
} = require('electron');
const path = require('path');
const isMac = process.platform === 'darwin'; // 如果是MacOS
const isWin = process.platform === 'win32'; // 如果是Windows
const isDev = process.env.NODE_ENV === 'development';
const getRootPath = require('../rootPath');
let windowIdMap = {};
/**
 * @description 初始化创建窗口
 * @param name 窗口的名称
 */
function createWindow(name, option) {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      webviewTag: true,
      enableRemoteModule: true,
      preload: path.join(getRootPath(), 'static', 'electron-preload.js'),
    },
  });
  windowIdMap[name] = mainWindow.webContents.id; // 将窗口名称设置到map
  if (isDev) {
    mainWindow.loadURL('http://localhost:8000');
  } else {
    mainWindow.loadFile(path.join(getRootPath(), '/dist/index.html'));
  }
  mainWindow.webContents.openDevTools();
}
/**
 * @description 配置菜单,需要开启的话就将注释去掉，修改内容
 */
/* const menu = new Menu();
menu.append(new MenuItem({
  submenu: [{
    label: '退出',
    role: 'quit',
    accelerator: isMac ? 'Cmd+Q' : 'Alt+F4',
    click: () => { console.log('close app'); }
  }, {
    label: '老板键',
    role: 'hide',
    accelerator: isMac ? 'Cmd+H' : 'Win+D'
  }]
})); */
// Menu.setApplicationMenu(menu);

/**
 * @description 弹一个通知
 */
function showNotification() {
  const NOTICE_TITLE = '成功初始化';
  const NOTICE_CONTENT = '恭喜初始化成功';
  new Notification({ title: NOTICE_TITLE, body: NOTICE_CONTENT }).show();
}

/**
 * @description 当是MacOS的时候
 */
// 切换暗黑模式
if (isMac) {
  ipcMain.handle('dark-mode:toggle', () => {
    nativeTheme.themeSource = nativeTheme.shouldUseDarkColors ? 'light' : 'dark';
    return nativeTheme.shouldUseDarkColors;
  });
  ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system';
  });
}

/**
 * @description 绑定主进程响应渲染进程的通信
 */
ipcMain.on('login', (e, opt) => {
  let { msg, callback } = opt;
  console.log(msg, callback, opt);
  callback?.();
});

ipcMain.handle('toMain', (callBack) => {
  callBack?.();
  return '我是main窗口，create window success';
});

/**
 * @description 当electron初始化完成的时候
 */
app
  .whenReady()
  .then(async () => {
    globalShortcut.register('F12', () => {
      webContents.fromId(windowIdMap['default'])?.openDevTools();
    });
    createWindow('default');
  })
  .then(() => {
    isMac && showNotification();
  });
/**
 * @description 当没有窗口打开时，则打开一个新窗口（MacOS）
 */
app.on('activate', function () {
  if (!BrowserWindow.getAllWindows().length) createWindow();
});
/**
 * @description 当electron关闭所有窗口时，退出应用。
 */
app.on('mainWindow-all-closed', function () {
  if (isWin) app.quit();
});
```

</p>
</details>

### 修改根目录`index.js`

```javascript
require('./main/main.js');
```

### 修改根目录`package.json`

```json
# 找到scripts, 添加start指令
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "electron ."
},

```

### 运行 Electron

```bash
$ yarn start
```

### 细节修改

> 由于`main/main.js`是修改过的，入口增加了是否是 development 的判断(是：打开 http://localshost:8000, 否：打开编译好的正式包文件下的 index.html)，所以这里需要调整`package.json`，在`start`指令中添加 监听 `http://localhost:8000` 并启动 Electron 客户端。
> 修改根目录下的`package.json`

```json
"scripts": {
  "elt:dev": "cross-env NODE_ENV=development electron .",
  "start": "concurrently \"npm run start:app\" \"wait-on http://localhost:8000 && npm run elt:dev\"",
  "start:app": "cross-env APP_ROOT=./renderer umi dev"
}
```

> 在运行 `yarn start`之前，先安装对应的依赖。因为指令中用到了 [concurrently](https://www.npmjs.com/package/concurrently) 与 [wait-on](https://www.npmjs.com/package/wait-on)。所以我们需要先安装依赖(需要安装到`devDependencies`下，因为在后续的打包中，Electron 不会将`devDependencies`下的依赖打包进去。进而优化整体体积)。

```bash
$ yarn add wait-on concurrently -D
```

### 再次运行 Electron

```
$ yarn start

```

### 安装`electron-builder`

```bash
$ yarn add electron-builder
```

### 添加`electron-builder`配置
新增`electron-builder-config.js`（名字随意起）。仅供参考。具体按实际场景修改

<details><summary>点击查看配置</summary>
<p>

```javascript
/**
 * @description
 * electron-builder配置文件， 使用时通过npmscript 指定--config 来匹配运行
 * eg(当前)： elctron-builder --config .config/electron-build-config.js
 */

module.exports = {
  files: [
    // 'index.js', 'main/**/*', 'dist/**/*', 'node_modules/', 'package.json',
    '**/*',
    '!release/**/*',
    '!renderer/**/*',
    'dist/**/*',
    'static/**/*',
    '!src/**/*',
    // "!main/**/*"
  ],
  productName: 'demoApp',
  // 注入打包后package.json 内的属性
  extraMetadata: {
    main: 'index.js',
  },
  directories: {
    output: 'release/${version}', // 编译文件输出文件夹
  },
  // mac打包配置
  mac: {
    // 包类型，参见 https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/LaunchServicesKeys.html#//apple_ref/doc/uid/TP40009250-SW8
    // category: 'public.app-category.developer-tools',
    type: 'development',
    target: ['default'], // 目标包类型，
  },

  dmg: {
    // background: 'build/appdmg.png', // dmg安装窗口背景图
    // icon: 'public/icon.icns', // 客户端图标
    iconSize: 100, // 安装图标大小
    // 安装窗口中包含的项目和配置
    contents: [
      { x: 380, y: 280, type: 'link', path: '/Applications' },
      { x: 110, y: 280, type: 'file' },
    ],
    window: { width: 500, height: 500 }, // 安装窗口大小
  },
  linux: {
    target: ['AppImage', 'deb'],
    icon: 'build/icon.png',
  },
  win: {
    target: ['nsis', 'portable', 'squirrel'],
    icon: 'public/icon.ico', // 客户端图标
  },
  nsis: {
    shortcutName: 'demoApp', // 图标名称
    oneClick: false, // 是否一键安装
    allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
    allowToChangeInstallationDirectory: true, // 允许修改安装目录
    // installerIcon: "./dist/public/icon.ico",// 安装图标
    // uninstallerIcon: "./dist/public/unist.ico",//卸载图标
    // installerHeaderIcon: "./dist/public/icon.ico", // 安装时头部图标
    createDesktopShortcut: true, // 创建桌面图标
    createStartMenuShortcut: true, // 创建开始菜单图标
  },
  // asar: {
  //   smartUnpack: true,  // asar打包, 智能提取第三方模块
  // },
  // asar: false,
  /* 
  publish: [
    {
      provider: 'generic',
      url: 'http://localhost/release/',//更新服务器地址,请按实际部署修改
    },
  ], */
};
```

</p>
</details>

### 修改`package.json`

```json
 "scripts": {
    "elt:dev": "cross-env NODE_ENV=development electron .",
    "start:app": "cross-env APP_ROOT=./renderer umi dev",
    "start": "concurrently \"npm run start:app\" \"wait-on http://localhost:8000 && npm run elt:dev\"",
    "elt:dist": "umi electron-builder -p never",
    "build:app": "cross-env APP_ROOT=./renderer umi build",
    "elt:dist:all": "cross-env ELECTRON_MIRROR=https://npm.taobao.org/mirrors/electron/ electron-builder -mwl --config ./electron-builder-config.js",
    "elt:dist:mac": "cross-env ELECTRON_MIRROR=https://npm.taobao.org/mirrors/electron/ electron-builder -m --config ./electron-builder-config.js",
    "elt:dist:win": "cross-env ELECTRON_MIRROR=https://npm.taobao.org/mirrors/electron/ electron-builder -w --config ./electron-builder-config.js",
    "elt:dist:linux": "cross-env ELECTRON_MIRROR=https://npm.taobao.org/mirrors/electron/ electron-builder -l --config ./electron-builder-config.js"
  },
```

### 执行编译

```bash
$ yarn run elt:dist:mac
```

### 遇到的问题

1. 在编译的时候报以下这个错
   `Application entry file "/Users/mac/zones/electron-umi-template/release/mac/electron-app-template.app/Contents/Resources/app/index.js" does not exist. Seems like a wrong configuration.`

### 解决方案

1. 思来想去，发现是文件夹重名了，原来我的渲染进程的文件夹是`app` ，而`electron-builder`打包出的入口文件夹也是`app`。将文件夹名字改成了`renderer`就解决了。
