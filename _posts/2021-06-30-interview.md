# 前端该考虑的点
<!--
 * @Author: WannTonn
 * @Date: 2021-06-30 22:10:06
 * @Description: 
 * @FilePath: /wanntonn.github.io/_posts/2021-06-30-interview.md
-->
- 撇开Vue，react，等框架。你认为前端应该会的技能（知识点）有哪些
- 对前端工程化的理解
- 能否徒手从零构建一个工程化项目
- 类的使用的理解, 新建一个Person类，用构造函数定义 setName, getName, 并用User 继承Person类。
- 对typescript的理解，平时是否有写过脱离框架的ts的使用
- 是否封装过组件？是如何封装的
- Vue业务层的代码是如何编写的
- 怎么实现跨域请求数据
- 响应式和自适应





> 答

- 
- 
- 
- 
- ```javascript
  class Person {
    constructor(name) {
      this.name = name;
    }

  }
  class User extends Person {
    constructor(name) {
      super(name);
    }
    getName() {
      return this.name
    }
    setName(_name) {
      this.name = _name
    }
  }
  let user = new User("Wann"); User: {name: "Wann"} 
  user.getName(); // 返回 Wann
  user.setName("Tonn");
  user.getName(); // 返回 Tonn
- 
- 
-
- 响应式(RWD) && 自适应(AWD) 
  - 响应式(RWD): 所有设备的代码是一样的；自适应(AWD): 不同设备的代码是不一样的
  - RWD: Ethan.M 提出RWD是采用CSS的media query技术，配合流体布局(fluid grids) 和同样可以自适应的图片/视频等素材。RWD倾向于只改变元素的外观布局，而不大幅度改变内容。
  - AWD：Adaptive Design 是 Aaron G. 的一本技术书的标题,他认为AWD在包括RWD的CSS media query技术以外，AWD有可能会针对移动端用户减去内容，减去功能。AWD可以在服务器端就进行优化，把优化的内容送到终端上。
