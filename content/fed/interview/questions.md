---
title: '前端面试题、知识点收集'
date: 2023-01-30T23:35:24+08:00
draft: false
tags:
  - Code
image: '/images/Code/javascript.png'
---

<!--more-->
- 实现一个函数validateStr，校验"[],{}), [()]"等是否匹配
  - ```javascript
    // 思路:
    // 1. 遍历字符串的每一个字符
    // 2. 如果是左半部分则直接push入栈
    // 3. 如果是右半部分，则将栈顶的第一个元素取出来与当前的元素进行对比，如果不匹配，return false，如果匹配，则出栈遍历完之后判断栈内是否为空。
    function validateStr(str) {
      // 定义一个map做映射
      const strMap = {
        '{': '}',
        '[': ']',
        '(': ')'
      };
      // 定义一个栈
      let arr = [];
      // 遍历str字符串
      for (let i of str) {
        // 如果是左半部分，就push入栈
        if (strMap[i]) {
          arr.push(i);
        } else if (Object.values(strMap).includes(i)) {
          // 右半部分 将当前的元素和栈顶的第一个元素进行匹配
          let top = arr.pop();
          if (i !== strMap[top]) return false;
        } else {
          return false;
        }
      }
      // 遍历完成后要保证栈的长度为0
      return arr.length === 0;
    }
    ```
- 谈谈 Vue 和 React 这 2 个框架的理解与区别

  - 两个框架都提倡组件化，都是通过虚拟 DOM 高效实现更新视图。都使用了 diff 算法，也都对 diff 算法进行了优化。都有 router 库实现 URL 到组件的映射，都有状态管理等。
  - 什么是组件化？
    - 组件是独立和可复用的代码组织单元，使开发者使用小型，独立和通常可复用的组件构建大型应用
    - 组件化开发能大幅提高应用 开发效率，测试性，复用性
    - 降低整个系统的耦合度，在保持接口不变的情况下，可以替换不同的组件快速完成需求。eg：输入框，日历，时间组件等。
    - 调试方便。由于整个系统通过组件组合，在出现问题的时候，可以用排除法移除组件，或根据报错定位。由于每个组件之间低耦合，指责单一，所以逻辑会比分析整个系统简单
    - 提高可维护性。组件指责单一，并且组件在系统中是复用的，所以对代码进行优化可以获得系统的整体升级。
  - 虚拟 DOM
    - 什么是虚拟 DOM
      - 虚拟 DOM（Virtual DOM）本质上是 JS 和 DOM 之间的一个映射缓存，它在形态上表现为一个能描述 DOM 结构及其属性信息的 JS 对象。它主要存储在内存中。主要来说：
        - 虚拟 DOM 是一个 JS 对象，存储在内存之中
        - 虚拟 DOM 能够描述真实 DOM（存在一个映射关系）
        - 当数据变化的时候，生成新的 DOM，对比新旧虚拟 DOM 的差异，将差异更新到真实 DOM 上
    - 虚拟 DOM 的优点
      - 减少 DOM 操作：虚拟 DOM 可以将多次 DOM 操作合并为一次操作
      - 研发效率的问题：虚拟 DOM 的出现，为数据驱动视图这一思想提供了高度可用的载体，使得前端开发能够基于函数式 UI 的编程方式实现高效的声明式编程。
      - 跨平台的问题：虚拟 DOM 是对真实渲染内容的一层抽象。同一套虚拟 DOM，可以对接不同平台的渲染逻辑，从而实现“一次编码，多端运行”
  - React 和 Vue 中虚拟 DOM 的相同点
    - 二者都使用了 VirtualDOM + Diff 算法。不管是 Vue 的 Template + Options api 写法，还是 React 的 Class/Function 写法，最后都是生成 render 函数。而 render 函数执行返回 VNode（虚拟 DOM 的数据结构，本质上是一棵树）。当每一次 UI 更新的时候，总会根据 render 重新生成的 VNode，跟之前缓存起来的老 VNode 进行比对时，再使用 Diff 算法（框架核心）去真正更新真实 DOM（虚拟 DOM 是 JS 对象结构，同样在 JS 引擎中，在真实 DOM 在浏览器渲染引擎中，所以操作虚拟 DOM 比操作真实 DOM 开销要小的多）
    - （Vue Template/React JSX） -> render 函数 -> 生成 VNode -> 新老 VNode 进行 diff 算法对比 -> 更新真实 DOM
    - diff 算法源码实现的相同之处
      - 在处理老节点的部分，都需要把节点处理 key - value 的 Map 数据结构，方便在往后的比对中可以快速通过节点的 key 取到对应的节点。同样在比对两个新老节点是否相同时，key 是否相同也是非常重要的判断标准。所以不同是 React/Vue，在写动态列表的时候都需要设置一个唯一值 key，这样在 diff 算法处理的时候性能才能最大化。
  - React 和 Vue 中虚拟 DOM 的差别
    - DOM 的更新策略不同
      - 在 React 中，当状态改变时，组件树会自顶向下全 diff，重新 render 页面。重新生成新的虚拟 DOM tree，新旧 DOM tree 进行比较，进行 patch 打补丁方式，局部更新 DOM。所以 React 为了避免父组件更新而引起不必要的子组件更新，可以在 shouldComponenUpdate 做逻辑判断，减少没必要的 render，以及重新生成虚拟 DOM，做差量对比过程
      - 在 vue 中，通过 Object.defineProperty 把 data 属性全部转为 getter/setter。同时 watcher 实例对象会在组件渲染时，将属性记录为 dep，当 dep 项中的 setter 被调用时，通知 watcher 重新计算，使得关联组件更新。
    - Diff 算法借助元素的 key 判断元素是新增、删除、修改，从而减小不必要的元素重渲染。
    - Diff 算法实现不同之处
      - React 的 diff
        - 声明 newChildren 就是即将更新的 jsx 对象
        - 1. 当 newChildren 类型为 object,number,string,代表同级只有一个节点
          - 检查上次更新时的 fiber 节点是否存在对应的 DOM 节点
            - 存在：DOM 节点是否可以复用（通过 tag 和 key 进行判断）
              - 可以：将上次更新的 fiber 节点副本作为本次新生成的 fiber 节点并返回
              - 不可以：标记当前节点为待删除节点，新生成一个 fiber 节点并返回
            - 不存在：新生成一个 fiber 节点并返回
        - 2. 当 newChildren 类型为 Array，同级有多个节点，会进行两次遍历：
          - 第一层遍历：
            - 遍历 newChildren, i = 0,将 newChildren[i] 与 oldFiber 比较，判断 DOM 节点是否可以复用
            - 如果可以复用，i++，比较 newChildren[i]与 oldFiber.sibling 是否可以复用。可以复用则重复此步骤。
            - 如果不可复用，立即跳出遍历。
            - 如果 newChildren 遍历完或者 oldFiber 遍历完(oldFiber.sibling === null)。跳出遍历。
          - 第二轮遍历：第二轮遍历的时候会将剩余未比较的老节点好剩余未比较的新节点进行遍历
            - newChildren 没遍历完，oldFiber 遍历完：遍历余下的 newChildren 依次进行插入
            - newChildren 遍历完，oldFiber 没遍历完：遍历余下的 oldFiber 依次进行删除
            - newChildren 与 oldFiber 都没遍历完：意味着有节点在这次更新中改变了位置
        - 更多 React-diff [点击](https://juejin.cn/post/6844904167472005134)
      - Vue 的 diff
        patch 函数会接受两个参数： oldVnode 和 VNode
        - 1.只有新节点：createElm 创建新的节点
        - 2.只有旧节点：删除旧节点
        - 3.新旧节点都存在：通过 sameVNode 判断节点是否一样
          - 一样：直接调用 patchNode 去处理
            - VNode 是文本节点，则更新文本
            - VNode 有子节点，则处理比较更新节点
              - 新旧节点都有子节点，而且不一样，那么执行 updateChildren(维持新旧节点首尾的四个指针进行遍历对比，遵循的原则：能不移动，尽量不移动，不行就移动，实在不行就新建)
              - 只有新子节点：执行创建
              - 只有旧子节点：执行删除
          - 不一样：直接创建新节点，删除旧节点
    - 数据驱动视图（数据变化的时候，相应的视图会得到更新。开发者只需要关注数据的变化而不用再手动操作 DOM）

      - Vue 中的数据驱动视图（Vuejs 的数据驱动是通过 MVVM 来实现的。MVVM 框架主要包含 3 个部分：model、view 和 viewModel）

        - Model：数据部分，对应到前端就是 JavaScript 对象
        - View：视图部分，对应前端 DOM
        - ViewModel：连接视图与数据的中间件。ViewModel 是实现数据驱动视图的核心，当数据变化的时候，ViewModel 能够监听到这种变化，并及时通知 view 做出修改。同样的。当页面有事件触发的时候，ViewModel 也能够监听到事件，并通知 model 进行响应。ViewModel 相当于一个观察者，监控双方的动作，并及时通知对方进行相应的操作。首先，vuejs 在实例化的过程中，会对遍历传给实例化对象选项中的 data 选项，遍历其所有属性并使用 Object.defineProperty 把这些属性全部转为 getter/setter。
          同时每一个实例对象都有一个 watcher 实例对象，他会在模板编译的过程中,用 getter 去访问 data 的属性，watcher 此时就会把用到的 data 属性记为依赖，这样就建立了视图与数据之间的联系。
          当之后我们渲染视图的数据依赖发生改变（即数据的 setter 被调用）的时候，watcher 会对比前后两个的数值是否发生变化，然后确定是否通知视图进行重新渲染。这样就实现了所谓的数据对于视图的驱动。

      - React 的数据驱动视图
        先了解一些列内容：
        - pending： 当前所有等待更新的 state 队列
        - isBatchingUpdates: React 中用于标识当前是否处理批量更新状态，默认 FALSE。
        - dirtyComponent：当前所有待更新 state 的组件队列
          React 通过 setState 实现数据驱动视图，通过 setState 来引发一次组件的更新过程从而实现页面的重新渲染（除非 shouldComponentUpdate 返回 FALSE）。
          - setState() 首先将接收的第一个参数 state 存储在 pending 队列中
          - 判断当前 React 是否处于批量更新状态，是的话就需要更新 state 的组件添加到 dirtyComponent 中
          - 不是的话，它会遍历 dirtyComponent 所有组件，调用 updateComponent 方法更新每个 dirty 组件

- 单页应用路由的实现原理（监听 URL 变化，渲染不同的页面组件）
  主要有 history 和 hash 模式

  - history 模式
    - 1.改变路由 
      -（history.pushState）
        ```javascript
        // state：一个与指定网址相关的状态对象，popstate事件触发时，该对象会传入回调函数。如果不需要可以填null
        // title：新页面的标题。但是所有浏览器目前都忽略这个值，可填null
        // path：新的网址，必须与当前页面处在同一个域。浏览器的地址将显示这个地址。
        history.pushState(state, title, path);
        ```
      - （history.replaceState(state, title, path)）
      - 与 history.pushState 一样，这个方法会修改当前的 history 对象记录，history.length 的长度不会改变
    - 2.监听路由
      -（popstate事件）
        ```javascript
        window.addEventListener('popstate', function(e) {
          // 监听改变
        })
        ```
        同一个文档的history对象出现变化时，会触发popstate事件，history.pushState可以使浏览器地址改变，但是无需刷新页面。注意的是：用history.pushState()或history.replaceState()不会触发popstate事件。popstate事件只会在浏览器某些行为下触发（点击后退，前进按钮 或调用history.back(),history.forward(),history.go()方法）
  - hash模式
    - 1.改变路由
      通过`window.location.hash`属性获取和设置hash的值
    - 2.监听路由
      onhashchange
      ```javascript
      window.addEventListener('hashchange', function(e) {
        // 监听改变
      })
      ```
- package.json
  - 什么是 package.json
  - package.json 中的 dependency 与 devDpendency 字段的区别
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
    2. 将需要多次重排的元素，使其脱离文档流（定义 position 属性为 absolute/fixed）。
    3. 如果对一个元素进行复杂的操作，可以先定义 display 属性为 none，操作完成后再显示。
    4. 在需要经常获取那些引起浏览器重排的属性值时，先缓存到变量中。
- JavaScript 的数据类型有哪些：
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
    Object.prototype.toString.call(object).includes('Array');
    ```
- JS 事件循环机制
  - Event Loop 包含两类，二者独立运行
    - 基于 Browsing Context
    - 基于 Worker
  - 任务队列
    - 任务可以分为同步任务和异步任务。
    - 同步任务：立即执行的任务，同步任务一般会直接进入到主线程中进行。
    - 异步任务：异步执行的任务（Ajax，setTimeout），异步任务会通过任务队列（Event Queue）的机制来协调。
    - 事件循环中，每进行一次循环操作称为一个 tick。每次 tick 的任务处理模型如下：
      1. 在此次 tick 中选择最先进入队列的任务（oldest task）,如果有则执行（一次）
      2. 检查是否存在 Microtasks，如果存在则不断执行，直到 Microtask Queue 清空
      3. 更新 render
      4. 主线程重复执行上述步骤
- 深拷贝与浅拷贝
  - 深拷贝（Deep Clone）：从堆内存中开辟一个新的区域存放新对象，将对象中的子对象进行递归拷贝，拷贝前后的两个对象互不影响。
  - 实现方式：
    1. JSON.parse(JSON.stringify())
    2. lodash 库的 \_.deepClone
    3. jQuery
  - 浅拷贝（Shallow Clone）： 重新在堆中创建内存，拷贝前后对象的基本数据类型互不影响，但拷贝前后对象的引用类型因共享同一块内存，会相互影响。
  - 实现方式：
    1. Object.assign
    2. lodash 库的 \_.clone
    3. 展开运算符 ...
    4. Array.prototype.concat()
    5. Array.prototype.slice()
- 箭头函数

  - 不绑定 this，其中的 this 指向函数定义位置的上下文 this
  - 内部不存在 arguments 和 new.target，使用的都是外部的
  - 没有原型，占用内存空间小

- JS 垃圾回收方法

  - JavaScript 具有自动垃圾回收机制（GC：Garbage Collection）
  - 原理：垃圾收集器会定期（周期性）找到不再继续使用的变量，销毁并释放内存
    1. 标记清除法：在函数声明一个变量的时候，就将这个变量标记为”进入环境“
    2. 引用计数法：引用计数的含义是跟踪记录每个值被引用的次数，当被引用次数为 0 的时候，就将其占用的内存空间回收

- 如何监听一个变量的变化 长度 index

  - defineProperty

    - ```javascript
      var targetObject = { targetVal: 0 };
      var latestVal = targetObject.targetVal;
      Object.defineProperty(targetObejct, 'targetVal', {
        get: function () {
          console.log('get:' + targetVal);
          return targetVal;
        },
        set: function (val) {
          targetVal = val;
          if (latestVal != targetVal) {
            latestVal = targetVal;
            console.log('value changed. set: ' + targetVal);
          }
        },
      });

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
          },
        };
        return new Proxy(object, handler);
      };

      let obj = {
        foo: 'abcd',
        a: {
          x: { y: 'z' },
          b: [{ c: false }],
        },
      };
      let watchedObj = observer(obj, (val) => {
        console.log(`监听到值变化为${val}`);
      });
      watchedObj.foo = 'efgh';
      watchedObj.a.x.y = 'a';
      watchedObj.a.b[0] = true;
      ```

- webpack loader / plugin
  - loader 的使用方式
    - 1.在 webpack.config.js 中配置
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
  - 常用的 loader
    - 样式：style-loader, css-loader, less-loader, sass-loader 等
    - 文件：raw-loader, file-loader, url-loader 等
    - 编译：babel-loader, coffee-loader, ts-loader 等
    - 测试：mocha-loader, jshint-loader, eslint-loader 等
- 地址栏输入一个 URL 地址到页面渲染的过程发生了什么
- HTTP 请求准备阶段
  - 1. 构建请求：浏览器构建请求行（请求头，请求体）信息，准备发起网络请求 GET /index.html HTTP1.1
  - 2. 查找缓存：如果浏览器发现请求的资源存在副本，根据强缓存规则，如果没有过期，则返回资源，如果查找失败则进入下一个环节：
    - 1. 准备 ip 地址和端口
    - 2. DNS（域名和 ip 的映射系统）域名解析，拿到 ip 之后找端口，默认端口为 80
    - 3. 建立 TCP 链接（三次握手，四次挥手）
    - 4. 如果是 https 还需建立 TLS 连接
- HTTP 发送请求
  - 浏览器向服务器发起 http 请求，把请求头和请求行一起发送给服务器，服务端解析请求头。如果发现 cache-control 和 etag(if-none-match)，if-modified(if-modified-since)字段就会判断缓存是否过期，如果没有就返回 304，否则返回 200
- HTTP 响应返回

  - 浏览器拿到响应数据，首先判断是否是 4XX 或者 5XX 是就报错，如果是 3XX 就要重定向，2XX 就开始解析文件，如果是 gzip 就解压文件
  - TCP 断开连接
  - 4 次挥手
  - 浏览器解析渲染
  - 根据 HTML 建立 DOM 树与 CSS 树，如果遇到 script 首选判断是否 defer 和 async 否则会阻塞渲染并编译执行 js，如果没有则组合生成 render tree，最后浏览器开启 GPU 进行绘制合成涂层，将内容显示到屏幕。

- content-type 的作用
  - Content-Type 实体头部用于指示资源的 MIME 类型 media type。
  - 在响应中，Content-Type 标头告诉客户端实际返回的内容的内容类型。浏览器会在某些情况下进行 MIME 查找，并不一定遵循此标题的值。为了防止这种行为，可以将标题 X-Content-Type-Options 设置为 nosniff。
  - 在请求中（如 POST/PUT 等），客户端告诉服务器实际发送的数据类型。
  - Content-Type 的值类型：
    - 1. application/json: 消息主体是序列化后的 JSON 字符串
    - 2. application/x-www-form-urlencded: 数据被编码为名称/值对。这是标准的编码格式
    - 3. multipart/form-data: 需要在表单中进行文件上传时，就需要使用该格式。常见的媒体格式是上传文件时使用的
    - 4. text/plain: 数据以纯文本形式（text/json/xml/html）进行编码，其中不含任何控件或格式字符
- 状态码介绍
  - | 状态码 | 解析                                           |
    | ------ | ---------------------------------------------- |
    | 1\*\*  | 信息，服务器收到请求，需要请求者继续执行操作   |
    | 2\*\*  | 成功，操作被成功接收并处理                     |
    | 3\*\*  | 重定向，需要进一步的操作以完成请求             |
    | 4\*\*  | 客户端错误，请求包含语法错误或无法完成请求     |
    | 5\*\*  | 服务器错误，服务器在处理请求的过程中发生了错误 |
  - 301：（永久移动）请求的网页已被永久移动到新位置。服务器返回此响应（作为对 GET 或 HEAD 请求的响应）时，会自动将请求者转到新位置
  - 302：（临时移动）服务器目前正从不同位置的网页响应请求，但请求者应继续使用原有位置来进行以后的请求。此代码与响应 GET 和 HEAD 请求的 301 代码类似，会自动将请求者转到不同的位置
  - HTTP 状态码 301 与 302 的区别
    - 1. 关键区别为，资源是否存在有效性
    - 2. 301 资源还在只是换了一个位置，返回的是新位置的内容
    - 3. 302 资源暂时失效，返回的是一个临时的代替页
- 怎么减少页面加载时间
  - 压缩 css, js 文件
  - 合并 js，css 文件，减少 http 请求
  - 外部 js，css 文件，放在文件最底下
  - 减少 dom 操作，尽可能用变量替代不必要的 dom 操作
  - 优化图像（格式选择，懒加载等）
  - 使用 CDN
  - 使用缓存
  - 合并文件，合并图片，减少 http 请求
  - 标明高度和宽度
  - 网址后加斜杆
  - 优化TCP协议
- 为什么要选择Vue，Vue解决了哪些问题
- 对Vue生命周期的理解
- v-if / v-show的区别
- Vue.js中 组件之间的通信手段
- Vue中的数据双向绑定
- 对浏览器与静态资源的理解
- 对interator的理解
- 静态资源更新如何通知用户刷新页面
- 自身有什么优势
- 如果让你实现一个基本的双向数据绑定，有什么思路
- MVVM 和 MVC 有什么区别
- 前端自动化测试框架的使用经历
- JS 中的数据类型
- JS 中 == 和 === 的区别
- JS 中的深拷贝与浅拷贝有什么区别
- 如何实现一个深拷贝，有哪些思路
- 描述一下 对原型，构造函数，实例的理解
- 什么是闭包？闭包解决了什么问题？闭包会导致什么问题？
- 如何理解 JS 中的 this 关键词
- 做项目的时候是否碰到过跨域的问题？如何解决的？
- P 元素和 div 元素，都是块元素，二者有什么区别
- 谈谈对 CSS 盒模型的理解
- 如何水平/垂直居中一个页面元素？有哪些实现方式
- 清除浮动的方式有哪些？它们之间有什么区别？
- 描述一下重绘和回流的区别
- 实现响应式布局的方式有哪些
- 有没有使用过 css 框架
- 当在浏览器输入 URL 到页面显示，中间过程发生了哪些事情？
- 在项目中遇到过哪些问题，当时是怎么解决的
- 项目中有哪些亮点可以分享
- package.json 有什么作用？包含了哪些内容
- 对 webpack 的使用有哪些优化建议

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

- tasiting
- 一面
  - 自我介绍
  - react 与 Vue之间的区别
  - 对react的fiber的理解
  - 对ECMA Script的API的理解
  - 对性能优化的理解
  - 谈谈你对xxx公司的认识/ 你觉得xxx公司怎么样
  - 你认为你有哪些优势（加入公司）
  - 职业规划是什么
  - 离职原因
- 二面
  - 做一下自我介绍
  - 离职原因
  - 在项目中有碰到哪些问题，是怎么解决的（方案，思路）
  - 如果在开发过程中遇到问题，你会怎么做
  - 你有哪些优点，缺点
  - 近期有哪些职业规划
  - 你认为团队开发哪些点比较重要
  - 技术分享相关
  - 是否有维护文档
  - 你的期望薪资是多少
  - 是否有了解考证
