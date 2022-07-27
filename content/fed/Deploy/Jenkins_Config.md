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

- 钉钉配置

1. 打开钉钉，拉人再移除，生成一个自己的群组

2. 点击右上角齿轮(群设置)图标

![](/images/Post/Jenkins/dingtalk_add_bot_1.jpg)

3. 选择智能群助手, 找到 自定义(通过Webhook接入自定义服务)

![](/images/Post/Jenkins/dingtalk_add_bot_2.jpg)

4. 完善机器人配置

5. 点击完成，并复制框中的 `webhook`

![](/images/Post/Jenkins/dingtalk_add_bot_3.png)

- Jenkins 配置
1. 打开 `系统管理`- 找到`插件管理`- 选择`可选插件` - 搜索 `DingTalk` 

2. 勾选`DingTalk`, 点击最下方的 `Download now and install after restart`, 等待安装完毕并重启Jenkins

3. 打开`系统管理` - `系统配置` - `钉钉` - 点击`新增` - 将必填项填充 (其中[webhook](#GithubHook)从该教程中获取)

![](/images/Post/Jenkins/dingtalk_add_bot_0.png)

<a name="GithubHook">添加GithubHook</a>

1. 打开github项目 - Settings - 左侧菜单栏找到 `Webhooks`

![](/images/Post/Jenkins/github_add_hook_0.jpg)

2. 点击addhook, 可能需要输入密码

3. 将必填项填入(注意📢：URL分成 Jenkins 地址 + `/github-webhook/`, 举个🌰： http://38.107.111.22:8080/github-webhook/)

![](/images/Post/Jenkins/github_add_hook_1.jpg)


<a name="Nodejs">添加Nodejs</a>

1. 打开 `系统管理` - 找到`插件管理`- 选择`可选插件` - 搜索 `Nodejs`

2. 勾选 `NodeJS Plugin`，点击最下方的 `Download now and install after restart`, 等待安装完毕并重启Jenkins

3. 打开`系统管理` - `全局工具配置` - 找到`Nodejs` - 完成如下配置后 - 点击保存即可生效

![](/images/Post/Jenkins/add_nodejs_0.jpg)

4. 返回 `Dashboard` - 选择项目 - 找到 `构建` 

![](/images/Post/Jenkins/add_nodejs_1.jpg)

5. 选择刚才配置的nodejs版本，在script中写入需要用到的node脚本后，点击保存即可