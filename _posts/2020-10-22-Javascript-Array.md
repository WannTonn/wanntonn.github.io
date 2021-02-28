# Javascript - 笔记

### Array
---
> slice():
    

    Array.slice()
    Array.slice(begin)
    # begin 为初始索引 从 -1开始， end为结束索引，空即包含所有， 返回一个浅拷贝的新数组
    # begin
    Array.slice(begin, end); 

    eg:
    let arr = ['a', 'b', 'c'];
    arr.slice();   # ['a', 'b', 'c'];
    arr.slice(-1); # ['c'];
    arr.slice(-1, ); # ['c'];
    arr.slice(-3); # ['a', 'b', 'c'];
    arr.slice(0, 3); # ['a', 'b', 'c'];

> 