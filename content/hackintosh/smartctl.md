---
title: 'MacOS下用终端查看SSD使用寿命'
date: 2022-11-26T23:35:24+08:00
draft: false
tags:
  - MacOS
image: '/images/Post/Hackintosh/notes/macOSBigSur.jpeg'
---

前言： SSD 也分颗粒质量优劣，劣质的颗粒会影响日常使用，甚至会让资料丢失，及时自检硬盘健康，避免数据丢失带来的损失。

<!--more-->

SSD 分以下三种颗粒

- 【SLC】速度快寿命长，价格贵（约 MLC 的 3 倍），擦写寿命约 10 万次。
- 【MLC】速度一般，寿命一般，价格适中，擦写寿命约 3000 ~ 10000 次。
- 【TLC/8LC】速度慢，寿命短，价格便宜。擦写寿命约 500 次。

### 准备工作

macOS 下需要安装`smartctl`。这里需要用`homebrew`进行安装。先安装`homebrew`。
通过 spotlight 找到 `终端`，输入以下指令

```bash
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

如果遇到 403 等错误，可以直接打开链接，然后保存 install.sh 到本地。进而用终端来安装，如下所示（保存文件到了`下载`文件夹）。

```bash
$ cd ~/Downloads
$ bash install.sh
```

### 操作指令

homebrew 安装完成之后，就可以执行安装指令了

```bash
$ brew install smartmontools
```

等待安装完成。

接下来就是通过`diskutil list`指令来查看本地 Volumes 列表。查询我们需要了解的 SSD 的盘符

```bash
$ diskutil list

# 这是鄙人的SSD信息 （1TB 分割了650GB 给了macOS，所以盘符大小约为644.2GB）
/dev/disk2 (synthesized):
   #:                       TYPE NAME                                       SIZE       IDENTIFIER
   0:      APFS Container Scheme -                              +644.2 GB   disk2
                                 Physical Store disk0s4
   1:                APFS Volume Monterey                       15.2 GB    disk2s1
   2:              APFS Snapshot com.apple.os.update-...        15.2 GB    disk2s1s1
   3:                APFS Volume Monterey - 数据                 126.9 GB   disk2s2
   4:                APFS Volume Preboot                        296.0 MB   disk2s3
   5:                APFS Volume Recovery                       1.1 GB     disk2s4
   6:                APFS Volume VM                             1.1 GB     disk2s5
```

通过结果得知，我们要查询的 SSD 的盘符为 `disk2s1`, 进而执行分析命令。

```bash
$ smartctl -a disk2s1

# 以下为执行分析命令的结果
smartctl 7.3 2022-02-28 r5338 [Darwin 21.5.0 x86_64] (local build)
Copyright (C) 2002-22, Bruce Allen, Christian Franke, www.smartmontools.org

=== START OF INFORMATION SECTION ===
Model Number:                       HS-SSD-C2000Pro 1024G
Serial Number:                      AA00000000000000xxxx # 序列号就不展示了
Firmware Version:                   HBAF28FT
PCI Vendor/Subsystem ID:            0x126f
IEEE OUI Identifier:                0x000000
Controller ID:                      1
NVMe Version:                       1.3
Number of Namespaces:               1
Local Time is:                      Sun Nov 26 23:27:03 2022 CST
Firmware Updates (0x14):            2 Slots, no Reset required
Optional Admin Commands (0x0017):   Security Format Frmw_DL Self_Test
Optional NVM Commands (0x005f):     Comp Wr_Unc DS_Mngmt Wr_Zero Sav/Sel_Feat Timestmp
Log Page Attributes (0x0b):         S/H_per_NS Cmd_Eff_Lg Telmtry_Lg
Maximum Data Transfer Size:         64 Pages
Warning  Comp. Temp. Threshold:     75 Celsius
Critical Comp. Temp. Threshold:     80 Celsius

Supported Power States
St Op     Max   Active     Idle   RL RT WL WT  Ent_Lat  Ex_Lat
 0 +     9.00W       -        -    0  0  0  0        0       0
 1 +     4.60W       -        -    1  1  1  1        0       0
 2 +     3.80W       -        -    2  2  2  2        0       0
 3 -   0.0450W       -        -    3  3  3  3     2000    2000
 4 -   0.0040W       -        -    4  4  4  4    15000   15000

=== START OF SMART DATA SECTION ===
SMART overall-health self-assessment test result: PASSED

SMART/Health Information (NVMe Log 0x02)
Critical Warning:                   0x00
Temperature:                        30 Celsius
Available Spare:                    100%
Available Spare Threshold:          10%
Percentage Used:                    2%
Data Units Read:                    26,318,651 [13.4 TB]
Data Units Written:                 21,130,389 [10.8 TB]
Host Read Commands:                 503,987,575
Host Write Commands:                318,024,493
Controller Busy Time:               10,172
Power Cycles:                       1,285
Power On Hours:                     3,566
Unsafe Shutdowns:                   73
Media and Data Integrity Errors:    0
Error Information Log Entries:      0
Warning  Comp. Temperature Time:    0
Critical Comp. Temperature Time:    0
Thermal Temp. 1 Transition Count:   4
Thermal Temp. 1 Total Time:         216

Error Information (NVMe Log 0x01, 16 of 256 entries)
No Errors Logged

```

### 结果解析
以下为SMART结果对照表，根据自己所需查看对应结果信息：

- 严重警告（Critical Warning）：会显示控制器状态警告讯息，如果都显示0x00 就表示没事

- 温度（Temperature）：会显示当前SSD 温度资讯

- 可用备用空间（Available Spare）：SSD 剩余空间百分比

- 可用备用临界值（Available Spare Threshold）：临界值全由厂商定义

- 寿命百分比（Percentage Used）：目前SSD 寿命百分比数值，具体取决于实际设备使用情况和厂商对设备寿命的预测。

- 资料读取（Data Units Read）：记录电脑从SSD读取512字节数据单元的总量，每1000个单元记录一次，即这项Raw数据1的值等于500KB。

- 资料写入（Data Units Written）：如上，就是写入总量。

- 主机读取命令（Host Read Commands）：主控收到的读取命令数量。

- 主机写入命令（Host Write Commands）：主控收到的写入命令数量。

- 控制器忙碌时间（Controller Busy Time）：主控忙于I/O命令的时间。

- 意外关机（Unsafe Shutdowns）：纪录不正常断电次数

- 媒体和资料完整性错误（Media and Data Integrity Errors）：主控检测得到的未恢复的数据完整性错误次数。

- 错误资料纪录（Number of Error Information Log Entries）：主控总共收到的错误信息日志数量。 