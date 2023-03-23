---
title: '前端优化的手段'
date: 2023-02-01T19:35:24+08:00
draft: false
tags:
  - Code
image: '/images/Code/javascript.png'
---

曾在面试的时候被问到是否有过项目优化的经历。特记录一番

<!--more-->

可以从以下几点入手：

- 1.代码层面
- 2.网络层面
- 3.打包层面

- 代码层面

  - 业务代码，添加以下优化方式
    - 防抖与节流
    - 及时销毁绑定事件
    - 组件懒加载
    - 减少造轮子的频率，防止代码重复
    - 减少组件渲染
    - 长列表优化
    - 首屏加载时间优化
  - 逻辑代码
    - 减少非必要的判断
    - 及时 catch 异常，减少白屏频率
  - 参考 [雅虎军规](https://developer.yahoo.com/performance/rules.html?guccounter=1)
- 网络层面

  - 完善重复请求取消的功能（axios 的 cancelToken）
  - 限制并发数量： 如果有 10 个请求，限制发起数量，分批发送，防止请求并发数拥堵
  - 上传文件时使用分片上传
  - 合理利用 http 缓存
  - 预解析 DNS
    - ```html
      <meta http-equiv="x-dns-prefetch-control" content="on" />
      <link rel="dns-prefetch" href="//host_name_to_prefetch.com" />
      ```
  - 异步加载
    - 异步加载的方式
      - 动态脚本加载
      - defer
      - async
    - 异步加载的区别
      - defer在HTML解析完成之后才执行，如果是多个，则按加载顺序依次执行
      - async是在加载完成之后立即执行，如果是多个，执行顺序和加载顺序无关
- 打包方面
  - 合并并压缩 js，css 等资源，减少 HTTP 请求
  - 将大体积的依赖通过 externals 字段，整合到 CDN 上请求，减小打包体积
  - 缩短打包时长： thread-loader, cache-loader
