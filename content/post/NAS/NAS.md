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

## 参考： [不到千元！手把手教您组装一台家用NAS J3455黑群晖6.1.7搭建全过程](https://post.smzdm.com/p/ag82zdd3/) 跟着流程走，就可以顺利完成安装

> 踩坑的点

  - |问题| 解决方案|
    |-|-|
    |由于DiskGenius版本为4.7，导致后来无法识别出NAS启动分区|要升级到5.0+ 版本方可识别|
    |刷入DS3617_6.1.img 后。从路由器的LAN口直接连接到NAS，NAS的宽带网口亮红灯。|再拿一个U盘 写入带有线网卡驱动的PE，进入到PE后，宽带口亮绿灯(就是玄学)|

## 群晖不用洗白实现Photo Station视频转码及缩略图
  ### 前言
    备份上传视频时，群晖提示转换mov格式文件到mp4格式失败：System failed to convert video [/volume1/photo/xxx.mov] to mpeg4.
  ### 原因
    群晖DSM自带的ffmpeg版本过低，需要升级版本
  ### 解决办法
    通过第三方社区安装ffmpeg高版本解决
  ### 解决步骤
    1. 开启群晖SSH
      - 控制面板 - 终端机和SNMP - 终端机 - 启动SSH功能 - 配置端口（或使用默认端口）
    2. 