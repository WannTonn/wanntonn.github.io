<!--
 * @Author: WannTonn
 * @Date: 2021-04-03 22:26:05
 * @LastEditTime: 2021-04-22 23:03:00
 * @LastEditors: WannTonn
 * @Description:
 * @FilePath: /wanntonn.github.io/_posts/2021-03-31-FED-Questions.md
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

答案: D
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

在第二个遍历中，遍历 i 是通过 let 关键字声明的: 通过 let 和 const 关键字声明的变量是拥有块级作用域(指的是任何在{}中的内容)。在每次遍历过程中，i 都有一个新值，并且每个值都在循环内的作用域中。

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

答案: A
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

答案: A
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

答案: C
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

答案: D
<br />

colorChange 是一个静态方法。静态方法被设计为只能被创建它们的构造器使用(Chameleon)，并且不能传递给实例。因为 freddie 是一个实例，静态方法不能被实例使用，因此抛出 TypeError 错误。

</details>

---

> 9.输出是什么？2021-04-05

```javascript
let greeting;
greetign = {}; // Typo!
console.log(greetign);
```

- A: {}
- B: ReferenceError: greetign is not defined
- C: undefined

<details>
<summary>点击查看答案</summary>

答案: A
<br />
代码打印出一个空对象，这是因为代码执行后在全局对象创建了一个空对象。当我们将 `greeting` 写错成 `greetign` 时,JS 解释器在浏览器上将它看做 gllbal.greetign = {}(或者 window.greetign = {})
为了避免此类问题，可以用 `"use strict"`来确保声明变量时必须要赋值。

</details>

---

> 10.当我们这么做时，会发生什么? 2021-04-06

```javascript
function bark() {
  console.log('Woof!');
}

bark.animal = 'dog';
```

- A: 正常运行
- B: SyntaxError. 你不能通过这种方式给函数增加属性。
- C: undefined
- D: ReferenceError

<details>
<summary>点击查看答案</summary>

答案: A
<br />
函数 bark 也是特殊的对象。函数是一个拥有属性的对象，并且属性也可以被调用。

</details>

---

> 11.输出是什么? 2021-04-07

```javascript
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const member = new Person('Lydia', 'Hallie');
Person.getFullName = function () {
  return `${this.firstName} ${this.lastName}`;
};

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
Person.prototype.getFullName = function () {
  return `${this.firstName} ${this.lastName}`;
};
```

这样才会使 member.getFullName() 起作用。如果将方法添加到构造函数本身，将浪费大量内存空间，因为不是所有 Person 实例都需要这个方法。相反，如果只将它添加到原型汇总，那么它只存在于内存的一个位置，并且所有实例仍然可以访问它。

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
除了 `基本对象（base object）` ,所有对象都有原型。基本对象可以访问一些方法和属性，比如 `.toString`。这就是为什么你可以使用内置的 JavaScript 方法! 所有这些方法在原型上都是可用的。虽然 JavaScript 不能直接在对象上找到这些方法，但 JavaScript 会沿着原型链找到它们，以便于使用。

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
在测试相等性时，基本类型通过它们的值(value)进行比较，而对象通过它们的引用(reference) 进行比较。JavaScript 检查对象是否具有对内存中相同位置的引用。

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
扩展运算符(...args)会返回实参组成的数组。而数组是对象，因此 typeof args 返回 "object"。

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
使用 `"use strict"`,你可以确保不会意外地声明全局变量。我们从来没有声明变量 age，因为我们使用`"use strict"`,它将抛出一个引用错误。如果我们不使用`"use strict"`,它就会工作，因为属性 `age` 会被添加到全局对象中。

</details>

---

> 21.输出是什么? 2021-04-10

```javascript
const sum = eval('10*10+5');
```

- A: 105
- B: "105"
- C: TypeError
- D: "10\*10+5"

<details>
<summary>点击查看答案</summary>

答案: A
<br />
代码以字符串形式传递进来，eval 对其求值。如果它是一个表达式，就像本例中那样，它对表达式求值。表达式是 10 \* 10 + 5. 这将返回数字 105。

</details>

---

> 22.cool_secret 可以访问多长时间? 2021-04-10

```javascript
sessionStorage.setItem('cool_secret', 123);
```

- A: 永远，数据不会丢失。
- B: 当用户关掉标签页时。
- C: 当用户关掉整个浏览器，而不只是关掉标签页。
- D: 当用户关闭电脑时。

<details>
<summary>点击查看答案</summary>

答案: B
<br />
关闭 tab 标签页 后，sessionStorage 存储的数据才会删除。
如果使用 localStorage，那么数据将永远在那里，除非调用 localStorage.clear()。

</details>

---

> 23.输出是什么? 2021-04-10

```javascript
var num = 8;
var num = 10;
```

- A: 8
- B: 10
- C: SyntaxError
- D: ReferenceError

<details>
<summary>点击查看答案</summary>

答案: B
<br />
使用 var 关键字，你可以用相同的名称声明多个变量。然后变量将保存最新的值。
你不能使用 let 或 const 来实现这一点。因为它们是块作用域的。

</details>

---

> 24.输出是什么? 2021-04-11

```javascript
const obj = { 1: 'a', 2: 'b', 3: 'c' };
const set = new Set([1, 2, 3, 4, 5]);

obj.hasOwnProperty('1');
obj.hasOwnProperty(1);
set.has('1');
set.has(1);
```

- A: false true false true
- B: false true true true
- C: true true false true
- D: true true true true

<details>
<summary>点击查看答案</summary>

答案: C
<br />
所有对象的键(不包括 Symbol) 在底层都是字符串，即使你自己没有将其作为字符串输入。这就是为什么 obj.hasOwnproperty('1') 也返回 true。
对于集合，它不是这样工作的。在我们的集合中没有'1': set.has('1') 返回 false。它有数字类型为 1, set.has(1) 返回 true。

</details>

---

> 25.输出是什么? 2021-04-11

```javascript
const obj = { a: 'one', b: 'two', a: 'three' };
console.log(obj);
```

- A: { a: "one", b: "two" }
- B: { b: "two", a: "three" }
- C: { a: "three", b: "two" }
- D: SyntaxError

<details>
<summary>点击查看答案</summary>

答案: C
<br />
如果对象中有 2 个名称相同的键，则键会被替换掉。它仍然位于第一个键出现的位置，但是值是最后出现那个键的值。

</details>

---

> 26.JavaScript 全局执行上下文为你做了两件事：全局对象和 this 关键字。 2021-04-11

- A: 对
- B: 错
- C: 看情况

<details>
<summary>点击查看答案</summary>

答案: A
<br />
基本执行上下文是全局执行上下文：它是代码中随处可访问的内容。

</details>

---

> 27.输出是什么? 2021-04-11

```javascript
for (let i = 1; i < 5; i++) {
  if (i === 3) continue;
  console.log(i);
}
```

- A: 1 2
- B: 1 2 3
- C: 1 2 4
- D: 1 3 4

<details>
<summary>点击查看答案</summary>

答案: C
<br />
如果某个条件返回 true，则 continue 语句跳过本次迭代。

</details>

---

> 28.输出是什么？ 2021-04-12

```javascript
String.prototype.giveLydiaPizza = () => {
  return 'Just give Lydia pizza already!';
};
const name = 'Lydia';

name.giveLydiaPizza();
```

- A: "Just give Lydia pizza already!"
- B: TypeError: not a function
- C: SyntaxError
- D: undefined

<details>
<summary>点击查看答案</summary>

答案: A
<br />
String 是内置的构造函数，我们可以向它添加属性。我们只是在它的原型中添加了一个方法。基本类型字符串被自动转换成字符串对象，由字符串原型函数生成。因此，所有 String(string 对象) 都可以访问该方法!

</details>

---

> 29.输出是什么 2021-04-12

```javascript
const a = {};
const b = { key: 'b' };
const c = { ley: 'c' };

a[b] = 123;
a[c] = 456;

console.log(a[b]);
```

- A: 123
- B: 456
- C: undefined
- D: ReferenceError

<details>
<summary>点击查看答案</summary>

答案: B
<br />
对象的键被自动转换为字符串。我们试图将一个对象 b 设置为对象 a 的键，且相应的值为 123。

然而，当字符串化一个对象时，它会变成 "[object Object]"。因此这里说的是，a["[object Object]"] = 123。然后，我们再一次做了同样的事情，c 是另外一个对象，这里也有隐式字符串化，于是，a["[object Object]"] = 456。

然后，我们打印 a[b]，也就是 a["[object Object]"]。之前刚设置为 456，因此返回的是 456。

</details>

---

> 30.输出是什么? 2021-04-13

```javascript
const foo = () => console.log('First');
const bar = () => setTimeout(() => console.log('Second'));
const barz = () => console.log('Third');

bar();
foo();
baz();
```

- A: First Second Third
- B: First Third Second
- C: Second First Third
- D: Second Third First

<details>
<summary>点击查看答案</summary>

答案: B
这里有一个 setTimeout 函数，并首先调用它。然而，它是最后才输出 console 的。
因为在浏览器中，不仅有运行时引擎，还有一个叫 WebAPI 的东西。WebAPI 提供了 setTimeout 函数，也包含其他的，例如 DOM。

将 callback 推送到 WebAPI 后，setTimeout 函数本身(不是回调！) 将从栈中弹出。
步骤：

1.  foo 被调用，打印 "First"
2.  foo 从栈中弹出, baz 被调用，打印 "Third"
3.  WebAPI 不能随时向栈内添加内容。相反它将回调函数推到名为 queue 的地方。
4.  这就是事件循环开始工作的地方。一个 事件循环 查看栈和任务队列。如果栈是空的，它接受队列上的第一个元素并将其推入栈。
5.  bar 被调用。打印 "Second", 然后被栈弹出
    <br />

</details>

---

> 31.当点击按钮时，event.target 是什么？ 2021-04-13

```html
<div onclick="console.log('first div')">
  <div onclick="console.log('second div')">
    <button onclick="console.log('button')">Click!</button>
  </div>
</div>
```

- A: Outer div
- B: Inner div
- C: button
- D: 一个包含所有嵌套元素的数组。

<details>
<summary>点击查看答案</summary>

答案: C
<br />
导致事件的最深嵌套的元素是事件的 target。 可以通过 event.stopPropagation 来停止冒泡。

</details>

---

> 32.当单击该段落时，日志输出是什么？ 2021-04-13

```javascript
<div onclick="console.log('div')">
  <p onclick="console.log('p')">Click here!</p>
</div>
```

- A: p div
- B: div p
- C: p
- D: div

<details>
<summary>点击查看答案</summary>

答案: A
<br />
当点击 p 标签，我们会看到两个输出日志: p 和 div。在事件传播期间，有三个阶段：捕获、目标和冒泡。默认情况下，事件处理程序在冒泡阶段执行(除非将 useCapture 设置为 true)。它从嵌套最深的元素向外传播。

</details>

---

> 33.输出是什么？ 2021-04-13

```javascript
const person = { name: 'Lydia' };
function sayHi(age) {
  console.log(`${this.name} is ${age}`);
}

sayHi.call(person, 21);
sayHi.bind(person, 21);
```

- A: undefined is 21 Lydia is 21
- B: function function
- C: Lydia is 21 Lydia is 21
- D: Lydia is 21 function

<details>
<summary>点击查看答案</summary>

答案: D
<br />
使用这两种方法，我们都可以传递我们希望 this 关键字引用的对象。但是，.call 是立即执行的。
.bind 返回函数的副本，但带有绑定上下文！它不是立即执行的。

</details>

---

> 34.输出是什么？ 2021-04-14

```javascript
function SayHi() {
  return (() => 0)();
}

typeof SayHi();
```

- A: "object"
- B: "number"
- C: "function"
- D: "undefined"

<details>
<summary>点击查看答案</summary>

答案: B
<br />
SayHi 方法返回的是立即执行函数(IIFE)的返回值。此立即执行函数的返回值是 0，类型是 number。
参考：只有 7 种内置类型：null, undefined, boolean, number, string, object, symbol, bigint。 fucntion 不是一种类型，函数是对象，他的类型是 object。

</details>

---

> 35.下面哪些值是 falsy？ 2021-04-14

```javascript
a.0
b.new Number(0)
c.('')
d.(' ')
e.new Boolean(false)
f.undefined
```

- A: a,c,f
- B: a,b,c,e,f
- C: a,b,e,f
- D: all

<details>
<summary>点击查看答案</summary>

答案: A
<br />
只有 6 种 falsy 值: undefined，null，NaN，0，''(empty string)，false。Function 构造函数，比如 new Number 和 new Boolean，是 truthy。

</details>

---

> 36.输出是什么？ 2021-04-14

```javascript
console.log(typeof typeof 1);
```

- A: "number"
- B: "string"
- C: "object"
- D: "undefined"

<details>
<summary>点击查看答案</summary>

答案: B
<br />
typeof 1 返回 "number"。typeof "number" 返回"string"

</details>

---

> 37.输出是什么？ 2021-04-15

```javascript
const numbers = [1, 2, 3];
numbers[10] = 11;
console.log(numbers);
```

- A: [1, 2, 3, null x 7, 11]
- B: [1, 2, 3, 11]
- C: [1, 2, 3, empty x 7, 11]
- D: SyntaxError

<details>
<summary>点击查看答案</summary>

答案: C
<br />
当为数组设置超过数组长度的值的时候，JavaScript 会创建名为"empty slots"的东西。它们的值实际上是 undefined。你会看到以下场景:
Chrome:[1, 2, 3, empty x 7, 11]
Node: [ 1, 2, 3, <7 empty items>, 11 ]
这取决于运行环境的不同

</details>

---

> 38.输出是什么？ 2021-04-15

```javascript
(() => {
  let x, y;
  try {
    throw new Error();
  } catch (x) {
    (x = 1), (y = 2);
    console.log(x);
  }
  console.log(x);
  console.log(y);
})();
```

- A: 1 undefined 2
- B: undefined undefined undefined
- C: 1 1 2
- D: 1 undefined undefined

<details>
<summary>点击查看答案</summary>

答案: A
<br />
catch 代码块接收参数 x。当我们传递参数时，这与之前定义的变量 x 不同。这个 x 是属于 catch 块级作用域的。
然后，我们将块级作用域中的变量赋值为 1，同时也设置了变量 y 的值。现在，我们打印块级作用域中的变量 x，值为 1.
catch 块之外的变量 x 的值仍为 undefined，y 的值为 2.当我们在 catch 块之外执行 console.log(x)时，返回 undefined，y 返回 2。

</details>

---

> 39.JavaScript 中的一切都是？ 2021-04-15

- A: 基本类型与对象
- B: 函数与对象
- C: 只有对象
- D: 数字与对象

<details>
<summary>点击查看答案</summary>

答案: A
<br />
基本类型包括: boolean, number, string, symble, bigint, null, undefined。

</details>

---

> 40.输出是什么？ 2021-04-15

```javascript
[
  [0, 1],
  [2, 3],
].reduce(
  (acc, cur) => {
    return acc.concat(cur);
  },
  [1, 2]
);
```

- A: [0, 1, 2, 3, 1, 2]
- B: [6, 1, 2]
- C: [1, 2, 0, 1, 2, 3]
- D: [1, 2, 6]

<details>
<summary>点击查看答案</summary>

答案: C
<br />
[1, 2]是初始值。初始值将会作为首次调用时第一个参数 acc 的值。在第一次执行时，acc 的值是[1, 2], cur 的值是[0, 1]。合并它们，结果为[1, 2, 0, 1]。第二次执行，acc 的值是[1, 2, 0, 1]，cur 的值是[2, 3]。合并它们，最终结果为[1, 2, 0, 1, 2, 3]

</details>

---

> 41.输出是什么？ 2021-04-16

```javascript
!!null;
!!'';
!!1;
```

- A: false true false
- B: false false true
- C: false true true
- D: true true false

<details>
<summary>点击查看答案</summary>

答案: B
<br />
null 是 falsy。!null 的值是 true。!true 的值是 false。
"" 是 falsy。!""的值是 true。!true 的值是 false。
1 是 truthy。!1 的值是 false。!false 的值是 true。

</details>

---

> 42.setInterval 方法的返回值是什么？ 2021-04-16

```javascript
setInterval(() => console.log('Hi'), 1000);
```

- A: 一个唯一的 id
- B: 该方法指定的毫秒数
- C: 传递的函数
- D: undefined

<details>
<summary>点击查看答案</summary>

答案: A
<br />
setInterval 返回一个唯一的 id。此 id 可被用于 clearInterval 函数来取消定时。

</details>

---

> 43.输出是什么？ 2021-04-16

```javascript
[...'Lydia'];
```

- A: ["L", "y", "d", "i", "a"]
- B: ["Lydia"]
- C: [[], "Lydia"]
- D: [["L", "y", "d", "i", "a"]]

<details>
<summary>点击查看答案</summary>

答案: A
<br />
string 类型是可迭代的。扩展运算符将迭代的每个字符映射成一个元素。

</details>

---

> 44.输出是什么？ 2021-04-17

```javascript
function* generator(i) {
  yield i;
  yield i * 2;
}

const gen = generator(10);

console.log(gen.next().value);
console.log(gen.next().value);
```

- A: [0, 10], [10, 20]
- B: 20, 20
- C: 10, 20
- D: 0, 10 and 10, 20

<details>
<summary>点击查看答案</summary>

答案: C
<br />
一般的函数在执行之后是不能中途停下的。但是，生成器函数却可以中途“停下”，之后可以再从停下的地方继续。当生成器遇到 yield 关键字的时候，会生成 yield 后面的值。注意，生成器在这种情况下不 返回 (return )值，而是 生成 (yield)值。

首先，我们用 10 作为参数 i 来初始化生成器函数。然后使用 next()方法一步步执行生成器。第一次执行生成器的时候，i 的值为 10，遇到第一个 yield 关键字，它要生成 i 的值。此时，生成器“暂停”，生成了 10。

然后，我们再执行 next()方法。生成器会从刚才暂停的地方继续，这个时候 i 还是 10。于是我们走到了第二个 yield 关键字处，这时候需要生成的值是 i\*2，i 为 10，那么此时生成的值便是 20。所以这道题的最终结果是 10,20。

</details>

---

> 45.输出是什么？ 2021-04-17

```javascript
const firstPromise = new Promise((res, rej) => {
  setTimeout(res, 500, 'one');
});
const secondPromise = new Promise((res, rej) => {
  setTimeout(res, 100, 'two');
});

Promise.race([firstPromise, secondPromise]).then((res) => console.log(res));
```

- A: "one"
- B: "two"
- C: "two" "one"
- D: "one" "two"

<details>
<summary>点击查看答案</summary>

答案: B
<br />
当我们向 Promise.race 方法中传入多个 Promise 时，会进行 优先 解析。在这个例子中，我们用 setTimeout 给 firstPromise 和 secondPromise 分别设定了 500ms 和 100ms 的定时器。这意味着 secondPromise 会首先解析出字符串 two。那么此时 res 参数即为 two，是为输出结果。

</details>

---

> 46.输出是什么？ 2021-04-17

```javascript
let person = { name: 'Lydia' };
const members = [person];
person = null;

console.log(members);
```

- A: null
- B: [null]
- C: [{}]
- D: [{ name: "Lydia" }]

<details>
<summary>点击查看答案</summary>

答案: D
<br />
首先我们声明了一个拥有 name 属性的对象 person

然后我们又声明了一个变量 members. 将首个元素赋值为变量 person。 当设置两个对象彼此相等时，它们会通过 引用 进行交互。但是当你将引用从一个变量分配至另一个变量时，其实只是执行了一个 复制 操作。（注意一点，他们的引用 并不相同!）

接下来我们让 person 等于 null。

我们没有修改数组第一个元素的值，而只是修改了变量 person 的值,因为元素（复制而来）的引用与 person 不同。members 的第一个元素仍然保持着对原始对象的引用。当我们输出 members 数组时，第一个元素会将引用的对象打印出来。

</details>

---

> 47.输出是什么？ 2021-04-18

```javascript
const person = {
  name: 'Lydia',
  age: 21,
};

for (const item in person) {
  console.log(item);
}
```

- A: { name: "Lydia" }, { age: 21 }
- B: "name", "age"
- C: "Lydia", 21
- D: ["name", "Lydia"], ["age", 21]

<details>
<summary>点击查看答案</summary>

答案: B
<br />
在 for-in 循环中,我们可以通过对象的 key 来进行迭代,也就是这里的 name 和 age。在底层，对象的 key 都是字符串（如果他们不是 Symbol 的话）。在每次循环中，我们将 item 设定为当前遍历到的 key.所以一开始，item 是 name，之后 item 输出的则是 age。

</details>

---

> 48.输出是什么？ 2021-04-18

```javascript
console.log(3 + 4 + '5');
```

- A: "345"
- B: "75"
- C: 12
- D: "12"

<details>
<summary>点击查看答案</summary>

答案: B
<br />
当所有运算符的 优先级 相同时，计算表达式需要确定运算符的结合顺序，即从右到左还是从左往右。在这个例子中，我们只有一类运算符+，对于加法来说，结合顺序就是从左到右。

3 + 4 首先计算，得到数字 7.

由于类型的强制转换，7 + '5'的结果是"75". JavaScript 将 7 转换成了字符串，可以参考问题 15.我们可以用+号把两个字符串连接起来。 "7" + "5" 就得到了"75".

</details>

---

> 49.num 的值是什么？ 2021-04-18

```javascript
const num = parseInt('7*6', 10);
```

- A: 42
- B: "42"
- C: 7
- D: NaN

<details>
<summary>点击查看答案</summary>

答案: C
<br />
只返回了字符串中第一个字母. 设定了 进制 后 (也就是第二个参数，指定需要解析的数字是什么进制: 十进制、十六机制、八进制、二进制等等……),parseInt 检查字符串中的字符是否合法. 一旦遇到一个在指定进制中不合法的字符后，立即停止解析并且忽略后面所有的字符。

\*就是不合法的数字字符。所以只解析到"7"，并将其解析为十进制的 7. num 的值即为 7.

</details>

---

> 50.输出是什么？ 2021-04-18

```javascript
[1, 2, 3].map((num) => {
  if (typeof num === 'number') return;
  return num * 2;
});
```

- A: []
- B: [null, null, null]
- C: [undefined, undefined, undefined]
- D: [ 3 x empty ]

<details>
<summary>点击查看答案</summary>

答案: C
<br />
对数组进行映射的时候,num 就是当前循环到的元素. 在这个例子中，所有的映射都是 number 类型，所以 if 中的判断 typeof num === "number"结果都是 true.map 函数创建了新数组并且将函数的返回值插入数组。

但是，没有任何值返回。当函数没有返回任何值时，即默认返回 undefined.对数组中的每一个元素来说，函数块都得到了这个返回值，所以结果中每一个元素都是 undefined.

</details>

---

> 51.输出是什么？ 2021-04-19

```javascript
function getInfo(member, year) {
  (member.name = 'Lydia'), (year = '1998');
}
const person = { name: 'Sarah' };
const birthYear = '1997';

getInfo(person, birthYear);
console.log(person, birthYear);
```

- A: { name: "Lydia" }, "1997"
- B: { name: "Sarah" }, "1998"
- C: { name: "Lydia" }, "1998"
- D: { name: "Sarah" }, "1997"

<details>
<summary>点击查看答案</summary>

答案: A
<br />
普通参数都是 值 传递的，而对象则不同，是 引用 传递。所以说，birthYear 是值传递，因为他是个字符串而不是对象。当我们对参数进行值传递时，会创建一份该值的 复制 。（可以参考问题 46）

变量 birthYear 有一个对"1997"的引用，而传入的参数也有一个对"1997"的引用，但二者的引用并不相同。当我们通过给 year 赋值"1998"来更新 year 的值的时候我们只是更新了 year（的引用）。此时 birthYear 仍然是"1997".

而 person 是个对象。参数 member 引用与之 相同的 对象。当我们修改 member 所引用对象的属性时,person 的相应属性也被修改了,因为他们引用了相同的对象. person 的 name 属性也变成了 "Lydia".

</details>

---

> 52.输出是什么？ 2021-04-19

```javascript
function greeting() {
  thow "Hello world";
}
function sayHi() {
  try {
    const data = greeting();
    console.log("It worked!", data);
  } catch(e) {
    console.log("Oh no an error:", e);
  }
}
sayHi();
```

- A: "It worked! Hello world!"
- B: "Oh no an error: undefined
- C: SyntaxError: can only throw Error objects
- D: "Oh no an error: Hello world!

<details>
<summary>点击查看答案</summary>

答案: D
<br />
通过 throw 语句，我么可以创建自定义错误。 而通过它，我们可以抛出异常。异常可以是一个字符串, 一个 数字, 一个 布尔类型 或者是一个 对象。在本例中，我们的异常是字符串'Hello world'.

通过 catch 语句，我们可以设定当 try 语句块中抛出异常后应该做什么处理。在本例中抛出的异常是字符串'Hello world'. e 就是这个字符串，因此被输出。最终结果就是'Oh an error: Hello world'.

</details>

---

> 53.输出是什么？ 2021-04-19

```javascript
function Car() {
  this.make = 'Lamborghini';
  return { make: 'Maserati' };
}

const myCar = new Car();
console.log(myCar.make);
```

- A: "Lamborghini"
- B: "Maserati"
- C: ReferenceError
- D: TypeError

<details>
<summary>点击查看答案</summary>

答案: B
<br />
返回属性的时候，属性的值等于 返回的 值，而不是构造函数中设定的值。我们返回了字符串 "Maserati"，所以 myCar.make 等于"Maserati".

</details>

---

> 54.输出是什么？ 2021-04-20

```javascript
(() => {
  let x = (y = 10);
})();

console.log(typeof x);
console.log(typeof y);
```

- A: "undefined", "number"
- B: number", "number"
- C: object", "number"
- D: "number", "undefined"

<details>
<summary>点击查看答案</summary>

答案: A
<br />
let x = y = 10; 是下面这个表达式的缩写：
y = 10;
let x = y;
然后我们声明了变量 x 等于 y,也是 10.但变量是使用 let 声明的，它只作用于 块级作用域, 仅在声明它的块中有效；就是案例中的立即调用表达式(IIFE)。使用 typeof 操作符时, 操作值 x 没有被定义：因为我们在 x 声明块的外部，无法调用它。这就意味着 x 未定义。未分配或是未声明的变量类型为"undefined". console.log(typeof x)返回"undefined".

而我们创建了全局变量 y，并且设定 y 等于 10.这个值在我们的代码各处都访问的到。 y 已经被定义了，而且有一个"number"类型的值。 console.log(typeof y)返回"number".

</details>

---

> 55.输出是什么？ 2021-04-20

```javascript
class Dog {
  constructor(name) {
    this.name = name;
  }
}
Dog.prototype.bark = function() {
  console.log(`Woof, I am ${this.name}`);
}

const pet = new Dog("Mara");
pet.bark();
delete Dog.prototype.bark;
pet.bark();
```

- A: "Woof I am Mara", TypeError
- B: "Woof I am Mara","Woof I am Mara"
- C: "Woof I am Mara", undefined
- D: TypeError, TypeError

<details>
<summary>点击查看答案</summary>

答案: A
<br />
我们可以用delete关键字删除对象的属性，对原型也是适用的。删除了原型的属性后，该属性在原型链上就不可用了。在本例中，函数bark在执行了delete Dog.prototype.bark后不可用, 然而后面的代码还在调用它。

当我们尝试调用一个不存在的函数时TypeError异常会被抛出。在本例中就是 TypeError: pet.bark is not a function，因为pet.bark是undefined.

</details>

---

> 56.输出是什么？ 2021-04-20

```javascript
[1, 2, 3].map((num) => {
  if (typeof num === 'number') return;
  return num * 2;
});
```

- A: []
- B: [null, null, null]
- C: [undefined, undefined, undefined]
- D: [ 3 x empty ]

<details>
<summary>点击查看答案</summary>

答案: C
<br />
对数组进行映射的时候,num 就是当前循环到的元素. 在这个例子中，所有的映射都是 number 类型，所以 if 中的判断 typeof num === "number"结果都是 true.map 函数创建了新数组并且将函数的返回值插入数组。

但是，没有任何值返回。当函数没有返回任何值时，即默认返回 undefined.对数组中的每一个元素来说，函数块都得到了这个返回值，所以结果中每一个元素都是 undefined.

</details>

---

> 57.输出是什么？ 2021-04-21

```javascript
// counter.js
let counter = 10;
export default counter;

// index.js
import myCounter from "./counter.js";

myCounter += 1;

console.log(myCounter);
```

- A: 10
- B: 11
- C: Error
- D: NaN

<details>
<summary>点击查看答案</summary>

答案: C
<br />
引入的模块是 只读 的: 你不能修改引入的模块。只有导出他们的模块才能修改其值。

当我们给myCounter增加一个值的时候会抛出一个异常： myCounter是只读的，不能被修改。

</details>

---

> 58.输出是什么？ 2021-04-21

```javascript
const name = "Lydia";
age = 21;

console.log(delete name);
console.log(delete age);
```

- A: false, true
- B: "Lydia", 21
- C: true, true
- D: undefined, undefined

<details>
<summary>点击查看答案</summary>

答案: A
<br />
delete操作符返回一个布尔值： true指删除成功，否则返回false. 但是通过 var, const 或 let 关键字声明的变量无法用 delete 操作符来删除。

name变量由const关键字声明，所以删除不成功:返回 false. 而我们设定age等于21时,我们实际上添加了一个名为age的属性给全局对象。对象中的属性是可以删除的，全局对象也是如此，所以delete age返回true.

</details>

---

> 59.输出是什么？ 2021-04-21

```javascript
const numbers = [1, 2, 3, 4, 5];
const [y] = numbers;

console.log(y);
```

- A: [[1, 2, 3, 4, 5]]
- B: [1, 2, 3, 4, 5]
- C: 1
- D: [1]

<details>
<summary>点击查看答案</summary>

答案: C
<br />
可以通过结构赋值来解析来自对象的数组或属性的值：
[a, b] = [1, 2];

a的值现在是1， b的值现在是2.在题目中，我们是这么做的：
[y] = [1, 2, 3, 4, 5];

也就是说，y等于数组的第一个值就是数字1. 所以我们输出y，返回1.

</details>

---

> 60.输出是什么？ 2021-04-21

```javascript
const user = {name: "Lydia", age: 21};
const admin = {admin: true, ...user};

console.log(admin);
```

- A: { admin: true, user: { name: "Lydia", age: 21 } }
- B: { admin: true, name: "Lydia", age: 21 }
- C: { admin: true, user: ["Lydia", 21] }
- D: { admin: true }

<details>
<summary>点击查看答案</summary>

答案: B
<br />
扩展运算符...为对象的组合提供了可能。你可以复制对象中的键值对，然后把它们加到另一个对象里去。在本例中，我们复制了user对象键值对，然后把它们加入到admin对象中。admin对象就拥有了这些键值对，所以结果为{ admin: true, name: "Lydia", age: 21 }
</details>

---

> 61.输出是什么？ 2021-04-22

```javascript
const person = {name: "Lydia"}
Object.defineProperty(person, "age", {value: 21});
console.log(person)
console.log(Object.keys(person);)
```

- A: { name: "Lydia", age: 21 }, ["name", "age"]
- B: { name: "Lydia", age: 21 }, ["name"]
- C: { name: "Lydia"}, ["name", "age"]
- D: { name: "Lydia"}, ["age"]

<details>
<summary>点击查看答案</summary>

答案: B
<br />
通过defineProperty方法，我们可以给对象添加一个新属性，或者修改已经存在的属性。而我们使用defineProperty方法给对象添加了一个属性之后，属性默认为 不可枚举(not enumerable). Object.keys方法仅返回对象中 可枚举(enumerable) 的属性，因此只剩下了"name".

用defineProperty方法添加的属性默认不可变。你可以通过writable, configurable 和 enumerable属性来改变这一行为。这样的话， 相比于自己添加的属性，defineProperty方法添加的属性有了更多的控制权。


</details>

---

> 62.输出是什么？ 2021-04-22

```javascript
const settings = {
  username: "lydiahallie",
  level: 19,
  health: 90
}
const data = JSON.stringify(settings, ["level", "health"]);
console.log(data);
```

- A: "{"level":19, "health":90}"
- B: "{"username": "lydiahallie"}"
- C: "["level", "health"]"
- D: "{"username": "lydiahallie", "level":19, "health":90}"

<details>
<summary>点击查看答案</summary>

答案: A
<br />
JSON.stringify的第二个参数是 替代者(replacer). 替代者(replacer)可以是个函数或数组，用以控制哪些值如何被转换为字符串。

如果替代者(replacer)是个 数组 ，那么就只有包含在数组中的属性将会被转化为字符串。在本例中，只有名为"level" 和 "health" 的属性被包括进来， "username"则被排除在外。 data 就等于 "{"level":19, "health":90}".

而如果替代者(replacer)是个 函数，这个函数将被对象的每个属性都调用一遍。 函数返回的值会成为这个属性的值，最终体现在转化后的JSON字符串中（译者注：Chrome下，经过实验，如果所有属性均返回同一个值的时候有异常，会直接将返回值作为结果输出而不会输出JSON字符串），而如果返回值为undefined，则该属性会被排除在外。
</details>

---

> 63.输出是什么？ 2021-04-22

```javascript
let num = 10;

const increaseNumber = () => num++;
const increasePassedNumber = number => number++;

const num1 = increaseNumber();
const num2 = increasePassedNumber(num1);

console.log(num1);
console.log(num2);
```

- A: 10, 10
- B: 10, 11
- C: 11, 11
- D: 11, 12

<details>
<summary>点击查看答案</summary>

答案: A
<br />
一元操作符 ++ 先返回 操作值, 再累加 操作值。num1的值是10, 因为increaseNumber函数首先返回num的值，也就是10，随后再进行 num的累加。

num2是10因为我们将 num1传入increasePassedNumber. number等于10（num1的值。同样道理，++ 先返回 操作值, 再累加 操作值。） number是10，所以num2也是10.
</details>

---
