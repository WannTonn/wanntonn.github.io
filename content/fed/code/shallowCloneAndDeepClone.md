---
title: '浅拷贝与深拷贝对区别是什么'
date: 2022-10-09T13:15:24+08:00
draft: false
tags:
  - Code
image: '/images/Code/javascript.jpg'
---

<!--more-->

### 这篇文章可以了解到

- JS 的数据类型
- 什么是 浅 / 深 拷贝？
- 如何实现 浅 / 深 拷贝？

### JS 的数据类型

- 基本数据类型： String，Boolean，Number，Undefined，Null，Symbol
- 引用数据类型： Object（Array， Date， RegExp， Function）

### 什么是浅拷贝？

- 浅拷贝是创建一个新对象，该新对象有原始对象属性值的精确拷贝（浅拷贝是增加了一个指针指向了现有的内存）。如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址。如果其中一个对象发生改变了地址，如果属性值是`基本数据类型`时，则`不会`影响到另一个对象，如果属性值是`引用数据类型`时，则`会`影响到另一个对象。

### 如何实现浅拷贝？

- Object.assign

```javascript
let obj1 = {
  person: {
    name: 'Tom',
    age: 18,
  },
  hobby: 'fishing',
};
let obj2 = Object.assign({}, obj1);

obj2.person.name = 'Jerry';
obj2.hobby = 'cooking'; // 属性值为基本数据类型，不会影响
console.log(obj1); // {"person": {"name": "Jerry","age": 18},"hobby": "fishing"}
```

- lodash 库的\_.clone 方法

```javascript
let _ = require('lodash');
let obj1 = {
  a: 0,
  b: { d: { e: 'f' } },
  c: [0, 1, 2],
};
let obj2 = _.clone(obj1);
console.log(obj1.b.d === obj2.b.d); // true
```

- 展开运算符...

```javascript
let obj1 = {
  person: {
    name: 'Tom',
    age: 18,
  },
  hobby: 'fishing',
};
let obj2 = { ...obj1 };

obj2.person.name = 'Jerry';
obj2.hobby = 'cooking'; // 属性值为基本数据类型，不会影响
console.log(obj1); // {"person": {"name": "Jerry","age": 18},"hobby": "fishing"}
```

- Array.prototype.concat()

```javascript
let arr = [1, 2, { name: 'Tom' }];
let arr2 = arr.concat();
arr2[2].name = 'Jerry';
console.log(arr); // [1,2, {name: 'Jerry'}]
```

- Array.prototype.slice()

```javascript
let arr = [1, 2, { name: 'Tom' }];
let arr2 = arr.slice();
arr[2].name = 'Jerry';
console.log(arr); // [1,2, {name: 'Jerry'}]
```

### 什么是深拷贝？

- 深拷贝是从内存中将目标对象拷贝一份，并从堆内存中开辟一个新的区域存放这个新对象。两个对象之间互不影响。

### 如何实现深拷贝？

- JSON.parse(JSON.stringify())

```javascript
let obj1 = {
  person: {
    name: 'Tom',
    age: 18,
  },
  hobby: 'fishing',
  car: () => 'BMW',
};
let obj2 = JSON.parse(JSON.stringify(obj1));

obj2.person.name = 'Jerry';
console.log(obj1); // {"person": {"name": "Tom","age": 18},"hobby": "fishing", car: () => 'BMW'}
console.log(obj2); // {"person": {"name": "Jerry","age": 18},"hobby": "fishing"}
// JSON.stringify() 可以实现对数组和对象等类型的深拷贝，但不支持函数与正则。所以用该方法深拷贝后， 正则就变成空对象，函数则为null
```

- lodash 的\_.cloneDeep 方法

```javascript
let _ = require('lodash');
let obj1 = {
  a: 0,
  b: { d: { e: 'f' } },
  c: [0, 1, 2],
};
let obj2 = _.cloneDeep(obj1);
console.log(obj1.b.d === obj2.b.d); // false
```

- 手搓之 [如何写出一个惊艳面试官的深拷贝?](https://segmentfault.com/a/1190000020255831)

```javascript
// clone.js

// 可继续遍历的数据类型
const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';
const argsTag = '[object Arguments]';

// 不可继续遍历的数据类型
const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const numberTag = '[object Number]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';
const errorTag = '[object Error]';
const regexpTag = '[object RegExp]';
const funcTag = '[object Function]';

const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];

// 工具函数 - 通用循环函数
function forEach(array, iteratee) {
  let index = -1;
  const length = array.length;
  while (++index < length) {
    iteratee(array[index], index);
  }
  return array;
}
// 工具函数 - 判断是否为引用类型
function isObject(target) {
  const type = typeof target;
  return target !== null && (type === 'object' || type === 'function');
}
// 工具函数 - 获取实际类型
function getType(target) {
  return Object.prototype.toString.call(target).slice(8, -1);
}
// 工具函数 - 初始化被克隆的对象
function getInit(target) {
  const Ctor = target.constructor;
  return new Ctor();
}
// 工具函数 - 克隆Symbol
function cloneSymbol(targe) {
  return Object(Symbol.prototype.valueOf.call(targe));
}
// 工具函数 - 克隆正则
function cloneReg(targe) {
  const reFlags = /\w*$/;
  const result = new targe.constructor(targe.source, reFlags.exec(targe));
  result.lastIndex = targe.lastIndex;
  return result;
}
// 工具函数 - 克隆函数
function cloneFunction(func) {
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcString = func.toString();
  if (func.prototype) {
    const param = paramReg.exec(funcString);
    const body = bodyReg.exec(funcString);
    if (body) {
      if (param) {
        const paramArr = param[0].split(',');
        return new Function(...paramArr, body[0]);
      } else {
        return new Function(body[0]);
      }
    } else {
      return null;
    }
  } else {
    return eval(funcString);
  }
}
// 工具函数 - 克隆不可遍历类型
function cloneOtherType(targe, type) {
  const Ctor = targe.constructor;
  switch (type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new Ctor(targe);
    case regexpTag:
      return cloneReg(targe);
    case symbolTag:
      return cloneSymbol(targe);
    case funcTag:
      return cloneFunction(targe);
    default:
      return null;
  }
}

function clone(target) {
  let result = null;
  let cloneQueue = [
    {
      t: target,
      done: (res) => (result = res),
    },
  ];

  let map = new WeakMap();

  while (cloneQueue.length > 0) {
    let { t, done } = cloneQueue.shift();

    // 克隆原始类型
    if (!isObject(t)) {
      done(t);
      continue;
    }

    // 初始化
    const type = getType(t);
    let cloneTarget;

    if (!deepTag.includes(type)) {
      done(cloneOtherType(t, type));
      continue;
    }

    cloneTarget = getInit(t, type);

    // 防止循环引用
    if (map.get(t)) {
      done(map.get(t));
      continue;
    }

    switch (type) {
      case setTag:
        // 克隆set
        t.forEach((value) => {
          // cloneTarget.add(clone(value));
          cloneQueue.push({
            t: value,
            done: (res) => cloneTarget.add(res),
          });
        });
        break;
      case mapTag:
        // 克隆map
        t.forEach((value, key) => {
          // cloneTarget.set(key, clone(value));
          cloneQueue.push({
            t: value,
            done: (res) => cloneTarget.set(key, res),
          });
        });
        break;
      default:
        // 克隆对象和数组
        const keys = type === arrayTag ? undefined : Object.keys(t);
        forEach(keys || t, (value, key) => {
          if (keys) {
            key = value;
          }
          // cloneTarget[key] = clone(t[key], map);
          cloneQueue.push({
            t: t[key],
            done: (res) => (cloneTarget[key] = res),
          });
        });
        break;
    }

    map.set(t, cloneTarget);

    done(cloneTarget);
  }

  return result;
}

module.exports = {
  clone,
};
```
