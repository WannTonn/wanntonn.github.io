---
title: "个人简历"
date: 2022-03-04T23:35:24+08:00
draft: false
image: '/images/CV/_avatar.jpg'
---

<!--more-->
## 个人信息
- 汪通 / 男 / 1994年
- 本科 / 电子商务专业 (2012-2016)
- 工作年限：6年 (2016.09 ~ 至今)
- 手机：18060476141
- Mail: wangtong@wanntonn.fun
- 技术博客: [https://blogs.wanntonn.fun ](https://blogs.wanntonn.fun)
<!-- - GitHub: [https://github.com/WannTonn](https://github.com/WannTonn) -->
- 期望职位： WEB前端工程师

## 工作经历
### 福建紫讯科技有限公司(2021.07 ~ 至今)(WEB前端工程师)
### 福州东西乐活科技有限公司(前：福州东西电子商务科技有限公司) (2018.08 ~ 2021.07)(WEB前端工程师)
### 福州票付通科技有限公司(2016.09 ~ 2018.08)(WEB前端工程师)
## 项目经历
> BSS后台（紫鸟业务支撑系统）(React+ typescript + umi + antd)
- 项目中出现许多基于Antd的基础组件重复复制粘贴的情况，作为项目维护者，将日常业务场景中的Input，Select，Modal等组件进行二次封装，降低了开发时重复复制，导致的代码冗余，降低了维护成本。
> 紫鸟开发者开放平台(React+ typescript + umi + antd)

> 紫鸟生态中心(React+ typescript + umi + antd)

> QuickFox（为海外华人提供快速回国的加速器）PC(Windows / MacOS) 客户端的开发与维护(React+ typescript + umi + antd + Electron)。
 - MacOS端出现由于HTTPS证书导致的应用无法正常打开的问题，作为项目维护者，在应用初始化前加入忽略证书的请求参数以跳过证书错误的方法的基础上。决定将版本升级至当时最新的版本（13版本修复了证书错误）。降低了应用打不开的反馈。
 - MacOS端上的Electron版本升级之后，由于语法更新，`上下文隔离(contextIsolation)`的写法改变，进而导致与webview内嵌页的通信失效。通过改写preload.js的写法，改写新的语法的同时，向下兼容旧版本的语法，解决新版本通信失效的问题。
 - MacOS下，Electron升级可能会导致LocalStorage数据丢失，进而在升级应用后存储在LocalStorage的数据丢失。通过引入`electron-store`，将数据存以二进制文件的形式存放在本地，降低了数据丢失的风险。

> 参与后台项目的开发与维护(React+ typescript + umi + antd)
 - 原项目的菜单结构较仅为2层，想调整为多层。在调整过程中遇到了路由配置等问题，为了用最少量的工作量来解决，通过修改所有文件目录的方式，配合umi的约定式路由，完成了对原来单页面下用tab切换的形式浏览到一个菜单一个页面的迁移，并完成了菜单多层渲染的开发。
 - 在原有的菜单的基础上，后来加入了模拟浏览器tab的方式，将路由映射成一个tab，实现多tab切换，有效提高了运营人员的效率。
> 参与APP应用内嵌页与官网页面的开发与维护(React+ typescript + umi + antd)

> 参与CCKA代充系统的开发与维护(React+ typescript + antd)
 - 原型中有大量的下拉筛选的Select场景，为避免重复拷贝代码，封装了带防抖与解决中文输入触发筛选的可配置是否发起请求的Select组件。
 - 封装其他场景中出现场景较频繁的小组件，极大的降低了重复性工作。

> 参与内部ERP系统 (Vue + Vue Router + Vuex + Antdv + axios + typescript)共同开发
 - 运用`vuejs-clipper`，编写了带即时预览功能的，上传手写签名照的组件，将白纸黑字的签名照替换成了透明底黑字的图片，并同步完成上传操作。
 - 完成项目业务组件以及通用组件的封装与完善，通过配置的形式完成页面功能。减少代码冗余，避免复制与修改代码带来的隐患。
 - 通用列表详情组件组件编写，整合列表组件与详情组件，通过传入配置，实现少代码就能快速完成页面渲染。
 - 添加通过路由拦截请求逻辑(cancelToken)，实现按需拦截与取消请求的功能。
 - 引入typescript，规范代码风格，减少写法上错误带来的bug。

> 独立开发基于内部ERP系统的内部工单系统 (Vue + Vue Router + Vuex + Antdv + axios + typescript)
 - case详情页面请求偏多(业务多，需要显示的内容多，请求个数大于浏览器请求并发数量)，网速偏慢的情况下，从页面A点击到页面B后。页面A请求回的内容会覆盖页面B，导致页面B的内容有误。通过引用 axios的cancelToken方案，添加路由配置，通过路由判断需要取消请求的路由。有效解决工单切换时由于接口请求响应慢导致的渲染错误。
 - case加载未清洗页面时，收到的邮件的样式覆盖了项目的部分样式。通过iframe来渲染外部case的URL，有效阻隔外部case的样式污染问题。

> 参与内部AIDE系统(Vue + Vue Router + Element + axios) 共同开发

### 福州票付通科技有限公司(2016.09 ~ 2018.08)
 > 参与PC端，手机端(微信)页面功能开发 (webpack + jq + Vue)
 
## 个人项目
- 个人博客项目（基于hugo + Jenkins+ github webhook + DingTalk）完成本地编写预览与编译，提交自动更新。解决github.io 更新不及时的问题。[预览地址: https://blogs.wanntonn.fun/](https://blogs.wanntonn.fun/) | [项目地址: https://github.com/WannTonn/wanntonn.github.io](https://github.com/WannTonn/wanntonn.github.io)
- 基于React + React-cropper 的关于手写签名图的预览、裁剪工具。[预览地址：https://wanntonn.github.io/signaturer/](https://wanntonn.github.io/signaturer/) | [项目地址:https://github.com/WannTonn/signaturer](https://github.com/WannTonn/signaturer)。
- 基于React + create-react-app 完成个人在项目中用到的TodoList，图片上传工具，提高了工作效率。 [预览地址：https://tools.wanntonn.fun](https://tools.wanntonn.fun) |  [https://tools.wanntonn.fun/imageUploader](https://tools.wanntonn.fun/imageUploader)
- 基于umi的自用通用Electron模板，electron外壳 + 个人页面项目。实现electron与页面项目隔离 | [项目地址：https://github.com/WannTonn/electron-umi-template](https://github.com/WannTonn/electron-umi-template)。

## 业余爱好
 - 黑苹果
 - 键盘客制化

## 致谢
感谢您花时间阅读我的简历，期待能有机会与您共事。