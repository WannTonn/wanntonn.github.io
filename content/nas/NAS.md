---
title: "NAS 折腾笔记"
date: 2021-06-15T23:35:24+08:00
draft: false
tags:
 - Nas
image: '/images/Post/Nas/Synology.png'
---


## 前言：黑群晖起飞。以下记录为踩坑经验，仅供参考
<!--more-->

> [参考：不到千元！手把手教您组装一台家用NAS J3455黑群晖6.1.7搭建全过程,跟着流程走，就可以顺利完成安装](https://post.smzdm.com/p/ag82zdd3/)

> 踩坑的点

  - |问题| 解决方案|
    |-|-|
    |由于DiskGenius版本为4.7，导致后来无法识别出NAS启动分区|要升级到5.0+ 版本方可识别|
    |刷入DS3617_6.1.img 后。从路由器的LAN口直接连接到NAS，NAS的宽带网口亮红灯。|再拿一个U盘 写入带有线网卡驱动的PE，进入到PE后，宽带口亮绿灯(就是玄学)|

## 群晖洗白实现Photo Station视频转码及缩略图
- 参考 [黑群晖 篇二：黑群晖半洗白-利用docker方法](https://post.smzdm.com/p/aooze086/)。