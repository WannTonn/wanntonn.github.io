---
title: "重置macOS Catalina登录壁纸"
date: 2021-05-15T23:35:24+08:00
draft: false
image: '/images/Post/Hackintosh/notes/macOSBigSur.jpeg'

---

> 前言：自定义Catalina登录壁纸， Big Sur 安全性加强了，还没去找替换方案。
<!--more-->

### 步骤
- 关闭SIP： 白苹果 - Google一下。 黑苹果：打开终端输入csrutil status 出现以下：

```
System Integrity Protection status: disabled.
```
- 以上说明SIP已经关闭，接着进行如下操作。

```
# 临时挂载 / 。让 / 是可写入状态。
$ sudo mount -uw /
# 备份原来的壁纸, 这里备份在下载文件夹目录
$ sudo cp /System/Library/Desktop\ Pictures/Catalina.heic ~/Downloads/Catalina.back.heic
# 将重命名后的新的登录壁纸替换原来的壁纸
$ sudo cp -f ~/Downloads/Catalina.heic /System/Library/Desktop\ Pictures/Catalina.heic
# 执行如下指令后，重启就可以看到效果。
$ diskutil apfs updatePreboot /

# 如果以上没有效果，但是文件却已经替换成功。
# 打开系统偏好设置 - 用户与群组 - 点击左下角的锁解除 - 在侧栏用户名点击右键打开高级选项 - 复制UUID。
# 然后用终端进入如下路径
$ cd /Library/Caches
# 或者用Finder 进入 /Library/Caches
# 找到Desktop Pictures文件夹，新建一个文件夹，重命名为刚才复制的UUID，如果已经存在该UUID的文件夹，看看里面是否已经存在图片，删掉文件夹下的lockscreen.png, 复制一张新的lockscreen.png到文件夹下。重启即可见到效果。
# enjoy

```

---
> 参考
- [Mac 10.15 Catalina 开机登录壁纸图片修改](https://michael728.github.io/2020/03/04/tools-mac-change-wallpaper-login/)