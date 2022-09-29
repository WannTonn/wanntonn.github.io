---
title: "MacOs重装后的一系列操作笔记"
date: 2022-01-31T23:35:24+08:00
draft: false
tags:
 - MacOS
image: '/images/Post/Hackintosh/notes/macOSBigSur.jpeg'
---

> 解除macOS 4位密码限制

    pwpolicy -clearaccountpolicies

<!--more-->

> 如果是覆盖安装升级上来的，在执行脚本时，会出现 `xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun` 的类似的报错。

    $ xcode-select --install

    
> 安装包已损坏，移至垃圾篓提示
  
    sudo spctl --master-disable

> 执行上述代码后仍然提示安装包损坏 (MacOS 10.15+)
  ```
  sudo xattr -r -d com.apple.quarantine /Application/xxx.app
  ```
> 提示软件包与此版本的macOS不兼容
  ```
  sudo su
  sudo mount -uw /
  killall Finder
  ```
  再次安装，即可绕过此提示
> 映射开发文件夹zones

    sudo mount -uw /  (Catalina 有限制，需要加载)
    sudo ln -s /Users/wanton/zones /zones
    # Bigsur 用以下方法
    vi /etc/synthetic.conf
    添加你需要软连接的路径，用tab分隔，保存后要重启系统，这里用/zones 做例子
    zones /Users/wanntonn/zones
    
> 设置ssh keygen

    ssh-keygen -t rsa -C "your_email@example.com"

    # 拷贝文件内的文本内容 
    pbcopy < ~/.ssh/id_rsa.pub

    # git 配置默认信息
    git config --global user.name "Name"
    git config --global user.email xxx@example.com
    
    # 遇到 ssh_dispatch_run_fatal: Connection to 13.229.188.59 port 22: Operation timed out
    git remote rm origin
    git remote add origin https://github.com/项目地址
    git push -u origin master

> 安装Brew

    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

    # 上述方法无效的话 
    1. 访问https://raw.githubusercontent.com/Homebrew/install/master/install，将文件另存为 brewinstall.rb 至文件夹(我存在Downloads)。打开terminal运行: $> ruby ~/Downloads/brewinstall.rb。
    2. 如果遇到 443 端口错误，就将dns配置为114。114.114.114 / 8.8.8.8


> 更改brew源

   
    # 第一步：替换brew.git
      cd "$(brew --repo)"
      git remote set-url origin https://mirrors.ustc.edu.cn/brew.git
    
    # 第二步：替换homebrew-core.git
      cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
      git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git
      cd
      brew update
    
    # 对于zsh用户
      echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles' >> ~/.zshrc
      source ~/.zshrc
    

> 安装oh-my-zsh

    sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"

    # 替换主题
      open ~/.zshrc
      ZSH_THEME="bira"

    
> 安装  node / npm / yarn

    brew update
    brew install node / npm / yarn

> 配置 npm / yarn 淘宝镜像

    npm config set registry https://registry.npmmirror.com
    yarn config set registry https://registry.npmmirror.com
    pnpm config set registry https://registry.npmmirror.com



> npm 恢复默认

```
 npm config set registry https://registry.npmjs.org
 yarn config set registry https://registry.npmjs.org
 pnpm config set registry https://registry.npmjs.org
```


> 关于Git的一些问题与解决方案

  |问题|解决方案|
  |-|-|
  |关于 LibreSSL SSL_connect: SSL_ERROR_SYSCALL in connection to github.com:443 报错|$ git config --global --unset http.proxy|
  |关于 Git clone 下载慢|$ git clone https://github.com.cnpmjs.org + /xxxx/xxx.git|

> 配置pip源为国内的清华镜像源
```
  $ pip3 config set global.index-url 'https://pypi.tuna.tsinghua.edu.cn/simple'
  $ pip3 config set install.trusted-host 'https://pypi.tuna.tsinghua.edu.cn'
  # 显示pip配置
  $ pip3 config list

```



