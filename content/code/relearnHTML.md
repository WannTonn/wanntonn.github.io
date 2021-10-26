---
title: "重学HTML"
date: 2021-08-02T23:24:27+08:00
draft: true
tags:
 - Code
image: '/images/Code/html5.jpg'
---


> 前言：菜了多年，重新学习前端，记录一些很不错的例子，转化为自己的知识储备。
<!--more-->

#### 参考不是抄，学到塞腰包。 - 我自己说的。

> 1. 重学HTML之 Button 的点击涟漪效果。
```html
// div部分
<div class="btn" id="Btn">Click me </div>
```

```css
// 按钮部分样式(根据自己喜好配置)
.btn {
  position: relative;
  display: inline-block;
  padding: 0 15px;
  height: 30px;
  line-height: 30px;
  border-radius: 45px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, .5);
}
// 涟漪遮罩部分样式
.layout {
  position: absolute;
  left: 0;
  top: 0;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: .5;
  background-color: rgba(0, 0, 0, .5);
  animation: blink .5s linear infinite;
}

// 涟漪动画
@keyframes blink {
  from {
    width: 0;
    height: 0;
    opacity: .5;
  }
  to {
    width: 400px;
    height: 400px;
    opacity: 0;
  }
}
```

```javascript
// js部分
  let Btn = document.querySelector('#Btn');
const blink = function (e) {
  let layout = document.createElement('span');
  layout.className = 'layout';
  let x = e.clientX - e.target.offsetLeft;
  let y = e.clientY - e.target.offsetTop;
  layout.style.left = x + 'px';
  layout.style.top = y + 'px';

  Btn.appendChild(layout);
  // 移除涟漪DOM
  setTimeout(() => {
    Btn.removeChild(layout);
  }, 500)

  // 绑定click事件
  Btn.onclick = blink;
}
```
- 希望不会烂尾。