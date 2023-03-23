---
title: '什么是npm link'
date: 2023-02-08T15:30:45+08:00
draft: false
tags:
  - npm
image: '/images/Code/javascript.png'
---

在开发组件库的时候，为避免频繁发布与引入，可在本地以软链的形式进行调试，待完成之后再取消软链。
<!--more-->

## 1.什么是软链
如果想在项目B引入项目A的本地npm包，就可以用 `npm link packageName`来创建软链 

## 2.如何创建/使用软链
2.1 在项目A中创建全局链接
```shell
$ cd /path/projectAPath
$ npm link
```
2.2 在项目B中链接A项目为依赖
```shell
$ cd /path/projectBPath
$ npm link packageAName

```
## 3. 如何去除软链
3.1 在使用npm包的项目B的文件目录下解除链接
```shell
$ cd /path/projectBPath
$ npm unlink packageAName
```
3.2 在项目A的文件目录下解除全局链接
```shell
$ cd /path/projectAPath
$ npm unlink
```

## 4. 如何用pnpm进行软链
4.1 在项目A中创建全局链接
```shell
$ cd /path/projectApath
$ pnpm link --global
```
4.2 在项目B中链接A项目为依赖 (pnpm link <dir> --global / pnpm link --global <pkg>)
```shell
$ cd /path/projectBPath
$ pnpm link packageAName
```
