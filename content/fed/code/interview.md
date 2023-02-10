---
title: '前端面试题、知识点收集'
date: 2023-01-30T23:35:24+08:00
draft: false
tags:
 - Code
image: '/images/Code/javascript.png'
---

<!--more-->

- 设置元素 background 的哪些区域颜色会改变

  - background 填充区域默认为 content、padding、border 区域。该行为由 background-clip 属性决定（默认 content-box）。以下为 background 的填充对应区域：
  - | background-clip     | margin | border | padding | content | text |
    | ------------------- | ------ | ------ | ------- | ------- | ---- |
    | border-box(default) | x      | √      | √       | √       | -    |
    | padding-box         | x      | x      | √       | √       | -    |
    | content-box         | x      | x      | x       | √       | -    |
    | text(webkit)        | x      | x      | x       | x       | √    |

- 重排与重绘
  - 区别： 重绘不一定需要重排（改变颜色），重排一定导致重绘（改变网页的位置）
  - 重排（reflow）
    - 当渲染树的一部分必须更新并且节点的尺寸发生了变化，浏览器会使渲染树当中受影响的部分失效，并重新构造渲染树。
  - 重绘（repaint）
    - 是在一个元素的外观被改变时触发的浏览器行为，浏览器会根据元素的新属性重新绘制，使得元素呈现新的外观。比如某个元素的 背景色，文字颜色，边框颜色等属性的改变。
  - 如何减少重排次数以及缩小重排的影响范围
    1. 将多次改变样式属性的操作，整合到一次中修改。
    2. 将需要多次重排的元素，使其脱离文档流（定义position属性为 absolute/fixed）。
    3. 如果对一个元素进行复杂的操作，可以先定义display属性为none，操作完成后再显示。
    4. 在需要经常获取那些引起浏览器重排的属性值时，先缓存到变量中。
- JavaScript的数据类型有哪些：
  - 基本类型： Number, String, Boolean, Undefined, Null, Symbol,
  - 引用类型： Function, Object, Array
  - 基本类型与引用类型的区别
    - 基本类型：基本类型的访问都是按值访问的，我们可以操作保存在变量中的实际的值。有如下特点：
      1. 基本类型的值不可变
      2. 基本类型的比较是值的比较
      3. 基本类型的变量是存放在栈区中（即内存中的栈内存）
    - 引用类型：可以拥有属性与方法，属性又可以包含基本类型与引用类型。有如下特点：
      1. 引用类型的值可变
      2. 引用类型的比较是引用的比较
      3. 引用类型的值是同时保存在栈内存和堆内存中的对象
- 判断一个对象是不是数组
  - ```javascript
    let object = {};
    Array.isArray(object);
    ```
  - ```javascript
    let object = {};
    Object.prototype.toString.call(object).includes('Array')
    ```
- JS事件循环机制
  - Event Loop包含两类，二者独立运行
    - 基于Browsing Context
    - 基于 Worker
  - 任务队列
    - 任务可以分为同步任务和异步任务。
    - 同步任务：立即执行的任务，同步任务一般会直接进入到主线程中进行。
    - 异步任务：异步执行的任务（Ajax，setTimeout），异步任务会通过任务队列（Event Queue）的机制来协调。
    - 事件循环中，每进行一次循环操作称为一个tick。每次tick的任务处理模型如下：
      1. 在此次tick中选择最先进入队列的任务（oldest task）,如果有则执行（一次）
      2. 检查是否存在Microtasks，如果存在则不断执行，直到Microtask Queue清空
      3. 更新render
      4. 主线程重复执行上述步骤
- 深拷贝与浅拷贝
  - 深拷贝（Deep Clone）：从堆内存中开辟一个新的区域存放新对象，将对象中的子对象进行递归拷贝，拷贝前后的两个对象互不影响。
  - 实现方式：
    1. JSON.parse(JSON.stringify())
    2. lodash 库的 _.deepClone
    3. jQuery
  - 浅拷贝（Shallow Clone）： 重新在堆中创建内存，拷贝前后对象的基本数据类型互不影响，但拷贝前后对象的引用类型因共享同一块内存，会相互影响。
  - 实现方式：
    1. Object.assign
    2. lodash 库的 _.clone
    3. 展开运算符 ...
    4. Array.prototype.concat()
    5. Array.prototype.slice()
- 箭头函数
  - 不绑定this，其中的this指向函数定义位置的上下文this
  - 内部不存在arguments和new.target，使用的都是外部的
  - 没有原型，占用内存空间小

- JS垃圾回收方法
  - JavaScript具有自动垃圾回收机制（GC：Garbage Collection）
  - 原理：垃圾收集器会定期（周期性）找到不再继续使用的变量，销毁并释放内存
    1. 标记清除法：在函数声明一个变量的时候，就将这个变量标记为”进入环境“
    2. 引用计数法：引用计数的含义是跟踪记录每个值被引用的次数，当被引用次数为0的时候，就将其占用的内存空间回收


- 如何监听一个变量的变化 长度 index
  - defineProperty
    - ```javascript
      var targetObject = {targetVal: 0};
      var latestVal = targetObject.targetVal;
      Object.defineProperty(targetObejct, 'targetVal', {
        get: function() {
          console.log('get:' + targetVal);
          return targetVal;
        },
        set: function(val) {
          targetVal = val;
          if (latestVal !=  targetVal) {
            latestVal = targetVal;
            console.log('value changed. set: ' + targetVal);
          }
        }
      })

      targetObject.targetVal = 1;
      ```
  - Proxy
    - ```javascript
      let observer = (object, onChange) => {
        const handler = {
          get(target, property, receiver) {
            try {
              return new Proxy(target[property], handler);
            } catch (err) {
              return Reflect.get(target, property, receiver);
            }
          },
          set(target, key, value, receiver) {
            onChange(value);
            return Reflect.set(target, key, value, receiver);
          }
        }
        return new Proxy(object, handler);
      }

      let obj = {
        foo: 'abcd',
        a: {
          x: {y: 'z'},
          b: [{c: false}]
        }
      };
      let watchedObj = observer(obj, (val) => {
        console.log(`监听到值变化为${val}`);
      });
      watchedObj.foo = 'efgh';
      watchedObj.a.x.y = 'a';
      watchedObj.a.b[0] = true;
      ```

- webpack loader / plugin
  - loader的使用方式
    - 1.在webpack.config.js中配置
      ```
      module.exports = {
        module: {
          rules: [
            {
              test: /\.txt$/,
              use: 'raw-loader'
            }
          ]
        }
      }
      ```
    - 2.通过命令行参数方式
      ```
      webpack --module-bind 'txt=raw-loader'
      ```
    - 3.通过内联使用
      ```
      import txt from 'raw-loader!./file.txt'
      ```
  - 常用的loader
    - 样式：style-loader, css-loader, less-loader, sass-loader等
    - 文件：raw-loader, file-loader, url-loader等
    - 编译：babel-loader, coffee-loader, ts-loader等
    - 测试：mocha-loader, jshint-loader, eslint-loader等
-  地址栏输入一个URL地址到页面渲染的过程发生了什么
  - HTTP请求准备阶段
    - 1. 构建请求：浏览器构建请求行信息，准备发起网络请求 GET /index.html HTTP1.1
    - 2. 查找缓存：如果浏览器发现请求的资源存在副本，根据强缓存规则，如果没有过期，则返回资源，如果查找失败则进入下一个环节：
      - 1. 准备ip地址和端口
      - 2. DNS（域名和ip的映射系统）域名解析，拿到ip之后找端口，默认端口为80
      - 3. 建立TCP链接（三次握手，四次挥手）
      - 4. 如果是https还需建立TLS连接
  - HTTP发送请求
    - 浏览器向服务器发起http请求，把请求头和请求行一起发送给服务器，服务端解析请求头。如果发现cache-control和etag(if-none-match)，if-modified(if-modified-since)字段就会判断缓存是否过期，如果没有就返回304，否则返回200
  - HTTP响应返回
    - 浏览器拿到响应数据，首先判断是否是4XX或者5XX是就报错，如果是3XX就要重定向，2XX就开始解析文件，如果是gzip就解压文件
    - TCP断开连接
    - 4次挥手
    - 浏览器解析渲染
    - 根据HTML建立DOM树与CSS树，如果遇到script首选判断是否defer和async否则会阻塞渲染并编译执行js，如果没有则组合生成render tree，最后浏览器开启GPU进行绘制合成涂层，将内容显示到屏幕。

- content-type的作用
  - Content-Type实体头部用于指示资源的MIME类型 media type。
  - 在响应中，Content-Type标头告诉客户端实际返回的内容的内容类型。浏览器会在某些情况下进行MIME查找，并不一定遵循此标题的值。为了防止这种行为，可以将标题X-Content-Type-Options 设置为nosniff。
  - 在请求中（如POST/PUT等），客户端告诉服务器实际发送的数据类型。
  - Content-Type的值类型：
    - 1. application/json: 消息主体是序列化后的JSON字符串
    - 2. application/x-www-form-urlencded: 数据被编码为名称/值对。这是标准的编码格式
    - 3. multipart/form-data: 需要在表单中进行文件上传时，就需要使用该格式。常见的媒体格式是上传文件时使用的
    - 4. text/plain: 数据以纯文本形式（text/json/xml/html）进行编码，其中不含任何控件或格式字符
- 状态码介绍
  - |状态码|解析|
    |---|---|
    |1**|信息，服务器收到请求，需要请求者继续执行操作|
    |2**|成功，操作被成功接收并处理|
    |3**|重定向，需要进一步的操作以完成请求|
    |4**|客户端错误，请求包含语法错误或无法完成请求|
    |5**|服务器错误，服务器在处理请求的过程中发生了错误|
  - 301：（永久移动）请求的网页已被永久移动到新位置。服务器返回此响应（作为对GET或HEAD请求的响应）时，会自动将请求者转到新位置
  - 302：（临时移动）服务器目前正从不同位置的网页响应请求，但请求者应继续使用原有位置来进行以后的请求。此代码与响应GET和HEAD请求的301代码类似，会自动将请求者转到不同的位置
  - HTTP状态码301与302的区别
    - 1. 关键区别为，资源是否存在有效性
    - 2. 301资源还在只是换了一个位置，返回的是新位置的内容
    - 3. 302资源暂时失效，返回的是一个临时的代替页
- 怎么减少页面加载时间
  - 压缩css, js文件
  - 合并js，css文件，减少http请求
  - 外部js，css文件，放在文件最底下
  - 减少dom操作，尽可能用变量替代不必要的dom操作
  - 优化图像（格式选择，懒加载等）
  - 使用CDN
  - 使用缓存
  - 合并文件，合并图片，减少http请求 
  - 标明高度和宽度
  - 网址后加斜杆
  - 优化TCP协议
- 撇开 Vue，react，等框架。你认为前端应该会的技能（知识点）有哪些
- 对前端工程化的理解
- 能否徒手从零构建一个工程化项目
- 类的使用的理解, 新建一个 Person 类，用构造函数定义 setName, getName, 并用 User 继承 Person 类。
- 对 typescript 的理解，平时是否有写过脱离框架的 ts 的使用
- 是否封装过组件？是如何封装的
- Vue 业务层的代码是如何编写的
- 怎么实现跨域请求数据
- 响应式和自适应
  - 响应式(RWD) && 自适应(AWD)
    - 响应式(RWD): 所有设备的代码是一样的；自适应(AWD): 不同设备的代码是不一样的
    - RWD: Ethan.M 提出 RWD 是采用 CSS 的 media query 技术，配合流体布局(fluid grids) 和同样可以自适应的图片/视频等素材。RWD 倾向于只改变元素的外观布局，而不大幅度改变内容。
    - AWD：Adaptive Design 是 Aaron G. 的一本技术书的标题,他认为 AWD 在包括 RWD 的 CSS media query 技术以外，AWD 有可能会针对移动端用户减去内容，减去功能。AWD 可以在服务器端就进行优化，把优化的内容送到终端上。

- 排序算法
- 设计模式，在 Vue 中 或在开发过程中，有哪些常用的开发模式
- 你对前端工程化的理解
- 为什么要前端工程化
- 前端性能优化的手段有哪些
- HTTP 缓存
- Vue 数据驱动原理
- Vue 如何让视图刷新
- webpack 配置中，生产环境与生产环境的不同配置

