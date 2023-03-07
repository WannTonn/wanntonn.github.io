---
title: '前端学习路线 - React'
date: 2023-02-19T19:35:24+08:00
draft: true
tags:
 - Code
image: '/images/Code/react.jpg'
---
<!--more-->

- 搞懂这12个Hooks，玩转React

  我们知道React Hooks有useState设置变量，useEffect副作用，useRef获取元素的所有属性，还有useMemo，useCallback来做性能优化，还有一个自定义Hooks，来创建自己想要的Hooks

  在写hooks之前先考虑以下几个问题：
  - Hooks的由来？
  - useRef的高级用法
  - useMemo和useCallback是怎么做优化的
  - 一个后端自定义Hooks该如何设计
  - 如何做一个不需要useState就可以直接修改属性并刷新视图的自定义hooks？
  - 如何做一个可以监听任何事件的自定义hooks？

  > 自定义hooks是什么？
  - react-hooks是React16.8以后新增的钩子API，目的是增加代码的可复用性，逻辑性，最主要的是解决了函数式组件无状态的问题，既保留了函数式的简单，又解决了没有数据管理状态的缺陷。
  - 什么是自定义hooks？
    - 自定义hooks是在react-hooks基础上的一个扩展，可以根据业务，需求去指定相应的hooks，将常用的逻辑进行封装，从而具备复用性
  