---
title: "黑苹果 - 记录 奋威 T-919(BCM94360cd)免驱卡 在MacOS Monterey下蓝牙失效 的解决方案"
date: 2022-08-08T23:35:24+08:00
draft: true
tags:
 - MacOS
image: '/images/Post/MacOS/monterey.png'
---

震惊，号称免驱卡的BCM94360cd竟然在Monterey下驱动异常，让我们一起来看看如何修复的吧。
<!--more-->
这里有其他up主做的视频教程  ---> [点我参考](https://www.bilibili.com/video/BV1UU4y1J7RV)
## 前言
1. 机型 Dell XPS 8930，由于OEM主板的特殊性，主板上没有USB2.0的9pin口，所以网购了一根 USB3.0(19pin) 转 9pin 的转接线。以此来驱动奋威 T-919免驱卡。
2. 在Bigsur上，BCM94360cd的免驱都很正常，升级到Monterey 12.4 之后，WiFi正常，但是蓝牙不驱动。
3. 分析：由于网卡用的USB的9pin，而在hackintool - USB 下，蓝牙模块不是内建，所以导致无法正确驱动。解决方案： USBmap 定制端口。

## 开整
准备工具： 
1. [USBmap](https://github.com/corpnewt/USBMap)
2. [USBToolBox.kext](https://github.com/USBToolBox/kext/releases/download/1.1.1/USBToolBox-1.1.1-RELEASE.zip) 
3. [USBToolBox.exe](https://github.com/USBToolBox/tool/releases/download/0.1.1/Windows.exe)
4. USB2.0 和USB3.0的u盘。如果有type-c口，也准备一个type-c的u盘。

如果是win + macOS 双系统，则进入到Windows下。
1. 双击打开 USBToolBox.exe , 输入 `D`, 回车 (查找目前的端口)，程序会5s刷新一次
2. 鼠标和键盘建议插在USB2.0的端口上，并插拔，接下来将USB3.0的设备，各插在后排的USB口上，插入一个设备后，停留5s，然后退出，继续插下一个。
3. 等设备都在USB口插过之后，按 `K` 将 kext 导出（UTBMap.kext导出在与USBToolBox.exe同级的目录）。
4. 挂载EFI分区。
5. 将UTBMap.kext 与 USBToolBox.kext 复制到 EFI/OC/kext 目录下。
6. 用OpenCoreConfigurator 或者propertree 打开 EFI/OC/config.plist, 选择Kernel。
7. 将 USBInjectAll.kext, USBMap.kext, USBPorts.kext, AirportBrcmFixup.kext（以及相关）, BlueToolFixup.kext, BrcmBluetoothInjector.kext, BrcmFirmwareData.kext, BrcmPatchRAM3.text 都设置为 Enable = false。
8. 将 UTBMap.kext 与 USBToolBox.kext 加入到kernel下，并设置为 Enable = true。
9. 保存重启。
10. 注意： 如果一直卡logo，或者出现禁行标记，请确认是否将USBToolBox.kext 拷贝至 EFI/OC/kext 目录。

如果是 macOS单系统，则 参考该教程 ---> [点我参考](https://www.imacpc.net/archives/4104)。原理都一样。就不赘述了。

在此感谢前人的辛苦付出。且黑且珍惜。