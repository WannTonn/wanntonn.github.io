---
title: 'CSS - BFC'
date: 2023-03-10T09:30:24+08:00
draft: false
tags:
 - Code
 - Browser
image: '/images/Code/css.png'
---
<!--more-->
## 概念
BFC (Block Formatting Context) 块格式化上下文。是块级盒子的布局过程中发生的区域，也是浮动元素与其他元素交互的区域。

以下元素会创建格式化上下文：
- 根元素（<html>）
- 浮动元素(float 值不为none)
- 绝对定位元素 (position 值为 absolute / fixed)
- 行内块元素（display值为inline-block）
- 表格单元格（display值为table-cell，HTML表格单元格默认值）
- 表格标题（display值为table-caption，HTML表格单元格默认值）
- 匿名表格单元格元素（display值为table，table-row，table-row-group，table-header-group，table-footer-group（分别是 HTML table、tr、tbody、thead、tfoot 的默认值）或 inline-table）
- overflow 值不为visible/clop 的块元素
- display 值为 flow-root 的元素
- contain 值为 layout/content/paint的元素
- 弹性元素（display值为 flex/inline-flex元素的直接子元素），如果它们本身既不是flex/grid/table容器
- 网格元素 (display值为grid/inline-grid元素的直接子元素)，如果它们本身既不是flex/grid/table容器

## 格式化上下文会影响布局，通常我们会为 定位和清除浮动创建新的BFC，而不是更改布局。
### 因为BFC会
  - 包含内部浮动
  - 排除外部浮动
  - 阻止外边距重叠
## 盒模型
- 标准盒模型：由 内容、内边距、边框、外边距 组成
- 怪异盒模型（IE盒模型）： 宽度包含了  内容、内边距，边框
