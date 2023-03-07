---
title: "CSS3 - 实现背景图片自适应"
date: 2023-03-07T13:35:24+08:00
draft: false
tags:
 - Code
 - CSS
image: '/images/Code/css.png'
---

基本语法：background-size: length | percentage | cover |contain
 - length （设置背景图像的宽度和高度，如果只设置第一个值，第二个值将默认为auto）
 - percentage （以父元素的百分比来设置图片的宽度和高度）
 - cover （把背景图片扩展至足够大，使背景图像完全覆盖背景区域）
 - contain （把图像扩展至最大尺寸，以使宽度和高度完全适应内容区域）

## 图片高度自适应的几个方式
> 给图片设置width:100%;高度自适应
```html
<div><img src="./xxx.jpg" width="100%" /></div>
```
> 使用padding-top:(图片宽度/图片高度) * 100%
```html
<div class="wrapper"><img src="./xxx.jpg" /></div>

```

```css
.wrapper {
  position: relative;
  padding-top: 50%; // (图片高度/图片宽度)*100
  overflow: hidden;
}
.wrapper img {
  position: absolute;
  top: 0;
  width: 100%;
}
```

> 使用padding-top:(图片宽度/图片高度) * 100%
```html
<div class="wrapper">
  <div class="child"></div> 
</div>

```

```css
.wrapper {
  max-width: 1024px;
}
.child {
  padding-top: 37.5%; /* 720 / 1920 */
  background-image: url('xxxx.jpg');
  background-size: cover;
  background-position: center;
}
```
- 使用padding-top 保持宽高比
- 添加background-size: cover; 让背景铺满元素
- 兼容低版本浏览器使用background-position: center;
- 同时需要保证图片宽度最大等于父容器的宽度