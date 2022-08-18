---
title: '学习Rust - Day1'
date: 2022-08-06T11:30:45+08:00
draft: true
tags:
  - Rust
image: '/images/FED/Rust.jpg'
---

[Rust学习文档 - 1.入门指南](https://rustwiki.org/zh-CN/book/ch01-03-hello-cargo.html)

### 安装 rustup 版本管理器 (Linux / MacOS)
```shell
$ curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
```

### 新建一个项目，并且开始写下第一个Rust程序
新建文件：main.rs (文件名规范： 多个单词拼接用 _ 拼接。 🌰： hello_world.rs)
```rust
fn main() {
  println!("Hello World");
}
```

```shell
$ rustc main.rs
$ ./main
$ Hello World!
```

### Rust程序解析
```rust
fn main() {

}
# main函数(主函数)，是每个可执行的Rust程序运行的第一个代码。第一行生命main的函数，不带参数也没有返回值。
# 如果有参数，那么它们的名字会放到括号内，函数主题用大括号 {} 括起来
```


### Hello Cargo
Cargo 是 Rust 的构建系统和包管理器。大多数 Rustacean 们使用 Cargo 来管理他们的 Rust 项目，因为它可以为你处理很多任务，比如构建代码、下载依赖库，以及编译这些库。（我们把代码所需要的库叫做依赖（dependency））。


```
可以使用 cargo build 构建项目。
可以使用 cargo run 一步构建并运行项目。
可以使用 cargo check 构建项目而无需生成二进制文件来检查错误。
有别于将构建结果放在与源码相同的目录，Cargo 会将其放到 target/debug 目录。
使用 Cargo 的一个额外的优点是，不管你使用什么操作系统，其命令都是一样的。所以从现在开始本书将不再为 Linux 、macOS 或 Windows 提供平台特定的命令。
```