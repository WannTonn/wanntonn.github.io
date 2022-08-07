---
title: '学习Rust - Day2'
date: 2022-08-07T11:30:45+08:00
draft: false
tags:
  - Rust
image: '/images/FED/Rust.jpg'
---

[Rust学习文档 - 2.猜数字游戏](https://rustwiki.org/zh-CN/book/ch02-00-guessing-game-tutorial.html)

修改 cargo 镜像源地址的方法
```shell
# 跳转到.cargo目录
$ cd ~/.cargo 
# 创建config文件
$ vi config
# 输入以下内容

[source.crates-io]
registry = "https://github.com/rust-lang/crates.io-index"
# 指定镜像
replace-with = 'tuna'

# 清华大学
[source.tuna]
registry = "https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"

# wq 保存退出，重新执行cargo build
```

```
#本章学到了
0.let, match 函数的使用，使用外部crate。
1.loop 可以无限执行程序，直到程序报错退出 或者输入 quit 退出
2.let mut guess = String:new(); // 创建一个可变的字符串变量guess
3.let guess: u32 = match guess.trim().parse() {}; // 转换String为 32 位数字 i32、32 位无符号数字 u32、64 位数字 i64，等等的数值。同时，parse返回一个Result类型（包含Ok 与 Err 的枚举） 
```