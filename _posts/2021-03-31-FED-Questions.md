<!--
 * @Author: WannTonn
 * @Date: 2021-04-03 22:26:05
 * @LastEditTime: 2021-04-09 14:32:18
 * @LastEditors: Please set LastEditors
 * @Description:
 * @FilePath: /tyrantwt.github.io/_posts/2021-03-31-FED-Questions.md
-->

# 前端 JavaScript 问题列表 - 摘录自 <a href="https://github.com/lydiahallie/javascript-questions/blob/master/zh-CN/README-zh_CN.md" target="_blank">Github</a>

> 1.输出是什么？ 2021-03-31

```javascript
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

<details><summary>点击查看答案</summary>
<p>

答案:  D
<br/>
在函数内部，我们首先通过 var 关键字声明了 `name` 变量。这意味着变量被提升了（内存空间在创建阶段就被设置好了），直到程序运行到定义变量位置之前默认值都是 `undefined`。因为当我们打印 `name` 变量时还没有执行到定义变量的位置，因此变量的值保持为 undefined。

通过 let 和 const 关键字声明的变量也会提升，但是和 var 不同，它们不会被初始化。在我们声明（初始化）之前是不能访问它们的。这个行为被称之为暂时性死区。当我们试图在声明之前访问它们时，JavaScript 将会抛出一个 ReferenceError 错误。

</p>
</details>

---

> 2.输出是什么？2021-04-01

```javascript
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
<details><summary>点击查看答案</summary>
<p>

答案: C
<br/>

JavaScript 的事件循环，setTimeout 回调会在遍历结束后才执行。因为在第一个遍历中 index i 是通过 var 关键字声明的，所以这个值是全局作用域下的。在遍历过程中，通过一元操作符++ 来每次递增 i 的值。当 setTimeout 回调执行的时候，i 的值等于 3。

在第二个遍历中，遍历 i 是通过 let 关键字声明的:  通过 let 和 const 关键字声明的变量是拥有块级作用域(指的是任何在{}中的内容)。在每次遍历过程中，i 都有一个新值，并且每个值都在循环内的作用域中。

</p>
</details>

---

> 3.输出是什么？ 2021-04-01

```javascript
const shape = {
  radius: 10,
  // 直径
  diameter() {
    return this.radius * 2;
  },
  // 周长
  perimeter: () => 2 * Math.PI * this.radius,
};

shape.diameter();
shape.perimeter();
```

- A: 20 和 62.83185307179586
- B: 20 和 NaN
- C: 20 和 63
- D: NaN 和 63
<details>
<summary>点击查看答案</summary>
<p>

答案: B
<br/>

!!! diameter 的值是一个常规函数，但是 perimeter 的值是一个箭头函数
对于箭头函数，this 关键字指向的是它当前周围作用域(简单来说是包含箭头函数的常规函数，如果没有常规函数的话就是全局对象), 这个行为和常规函数不同。这意味着当我们调用 perimeter 时，this 不是指向 shape 对象，而是它的周围作用域(在这里指向 window)。

在 window 中没有 `radius` 属性，因此返回 `undefined`。

</p>
</details>

---

> 4.输出是什么？ 2021-04-02

```javascript
+true;
!'Lydia';
```

- A: 1 and false
- B: false and NaN
- C: false and false

<details>
<summary>点击查看答案</summary>
<p>

答案: A
<br/>

一元操作符加号尝试将 bool 转为 number。 true 转换为 number 的话为 1， false 为 0.
字符串 ‘Lydia’ 是一个真值， 真值取反即为 false。

</p>
</details>

---

> 5.哪一个是正确的？ 2021-04-03

```javascript
const bird = {
  size: 'small',
};
const mouse = {
  name: 'Mickey',
  small: true,
};
```

- A: mouse.bird.size 是无效的
- B: mouse[bird.size] 是无效的
- C: mouse[bird["size"]] 是无效的
- D: 以上三个选项都是有效的
<details>
<summary>点击查看答案</summary>

答案:  A
<br/>

在 JavaScript 中，所有对象的 keys 都是字符串(除非对象是 Symbol)。尽管我们可能不会定义它们为字符串，但它们在底层总会被转换为字符串。

在我们使用括号语法时([]), JavaScript 会解释(或者 unboxes)语句。它首先看到第一个开始括号[并继续前进直到找到结束括号]. 只有这样，它才会计算语句的值。

mouse[bird.size]: 首先计算 bird.size, 得到 size 的值为'small'。mouse["small"] 返回 true。

然后使用点语法的话，mouse 不包含 bird 这个 key， mouse.bird 返回 undefined。所以在使用点语法 mouse.bird.size 时， 因为 mouse.bird 是 undefined， 变成了 undefined.size 。会抛出 'cannot read property "size" of undefined' 的错误。

</details>

---

> 6.输出是什么？ 2021-04-04

```javascript
let c = { greeting: 'Hey!' };
let d;

d = c;
c.greeting = 'Hello';
console.log(d.greeting);
```

- A: Hello
- B: undefined
- C: ReferenceError
- D: TypeError
<details>
<summary>点击查看答案</summary>

答案:  A
<br/>

在 JavaScript 中，当设置两个对象彼此相等时，它们会通过引用进行交互。
首先，变量 c 的值是一个对象，接下来，给 d 分配了一个和 c 对象相同的引用。

</details>

> 7.输出是什么？ 2021-04-04

```javascript
let a = 3;
let b = new Number(3);
let c = 3;

console.log(a == b);
console.log(a === b);
console.log(b === c);
```

- A: true false true
- B: false false true
- C: true false false
- D: false true true
<details>
<summary>点击查看答案</summary>

答案:  C
<br/>

new Number() 是一个内建的函数构造器。它实际上返回的是一个对象。
当使用 == 操作符时，它只检查两者是否拥有相同的值。因为它们的值都是 3，因此返回 true。
当使用 === 操作符时，两者的值以及类型都应该是相同的。new Number() 是一个对象而不是 number，因此返回 false。

</details>

---

> 8.输出是什么？ 2021-04-04

```javascript
class Chameleon {
  static colorChange(newColor) {
    this.newColor = newColor;
    return this.newColor;
  }

  constructor({ newColor = 'green' } = {}) {
    this.newColor = newColor;
  }
}

const freddie = new Chameleon({ newColor: 'purple' });
freddie.colorChange('orange');
```

- A: orange
- B: purple
- C: green
- D: TypeError
<details>
<summary>点击查看答案</summary>

答案:  D
<br />

colorChange 是一个静态方法。静态方法被设计为只能被创建它们的构造器使用(Chameleon)，并且不能传递给实例。因为 freddie 是一个实例，静态方法不能被实例使用，因此抛出 TypeError 错误。

</details>

---

> 9.输出是什么？2021-04-05
```javascript
let greeting
greetign = {} // Typo!
console.log(greetign)
```

- A: {}
- B: ReferenceError: greetign is not defined
- C: undefined

<details>
<summary>点击查看答案</summary>

答案: A
<br />
代码打印出一个空对象，这是因为代码执行后在全局对象创建了一个空对象。当我们将 `greeting` 写错成 `greetign` 时,JS解释器在浏览器上将它看做gllbal.greetign = {}(或者 window.greetign = {})
为了避免此类问题，可以用 `"use strict"`来确保声明变量时必须要赋值。
</details>

---

> 10.当我们这么做时，会发生什么? 2021-04-06

```javascript
function bark() {
  console.log('Woof!');
}

bark.animal = 'dog'
```

- A: 正常运行
- B: SyntaxError. 你不能通过这种方式给函数增加属性。
- C: undefined
- D: ReferenceError

<details>
<summary>点击查看答案</summary>

答案: A
<br />
函数bark也是特殊的对象。函数是一个拥有属性的对象，并且属性也可以被调用。
</details>

---

> 11.输出是什么? 2021-04-07

```javascript
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const member = new Person("Lydia", "Hallie");
Person.getFullName = function() {
  return `${this.firstName} ${this.lastName}`;
}

console.log(member.getFullName());
```

- A: TypeError
- B: SyntaxError
- C: Lydia Hallie
- D: undefined undefined

<details>
<summary>点击查看答案</summary>

答案: A
<br />
不能像常规对象那样，给构造函数添加属性。如果想一次性给所有实例添加特性，就应该使用原型。即如下方式:
```javascript
Person.prototype.getFullName = function() {
  return `${this.firstName} ${this.lastName}`;
}
```
这样才会使 member.getFullName() 起作用。如果将方法添加到构造函数本身，将浪费大量内存空间，因为不是所有Person实例都需要这个方法。相反，如果只将它添加到原型汇总，那么它只存在于内存的一个位置，并且所有实例仍然可以访问它。
</details>

---

> 12.输出是什么? 2021-04-07

```javascript
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const lydia = new Person('Lydia', 'Hallie');
const sarah = Person('Sarah', 'Smith');

console.log(lydia);
console.log(sarah);
```

- A: Person {firstName: "Lydia", lastName: "Hallie"} and undefined
- B: Person {firstName: "Lydia", lastName: "Hallie"} and Person {firstName: "Sarah", lastName: "Smith"}
- C: Person {firstName: "Lydia", lastName: "Hallie"} and {}
- D: Person {firstName: "Lydia", lastName: "Hallie"} and ReferenceError

<details>
<summary>点击查看答案</summary>

答案: A
<br />
对于 sarah, 我们没有使用 `new` 关键字。当使用 `new` 时， `this` 引用我们创建的空对象。当未使用 `new` 时, `this` 引用的是全局对象(global object)。
我们说 `this.firstName` 等于 "Sarah", 并且 `this.lastName` 等于 `Smith`。实际上我们做的是，定义了 `global.firstName = 'Sarah'` 和 `global.lastName = 'Smith'`。而 `sarah` 本身是 `undefined`。
</details>

---

> 13.事件传播的三个阶段是什么? 2021-04-07

- A: Target > Capturing > Bubbling
- B: Bubbling > Target > Capturing
- C: Target > Bubbling > Capturing
- D: Capturing > Target > Bubbling

<details>
<summary>点击查看答案</summary>

答案: D
<br />
在 `捕获(capturing)`阶段中，事件从祖先元素向下传播到目标元素。当事件达到`目标(target)`元素后，`冒泡(bubbling)`才开始。
</details>

---

> 14.所有对象都有原型? 2021-04-08

- A: 对
- B: 错

<details>
<summary>点击查看答案</summary>

答案: B
<br />
除了 `基本对象（base object）` ,所有对象都有原型。基本对象可以访问一些方法和属性，比如 `.toString`。这就是为什么你可以使用内置的JavaScript方法! 所有这些方法在原型上都是可用的。虽然JavaScript不能直接在对象上找到这些方法，但JavaScript会沿着原型链找到它们，以便于使用。
</details>

---

> 15.事件传播的三个阶段是什么? 2021-04-08

- A: Target > Capturing > Bubbling
- B: Bubbling > Target > Capturing
- C: Target > Bubbling > Capturing
- D: Capturing > Target > Bubbling

<details>
<summary>点击查看答案</summary>

答案: D
<br />
在 `捕获(capturing)`阶段中，事件从祖先元素向下传播到目标元素。当事件达到`目标(target)`元素后，`冒泡(bubbling)`才开始。
</details>

---

> 16.输出是什么? 2021-04-08

```javascript
function sum(a, b) {
  return a + b;
}
sum(1, '2');
```

- A: NaN
- B: TypeError
- C: "12"
- D: 3

<details>
<summary>点击查看答案</summary>

答案: C
<br />
JavaScript 是一种动态类型语言：我们不指定某些变量的类型。值可以在你不知道的情况下自动转换成另一种类型，这种类型称为隐式类型转换（implicit type coercion）。Coercion 是指将一种类型转换为另一种类型。

在本例中，JavaScript 将数字 1 转换为字符串，以便函数有意义并返回一个值。在数字类型（1）和字符串类型（'2'）相加时，该数字被视为字符串。我们可以连接字符串，比如 "Hello" + "World"，这里发生的是 "1" + "2"，它返回 "12"。
</details>

---

> 17.输出是什么? 2021-04-08

```javascript
funciton getPersonInfo(one, two, three) {
  consle.log(one);
  consle.log(two);
  consle.log(three);
}
const person = 'Lydia';
const age = 21;

getPersonInfo`${person} is ${age} years old`
```


- A: "Lydia" 21 ["", " is ", " years old"]
- B: ["", " is ", " years old"] "Lydia" 21
- C: "Lydia" ["", " is ", " years old"] 21

<details>
<summary>点击查看答案</summary>

答案: B
<br />
如果使用标记模板字面量，第一个参数的值总是包含字符串的数组。其余的参数获取的是传递的表达式的值！
</details>

---

> 18.输出是什么? 2021-04-09

```javascript
funciton checkAge(data) {
  if (data === {age: 18}) {
    console.log('You are a man!');
  } else if (data == {age: 18}) {
    console.log('You are still a man.');
  } else {
    console.log('Oops...I can't guess your age')
  }
}

checkAge({age: 18});
```


- A: You are a man!
- B: You are still a man.
- C: Oops...I can't guess your age

<details>
<summary>点击查看答案</summary>

答案: C
<br />
在测试相等性时，基本类型通过它们的值(value)进行比较，而对象通过它们的引用(reference) 进行比较。JavaScript检查对象是否具有对内存中相同位置的引用。

题目中我们正在比较的两个对象是不同一个引用: 作为参数传递的对象引用的内存位置，与用于判断相等的对象所引用的内存位置并不同。
这也是{ age: 18 } === { age: 18 } 和 { age: 18 } == { age: 18 } 都返回 false 的原因。
</details>

---

> 19.输出是什么? 2021-04-09

```javascript
funciton getAge(...args) {
  console.log(typeof args)
}

getAge(27);
```


- A: "number"
- B: "array"
- C: "object"
- D: "NaN"

<details>
<summary>点击查看答案</summary>

答案: C
<br />
扩展运算符(...args)会返回实参组成的数组。而数组是对象，因此typeof args 返回 "object"。
</details>

---

> 20.输出是什么? 2021-04-09

```javascript
function getAge() {
  'use strict';
  age = 21;
  console.log(age);
}

getAge();
```


- A: 21
- B: undefined
- C: ReferenceError
- D: TypeError

<details>
<summary>点击查看答案</summary>

答案: C
<br />
使用 `"use strict"`,你可以确保不会意外地声明全局变量。我们从来没有声明变量age，因为我们使用`"use strict"`,它将抛出一个引用错误。如果我们不使用`"use strict"`,它就会工作，因为属性 `age` 会被添加到全局对象中。
</details>

---
