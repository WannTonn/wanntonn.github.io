# MacOs重装后的一系列操作笔记

> 解除macOS 4位密码限制

    pwpolicy -clearaccountpolicies


> 安装包已损坏，移至垃圾篓提示
  
    sudo spctl --master-disable

> 映射开发文件夹zones

    sudo mount -uw /  (Catalina 有限制，需要加载)
    sudo ln -s /Users/wanton/zones /zones

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
      访问https://raw.githubusercontent.com/Homebrew/install/master/install，将文件另存为 brewinstall.rb 至文件夹(我存在Downloads)。打开terminal运行: $> ruby ~/Downloads/brewinstall.rb。


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

    npm config set registry https://registry.npm.taobao.org
    yarn config set registry https://registry.npm.taobao.org/