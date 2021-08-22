---
title: '手搓动画之画浇水动画'
date: 2021-08-14T20:35:24+08:00
keywords:
  - animation
description: 'animation'
---

> 前言: 需求推动技术前进，这次来学习动画之 - 浇水动画

<!--more-->

### 💧 浇水，俺们先从水滴开始画。

- 可以将水滴分成 2 个部分(等边三角形 + 圆形)，重叠在一起，写一个简单的 🌰。
- 如何用 css 画图形 ---> [用 CSS 绘制最常见的 40 种形状和图形](https://www.webhek.com/post/40-css-shapes.html)

```html
// index.html
<div class="drip">
  <div class="part1"></div>
  <div class="part2"></div>
</div>
```

```css
// style.css
.drip {
  position: relative;
  width: 30px;
  height: 50px;
  transform: rotate(45deg); // 整体有一个斜率
}
.drip .part1 {
  position: absolute;
  width: 0;
  height: 0;
  top: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 30px solid #0482c1;
}
.drip .part1 {
  position: absolute;
  width: 30px;
  height: 30px;
  bottom: 2px;
  border-radius: 50%;
  background: #0482c1;
}
```

#### 或者只用一个 div，巧用:after, 代码如下

```html
// index.html
<div class="drip"></div>
```

```css
// style.css
.drip {
  transform: rotate(45deg);
  position: relative;
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 30px solid #0482c1;
  &:after {
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    left: -15px;
    bottom: -50px;
    border-radius: 50%;
    background: #0482c1;
  }
}
```
