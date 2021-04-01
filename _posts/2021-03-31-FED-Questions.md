# 前端JavaScript 问题列表  - 摘录自 [github]('https://github.com/lydiahallie/javascript-questions/blob/master/zh-CN/README-zh_CN.md')
> 每日一更

1.输出是什么？ 2021-03-31
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

  答案： D
  
  在函数内部，我们首先通过 var 关键字声明了 name 变量。这意味着变量被提升了（内存空间在创建阶段就被设置好了），直到程序运行到定义变量位置之前默认值都是 undefined。因为当我们打印 name 变量时还没有执行到定义变量的位置，因此变量的值保持为 undefined。

  通过 let 和 const 关键字声明的变量也会提升，但是和 var 不同，它们不会被初始化。在我们声明（初始化）之前是不能访问它们的。这个行为被称之为暂时性死区。当我们试图在声明之前访问它们时，JavaScript 将会抛出一个 ReferenceError 错误。
</details>

2.输出是什么？2021-04-01
``` 
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}
``` 
- A: 0 1 2 和 0 1 2
- B: 0 1 2 和 3 3 3
- C: 3 3 3 和 0 1 2
<details>
<summary>点击查看答案</summary>

  答案：C

  JavaScript的事件循环，setTimeout 回调会在遍历结束后才执行。因为在第一个遍历中index i 是通过 var 关键字声明的，所以这个值是全局作用域下的。在遍历过程中，通过一元操作符++ 来每次递增 i 的值。当setTimeout 回调执行的时候，i的值等于3。

  在第二个遍历中，遍历 i 是通过 let 关键字声明的： 通过let 和const 关键字声明的变量是拥有块级作用域(指的是任何在{}中的内容)。在每次遍历过程中，i 都有一个新值，并且每个值都在循环内的作用域中。
</details>

3.输出是什么？ 2021-04-01
``` 
const shape = {
  radius: 10,
  // 直径
  diameter() {
    return this.radius * 2
  },
  // 周长
  perimeter: () => 2 * Math.PI * this.radius
}

shape.diameter();
shape.perimeter();
``` 
- A: 20 和 62.83185307179586
- B: 20 和 NaN
- C: 20 和 63
- D: NaN 和 63
<details>
<summary>点击查看答案</summary>

  答案：B

  !!! diameter 的值是一个常规函数，但是 perimeter 的值是一个箭头函数
  对于箭头函数，this 关键字指向的是它当前周围作用域(简单来说是包含箭头函数的常规函数，如果没有常规函数的话就是全局对象), 这个行为和常规函数不同。这意味着当我们调用perimeter时，this 不是指向 shape 对象，而是它的周围作用域(在这里指向 window)。

  在window中没有 radius 属性，因此返回 undefined。
</details>