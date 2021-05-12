# 前端 JavaScript 问答题目收录 续


> 104.输出是什么？ 2021-05-05

```javascript
Promise.resolve(5)
```

- A: 5
- B: Promise {<pending>: 5}
- C: Promise {<fulfilled>: 5}
- D: Error
<details>
<summary>点击查看答案</summary>

答案: C
<br />
我们可以将我们想要的任何类型的值传递Promise.resolve，无论是否promise。 该方法本身返回带有已解析值的Promise (<fulfilled>)。 如果您传递常规函数，它将是具有常规值的已解决promise。 如果你通过了promise，它将是一个已经resolved的且带有传的值的promise。

上述情况，我们传了数字5，因此返回一个resolved状态的promise，resolve值为5

</details>

---

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
- B: Promise {<pending>} Promise {<pending>} Promise {<pending>}
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
