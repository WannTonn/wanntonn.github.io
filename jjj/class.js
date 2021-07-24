/*
 * @Author: WannTonn
 * @Date: 2021-07-01 21:39:40
 * @Description: 
 * @FilePath: /wanntonn.github.io/class.js
 */

'use strict'

class Person {
  constructor(name) {
     this.name = name
  }
 }
 
 class User extends Person {
  constructor() {
     super();
  }
  setName(_name) {
    this.name = _name 
  }
  getName() {
    return this.name
  }
 }

 let wan = new User();
console.log(wan);
wan.setName('WannTonn')
console.log(wan);
console.log(wan, wan.getName());