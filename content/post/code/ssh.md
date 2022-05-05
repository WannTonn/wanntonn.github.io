---
title: 'SSH指令'
date: 2022-05-04T23:35:24+08:00
draft: false
tags:
  - ssh
---

> 前言： 记录一些平时会用到，但是容易从脑袋中丢掉的指令

<!--more-->

> ssh 指令之 - scp

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

> ssh 指令之 - fuser （查看占用端口的进程的 pid）

```bash
# 查看80端口占用
 fuser -v- n tcp 80
 # 以下为demo结果, 可以得出占用80端口的进程的PID为4245
                    USER        PID ACCESS COMMAND
80/tcp:             root        4245 F.... nginx
                    www-data    4246 F.... nginx
```

> ssh 指令之 - kill  （kill pid）
``` bash
# 在找到占用80端口的进程的pid之后，用kill指令来关闭
kill 4245
```