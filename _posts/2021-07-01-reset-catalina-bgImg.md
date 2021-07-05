# 重置macOS Catalina登录壁纸
<!--
 * @Author: WannTonn
 * @Date: 2021-07-01 21:02:28
 * @Description: 
 * @FilePath: /wanntonn.github.io/_posts/2021-07-01-reset-catalina-bgImg.md
-->
> 前言：自定义Catalina登录壁纸， Big Sur 安全性加强了，还没去找替换方案。

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
```

---
> 参考
- [Mac 10.15 Catalina 开机登录壁纸图片修改](https://michael728.github.io/2020/03/04/tools-mac-change-wallpaper-login/)