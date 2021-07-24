# MySQL workbench theme change
## from dark to light
> defaults write com.oracle.workbench.MySQLWorkbench NSRequiresAquaSystemAppearance -bool yes

## from light to dark
>defaults write com.oracle.workbench.MySQLWorkbench NSRequiresAquaSystemAppearance -bool no

## 添加mysql 到bash
```
  $ vi ~/.zshrc
  输入 export PATH=${PATH}:/usr/local/mysql/bin
  保存，退出
```