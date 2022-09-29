---
title: '使用Create-React-App 搭建属于自己用的React项目模板'
date: 2022-09-29T13:35:24+08:00
draft: true
tags:
  - React
image: '/images/FED/React.png'
---

> 记录搭建过程中遇到的坑与解决方案。

<!--more-->

### 首先使用 CRA(create-react-app, 下文将用 CRA 表示), 命令搭建一个脚手架工程雏形，安装命令如下

```shell
# 首先得安装create-react-app
$ npm install create-react-app -g

# 在目录初始化项目
$ create-react-app react-app

# 等待脚手架工具自动安装完毕。输入以下
$ cd react-app
$ npm run start

# 浏览器中输入 http://localhost:3000 即可查看效果
```

### 覆写 webpack 配置

> 由于 CRA 将配置隐藏，我们想覆写其配置，除了 `npm run eject`将其配置完全暴露出来（极其不推荐），我们还可以用`customize-cra`库来覆写配置。

```shell
# 安装依赖
npm install customize-cra react-app-rewired --dev
```

- 安装好依赖之后，在项目根目录添加 `config-overrides.js`，内容如下

```javascript
// config-overrides.js, 加入亿点点细节。

const {
  override,
  disableEsLint,
  addWebpackAlias,
  addWebpackResolve,
  addWebpackModuleRule,
  addPostcssPlugins,
  addWebpackPlugin,

} = require("customize-cra");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';
const loader = isDev ? 'style-loader' : MiniCssExtractPlugin.loader;

const path = require("path");
// 关闭mapSource
const rewiredMap = () => config => {
  config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false;
  return config;
};
module.exports = {
  webpack: override(
    rewiredMap(),
    // 禁用eslint
    disableEsLint(),
    // 配置alias
    addWebpackAlias({
      "@": path.resolve(__dirname, "src"),
    }),
    // 导入文件的时候可以不用添加文件后缀名
    addWebpackResolve({
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.json', '.scss', '.css']
    }),
    // 引用scss相关。
    addWebpackModuleRule(
      {
        test: /\.css$/,
        use: [loader, 'css-loader']
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path]__[name]-[hash:base64:4]'
              },
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ]
      }
    )
}

```

- 先不急 `npm run start`，不然会得到一堆的报错。

### 咱先添加 typescript

```shell
# awesome-typescript-loader可以让Webpack使用TypeScript的标准配置文件 tsconfig.json编译TypeScript代码
# source-map-loader使用TypeScript输出的sourcemap文件来告诉webpack何时生成 自己的sourcemaps。
$ npm install -S typescript awesome-typescript-loader source-map-loader
```

- 在项目根目录添加 tsconfig.json

```json
{
  // 之前遇到过 npm run start的时候 paths字段会被覆盖，则需要将该配置外置(然并卵)，extends字段覆盖也无用，后来是更新了react-scripts就不会再有覆盖配置的问题了。
  // "extends": "./paths.json",

  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "types": ["node", "react", "react-dom"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": false,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "noImplicitAny": false,
    "baseUrl": ".",
    // 添加 alias
    "paths": {
      "@/*": ["src/*"]
    }
  },
  // 定义ts校验目录
  "include": ["src/**/*"]
}
```

- 添加完之后，再在 `src` 目录下新建一个 `global.d.ts`, 这样就可以正确引入 scss 等文件

```javascript
// global.d.ts
// 定义在ts中的文件类型
declare module '*.css';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}
declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.less' {
  const content: { [className: string]: string };
  export default content;
}
```

### 配置以 '@' 表示 'src/' 的 alias

- 在上述的 config-overrides.js 与 tsconfig.json 就可以发现

```json
// config-overrides.js
... 省略亿些代码
const {addWebpackAlias} = require('customize-cra');
module.exports = {
  webpack.override(
    // 配置alias
    addWebpackAlias({
      "@": path.resolve(__dirname, "src"),
    }),
  )
}
... 省略亿些代码


// tsconfig.json
... 省略亿些代码

"compilerOptions": {
  ... 省略亿些代码

  "paths": {
      "@/*": ["src/*"],
    }
  ... 省略亿些代码

}
... 省略亿些代码

```

### 添加 scss ，并使用 module 方式引入

```shell
$ npm install --save-dev node-sass sass-loader style-loader css-loader mini-css-extract-plugin

```

```javascript
// config-overrides.js
// ... 省略亿些代码
const {addWebpackModuleRule} = require('customize-cra');
module.exports = {
  webpack.override(
    // 引用scss相关。
    addWebpackModuleRule(
      {
        test: /\.css$/,
        use: [loader, 'css-loader']
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path]__[name]-[hash:base64:4]'
              },
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ]
      }
    )
  )
}
// ... 省略亿些代码

```
- 遇到的问题
  - 直接 `import style from './style.scss'`,会发现scss文件其实是一个空对象
  - 解决方案： 重命名 'style.scss' -> 'style.module.scss'