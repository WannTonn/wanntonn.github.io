# 前端JavaScript 问题列表  - 摘录自 [github]('https://github.com/lydiahallie/javascript-questions/blob/master/zh-CN/README-zh_CN.md')
> 每日一更

1. 输出是什么
  ```
    function sayHi() {
      console.log(name);
      console.log(age);
      var name = "Lydia",
      let age = 21
    }
  ``` 
- A: Lydia 和 undefined
- B: Lydia 和 ReferenceError
- C: ReferenceError 和 21
- D: undefined 和 ReferenceError

<details>
<summary>点击查看答案</summary>

**<summary>**
  答案： D
  ``` 
    在函数内部，我们首先通过 var 关键字声明了 name 变量。这意味着变量被提升了（内存空间在创建阶段就被设置好了），直到程序运行到定义变量位置之前默认值都是 undefined。因为当我们打印 name 变量时还没有执行到定义变量的位置，因此变量的值保持为 undefined。

    通过 let 和 const 关键字声明的变量也会提升，但是和 var 不同，它们不会被初始化。在我们声明（初始化）之前是不能访问它们的。这个行为被称之为暂时性死区。当我们试图在声明之前访问它们时，JavaScript 将会抛出一个 ReferenceError 错误。
  ``` 
</details>