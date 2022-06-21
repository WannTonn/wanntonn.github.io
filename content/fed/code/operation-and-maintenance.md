---
title: "购买服务器之后开始学习运维知识"
date: 2020-06-15T23:35:24+08:00
draft: false
tags:
 - 运维
---

> ssh config
    
    $ cd
    $ mkdir .ssh && chmod 700 .ssh
    $ touch .ssh/authorized_keys && chmod 600 .ssh/authorized_keys
<!--more-->

>  将开发者的ssh公钥添加到authorized_keys中

    $ pbcopy < ~/.ssh/id_rsa.pub
    $ vim .ssh/authorized_keys
    $ a # 进入编辑状态
    $ ctrl + v # 懂的都懂
    $ esc
    $ shift + ;
    $ wq # 保存并退出vim模式
    $ ssh-copy-id -i ~/.ssh/id_rsa.pub username@server -p 22 # 将rsa.pub 上传到服务器
    
> 自定义hostname 免记ip登录

    $ vim ~/.ssh/config
    $ Host hostname # hostname 想要设置的别名
      HostName IP
      User root
      IdentitiesOnly yes
    $ ssh hostname # hostname 为设置的别名

> Ubuntu 安装yum

    $ apt-get install yum
    Reading package lists... Done
    Building dependency tree       
    Reading state information... Done
    E: Unable to locate package yum
    # 解决方法
    $ sudo apt-get update
    $ apt-get install yum # 完美解决

> 安装 nginx
    sudo apt-get install nginx

> 配置Nginx conf

     root@:~# cd /etc/nginx
     root@:~# vim nginx.conf

    # 配置文件中 主要有以下内容, 如果想映射其他端口，则在 /etc/nginx/sites-enabled/ 新建一个配置文件 / 复制一个新的default文件后修改
    
    server {
        # 默认监听80端口的配置
        listen 80 default_server;
        listen [::]:80 default_server;

        root /www; # 此处的www文件需自己在Linux系统下新建，可配置任意路径，只要能对得上。
        index index.html; # 默认入口
        # 配置已绑定到域名解析A的服务器域名
        server_name hostname;   # hostname变量 为ip / 域名
        # 监听端口对应的路径
        location / {
            root /www; # 此处的www文件需自己在Linux系统下新建，可配置任意路径，只要能对得上。
            index index.html; # 默认入口
            try_files $uri $uri/ /index.html; # 解决vue项目history模式 页面刷新空白。
        }
    }


> Nginx 常用指令

    # 测试配置文件语法
    root@:~# nginx -t
    
    # 出现以下内容则语法正确
    nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
    nginx: configuration file /etc/nginx/nginx.conf test is successful

    # 重载Nginx配置
    root@:~# nginx -s reload




    