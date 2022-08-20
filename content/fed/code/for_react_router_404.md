---
title: '解决react-router 部署到服务器之后访问路由跳转到404的问题'
date: 2021-08-20T22:35:24+08:00
draft: false
tags:
  - Code
image: '/images/Code/javascript.jpg'
---

老生常谈的问题了，作为前端，之前都没有涉及过服务器 NGINX 部署相关的操作。当做是初次踩坑的笔记吧。

<!--more-->

- 起因：在 React 项目中引用了 React-router 的依赖，作为路由跳转，本地跑都很正常，编译部署到服务器之后访问。就是 404.

- 分析：就是 NGINX 配置的问题

- 解决： ssh 连接服务器，修改配置文件。举个 🌰

```diff
$ vi /etc/nginx/conf.d/tools.conf
  # 找到location部分
  location / {
      root /pages/tools;
      index index.html;
+   try_files $uri /index.html;
  }
```

- 保存退出，重启 NGINX 即可见效

```shell
$ nginx -t
  nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
  nginx: configuration file /etc/nginx/nginx.conf test is successful
  # 测试通过之后重启NGINX
$ systemctl restart nginx
```
