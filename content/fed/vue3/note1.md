---
title: '读书笔记之《Vue.js设计与实现》- 第一章'
date: 2023-01-28T13:35:24+08:00
draft: true
tags:
  - vue3
---
前言：做为读书时的笔记留存。

<!--more-->

- 框架的设计的范式
  - 命令式： 关注过程。（JQuery）
  - ```javascript
    // 实现获取id为app的div标签，修改其文本内容，添加点击后弹出ok的点击事件
    $('#app').text('hello world').on('click', () => alert('ok'));
    ```
  - 声明式： 关注结果。
  - ```html
    <div @click="() => alert('ok')">hello world</div>
    ```
  - 性能： 声明式代码 < 命令式代码
    - 命令式代码的更新性能消耗 = A
    - 声明式代码的更新性能消耗 = 找出差异的性能消耗 + A
