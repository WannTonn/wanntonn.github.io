---
title: "MacOS下用终端生成.icns格式图标文件"
date: 2022-02-26T23:35:24+08:00
draft: false
tags:
 - MacOS
image: '/images/Post/Hackintosh/notes/macOSBigSur.jpeg'
---
> 用命令行生成icns文件
<!--more-->

### 前言
> 在写Electron项目的时候，想给自己的项目新增一个属于自己的icon，就可以利用macOS的终端来生成。
### 步骤
> 准备一张图片（png最佳，可以背景透明，尺寸1024*1024 属于macOS规范下的最大尺寸）
> 将图片命名为比较简易的名字，比如img.png，将图片放在`下载`文件夹，或者其他任意位置（只要你能在终端上找得到即可）。
> 打开终端输入以下命令
   ```bash
    $ cd ~/Downloads   # 此处跳转到img.png所在的目录
    $ mkdir icon.iconset # 创建文件夹，.iconset是必须的
    ```
> 接着在终端输入以下命令，继续生成不同size的图片。
  ```bash
    $ sips -z 16 16 img.png --out icon.iconset/icon_16x16.png
      sips -z 32 32 img.png --out icon.iconset/icon_16x16@2x.png 
      sips -z 32 32 img.png --out icon.iconset/icon_32x32.png 
      sips -z 64 64 img.png --out icon.iconset/icon_32x32@2x.png 
      sips -z 128 128 img.png --out icon.iconset/icon_128x128.png 
      sips -z 256 256 img.png --out icon.iconset/icon_128x128@2x.png 
      sips -z 256 256 img.png -- out icon.iconset/icon_256x256.png 
      sips -z 512 512 img.png --out icon.iconset/icon_256x256@2x.png 
      sips -z 512 512 img.png --out icon.iconset/icon_512x512.png 
      sips -z 1024 1024 img.png --out icon.iconset/icon_512x512@2x.png
   ```
> 执行上述命令结束之后，输入以下命令，生成`.icns`
  ```bash
    $ iconutil -c icns icon.iconset -o icon.icns
  ```
> done