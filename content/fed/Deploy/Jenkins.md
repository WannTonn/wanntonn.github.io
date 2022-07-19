---
title: '用Jenkins实现前端项目部署'
date: 2022-07-17T21:30:45+08:00
draft: false
tags:
  - Jenkins
image: '/images/FED/Jenkins.png'
---
> 前言：github.io 编译总出问题，更新迟滞，现想用部署工具部署在服务器，拟实现代码推送，自动部署，不用看GitHub脸色。在此正以记录的形式记录下过程。

<!--more-->
本文借鉴了 [《前端工程化：保姆级教学 Jenkins 部署前端项目》](https://mp.weixin.qq.com/s/yf6vClrNvVA4bKbeqcJ9SA)


## 准备事项
 - 云服务器一台(Linux),此处用的Ubuntu 18.04
 - 物理机一台（远程用）
 - [配置Ubuntu的镜像源]({{< ref "/fed/Deploy/Linux_Repo.md" >}})

## 开始安装
1. 配置apt-get的Jenkins的repo
```shell
$ sudo apt-get update -y
$ sudo apt-get upgrade -y
```
2. 安装JDK
```shell
$ sudo apt install openjdk-11-jdk -y
```
3. 验证JDK版本号
```shell
$ java -version
```
4.添加Jenkins的gpg key
```shell
$ wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | apt-key add -
```
5.添加仓库地址
```shell
$ sudo sh -c 'echo deb https://pkg.jenkins.io/debian-stable binary/ > \ e> /etc/apt/sources.list.d/jenkins.list'
```
6.更新apt-get
```shell
$ sudo apt-get update -y
```
7.安装Jenkins
```shell
$ sudo apt-get install jenkins -y
```
## Jenkins 指令
```shell
# 启动Jenkins
$ systemctl start jenkins
# 停止Jenkins
$ systemctl stop jenkins
# 重启Jenkins
$ systemctl restart jenkins
# 查看Jenkins状态
$ systemctl status jenkins
```
启动服务之后，访问云服务器IP:8080，Jenkins默认端口为8080.

## Jenkins使用以及Freestyle任务构建
![](/images/Post/Jenkins/step1.jpg)
首次使用需要用 `cat /var/lib/jenkins/secrets/initialAdminPassword` 查看密码。然后点继续。

随后进入插件安装页面，这里安装系统推荐的插件。

![](/images/Post/Jenkins/step2.jpg)
等待新手入门的进度条走完。

走完创建用户的流程之后就进到Jenkins的首页了。
![](/images/Post/Jenkins/step3.jpg)

# 开始创建第一个要编译的项目。
点击 `+ 新建Item` 创建一个 `Freestyle Project`
