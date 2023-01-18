---
title: "黑苹果笔记"
date: 2021-10-01T20:30:45+08:00
draft: false
tags:
 - Hackintosh
image: '/images/Post/Hackintosh/notes/macOSBigSur.jpeg'
---

<!--more-->
```
# 处理PE中DiskGenius 重新分配硬盘空间的时候报 “文件分配表中有标记为已使用的未用簇”
# 命令行输入 "chkdsk /f /x C:"  C: 替换为要检查的盘符
```

> 当计算机拥有MacOS 与 Windows双系统时，2个系统之间会有8个小时的时差。可以用以下两个方法来实现统一UTC时间。
```bash
# windows 下，以管理员身份打开 cmd / powershell，输入以下命令，回车即可。或者将以下内容复制到新建的.txt文档内，保存后修改后缀名为.reg。双击注入注册表即可。
Reg add HKLM\SYSTEM\CurrentControlSet\Control\TimeZoneInformation /v RealTimeIsUniversal /t REG_DWORD /d 1
```
> 重启，进入MacOS设置时间后，再重启到windows。


> 抑或使用hackintool工具，点击打开“工具”选项卡，点击最底下九宫格图标（生成Windows UTC 时间同步注册表文件）。Enjoy。


### 在安装白苹果降版本（10.14以下）时，遇到“这个安装macOS Mojave 应用程序副本已损坏。不能用来安装macOS”

> 解决方法
```
# 1.断开网络
# 2. 退出安装程序，找到实用工具 - 终端。 调整系统时间
date 122014102015.30

```