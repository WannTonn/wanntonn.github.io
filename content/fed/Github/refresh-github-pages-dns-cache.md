---
title: 'github-pages去除custom-domain配置后，浏览器依旧重定向的解决方案'
date: 2022-02-12T09:30:45+08:00
draft: false
tags:
  - GitHub
image: '/images/Post/Github/github.png'
---

> 前言：之前做了 GitHub 的 github-pages 的链接跳转，后来解除跳转之后，浏览器一直还是在重定向到个人域名，后发现是浏览器缓存了重定向配置

<!--more-->

### 解决方案，清除浏览器缓存

- 1.浏览器设置里面清除所有缓存
- 2.清除浏览器的 dns 缓存等
  - Url 输入 `chrome://net-internals/#dns` 点击`Clear host cache`
  - Url 输入 `chrome://net-internals/#sockets` 点击`Flush socket pools`
