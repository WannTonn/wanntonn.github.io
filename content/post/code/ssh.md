---
title: "SSH指令"
date: 2022-05-04T23:35:24+08:00
draft: false
tags:
 - ssh
---

> 前言： 记录一些平时会用到，但是容易从脑袋中丢掉的指令

<!--more-->

> ssh指令之 - scp
  ```bash
    # 将本地文件 拷贝到 远程服务器上
    scp ~/Downloads/demo.txt root@192.168.50.123:/tmp

    # 将远程服务器上的文件 拷贝到 本地文件夹
    scp root@192.168.50.123:/tmp/demo.txt ~/Downloads/

    # 将本地目录 拷贝到 远程服务器上
    scp -r ~/Downloads/demo root@192.168.50.123:/tmp

    # 将远程服务器上的demo文件夹 拷贝到本地
    scp -r root@192.168.50.123:/tmp/demo ~/Downloads/
  ```