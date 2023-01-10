---
title: "npm相关的笔记"
date: 2023-01-10T11:35:24+08:00
draft: false
tags: 
 - Code
image: '/images/Code/javascript.jpg'
---

<!--more-->

## npm publish 须知
  - registry
    - 如果有改变npm的registry为淘宝的源，则需要改回npm的原生镜像源。
    - 查看当前镜像源： npm config get registry
    - 配置npm镜像源： npm config set registry https://registry.npmjs.org
  - 登录npm账号
    - 查看当前登录的账号： npm whoami
    - 登录npm账号： npm login
    - 依次输入 账号，密码，以及邮箱，再输入邮箱接收到的验证码
  - 我们需要发布哪些文件
    - 方式1、配置 `package.json`的 `files`字段，接收字符串数组，举个栗子： "files": ["dist"],就是将dist文件夹发布。
    - 方式2、添加 `.npmignore`配置文件，如果没有`.npmignore`配置文件，则读取`.gitignore`下的配置。两个文件同时存在时，优先读取`.npmignore`配置。
    - 方式3、完善`.gitignore`配置，该配置生效于 git代码管理和npm publish。
  - 以下文件不能通过配置排除或包含
    - package.json
    - README.*
    - CHANGES / CHANGELOG / HISTORY
    - LICENSE / LICENCE
    - main字段中的文件
  - 版本管理： npm发包需要遵循语义化。版本号包含三个部分： MAJOR.MINOR.PATCH
    - MAJOR:主版本号
    - MINOR:此版本号（向下兼容的功能性新增）
    - PATCH:修订号（做了向下兼容的问题修正）
  - 使用 `npm version`命令来自动修改版本，举个栗子，（默认初始版本为v1.0.0），进行如下操作：
    ```bash
    $ npm version patch
    # v1.0.1

    $ npm version prepatch
    # v1.0.2-0

    $ npm version minor
    # v1.1.0

    $ npm version major
    # v2.0.0
    ```
  - CHANGELOG
    - 包发布多次后，可以用[standard-version](https://github.com/conventional-changelog/standard-version)来根据用户的git commit 来生成CHANGELOG。
    - ```
      $ standard-version minor
      ```
    - feat：新功能（feature）。

      fix/to：修复bug，可以是QA发现的BUG，也可以是研发自己发现的BUG。

      fix：产生diff并自动修复此问题。适合于一次提交直接修复问题
      to：只产生diff不自动修复此问题。适合于多次提交。最终修复问题提交时使用fix
      docs：文档（documentation）。

      style：格式（不影响代码运行的变动）。

      refactor：重构（即不是新增功能，也不是修改bug的代码变动）。

      perf：优化相关，比如提升性能、体验。

      test：增加测试。

      chore：构建过程或辅助工具的变动。

      revert：回滚到上一个版本。

      merge：代码合并。

      sync：同步主线或分支的Bug。
