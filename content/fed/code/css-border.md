---
title: "CSS - 实现渐变色边框"
date: 2022-10-01T13:35:24+08:00
draft: false
tags:
 - Code
 - CSS
image: '/images/Code/javascript.png'
---


前言： 在网上看到一个样式很“新奇”的Input，特想复刻一个出来。

<!--more-->
参考来自 [CSS实现渐变色边框（Gradient borders）的5种方法](https://segmentfault.com/a/1190000040794056)。感谢作者的思路


### 使用 border-image
```html
...
<input class="inp" type="text" />
...
```

```css
.inp {
  width: 100px;
  height: 20px;
  border: 2px solid;
  border-radius: 10px; /* 这种方法不支持配置border-radius */
  border-image: repeating-linear-gradient(45deg, #979696, #000, #000, #9a9999) 1;
}

```

### 伪元素
```html
...
<div class="box">
  该方案对Input标签无效，需用在Input外层的div
</div>
...
```

```css
.box {
  position: relative;
  /* width: 100px; */
  height: 20px;
  border: 4px solid transparent;
  border-radius: 16px;
  background-color: #f1f1f1;
  /*important*/
  background-clip: padding-box;
}

.box::before {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  content: '';
  z-index: -1;
  margin: -4px;
  border-radius: inherit;
  /*important*/
  background: linear-gradient(45deg, #979696, #000, #000, #9a9999);
}

```

### 
```html
...
<input class="inp" type="text" />
...
```

```css
.inp {
  border: 4px solid transparent;
  border-radius: 16px;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image: linear-gradient(to right, #fff, #fff), linear-gradient(190deg, #233, #fff, #233);;
}
```
