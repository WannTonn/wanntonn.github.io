---
title: 'Jenkins配置'
date: 2022-07-24T11:30:45+08:00
draft: true
tags:
  - Jenkins
image: '/images/FED/Jenkins.png'
---

> Jenkins 插件配置

<!--more-->


<a name="DingtalkBot">添加钉钉机器人插件</a>
- Jenkins 配置
1. 打开 `系统管理`- 找到`插件管理`- 选择`可选插件` - 搜索 `DingTalk` 
2. 勾选`DingTalk`, 点击最下方的 `Download now and install after restart`, 等待安装完毕并重启Jenkins
![](/images/Post/Jenkins/dingtalk_add_bot_1.jpg)

- 钉钉配置
1. 打开钉钉，生成一个自己的群组
2. 点击右上角齿轮(群设置)图标
3. 选择智能群助手, 找到 自定义(通过Webhook接入自定义服务)
![](/images/Post/Jenkins/dingtalk_add_bot_2.jpg)
4. 完善机器人配置

