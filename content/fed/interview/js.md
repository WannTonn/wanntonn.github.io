---
title: '前端学习路线 - Javascript'
date: 2023-02-17T23:35:24+08:00
draft: false
tags:
  - Code
image: '/images/Code/javascript.png'
---

<!--more-->

- 执行上下文

  - 什么是执行上下文（context）
    - 是评估和执行 JavaScript 代码环境的抽象概念，每当 JavaScript 代码运行的时候，它都是在执行上下文中运行
  - 执行上下文的类型
    - 全局执行上下文
      - 默认或是基础的上下文，任何不在函数内部的代码都在全局上下文中。它会执行两件事：1.创建一个全局的 window 对象（浏览器环境下），并设置 this 的值等于这个全局对象，一个程序中只会有一个全局执行上下文
    - 函数执行上下文
      - 每当一个函数被调用时，都会为该函数创建一个新的上下文，每个函数都有他自己的执行上下文，不过是在函数被调用的时候创建的，函数上下文可以有任意个，每当一个新的执行上下文被创建，它会按定义的顺序执行一系列步骤
    - Eval 函数执行上下文
      - 执行在 eval 函数内的代码也会有属于他自己的执行上下文。
  - 执行栈（一种拥有 LIFO<后进先出>数据结构的栈，被用来存储代码运行时创建的所有执行上下文。当 JavaScript 引擎第一次运行该脚本时，它会创建一个全局的执行上下文并且压入当前执行栈。每当引擎遇到一个函数调用，它会为该函数创建一个新的执行上下文并压入栈的顶部。引擎会执行那些执行上下文栈顶的函数。当该函数执行结束时，执行上下文会从栈中弹出，控制流程达到前栈中的下一个上下文。） -创建执行上下文
    - 创建阶段
      - this 值的决定（this 绑定）
        - 全局执行上下文：指向的是全局对象（浏览器中是指的 window 对象）
        - 函数执行上下文：this 指向的值取决于该函数是如何被调用的，若被引用对象调用，那么 this 会被设置成那个对象，否则 this 的值会被设置为全局对象或者 undefined（严格模式下）
      - 创建语法环境组件
        - 概念（词法环境是一种规范类型，基于 ECMAScript 代码的词法嵌套结构来定义标识符和具体变量和函数的关联。一个词法环境由环境记录器和一个可能的引用外部词法环境和空值组成）
        - 环境记录器（是存储变量和函数声明的实际位置）
        - 外部环境的引用（意味着它可以访问其父级词法环境（作用域））
        - 类型
          - 全局环境（在全局执行上下文中，是没有外部环境引用的词法环境。全局环境的外部环境引用是 null。它拥有内建的 Object/Array 等。在环境记录器内的原型函数（关联全局对象，比如 window 对象）还有任何用户定义的全局变量，并且 this 的值指向全局对象）
          - 函数环境（在函数环境中，函数内部用户定义的变量存储在环境记录器重。并且引用的外部环境可能是全局环境，或者任何包含此内部函数的外部函数）
      - 创建变量环境组件
    - 执行阶段
      - 变量赋值
      - 函数引用
      - 执行其他代码

- JavaScript 的作用域链
  - 作用域
    - 概念（作用域是一个独立的域，让变量不会外泄，对外暴露。也就是说作用域最大的作用是隔离变量，不同作用域下同名变量不会有冲突）
    - 分类
      - 函数作用域（只能在函数内部才能访问的变量，也可以利用闭包来实现跨区域访问局部作用域的变量）
      - 块级作用域（ES6 新增，用 let/const 命令定义块级作用域的变量，外层作用域无法获取到内层作用域，即使外层和内层都使用同名变量名，也不会被干扰）
  - 作用域链（当代码在一个环境中执行时，会创建变量对象的一个作用域链（作用域形成的链条））
- JavaScript 的闭包
  - 概念（闭包是指有权访问另一个函数作用域中的变量和函数。创建闭包的方式就是在一个函数内部创建另一个函数）
  - 引用场景（存在的意义）（放置那些声明函数的词法环境里，被标记了进入环境，没有标记离开环境的变量（没有被回收的变量）供函数使用）
- this/call/apply/bind
  - this（this 对象是在运行时基于函数的执行环境绑定的）
    - 全局函数执行上下文 （this 指向 window）
    - 函数执行上下文
      - 直接调用：this 指向函数对象
      - call，apply：this 指向绑定的对象上
      - bind：this 将永久地被绑定到了 bind 的第一个参数
    - 匿名函数（因匿名函数执行环境具有全局性，因此 this 通常指 window）
    - 箭头函数（所有的箭头函数没有自己的 this，都指向外层）
    - new 绑定（当 new 操作符调用构造函数时，this 其实指向的是这个新创建的对象，最后又将新的对象返回出来，被实例对象 p1 接收。因此，我们可以说，这个时候，构造函数的 this，指向了新的实例对象：p1）
  - 改变 this 的指向 - apply、call、bind、箭头函数、new 绑定
  - call 和 apply 的区别
    - call
      - 语法（fn.call(thisArg,arg1,arg2,...)）
      - 概念（call()方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数）
      - 参数
        - thisArg(this 指向，第一个参数)
          - 不传/null/undefined，函数中的 this 指向 window 对象
          - 传递另一个函数的函数名，函数中的 this 指向这个函数的引用，并不一定是该函数执行时真正的 this 值
          - 值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的自动包装对象，如 String，Number，Boolean
          - 传递一个对象，函数中的 this 指向这个对象
        - arg1，arg2...（指定的参数列表）
      - 返回值（使用调用者提供的 this 值和参数调用该函数的返回值。若该方法没有返回值，则返回 undefined）
    - apply
      - 语法（fn.apply(thisArg, args[])）
      - 概念（apply()方法调用一个具有给定 this 值的函数，以及以一个数组（或类数组对象）的形式提供的参数）
      - 参数
        - thisArg（同 call）
        - args（一个数组或类数组对象，其中的数组元素将作为单独的参数传给 fn 函数，如果该参数的值为 null 或 undefined，则表示不需要传入任何参数。从 ECMAScript5 开始可以使用类数组对象）
      - 返回值（调用有指定 this 值和参数的函数的结果）
    - 区别 （第二个参数不同）
  - bind
    - 语法（fn.bind(thisArg[,arg1[,arg2[,...]]])）
    - 概念（bind()方法创建一个新的函数，在 bind()被调用时，这个新函数被指定为 bind()的第一个参数，而其余参数作为新函数的参数，供调用时使用）
    - 参数
      - thisArg（调用绑定函数作为 this 参数传递给目标函数的值。如果使用 new 运算符构造绑定函数，则忽略该值。当使用 bind 在 setTimeout 中创建一个函数（作为回调提供）时，作为 thisArg 传递的任何原始值都将转换为 Object。如果 bind 函数的参数列表为空，或者 thisArg 是 null/undefined，执行作用域的 this 将被视为新函数的 thisArg）
      - arg1[,arg2[,...]]（当目标函数被调用时，被预置入绑定函数的参数列表中的参数）
    - 返回值（返回一个原函数的拷贝，并拥有指定的 this 值和初始参数）
- 原型/继承

  - 创建对象有几种方法

    - ```javascript
      // 1.字面量
      var o1 = { name: 'o1' };
      // 与o1一致
      var o2 = new Object({ name: 'o2' });
      // 2.通过构造函数
      // M是构造函数
      var M = function (name) {
        this.name = name;
      };
      // o3是实例
      var o3 = new M('o3');
      // 输出M的原型
      console.log(M.prototype); // Object {constructor: function(name) {}, __proto__: Object }
      console.log(M.prototype.constructor === M); // true
      console.log(o3.__proto__ === M.prototype); // true
      // 3.Object.create
      var P = { name: 'o4' };
      var o4 = Object.create(P);

      M.prototype.say = function () {
        console.log('say hi');
      };
      var o5 = new M();

      // new 运算符
      var new2 = function (func) {
        var o = Object.create(func.prototype); // 继承构造函数的原型对象
        var k = func.call(o);
        return typeof k === 'object' ? k : o;
      };
      var o6 = new2(M);
      console.log(o6); // M {name: undefined}
      console.log(o6 instanceof M); // true
      console.log(o6 instanceof Object); // true
      console.log(o6.__proto__.constructor === M); // true
      M.prototype.walk = function () {
        console.log('walk');
      };
      console.log(o6.walk()); // walk
      console.log(o3.walk()); // walk
      ```

  - ![](/images/interview/object-prototype.jpg)
  - 原型(对象):（原型是JS实现继承的主要方式。用constructor的时候，产生一个实例，实例.__proto__指向构造函数的原型对象，也就是构造函数.prototype。构造函数.prototype.constructor指向构造函数的本身，构造函数.prototype.__proto__指向Object的实例对象，也就是构造函数.prototype.__proto__指向Object的原型对象，然后再从实例.Object.__proto__指向Obj.prototype这个过程，它都是原型上的__proto__然后直接往上指的底边就形成一条原型链，最终指向null。即Object.prototype.__proto__ === null）
  - 原型链
  - 构造函数：new Fn() 用 new 构造实例的函数叫做构造函数，生成函数的时候就会生成原型对象（prototype）.函数也是对象，所以函数也有**proto**
  - 实例：例子中的 o1，o2，o3 都叫做实例
  - instanceof 的原理
    - ![](/images/interview/instanceof.jpg)
    - ```javascript
      o3 instanceof Object; // true
      o3.__proto__ === M.prototype; // true
      M.prototype.__proto__ === Object.prototype; // true
      o3.__proto__.constructor === M; // true
      o3.__proto__.constructor === Object; // false
      ```
  - new 运算符
    - 1. 一个新对象被创建。它继承自 foo.prototype
    - 2. 构造函数 foo 被执行，执行的时候，相应的传参会被传入，同时上下文（this）会被指定为这个新实例。new foo 等同于 new foo()，只能用在不传递任何参数的情况。
    - 3. 如果构造函数返回了一个“对象”，那么这个对象会取代整个 new 出来的结果。如果构造函数没有返回对象，那么 new 出来的结果为步骤 1 创建的对象。
  - 面相对象
    - 类的声明
      - ```javascript
        function Animal() {
          this.name = 'name';
        }
        // ES6 class的声明
        class Anamal2 {
          constructor() {
            this.name = name;
          }
        }
        // 实例化注册对象
        console.log(new Animal(), new Animal2()); // Animal{name: 'name'} Animal2{name: ""}
        ```
  - 实现继承的几种方式

    - ```javascript
      // 1.借助构造函数继承
      function Parent1() {
        this.name = 'parent1';
      }
      Parent1.prototype.sayHa = function () {
        console.log('say ha');
      };
      function Child1() {
        Parent1.call(this); // 原理：将父级中的构造函数的属性 指向Child1的实例。
        this.type = 'child1';
      }
      new Child1().sayHa(); // 缺点： Uncaught TypeError: (intermediate value).say is not a function; 因为没有继承父类原型对象上的方法导致没有完全继承父类的属性。
      // 2. 借助原型链实现继承
      function Parent2() {
        this.name = 'parent2';
        this.play = [1, 2, 3];
      }
      function Child2() {
        this.type = 'child2';
      }
      Child2.prototype = new Parent2(); // 使函数的实例能访问到原型对象
      console.log(new Child2()); // {type: "child2", __proto__: Parent2}
      // 原型链实现继承的缺陷
      var s1 = new Child2();
      var s2 = new Child2();
      console.log(s1.play, s2.play); // [1,2,3] [1,2,3]
      s1.play.push(4);
      // 实例的原型对象没有隔离，操作实例原型对象的属性，会影响到其他的实例。
      console.log(s1.play, s2.play); // [1,2,3,4] [1,2,3,4]

      // 3. 组合方式
      function Parent3() {
        this.name = 'parent3';
        this.play = [1, 2, 3];
      }
      function Child3() {
        Parent3.call(this);
        this.type = 'child3';
      }
      Child3.prototype = new Parent3();
      // 缺陷：父类的构造函数被创建多次。
      var s3 = new Child3();
      var s4 = new Child4();
      s3.play.push(4);
      console.log(s3.play, s4.play);

      // 4. 组合继承方式 - 优化
      function Parent4() {
        this.name = 'parent4';
        this.play = [1, 2, 3];
      }
      function Child4() {
        Parent4.call(this);
        this.type = 'child4';
      }

      Child4.prototype = Parent4.prototype;
      var s5 = new Child4();
      var s6 = new Child4();
      // s5.play.push(4);
      console.log(s5, s6); // 2个值相等
      // 缺点：无法判断s5是由Child4实例化还是由Parent4直接实例化，因为构造函数相同
      console.log(s5 instanceof Child4, s5 instanceof Parent4);
      console.log(s5.constructor);

      // 5. 组合继承方式- 优化2
      function Parent5() {
        this.name = 'parent5';
        this.play = [1, 2, 3];
      }
      function Child5() {
        Parent5.call(this);
        this.type = 'child5';
      }

      Child5.prototype = Object.create(Parent5.prototype); // 通过Object.create创建一个中间对象，将原型对象区分开。通过__proto__往回追溯。
      // 缺点 Child5没有自己的constructor
      // 解决方案：
      Child5.prototype.constructor = Child5;

      var s7 = new Child5();
      console.log(s7 instanceof Child5, s7 instanceof Parent5);
      console.log(s7.constructor);
      ```

- 跨域通信的几种方式

  - jsonp （利用 script 标签的异步属性）
  - Hash （URL 中#号后面的字符发生改变，页面不会发生跳转（search 改变会跳转））
  - PostMessage
  - Websocket
  - CORS （跨域请求在 header 中添加 CORS-cross-origin，如果服务器不接收这个变量，则拒绝请求，浏览器会主动发起拦截。）

- 网站安全
  - CSRF（跨站请求伪造）
    - 原理：引诱用户点击钓鱼网站的请求 API 接口并带上 cookie，进而发送给被攻击的网站，实现 API 调用（需要登录）
    - 解决方案： 1.添加 token 请求验证， 2.服务器添加 Referer 验证， 3.隐藏令牌（在请求头中添加 token）
  - XSS （跨域脚本攻击）
    - 原理：在富文本编辑器中注入 script 脚本，
    - 解决方案：将富文本内容中的 script 脚本清洗。让其无法执行。
- 深/浅拷贝

  - 基本数据类型（简单的数据段 保存在栈中，保存在内存中的一个位置。基本类型有：String, Number, Undefined, Null, Symbol, Boolean）
  - 引用数据类型（保存在堆内存中的对象，所以引用类型的值保存的是一个指针，这个指针指向存储在堆中的对象。除了上述 6 种基本类型。剩下的就是引用类型。统称为 Object 类型。分别有：Object，Array，Date，RegExp，Function 等）

- 渲染机制

  - DOCTYPE 及作用
    - DOCTYPE 告诉浏览器当前文档用哪个版本的DTD。
    - DTD<document type definition, 文档类型定义>。 是一系列的语法法则，用来定义 XML/XHTML 的文件类型。浏览器会使用它来判断文档类型，决定使用哪种协议来解析，以及切换浏览器模式（HTML4版本所有：严格模式/传统模式）
      - html5: <!DOCTYPE html>
      - html4.01 Strict：包含所有HTML元素和属性，但不包括展示性和弃用的元素（比如font）
      - html4.01 Trasitional：包含所有HTML元素和属性，包括展示性和弃用的元素（比如font）

  - 浏览器渲染过程（输入 URL 到渲染）
    - ![](/images/interview/browser-render.png)
    - 1. 浏览器解析HTML，生成DOM Tree （Parse HTML）
    - 2. 浏览器解析CSS，生成CSSOM Tree
    - 3. JavaScript通过DOM API和CSSOM API来操作DOM Tree 和CSS Rule Tree，浏览器将DOM Tree 和 CSSOM Tree合成渲染树（Render Tree）
    - 4. 布局（layout），根据生成的Render Tree，进行回流，以计算每个节点的几何信息（位置，大小，字体样式等）
    - 5. 绘制（painting），根据渲染树和回流得到的几何信息，得到每个节点的绝对像素
    - 6. 展示（display），将像素发送给图形处理器（GPU），展示到页面上
  - 重排 Reflow（DOM结构中的各个元素都有自己的盒子，当浏览器修改了该盒子的部分属性时，浏览器会根据其修改的属性，重新绘制并渲染。这个过程就叫重排），以下为触发Reflow的几个方式
    - 增加、删除、修改DOM节点时，会导致Reflow/Repaint
    - 移动DOM的位置，或是做动画时
    - 修改CSS样式时 （width, height, display）
    - Resize窗口，或是滚动的时候(可能)
    - 修改网页的默认字体时
  - 重绘 Repaint
    - 当定义盒子的位置、大小以及其他（颜色，字体大小）等属性都确定下来后，浏览器便把这些元素都按照各自的特性绘制一遍，于是页面的内容出现，这个过程称之为Repaint，触发Repaint有以下方式：
      - DOM改动
      - CSS改动
    - 如何最大程度高效Repaint
      - 一个节点的多次Repaint操作放一次执行
- JS 运行机制
  - ```javascript
    console.log(1);
    // 异步任务
    setTimeout(() => {
      console.log(2)
    }, 1000);
    console.log(3);
    // 依次输出 1,3,2
    ```
  - 异步任务
    - setTimeout / setInterval
    - DOM事件
    - ES6中的Promise
  - 总结
    - 理解JS的单线程的理念
    - 理解任务队列
    - 理解Event Loop
    - 理解哪些语句会放入异步任务队列
    - 理解语句放入异步任务队列的时机
- 页面性能
  - 提升性能
    - 资源压缩合并，减少http请求
    - 非核心代码异步加载 -> 异步加载的方式 -> 异步加载的区别
      - 异步加载的方式
        - 动态脚本加载(用js创建标签后进行渲染)
        - defer 
        - async
      - 异步加载的区别
        - defer：在HTML解析完成之后才执行，如果是多个，按照加载的顺序依次执行
        - async：在加载完之后立即执行，如果是多个，执行顺序与加载顺序无关（先加载先执行）
    - 利用浏览器缓存 -> 缓存的分类 -> 缓存的原理
    - 使用CDN
    - 与解析DNS
      - ```html
        // https协议默认关闭dns预解析，用这个标签强制打开a标签预解析
        <meta http-equiv="x-dns-prefetch-control" content="on" >
        <link rel="dns-prefetch" href="//host_name_to_prefetch.com">
        ```
  - 异步加载
- 错误监控
