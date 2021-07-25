---
title: "关于 Git 的一些经验收集"
date: 2020-03-07T23:35:24+08:00
draft: false
---
<!--more-->

  |问题|解决方案|
  |-|-|
  |关于 LibreSSL SSL_connect: SSL_ERROR_SYSCALL in connection to github.com:443 报错|$ git config --global --unset http.proxy|
  |关于 Git clone 下载慢|$ git clone https://github.com.cnpmjs.org + /xxxx/xxx.git|



> ### npm 配置淘宝镜像

```
npm config set registry https://registry.npm.taobao.org
```

> ### npm 恢复默认

```
 npm config set registry https://registry.npmjs.org
```
