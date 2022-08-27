---
title: "MacOS连接VPN 提醒 “IPSec共享密钥”丢失。请验证您的设置并尝试重新连接。"
date: 2022-08-23T23:35:24+08:00
draft: false
tags:
 - MacOS
image: '/images/Post/Hackintosh/notes/macOSBigSur.jpeg'
---

- 前言
  在macOS上想连接VPN，但是保存配置之后报了 `MacOS连接VPN 提醒 “IPSec共享密钥”丢失。请验证您的设置并尝试重新连接。`的错误。

<!--more-->

- 解决方案
```shell
$ sudo vim /etc/ppp/options

# 在文件中新增如下内容
plugin L2TP.ppp
l2tpnoipsec

# 保存退出
```
保存之后，点击高级 - 选项 - 勾选 `通过VPN连接发送所有流量`