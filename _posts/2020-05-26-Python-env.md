### 学习Python心得 Day 01
> 安装 Virtualenv
```
sudo pip install virtualenv
sudo pip install virtualenvwrapper
```
> 配置virtualenvwrapper工作目录
```
mkdir -p $HOME/.virtualenvs

# vim ~/.zshrc 打开zsh终端配置添加以下命令
  export WORKON_HOME=$HOME/.virtualenvs # 配置workon命令的工作目录
  source /usr/local/bin/virtualenvwrapper.sh # 配置virtualwaprrer命令的源位置
```
>wrapper 命令
```
mkvirtualenv # 创建虚拟环境
workon # 选择工作的虚拟环境
deactivate # 退出虚拟环境
```