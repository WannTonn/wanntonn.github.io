# 前端 JavaScript 问答题目收录
<!--
 * @Author: WannTonn
 * @Date: 2021-04-03 22:26:05
 * @LastEditTime: 2021-05-13 10:20:06
 * @LastEditors: Please set LastEditors
 * @Description:
 * @FilePath: /tyrantwt.github.io/_posts/2021-03-31-FED-Questions.md
-->

## 摘录自 <a href="https://github.com/lydiahallie/javascript-questions/blob/master/zh-CN/README-zh_CN.md" target="_blank">Github</a>。同步更新中。

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
Dog.prototype.bark = function () {
  console.log(`Woof, I am ${this.name}`);
};

const pet = new Dog('Mara');
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
我们可以用 delete 关键字删除对象的属性，对原型也是适用的。删除了原型的属性后，该属性在原型链上就不可用了。在本例中，函数 bark 在执行了 delete Dog.prototype.bark 后不可用, 然而后面的代码还在调用它。

当我们尝试调用一个不存在的函数时 TypeError 异常会被抛出。在本例中就是 TypeError: pet.bark is not a function，因为 pet.bark 是 undefined.

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
import myCounter from './counter.js';

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

当我们给 myCounter 增加一个值的时候会抛出一个异常： myCounter 是只读的，不能被修改。

</details>

---

> 58.输出是什么？ 2021-04-21

```javascript
const name = 'Lydia';
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
delete 操作符返回一个布尔值： true 指删除成功，否则返回 false. 但是通过 var, const 或 let 关键字声明的变量无法用 delete 操作符来删除。

name 变量由 const 关键字声明，所以删除不成功:返回 false. 而我们设定 age 等于 21 时,我们实际上添加了一个名为 age 的属性给全局对象。对象中的属性是可以删除的，全局对象也是如此，所以 delete age 返回 true.

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

a 的值现在是 1， b 的值现在是 2.在题目中，我们是这么做的：
[y] = [1, 2, 3, 4, 5];

也就是说，y 等于数组的第一个值就是数字 1. 所以我们输出 y，返回 1.

</details>

---

> 60.输出是什么？ 2021-04-21

```javascript
const user = { name: 'Lydia', age: 21 };
const admin = { admin: true, ...user };

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
扩展运算符...为对象的组合提供了可能。你可以复制对象中的键值对，然后把它们加到另一个对象里去。在本例中，我们复制了 user 对象键值对，然后把它们加入到 admin 对象中。admin 对象就拥有了这些键值对，所以结果为{ admin: true, name: "Lydia", age: 21 }

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
通过 defineProperty 方法，我们可以给对象添加一个新属性，或者修改已经存在的属性。而我们使用 defineProperty 方法给对象添加了一个属性之后，属性默认为 不可枚举(not enumerable). Object.keys 方法仅返回对象中 可枚举(enumerable) 的属性，因此只剩下了"name".

用 defineProperty 方法添加的属性默认不可变。你可以通过 writable, configurable 和 enumerable 属性来改变这一行为。这样的话， 相比于自己添加的属性，defineProperty 方法添加的属性有了更多的控制权。

</details>

---

> 62.输出是什么？ 2021-04-22

```javascript
const settings = {
  username: 'lydiahallie',
  level: 19,
  health: 90,
};
const data = JSON.stringify(settings, ['level', 'health']);
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
JSON.stringify 的第二个参数是 替代者(replacer). 替代者(replacer)可以是个函数或数组，用以控制哪些值如何被转换为字符串。

如果替代者(replacer)是个 数组 ，那么就只有包含在数组中的属性将会被转化为字符串。在本例中，只有名为"level" 和 "health" 的属性被包括进来， "username"则被排除在外。 data 就等于 "{"level":19, "health":90}".

而如果替代者(replacer)是个 函数，这个函数将被对象的每个属性都调用一遍。 函数返回的值会成为这个属性的值，最终体现在转化后的 JSON 字符串中（译者注：Chrome 下，经过实验，如果所有属性均返回同一个值的时候有异常，会直接将返回值作为结果输出而不会输出 JSON 字符串），而如果返回值为 undefined，则该属性会被排除在外。

</details>

---

> 63.输出是什么？ 2021-04-22

```javascript
let num = 10;

const increaseNumber = () => num++;
const increasePassedNumber = (number) => number++;

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
一元操作符 ++ 先返回 操作值, 再累加 操作值。num1 的值是 10, 因为 increaseNumber 函数首先返回 num 的值，也就是 10，随后再进行 num 的累加。

num2 是 10 因为我们将 num1 传入 increasePassedNumber. number 等于 10（num1 的值。同样道理，++ 先返回 操作值, 再累加 操作值。） number 是 10，所以 num2 也是 10.

</details>

---

> 64.输出是什么？ 2021-04-23

```javascript
const value = { number: 10 };

const multiply = (x = { ...value }) => {
  console.log((x.number *= 2));
};
multiply();
multiply();
multiply(value);
multiply(value);
```

- A: 20, 40, 80, 160
- B: 20, 40, 20, 40
- C: 20, 20, 20, 40
- D: NaN, NaN, 20, 40

<details>
<summary>点击查看答案</summary>

答案: C
<br />
在 ES6 中，我们可以使用默认值初始化参数。如果没有给函数传参，或者传的参值为 "undefined" ，那么参数的值将是默认值。上述例子中，我们将 value 对象进行了解构并传到一个新对象中，因此 x 的默认值为 {number：10} 。

默认参数在调用时才会进行计算，每次调用函数时，都会创建一个新的对象。我们前两次调用 multiply 函数且不传递值，那么每一次 x 的默认值都为 {number：10} ，因此打印出该数字的乘积值为 20。

第三次调用 multiply 时，我们传递了一个参数，即对象 value。 _=运算符实际上是 x.number = x.number _ 2 的简写，我们修改了 x.number 的值，并打印出值 20。

第四次，我们再次传递 value 对象。 x.number 之前被修改为 20，所以 x.number \* = 2 打印为 40。

</details>

---

> 65.输出是什么？ 2021-04-23

```javascript
[1, 2, 3, 4].reduce((x, y) => console.log(x, y));
```

- A: 1 2 and 3 3 and 6 4
- B: 1 2 and 2 3 and 3 4
- C: 1 undefined and 2 undefined and 3 undefined and 4 undefined
- D: 1 2 and undefined 3 and undefined 4

<details>
<summary>点击查看答案</summary>

答案: D
<br />
reducer 函数接收 4 个参数:

Accumulator (acc) (累计器)
Current Value (cur) (当前值)
Current Index (idx) (当前索引)
Source Array (src) (源数组)
reducer 函数的返回值将会分配给累计器，该返回值在数组的每个迭代中被记住，并最后成为最终的单个结果值。

reducer 函数还有一个可选参数 initialValue, 该参数将作为第一次调用回调函数时的第一个参数的值。如果没有提供 initialValue，则将使用数组中的第一个元素。

在上述例子，reduce 方法接收的第一个参数(Accumulator)是 x, 第二个参数(Current Value)是 y。

在第一次调用时，累加器 x 为 1，当前值“y”为 2，打印出累加器和当前值：1 和 2。

例子中我们的回调函数没有返回任何值，只是打印累加器的值和当前值。如果函数没有返回值，则默认返回 undefined。 在下一次调用时，累加器为 undefined，当前值为“3”, 因此 undefined 和 3 被打印出。

在第四次调用时，回调函数依然没有返回值。 累加器再次为 undefined ，当前值为“4”。 undefined 和 4 被打印出。

</details>

---

> 66.使用哪个构造函数可以成功继承 Dog 类？ 2021-04-23

```javascript
class Dog {
  constructor(name) {
    this.name = name;
  }
}

class Labrador extends Dog {
  // 1
  constructor(name, size) {
    this.size = size;
  }
  // 2
  constructor(name, size) {
    super(name);
    this.size = size;
  }
  // 3
  constructor(size) {
    super(name);
    this.size = size;
  }
  // 4
  constructor(name, size) {
    this.name = name;
    this.size = size;
  }
}
```

- A: 1
- B: 2
- C: 3
- D: 4

<details>
<summary>点击查看答案</summary>

答案: B
<br />
在子类中，在调用 super 之前不能访问到 this 关键字。 如果这样做，它将抛出一个 ReferenceError：1 和 4 将引发一个引用错误。

使用 super 关键字，需要用给定的参数来调用父类的构造函数。 父类的构造函数接收 name 参数，因此我们需要将 name 传递给 super。

Labrador 类接收两个参数，name 参数是由于它继承了 Dog，size 作为 Labrador 类的额外属性，它们都需要传递给 Labrador 的构造函数，因此使用构造函数 2 正确完成。

</details>

---

> 67.输出是什么？ 2021-04-24

```javascript
// index.js
console.log('running index.js');
import { sum } from './sum.js';
console.log(sum(1, 2));

// sum.js
console.log('running sum.js');
export const sum = (a, b) => a + b;
```

- A: running index.js, running sum.js, 3
- B: running sum.js, running index.js, 3
- C: running sum.js, 3, running index.js
- D: running index.js, undefined, running sum.js

<details>
<summary>点击查看答案</summary>

答案: B
<br />
import 命令是编译阶段执行的，在代码运行之前。因此这意味着被导入的模块会先运行，而导入模块的文件会后执行。

这是 CommonJS 中 require（）和 import 之间的区别。使用 require()，您可以在运行代码时根据需要加载依赖项。 如果我们使用 require 而不是 import，running index.js，running sum.js，3 会被依次打印。

</details>

---

> 68.输出是什么？ 2021-04-24

```javascript
console.log(Number(2) === Number(2));
console.log(Boolean(false) === Boolean(false));
console.log(Symbol('foo') === Symbol('foo'));
```

- A: true, true, false
- B: false, true, false
- C: true, false, true
- D: true, true, true

<details>
<summary>点击查看答案</summary>

答案: A
<br />
每个 Symbol 都是完全唯一的。传递给 Symbol 的参数只是给 Symbol 的一个描述。 Symbol 的值不依赖于传递的参数。 当我们测试相等时，我们创建了两个全新的符号：第一个 Symbol（'foo'），第二个 Symbol（'foo'）, 这两个值是唯一的，彼此不相等，因此返回 false。

</details>

---

> 69.输出是什么？ 2021-04-24

```javascript
const name = 'Lydia Hallie';
console.log(name.padStart(13));
console.log(name.padStart(2));
```

- A: "Lydia Hallie", "Lydia Hallie"
- B: " Lydia Hallie", " Lydia Hallie" ("[13x whitespace]Lydia Hallie", "[2x whitespace]Lydia Hallie")
- C: " Lydia Hallie", "Lydia Hallie" ("[1x whitespace]Lydia Hallie", "Lydia Hallie")
- D: "Lydia Hallie", "Lyd"

<details>
<summary>点击查看答案</summary>

答案: C
<br />
使用 padStart 方法，我们可以在字符串的开头添加填充。传递给此方法的参数是字符串的总长度（包含填充）。字符串 Lydia Hallie 的长度为 12, 因此 name.padStart（13）在字符串的开头只会插入 1（13 - 12 = 1）个空格。

如果传递给 padStart 方法的参数小于字符串的长度，则不会添加填充。

</details>

---

> 70.输出是什么？ 2021-04-24

```javascript
console.log('🥑' + '💻');
```

- A: "🥑💻"
- B: 257548
- C: A string containing their code points
- D: Error

<details>
<summary>点击查看答案</summary>

答案: A
<br />
使用+运算符，您可以连接字符串。 上述情况，我们将字符串“🥑”与字符串”💻“连接起来，产生”🥑💻“。

</details>

---

> 71.如何能打印出 console.log 语句后注释掉的值？ 2021-04-25

```javascript
function* startGame() {
  const 答案 = yield 'Do you love JavaScript?';
  if (答案 !== 'Yes') {
    return "Oh wow... Guess we're gone here";
  }
  return 'JavaScript loves you back ❤️';
}

const game = startGame();
console.log(/* 1 */); // Do you love JavaScript?
console.log(/* 2 */); // JavaScript loves you back ❤️
```

- A: game.next("Yes").value and game.next().value
- B: game.next.value("Yes") and game.next.value()
- C: game.next().value and game.next("Yes").value
- D: game.next.value() and game.next.value("Yes")

<details>
<summary>点击查看答案</summary>

答案: C
<br />
generator 函数在遇到 yield 关键字时会‘暂停’其执行。首先，我们要让函数产生字符串 Do you love javascript? 这可以通过调用 game.next().value 来完成。上述函数的第一行就有一个 yield 关键字，那么运行立即停止了。yield 表达式本身没有返回值，或者说总是返回 undefined，意味着变量 答案为 undefined。
next 方法可以带一个参数，该参数会被当做上一个 yield 表达式的返回值。当我们调用 game.next('YES').value 时，先前的 yield 的返回值将被替换为传递给 next()函数的参数‘Yes’。此时变量 答案 被赋值为 ‘Yes’，if 语句返回 false，所以所以 JavaScript loves you back ❤️ 被打印。

</details>

---

> 72.输出是什么？ 2021-04-25

```javascript
console.log(String.raw`Hello\nworld`);
```

- A: Hello world!
- B: Hello
  world!
- C: Hello\nworld
- D: Hello\n
  world

<details>
<summary>点击查看答案</summary>

答案: C
<br />
String.raw 函数是用来获取一个模板字符串的原始字符串的，它返回一个字符串，其中忽略了转义符（\n，\v，\t 等）。但反斜杠可能造成问题，因为你可能会遇到下面这种类似情况：
const path = `C:\Documents\Projects\table.html`
String.raw`${path}`
这将导致：

"C:DocumentsProjects able.html"

直接使用 String.raw

String.raw`C:\Documents\Projects\table.html`
它会忽略转义字符并打印：C:\Documents\Projects\table.html

上述情况，字符串是 Hello\nworld 被打印出。

</details>

---

> 73.输出是什么？ 2021-04-25

```javascript
async function getData() {
  return await Promise.resolve('I made it!');
}
const data = getData();
console.log(data);
```

- A: "I made it!"
- B: Promise {< resolved >: "I made it!"}
- C: Promise {< pending >}
- D: undefined

<details>
<summary>点击查看答案</summary>

答案: C
<br />
异步函数始终返回一个 promise。await 仍然需要等待 promise 的解决：当我们调用 getData()并将其赋值给 data，此时 data 为 getData 方法返回的一个挂起的 promise，该 promise 并没有解决。

如果我们想要访问已解决的值"I made it!"，可以在 data 上使用.then()方法：

data.then(res => console.log(res))

这样将打印 "I made it!"

</details>

---

> 74.输出是什么？ 2021-04-26

```javascript
function addToList(item, list) {
  return list.push(item);
}

const result = addToList('apple', ['banana']);
console.log(result);
```

- A: ['apple', 'banana']
- B: 2
- C: true
- D: undefined

<details>
<summary>点击查看答案</summary>

答案: B
<br />
push()方法返回新数组的长度。一开始，数组包含一个元素（字符串"banana"），长度为 1。 在数组中添加字符串"apple"后，长度变为 2，并将从 addToList 函数返回。

push 方法修改原始数组，如果你想从函数返回数组而不是数组长度，那么应该在 push item 之后返回 list。

</details>

---

> 75.输出是什么？ 2021-04-26

```javascript
const box = { x: 10, y: 20 };
Object.freeze(box);

const shape = box;
shape.x = 100;
console.log(shape);
```

- A: { x: 100, y: 20 }
- B: { x: 10, y: 20 }
- C: { x: 100 }
- D: ReferenceError

<details>
<summary>点击查看答案</summary>

答案: B
<br />
Object.freeze 使得无法添加、删除或修改对象的属性（除非属性的值是另一个对象）。

当我们创建变量 shape 并将其设置为等于冻结对象 box 时，shape 指向的也是冻结对象。你可以使用 Object.isFrozen 检查一个对象是否被冻结，上述情况，Object.isFrozen（shape）将返回 true。

由于 shape 被冻结，并且 x 的值不是对象，所以我们不能修改属性 x。 x 仍然等于 10，{x：10，y：20}被打印。

注意，上述例子我们对属性 x 进行修改，可能会导致抛出 TypeError 异常（最常见但不仅限于严格模式下时）。

</details>

---

> 76.输出是什么？ 2021-04-26

```javascript
const { name: myName } = { name: 'Lydia' };
console.log(name);
```

- A: "Lydia"
- B: "myName"
- C: undefined
- D: ReferenceError

<details>
<summary>点击查看答案</summary>

答案: D
<br />
当我们从右侧的对象解构属性 name 时，我们将其值 Lydia 分配给名为 myName 的变量。

使用{name：myName}，我们是在告诉 JavaScript 我们要创建一个名为 myName 的新变量，并且其值是右侧对象的 name 属性的值。

当我们尝试打印 name，一个未定义的变量时，就会引发 ReferenceError。

</details>

---

> 77.以下是个纯函数么？ 2021-04-27

```javascript
function sun(a, b) {
  return a + b;
}
```

- A: Yes
- B: No

<details>
<summary>点击查看答案</summary>

答案: A
<br />
纯函数在相同的输入值时，需产生相同的输出，其输出的结果，与输入值以外的其他隐藏信息或状态无关，也和由 I/O 设备产生的外部输出无关。 纯函数不会产生副作用。

纯函数与副作用的定义可参考： https://zh.wikipedia.org/wiki/%E5%89%AF%E4%BD%9C%E7%94%A8_(%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%A7%91%E5%AD%A6)

</details>

---

> 78.输出是什么？ 2021-04-27

```javascript
const add = () => {
  const cache = {};
  return (num) => {
    if (num in cache) {
      return `From cache! ${cache[num]}`;
    } else {
      const result = num + 10;
      cache[num] = result;
      return `Calculated! ${result}`;
    }
  };
};

const addFunction = add();
console.log(addFunction(10));
console.log(addFunction(10));
console.log(addFunction(5 * 2));
```

- A: Calculated! 20 Calculated! 20 Calculated! 20
- B: Calculated! 20 From cache! 20 Calculated! 20
- C: Calculated! 20 From cache! 20 From cache! 20
- D: Calculated! 20 From cache! 20 Error

<details>
<summary>点击查看答案</summary>

答案: C
<br />
add 函数是一个记忆函数。 通过记忆化，我们可以缓存函数的结果，以加快其执行速度。上述情况，我们创建一个 cache 对象，用于存储先前返回过的值。

如果我们使用相同的参数多次调用 addFunction 函数，它首先检查缓存中是否已有该值，如果有，则返回缓存值，这将节省执行时间。如果没有，那么它将计算该值，并存储在缓存中。

我们用相同的值三次调用了 addFunction 函数：

在第一次调用，num 等于 10 时函数的值尚未缓存，if 语句 num in cache 返回 false，else 块的代码被执行：Calculated! 20，并且其结果被添加到缓存对象，cache 现在看起来像{10：20}。

第二次，cache 对象包含 10 的返回值。 if 语句 num in cache 返回 true，From cache! 20 被打印。

第三次，我们将 5 \* 2(值为 10)传递给函数。 cache 对象包含 10 的返回值。 if 语句 num in cache 返回 true，From cache! 20 被打印。

</details>

---

> 79.输出是什么？ 2021-04-27

```javascript
const myLifeSummedUp = ['☕', '💻', '🍷', '🍫'];

for (let item in myLifeSummedUp) {
  console.log(item);
}

for (let item of myLifeSummedUp) {
  console.log(item);
}
```

- A: 0 1 2 3 and "☕" "💻" "🍷" "🍫"
- B: "☕" "💻" "🍷" "🍫" and "☕" "💻" "🍷" "🍫"
- C: "☕" "💻" "🍷" "🍫" and 0 1 2 3
- D: 0 1 2 3 and {0: "☕", 1: "💻", 2: "🍷", 3: "🍫"}

<details>
<summary>点击查看答案</summary>

答案: A
<br />
通过 for-in 循环，我们可以遍历一个对象自有的、继承的、可枚举的、非 Symbol 的属性。 在数组中，可枚举属性是数组元素的“键”， 即它们的索引。 类似于下面这个对象：

{0: "☕", 1: "💻", 2: "🍷", 3: "🍫"}

其中键则是可枚举属性，因此 0，1，2，3 被记录。

通过 for-of 循环，我们可以迭代可迭代对象（包括 Array，Map，Set，String，arguments 等）。当我们迭代数组时，在每次迭代中，不同属性的值将被分配给变量 item, 因此“☕”，“💻”，“🍷”，“🍫”被打印。

</details>

---

> 80.输出是什么？ 2021-04-28

```javascript
const list = [1 + 2, 1 * 2, 1 / 2];
console.log(list);
```

- A: ["1 + 2", "1 * 2", "1 / 2"]
- B: ["12", 2, 0.5]
- C: [3, 2, 0.5]
- D: [1, 1, 1]

<details>
<summary>点击查看答案</summary>

答案: C
<br />
数组元素可以包含任何值。 数字，字符串，布尔值，对象，数组，null，undeifned, 以及其他表达式，如日期，函数和计算。

元素将等于返回的值。 1 + 2 返回 3，1 \* 2 返回'2，'1 / 2 返回 0.5。

</details>

---

> 81.输出是什么？ 2021-04-28

```javascript
function sayHi(name) {
  return `Hi there, ${name}`;
}
console.log(sayHi());
```

- A: Hi there,
- B: Hi there, undefined
- C: Hi there, null
- D: ReferenceError

<details>
<summary>点击查看答案</summary>

答案: B
<br />
默认情况下，如果不给函数传参，参数的值将为 undefined。 上述情况，我们没有给参数 name 传值。 name 等于 undefined，并被打印。

在 ES6 中，我们可以使用默认参数覆盖此默认的 undefined 值。 例如：

function sayHi（name =“Lydia”）{...}

在这种情况下，如果我们没有传递值或者如果我们传递 undefined，name 总是等于字符串 Lydia

</details>

---

> 82.输出是什么？ 2021-04-28

```javascript
var status = '😎';

setTimeout(() => {
  const status = '😍';

  const data = {
    status: '🥑',
    getStatus() {
      return this.status;
    },
  };

  console.log(data.getStatus());
  console.log(data.getStatus.call(this));
}, 0);
```

- A: "🥑" and "😍"
- B: "🥑" and "😎"
- C: "😍" and "😎"
- D: "😎" and "😎"

<details>
<summary>点击查看答案</summary>

答案: B
<br />
this 关键字的指向取决于使用它的位置。 在函数中，比如 getStatus，this 指向的是调用它的对象，上述例子中 data 对象调用了 getStatus，因此 this 指向的就是 data 对象。 当我们打印 this.status 时，data 对象的 status 属性被打印，即"🥑"。

使用 call 方法，可以更改 this 指向的对象。data.getStatus.call(this)是将 this 的指向由 data 对象更改为全局对象。在全局对象上，有一个名为 status 的变量，其值为”😎“。 因此打印 this.status 时，会打印“😎”。

</details>

---

> 83.输出是什么？ 2021-04-28

```javascript
const person = {
  name: 'WannTonn',
  age: 27,
};

let city = person.city;
city = 'Fuzhou';
console.log(person);
```

- A: {name: "WannTonn", age: 27}
- B: {name: "WannTonn", age: 27, city: "Fuzhou"}
- C: {name: "WannTonn", age: 27, city: undefined}
- D: "Fuzhou"

<details>
<summary>点击查看答案</summary>

答案: A
<br />
我们将变量 city 设置为等于 person 对象上名为 city 的属性的值。 这个对象上没有名为 city 的属性，因此变量 city 的值为 undefined。

请注意，我们没有引用 person 对象本身，只是将变量 city 设置为等于 person 对象上 city 属性的当前值。

然后，我们将 city 设置为等于字符串“Fuzhou”。 这不会更改 person 对象：没有对该对象的引用。

因此打印 person 对象时，会返回未修改的对象。

</details>

---

> 84.输出是什么？ 2021-04-28

```javascript
fucntion checkAge(age) {
  if (age < 18) {
    const message = "Too young.";
  } else {
    const message = "Old enough!";
  }
  return message;
}

console.log(checkAge(21))
```

- A: "Too young."
- B: "Old enough!"
- C: ReferenceError
- D: undefined

<details>
<summary>点击查看答案</summary>

答案: C
<br />
const 和 let 声明的变量是具有块级作用域的，块是大括号（{}）之间的任何东西, 即上述情况 if / else 语句的花括号。 由于块级作用域，我们无法在声明的块之外引用变量，因此抛出 ReferenceError。

</details>

---

> 85.什么样的信息将被打印？ 2021-04-28

```javascript
fetch('https://www.google.com')
  .then((res) => res.json())
  .then((res) => console.log(res));
```

- A: fetch 方法的结果
- B: 第二次调用 fetch 方法的结果
- C: 前一个.then()中回调方法返回的结果
- D: 总是 undefined

<details>
<summary>点击查看答案</summary>

答案: B
<br />
第二个.then 中 res 的值等于前一个.then 中的回调函数返回的值。 你可以像这样继续链接.then，将值传递给下一个处理程序。

</details>

---

> 86. 哪个选项是将 hasName 设置为 true 的方法，前提是不能将 true 作为参数传递? 2021-04-29

```javascript
function getName(name) {
  const hasName = //
}
```

- A: !!name
- B: name
- C: new Boolean(name)
- D: name.length

<details>
<summary>点击查看答案</summary>

答案: A
<br />
使用逻辑非运算符!，将返回一个布尔值，使用!! name，我们可以确定 name 的值是真的还是假的。 如果 name 是真实的，那么!name 返回 false。 !false 返回 true。

通过将 hasName 设置为 name，可以将 hasName 设置为等于传递给 getName 函数的值，而不是布尔值 true。

new Boolean（true）返回一个对象包装器，而不是布尔值本身。

name.length 返回传递的参数的长度，而不是布尔值 true。

</details>

---

> 87.输出是什么？ 2021-04-29

```javascript
console.log('I want pizza'[0]);
```

- A: """
- B:"I"
- C: SyntaxError
- D: undefined

<details>
<summary>点击查看答案</summary>

答案: B
<br />
可以使用方括号表示法获取字符串中特定索引的字符，字符串中的第一个字符具有索引 0，依此类推。 在这种情况下，我们想要得到索引为 0 的元素，字符'I'被记录。

请注意，IE7 及更低版本不支持此方法。 在这种情况下，应该使用.charAt（）

</details>

---

> 88.输出是什么？ 2021-04-29

```javascript
funciton sum(num1, num2 = num1) {
  console.log(num1 + num2);
}
sum(10)
```

- A: NaN
- B: 20
- C: ReferenceError
- D: undefined

<details>
<summary>点击查看答案</summary>

答案: B
<br />
您可以将默认参数的值设置为函数的另一个参数，只要另一个参数定义在其之前即可。 我们将值 10 传递给 sum 函数。 如果 sum 函数只接收 1 个参数，则意味着没有传递 num2 的值，这种情况下，num1 的值等于传递的值 10。 num2 的默认值是 num1 的值，即 10。 num1 + num2 返回 20。

</details>

---

> 89.输出是什么？ 2021-04-30

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
}
const member = new Person('John');
console.log(typeof member);
```

- A: "class"
- B: "function"
- C: "object"
- D: "string"

<details>
<summary>点击查看答案</summary>

答案: C
<br />
类是构造函数的语法糖，如果用构造函数的方式来重写 Person 类则将是：

function Person() {
this.name = name
}
通过 new 来调用构造函数，将会生成构造函数 Person 的实例，对实例执行 typeof 关键字将返回"object"，上述情况打印出"object"。

</details>

---

> 90.输出是什么？ 2021-04-30

```javascript
// module.js
export default () => 'Hello world';
export const name = 'Lydia';

// index.js
import * as data from './module';

console.log(data);
```

- A: { default: function default(), name: "Lydia" }
- B: { default: function default() }
- C: { default: "Hello world", name: "Lydia" }
- D: Global object of module.js

<details>
<summary>点击查看答案</summary>

答案: A
<br />
使用 import \* as name 语法，我们将 module.js 文件中所有 export 导入到 index.js 文件中，并且创建了一个名为 data 的新对象。 在 module.js 文件中，有两个导出：默认导出和命名导出。 默认导出是一个返回字符串“Hello World”的函数，命名导出是一个名为 name 的变量，其值为字符串“Lydia”。

data 对象具有默认导出的 default 属性，其他属性具有指定 exports 的名称及其对应的值。

</details>

---

> 91.输出是什么？ 2021-04-30

```javascript
let newList = [1, 2, 3].push(4);

console.log(newList.push(5));
```

- A: [1, 2, 3, 4, 5]
- B: [1, 2, 3, 5]
- C: [1, 2, 3, 4]
- D: Error

<details>
<summary>点击查看答案</summary>

答案: B
<br />
.push 方法返回数组的长度，而不是数组本身！ 通过将 newList 设置为[1,2,3].push(4)，实际上 newList 等于数组的新长度：4。

然后，尝试在 newList 上使用.push 方法。 由于 newList 是数值 4，抛出 TypeError。

</details>

---

> 92.输出是什么？ 2021-05-01

```javascript
function giveMePizza() {
  return 'Here you are';
}

const giveMeDrink = () => 'Hure you go,enjoy';

console.log(giveMePizza.prototype);
console.log(giveMeDrink.prototype);
```

- A: { constructor: ...} { constructor: ...}
- B: {} { constructor: ...}
- C: { constructor: ...} {}
- D: {constructor: ...} undefined

<details>
<summary>点击查看答案</summary>

答案: D
<br />
常规函数，例如 giveMePizza 函数， 有一个 prototype 属性，它是一个带有 constructor 属性的对象（原型对象）。然而，箭头函数，例如 giveMeDrink 函数，没有 prototype 属性。尝试使用 giveMeDrink.prototype 属性时会返回 undefined。

</details>

---

> 93.输出是什么？ 2021-05-01

```javascript
const person = {
  name: 'WannTonn',
  age: 27,
};

for (const [x, y] of Object.entries(person)) {
  console.log(x, y);
}
```

- A: name WannTonn and age 27
- B: ["name", "WannTonn"] and ["age", 27]
- C: ["name", "age"] and undefined
- D: Error

<details>
<summary>点击查看答案</summary>

答案:
<br />
Object.entries()方法返回一个给定对象自身可枚举属性的键值对数组，上述情况返回一个二维数组，数组每个元素是一个包含键和值的数组：

[['name'，'WannTonn']，['age'，27]]

使用 for-of 循环，我们可以迭代数组中的每个元素，上述情况是子数组。 我们可以使用 const [x，y]在 for-of 循环中解构子数组。 x 等于子数组中的第一个元素，y 等于子数组中的第二个元素。

第一个子阵列是[“name”，“WannTonn”]，其中 x 等于 name，而 y 等于 Lydia。 第二个子阵列是[“age”，27]，其中 x 等于 age，而 y 等于 27。

</details>

---

> 94.输出是什么？ 2021-05-01

```javascript
function getItems(fruitList, ...args, favoriteFruit) {
  return [...fruitList, ...args, favoriteFruit]
}

getItems(["banana", "apple"], "pear", "orange")
```

- A: ["banana", "apple", "pear", "orange"]
- B: [["banana", "apple"], "pear", "orange"]
- C: ["banana", "apple", ["pear"], "orange"]
- D: SyntaxError

<details>
<summary>点击查看答案</summary>

答案: D
<br />
... args 是剩余参数，剩余参数的值是一个包含所有剩余参数的数组，并且只能作为最后一个参数。上述示例中，剩余参数是第二个参数，这是不可能的，并会抛出语法错误。

```javascript
function getItems(fruitList, favoriteFruit, ...args) {
  return [...fruitList, ...args, favoriteFruit];
}
```

getItems(["banana", "apple"], "pear", "orange")
上述例子是有效的，将会返回数组：[ 'banana', 'apple', 'orange', 'pear' ]

</details>

---

> 95.输出是什么？ 2021-05-02

```javascript
fucntion nums(a, b) {
  if
  (a > b)
  console.log('a is bigger');
  else
  console.log('b is bigger');
  return
  a + b;
}

console.log(nums(4, 2));
console.log(nums(1, 2));
```

- A: a is bigger, 6 and b is bigger, 3
- B: a is bigger, undefined and b is bigger, undefined
- C: undefined and undefined
- D: SyntaxError

<details>
<summary>点击查看答案</summary>

答案: B
<br />
在 JavaScript 中，我们不必显式地编写分号(;)，但是 JavaScript 引擎仍然在语句之后自动添加分号。这称为自动分号插入。例如，一个语句可以是变量，或者像 throw、return、break 这样的关键字。

在这里，我们在新的一行上写了一个 return 语句和另一个值 a + b 。然而，由于它是一个新行，引擎并不知道它实际上是我们想要返回的值。相反，它会在 return 后面自动添加分号。你可以这样看:

return;
a + b
这意味着永远不会到达 a + b，因为函数在 return 关键字之后停止运行。如果没有返回值，就像这里，函数返回 undefined。注意，在 if/else 语句之后没有自动插入!

</details>

---

> 96.输出是什么？ 2021-05-02

```javascript
class Person {
  constructor() {
    this.name = 'WannTonn';
  }
}

Person = class AnothoerPerson {
  constructor() {
    this.name = 'Tyrant';
  }
};

const member = new Person();
console.log(member.name);
```

- A: "WannTonn"
- B: "Tyrant"
- C: Error: cannot redeclare Person
- D: SyntaxError

<details>
<summary>点击查看答案</summary>

答案: B
<br />
我们可以将类设置为等于其他类/函数构造函数。 在这种情况下，我们将 Person 设置为 AnotherPerson。 这个构造函数的名字是 Sarah，所以新的 Person 实例 member 上的 name 属性是 Sarah。

</details>

---

> 97.输出是什么？ 2021-05-02

```javascript
const info = {
  [Symbol('a')]: 'b',
};

console.log(info);
console.log(Object.keys(info));
```

- A: {Symbol('a'): 'b'} and ["{Symbol('a')"]
- B: {} and []
- C: { a: "b" } and ["a"]
- D: {Symbol('a'): 'b'} and []

<details>
<summary>点击查看答案</summary>

答案: D
<br />
Symbol 类型是不可枚举的。Object.keys 方法返回对象上的所有可枚举的键属性。Symbol 类型是不可见的，并返回一个空数组。 记录整个对象时，所有属性都是可见的，甚至是不可枚举的属性。

这是 Symbol 的众多特性之一：除了表示完全唯一的值（防止对象意外名称冲突，例如当使用 2 个想要向同一对象添加属性的库时），您还可以隐藏这种方式对象的属性（尽管不完全。你仍然可以使用 Object.getOwnPropertySymbols()方法访问 Symbol。

</details>

---

> 98.输出是什么？ 2021-05-03

```javascript
const getList = ([x, ...y]) => [x, y];
const getUser = user => {name: user.name, age: user.age};

const list = [1, 2, 3, 4];
const user = {name: "WannTonn", age: 27};

console.log(getList(list));
console.log(getUser(user));
```

- A: [1, [2, 3, 4]] and undefined
- B: [1, [2, 3, 4]] and { name: "WannTonn", age: 27 }
- C: [1, 2, 3, 4] and { name: "WannTonn", age: 27 }
- D: Error and { name: "WannTonn", age: 27 }

<details>
<summary>点击查看答案</summary>

答案: A
<br />
getList函数接收一个数组作为其参数。 在getList函数的括号之间，我们立即解构这个数组。 您可以将其视为：

[x, ...y] = [1, 2, 3, 4]

使用剩余的参数... y，我们将所有剩余参数放在一个数组中。 在这种情况下，其余的参数是2，3和4。 y的值是一个数组，包含所有其余参数。 在这种情况下，x的值等于1，所以当我们打印[x，y]时，会打印[1，[2,3,4]]。

getUser函数接收一个对象。对于箭头函数，如果只返回一个值，我们不必编写花括号。但是，如果您想从一个箭头函数返回一个对象，您必须在圆括号之间编写它，否则不会返回任何值!下面的函数将返回一个对象:

const getUser = user => ({ name: user.name, age: user.age })

由于在这种情况下不返回任何值，因此该函数返回undefined。
</details>

---

> 99.输出是什么？ 2021-05-03

```javascript
const name = "WannTonn"

console.log(name());
```

- A: SyntaxError
- B: ReferenceError
- C: TypeError
- D: undefined

<details>
<summary>点击查看答案</summary>

答案: C
<br />
变量name保存字符串的值，该字符串不是函数，因此无法调用。

当值不是预期类型时，会抛出TypeErrors。 JavaScript期望name是一个函数，因为我们试图调用它。 但它是一个字符串，因此抛出TypeError：name is not a function

当你编写了一些非有效的JavaScript时，会抛出语法错误，例如当你把return这个词写成retrun时。 当JavaScript无法找到您尝试访问的值的引用时，抛出ReferenceErrors。

</details>

---

> 100.输出是什么？ 2021-05-03

```javascript
// 🎉✨ This is my 100th question! ✨🎉

const output = `${[] && 'Im'}possible!
You should${'' && `n't`} see a therapist after so much JavaScript lol`
```

- A: possible! You should see a therapist after so much JavaScript lol
- B: Impossible! You should see a therapist after so much JavaScript lol
- C: possible! You shouldn't see a therapist after so much JavaScript lol
- D: Impossible! You shouldn't see a therapist after so much JavaScript lol

<details>
<summary>点击查看答案</summary>

答案: D
<br />
[]是一个真值。 使用&&运算符，如果左侧值是真值，则返回右侧值。 在这种情况下，左侧值[]是一个真值，所以返回Im。

""是一个假值。 如果左侧值是假的，则不返回任何内容。 n't不会被返回。

</details>

---

> 101.输出是什么？ 2021-05-04

```javascript
const one = (false || {} || null)
const two = (null || false || "")
const three = ([] || 0 || true)

console.log(one, two, three)
```

- A: false null []
- B: null "" true
- C: {} "" []
- D: null null true

<details>
<summary>点击查看答案</summary>

答案: C
<br />
使用||运算符，我们可以返回第一个真值。 如果所有值都是假值，则返回最后一个值。

（false || {} || null）：空对象{}是一个真值。 这是第一个（也是唯一的）真值，它将被返回。one等于{}。

（null || false ||“”）：所有值都是假值。 这意味着返回传递的值""。 two等于""。

（[] || 0 ||“”）：空数组[]是一个真值。 这是第一个返回的真值。 three等于[]。

</details>

---

> 102.输出是什么？ 2021-05-04

```javascript
const myPromise = () => Promise.resolve('I have resolved!')

function firstFunciton() {
  myPromise().then(res => console.log(res));
  console.log('second')
}

async function secondFunction() {
  console.log(await myPromise())
  console.log('second')
}
fisrtFunction();
secondFunction();
```

- A: I have resolved!, second and I have resolved!, second
- B: second, I have resolved! and second, I have resolved!
- C: I have resolved!, second and second, I have resolved!
- D: second, I have resolved! and I have resolved!, second

<details>
<summary>点击查看答案</summary>

答案: D
<br />
有了promise，我们通常会说：当我想要调用某个方法，但是由于它可能需要一段时间，因此暂时将它放在一边。只有当某个值被resolved/rejected，并且执行栈为空时才使用这个值。

我们可以在async函数中通过.then和await关键字获得该值。 尽管我们可以通过.then和await获得promise的价值，但是它们的工作方式有所不同。

在 firstFunction中，当运行到myPromise方法时我们将其放在一边，即promise进入微任务队列，其他后面的代码（console.log('second')）照常运行，因此second被打印出，firstFunction方法到此执行完毕，执行栈中宏任务队列被清空，此时开始执行微任务队列中的任务，I have resolved被打印出。

在secondFunction方法中，我们通过await关键字，暂停了后面代码的执行，直到异步函数的值被解析才开始后面代码的执行。这意味着，它会等着直到 myPromise 以值I have resolved被解决之后，下一行second才开始执行。

</details>

---

> 103.输出是什么？ 2021-05-04

```javascript
const set = new Set()

set.add(1)
set.add("Lydia")
set.add({ name: "Lydia" })

for (let item of set) {
  console.log(item + 2)
}
```

- A: 3, NaN, NaN
- B: 3, 7, NaN
- C: 3, Lydia2, [Object object]2
- D: "12", Lydia2, [Object object]2
<details>
<summary>点击查看答案</summary>

答案: C
<br />
“+”运算符不仅用于添加数值，还可以使用它来连接字符串。 每当JavaScript引擎发现一个或多个值不是数字时，就会将数字强制为字符串。

第一个是数字1。 1 + 2返回数字3。

但是，第二个是字符串“Lydia”。 “Lydia”是一个字符串，2是一个数字：2被强制转换为字符串。 “Lydia”和“2”被连接起来，产生字符串“Lydia2”。

{name：“ Lydia”}是一个对象。 数字和对象都不是字符串，因此将二者都字符串化。 每当我们对常规对象进行字符串化时，它就会变成[Object object]。 与“2”串联的“ [Object object]”成为“[Object object]2”。

</details>

---

> 104.输出是什么？ 2021-05-05

```javascript
Promise.resolve(5)
```

- A: 5
- B: Promise {< pending >: 5}
- C: Promise {< fulfilled >: 5}
- D: Error

<details>
<summary>点击查看答案</summary>

答案: C
<br />
我们可以将我们想要的任何类型的值传递Promise.resolve，无论是否promise。 该方法本身返回带有已解析值的Promise (<fulfilled>)。 如果您传递常规函数，它将是具有常规值的已解决promise。 如果你通过了promise，它将是一个已经resolved的且带有传的值的promise。

上述情况，我们传了数字5，因此返回一个resolved状态的promise，resolve值为5

</details>

------

</br>

> 105.输出是什么？ 2021-05-05

```javascript
function compareMembers(person1, person2 = person) {
  if (person1 !== person2) {
    console.log("Not the same!");
  } else {
    console.log("They are the same!")
  }
}
const person = {name: "WannTonn"}
compareMembers(person)
```

- A: Not the same!
- B: They are the same!
- C: ReferenceError
- D: SyntaxError

<details>
<summary>点击查看答案</summary>

答案: B
<br />
对象通过引用传递。 当我们检查对象的严格相等性（===）时，我们正在比较它们的引用。

我们将“person2”的默认值设置为“person”对象，并将“person”对象作为“person1”的值传递。

这意味着两个值都引用内存中的同一位置，因此它们是相等的。

运行“ else”语句中的代码块，并记录They are the same! 。

</details>

---

> 106.输出是什么？ 2021-05-05

```javascript
const colorConfig = {
  red: true,
  blue: false,
  green: true,
  black: true,
  yellow: false
}
const colors = ["pink", "red", "blue"]

console.log(colorConfig.colors[1])
```

- A: true
- B: false
- C: undefined
- D: TypeError

<details>
<summary>点击查看答案</summary>

答案: D
<br />
在JavaScript中，我们有两种访问对象属性的方法：括号表示法或点表示法。 在此示例中，我们使用点表示法（colorConfig.colors）代替括号表示法（colorConfig [“ colors”]）。

使用点表示法，JavaScript会尝试使用该确切名称在对象上查找属性。 在此示例中，JavaScript尝试在colorconfig对象上找到名为colors的属性。 没有名为“colors”的属性，因此返回“undefined”。 然后，我们尝试使用[1]访问第一个元素的值。 我们无法对未定义的值执行此操作，因此会抛出Cannot read property '1' of undefined。

JavaScript解释（或取消装箱）语句。 当我们使用方括号表示法时，它会看到第一个左方括号[并一直进行下去，直到找到右方括号]。 只有这样，它才会评估该语句。 如果我们使用了colorConfig [colors [1]]，它将返回colorConfig对象上red属性的值。
</details>

---

> 107.输出是什么？ 2021-05-06

```javascript
console.log('❤️' === '❤️')
```

- A: true
- B: false

<details>
<summary>点击查看答案</summary>

答案: A
<br />
在JavaScript内部，表情符号是Unicode。爱心的表情符号对应的Unicode码是 "U + 2764 U + FE0F", 对于相同的表情符号，它们总是相同的，因此我们将2个相等的字符串相互比较，将返回true。
</details>

---

> 108.哪些方法修改了原数组？ 2021-05-06

```javascript
const emojis = ['✨', '🥑', '😍'];

emojis.map(x => x + '✨')
emojis.filter(x => x !== '🥑')
emojis.find(x => x !== '🥑')
emojis.reduce((acc, cur) => acc + '✨')
emojis.slice(1, 2, '✨') 
emojis.splice(1, 2, '✨')
```

- A: All of them
- B: map reduce slice splice
- C: map slice splice
- D: splice

<details>

<summary>点击查看答案</summary>

答案: D
<br />
使用splice方法，我们通过删除，替换或添加元素来修改原始数组。 在这种情况下，我们从索引1中删除了2个元素（我们删除了'🥑'和'😍'），同时添加了✨emoji表情。

map，filter和slice返回一个新数组，find返回一个元素，而reduce返回一个减小的值。
</details>

---

> 109.输出是什么？ 2021-05-06

```javascript
const food = ['🍕', '🍫', '🥑', '🍔']
const info = { favoriteFood: food[0] }

info.favoriteFood = '🍝'

console.log(food)
```

- A: ['🍕', '🍫', '🥑', '🍔']
- B: ['🍝', '🍫', '🥑', '🍔']
- C: ['🍝', '🍕', '🍫', '🥑', '🍔']
- D: ReferenceError

<details>
<summary>点击查看答案</summary>

答案: A
<br />
我们将info对象上的favoriteFood属性的值设置为披萨表情符号“🍕”的字符串。字符串是原始数据类型。在JavaScript中，原始数据类型通过值起作用

在这种情况下，我们将info对象上的favoriteFood属性的值设置为等于food数组中的第一个元素的值，字符串为披萨表情符号（'🍕' ）。字符串是原始数据类型，并且通过值进行交互，我们更改info对象上favoriteFood属性的值。 food数组没有改变，因为favoriteFood的值只是该数组中第一个元素的值的复制，并且与该元素上的元素没有相同的内存引用食物[0]。当我们记录食物时，它仍然是原始数组['🍕'，'🍫'，'🥑'，'🍔']。
</details>

---

> 110.这个函数干了什么？ 2021-05-07

```javascript
JSON.parse()
```

- A: Parses JSON to a JavaScript value
- B: Parses a JavaScript object to JSON
- C: Parses any JavaScript value to JSON
- D: Parses JSON to a JavaScript object only

<details>
<summary>点击查看答案</summary>

答案: A
<br />
使用JSON.parse(), 我们可以将JSON字符串解析为JavaScript值。
// 将数字字符串化为有效的JSON，然后将JSON字符串解析为JavaScript值:
const jsonNumber = JSON.stringify(4) // '4'
JSON.parse(jsonNumber) // 4

// 将数组值字符串化为有效的JSON，然后将JSON字符串解析为JavaScript值:
const jsonArray = JSON.stringify([1, 2, 3]) // '[1, 2, 3]'
JSON.parse(jsonArray) // [1, 2, 3]

// 将对象字符串化为有效的JSON，然后将JSON字符串解析为JavaScript值:
const jsonArray = JSON.stringify({ name: "Lydia" }) // '{"name":"Lydia"}'
JSON.parse(jsonArray) // { name: 'Lydia' }

</details>

---

> 111.输出是什么？ 2021-05-07

```javascript
let name = "WannTonn"
function getName() {
  console.log(name)
  let name = "Joe"
}

getName()
```

- A: WannTonn
- B: Joe
- C: undefined
- D: ReferenceError

<details>
<summary>点击查看答案</summary>

答案: A
<br />
每个函数都有其自己的执行上下文。 getName函数首先在其自身的上下文（范围）内查找，以查看其是否包含我们尝试访问的变量name。 上述情况，getName函数包含其自己的name变量：我们用let关键字和Sarah的值声明变量name。

带有let关键字（和const）的变量被提升，但是与var不同，它不会被初始化。 在我们声明（初始化）它们之前，无法访问它们。 这称为“暂时性死区”。 当我们尝试在声明变量之前访问变量时，JavaScript会抛出ReferenceError: Cannot access 'name' before initialization。
</details>

---

> 112.输出是什么？ 2021-05-07

```javascript
function* generatorOne() {
  yield ['a', 'b', 'c'];
}
function* generatorTwo() {
  yield* ['a', 'b', 'c'];
}

const one = generatorOne();
const two = generatorTwo();
console.log(one.next().value)
console.log(two.next().value)

```

- A: a and a
- B: a and undefined
- C: ['a', 'b', 'c'] and a
- D: a and ['a', 'b', 'c']

<details>
<summary>点击查看答案</summary>

答案: C
<br />
通过 yield 关键字, 我们在 Generator 函数里执行yield表达式. 通过 yield* 关键字, 我们可以在一个Generator 函数里面执行（yield表达式）另一个 Generator 函数, 或可遍历的对象 (如数组).

在函数 generatorOne 中, 我们通过 yield 关键字 yield 了一个完整的数组 ['a', 'b', 'c']。函数one通过next方法返回的对象的value 属性的值 (one.next().value) 等价于数组 ['a', 'b', 'c'].

console.log(one.next().value) // ['a', 'b', 'c']
console.log(one.next().value) // undefined
在函数 generatorTwo 中, 我们使用 yield* 关键字。就相当于函数two第一个yield的值, 等价于在迭代器中第一个 yield 的值。数组['a', 'b', 'c']就是这个迭代器. 第一个 yield 的值就是 a, 所以我们第一次调用 two.next().value时, 就返回a。

console.log(two.next().value) // 'a'
console.log(two.next().value) // 'b'
console.log(two.next().value) // 'c'
console.log(two.next().value) // undefined
</details>

---

> 113.输出是什么？ 2021-05-08

```javascript
console.log(`${(x => x)('I love')} to program`)
```

- A: I love to program
- B: undefined to program
- C: ${(x => x)('I love') to program
- D: TypeError

<details>
<summary>点击查看答案</summary>

答案: A
<br />
带有模板字面量的表达式首先被执行。相当于字符串会包含表达式，这个立即执行函数 (x => x)('I love') 返回的值. 我们向箭头函数 x => x 传递 'I love' 作为参数。x 等价于返回的 'I love'。这就是结果 I love to program。

</details>

---

> 114.将会发生什么？ 2021-05-08

```javascript
let config = {
  alert: setInterval(() => {
    console.log('Alert!')
  }, 1000)
}

config = null
```

- A: setInterval 的回调不会被调用
- B: setInterval 的回调被调用一次
- C: setInterval 的回调仍然会被每秒钟调用
- D: 我们从没调用过 config.alert(), config 为 null

<details>
<summary>点击查看答案</summary>

答案: C
<br />
一般情况下当我们将对象赋值为 null, 那些对象会被进行 垃圾回收（garbage collected） 因为已经没有对这些对象的引用了。然而，setInterval的参数是一个箭头函数（所以上下文绑定到对象 config 了），回调函数仍然保留着对 config的引用。只要存在引用，对象就不会被垃圾回收。因为没有被垃圾回收，setInterval 的回调每1000ms (1s)会被调用一次。

</details>

---

> 115.输出是什么？ 2021-05-08

```javascript
function compareMembers(person1, person2 = person) {
  if (person1 !== person2) {
    console.log("Not the same!");
  } else {
    console.log("They are the same!")
  }
}
const person = {name: "WannTonn"}
compareMembers(person)
```

- A: Not the same!
- B: They are the same!
- C: ReferenceError
- D: SyntaxError

<details>
<summary>点击查看答案</summary>

答案: B
<br />
对象通过引用传递。 当我们检查对象的严格相等性（===）时，我们正在比较它们的引用。

我们将“person2”的默认值设置为“person”对象，并将“person”对象作为“person1”的值传递。

这意味着两个值都引用内存中的同一位置，因此它们是相等的。

运行“ else”语句中的代码块，并记录They are the same! 。

</details>

---

> 116.输出是什么？ 2021-05-09

```javascript
const person = {
  name: "WannTonn",
  age: 27
}
const changeAge = (x = {...person}) => x.age += 1;
const changeAgeAndName = (x = {...person}) => {
  x.age += 1
  x.name = "Evan"
}
changeAge(person)
changeAgeAndName()

console.log(person)
```

- A: {name: "Evan", age: 28}
- B: {name: "Evan", age: 29}
- C: {name: "WannTonn", age: 28}
- D: {name: "WannTonn", age: 29}

<details>
<summary>点击查看答案</summary>

答案: B
<br />
函数 changeAge 和函数 changeAgeAndName 有着不同的参数，定义一个 新 生成的对象 { ...person }。这个对象有着所有 person 对象 中 k/v 值的副本。

首项, 我们调用 changeAge 函数并传递 person 对象作为它的参数。这个函数对 age 属性进行加一操作。person 现在是 { name: "WannTonn", age: 28 }。

然后，我们调用函数 changeAgeAndName ，然而我们没有传递参数。取而代之，x 的值等价 new 生成的对象: { ...person }。因为它是一个新生成的对象，它并不会对对象 person 造成任何副作用。person 仍然等价于 { name: "WannTonn", age: 28 }。



</details>

---

> 117.下面那个选项将会返回 6？ 2021-05-09

```javascript
function sumValues(x, y, z) {
	return x + y + z;
}
```

- A: sumValues([...1, 2, 3])
- B: sumValues([...[1, 2, 3]])
- C: sumValues(...[1, 2, 3])
- D: sumValues([1, 2, 3])

<details>
<summary>点击查看答案</summary>

答案: C
<br />
通过展开操作符 ...，我们可以 暂开 单个可迭代的元素。函数 sumValues function 接收三个参数： x, y 和 z。...[1, 2, 3] 的执行结果为 1, 2, 3，将会传递给函数 sumValues。

</details>

---

> 118.输出是什么？ 2021-05-09

```javascript
let num = 1;
const list = ["🥳", "🤠", "🥰", "🤪"];

console.log(list[(num += 1)]);
```

- A: 🤠
- B: 🥰
- C: SyntaxError
- D: ReferenceError

<details>
<summary>点击查看答案</summary>

答案: B
<br />
通过 += 操作符，我们对值 num 进行加 1 操作。 num 有初始值 1，因此 1 + 1 的执行结果为 2。数组 list 的第二项为 🥰，console.log(list[2]) 输出 🥰.

</details>

---

> 119.输出是什么？ 2021-05-10

```javascript
const person = {
  firstName: "Wann",
  lastName: "Tonn",
  pet: {
    name: "Hachi",
    breed: "土狗"
  },
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
};

console.log(person.pet?.name);
console.log(person.pet?.family?.name);
console.log(person.getFullName?.());
console.log(member.getLastName?.());
```

- A: undefined undefined undefined undefined
- B: Hachi undefined Wann Tonn undefined
- C: Hachi null Wann Tonn null
- D: null ReferenceError null ReferenceError

<details>
<summary>点击查看答案</summary>

答案: B
<br />
通过 ES10 或 TS3.7+可选链操作符 ?.，我们不再需要显式检测更深层的嵌套值是否有效。如果我们尝试获取 undefined 或 null 的值 (nullish)，表达将会短路并返回 undefined.

person.pet?.name： person 有一个名为 pet 的属性： person.pet 不是 nullish。它有个名为 name 的属性，并返回字符串 Hachi。 person.pet?.family?.name： person 有一个名为 pet 的属性： person.pet 不是 nullish. pet 并没有 一个名为 family 的属性, person.pet.family 是 nullish。表达式返回 undefined。 person.getFullName?.()： person 有一个名为 getFullName 的属性： person.getFullName() 不是 nullish 并可以被调用，返回字符串Wann Tonn。 member.getLastName?.(): member is not defined: member.getLastName() is nullish. The expression returns undefined.

</details>

---

> 120.输出是什么？ 2021-05-10

```javascript
const groceries = ["banana", "apple", "peanuts"];

if (groceries.indexOf("banana")) {
  console.log("We have to buy bananas!");
} else {
  console.log("We don't have to buy bananas!");
}
```

- A: We have to buy bananas!
- B: We don't have to buy bananas
- C: undefined
- D: 1

<details>
<summary>点击查看答案</summary>

答案: B
<br />
我们传递了一个状态 groceries.indexOf("banana") 给if条件语句。groceries.indexOf("banana") 返回 0， 一个 falsy 的值。因为if条件语句的状态为 falsy，else 块区内的代码执行，并且 We don't have to buy bananas! 被输出.

</details>

---

> 121.输出是什么？ 2021-05-10

```javascript
const config = {
  languages: [],
  set language(lang) {
    return this.languages.push(lang);
  }
};
console.log(config.language);
```

- A: function language(lang) { this.languages.push(lang }
- B: 0
- C: []
- D: undefined

<details>
<summary>点击查看答案</summary>

答案: D
<br />
方法 language 是一个 setter。Setters 并不保存一个实际值，它们的使命在于 修改 属性。当调用方法 setter， 返回 undefined。
</details>

---

> 122.输出是什么？ 2021-05-11

```javascript
const name = "Wann Tonn";
console.log(!typeof name === "object");
console.log(!typeof name === "string");
```

- A: false true
- B: true false
- C: false false
- D: true true

<details>
<summary>点击查看答案</summary>

答案: C
<br />
typeof name 返回 "string"。字符串 "string" 是一个 truthy 的值，因此 !typeof name 返回一个布尔值 false。 false === "object" 和 false === "string" 都返回 false。

（如果我们想检测一个值的类型，我们应该用 !== 而不是 !typeof）

</details>

---

> 123.输出是什么？ 2021-05-11

```javascript
const add = x => y => z => {
  console.log(x, y, z);
  return x + y + z;
}
add(4)(5)(6)
```

- A: 4 5 6
- B: 6 5 4
- C: 4 function function
- D: undefined undefined 6

<details>
<summary>点击查看答案</summary>

答案: A
<br />
函数 add 是一个返回 返回箭头函数的箭头函数 的箭头函数（still with me?）。第一个函数接收一个值为 4 的参数 x。我们调用第二个函数，它接收一个值为 5 的参数 y。然后我们调用第三个函数，它接收一个值为 6 的参数 z。当我们尝试在最后一个箭头函数中获取 x, y 和 z 的值，JS 引擎根据作用域链去找 x 和 y 的值。得到 4 5 6.

</details>

---

> 124.输出是什么？ 2021-05-11

```javascript
async function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield Promise.resolve(i);
  }
}
(async () => {
  const gen = range(1, 3);
  for await (const item of gen) {
    console.log(item);
  }
})();
```

- A: Promise {1} Promise {2} Promise {3}
- B: Promise {< pending >} Promise {< pending >} Promise {< pending >}
- C: 1 2 3
- D: undefined undefined undefined

<details>
<summary>点击查看答案</summary>

答案: C
<br />
我们给 函数range 传递： Promise{1}, Promise{2}, Promise{3}，Generator 函数 range 返回一个全是 async object promise 数组。我们将 async object 赋值给变量 gen，之后我们使用for await ... of 进行循环遍历。我们将返回的 Promise 实例赋值给 item： 第一个返回 Promise{1}， 第二个返回 Promise{2}，之后是 Promise{3}。因为我们正 awaiting item 的值，resolved 状态的 promsie，promise数组的resolved 值 以此为： 1，2，3.

</details>

---

> 125.输出是什么？ 2021-05-12

```javascript
const myFunc = ({x, y, z}) => {
  console.log(x, y, z)
})
```

- A: 1, 2, 3
- B: {1: 1} {2: 2} {3: 3}
- C: { 1: undefined } undefined undefined
- D: undefined undefined undefined

<details>
<summary>点击查看答案</summary>

答案: D
<br />
myFunc 期望接收一个包含 x, y 和 z 属性的对象作为它的参数。因为我们仅仅传递三个单独的数字值 (1, 2, 3) 而不是一个含有 x, y 和 z 属性的对象 ({x: 1, y: 2, z: 3})， x, y 和 z 有着各自的默认值 undefined.

</details>

---

> 126.输出是什么？ 2021-05-12

```javascript
function getFine(speed, amount) {
  const formattedSpeed = new Intl.NumberFormat({
    'en-US',
    {style: 'unit', unit: 'mile-per-hour'}
  }).format(speed)

  const formattedAmount = new Intl.NumberFormat({
    'en-US',
    {style: 'currency', currency: 'USD'}
  }).format(amount)

  return `The driver drove ${formattedSpeed} and has to pay ${formattedAmount}`
}
console.log(getFine(130, 300))
```

- A: The driver drove 130 and has to pay 300
- B: The driver drove 130 mph and has to pay $300.00
- C: The driver drove undefined and has to pay undefined
- D: The driver drove 130.00 and has to pay 300.00

<details>
<summary>点击查看答案</summary>

答案: B
<br />
通过方法 Intl.NumberFormat，我们可以格式化任意区域的数字值。我们对数字值 130 进行 mile-per-hour 作为 unit 的 en-US 区域 格式化，结果为 130 mph。对数字值 300 进行 USD 作为 currentcy 的 en-US 区域格式化，结果为 $300.00.

</details>

---

> 127.输出是什么？ 2021-05-12

```javascript
const spookyItems = ["👻", "🎃", "🕸"];
({ item: spookyItems[3] } = { item: "💀" });

console.log(spookyItems);
```

- A: ["👻", "🎃", "🕸"]
- B: ["👻", "🎃", "🕸", "💀"]
- C: ["👻", "🎃", "🕸", { item: "💀" }]
- D: ["👻", "🎃", "🕸", "[object Object]"]

<details>
<summary>点击查看答案</summary>

答案: B
<br />
通过解构对象们，我们可以从右手边的对象中拆出值，并且将拆出的值分配给左手边对象同名的属性。在这种情况下，我们将值 "💀" 分配给 spookyItems[3]。相当于我们正在篡改数组 spookyItems，我们给它添加了值 "💀"。当输出 spookyItems 时，结果为 ["👻", "🎃", "🕸", "💀"]。

</details>

---
