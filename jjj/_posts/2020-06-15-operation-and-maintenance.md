# 购买服务器之后开始学习运维知识。

> ssh config
    
    $ cd
    $ mkdir .ssh && chmod 700 .ssh
    $ touch .ssh/authorized_keys && chmod 600 .ssh/authorized_keys

>  将开发者的ssh公钥添加到authorized_keys中

    $ pbcopy < ~/.ssh/id_rsa.pub
    $ vim .ssh/authorized_keys
    $  ssh-copy-id -i ~/.ssh/id_rsa.pub username@server -p 22 # 将rsa.pub 上传到服务器
    
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

    $ cd /etc/nginx
    $ vim nginx.conf


    