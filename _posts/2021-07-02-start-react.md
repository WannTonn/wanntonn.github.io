# React 学习之路
<!--
 * @Author: WannTonn
 * @Date: 2021-07-03 09:29:34
 * @Description: 
 * @FilePath: /wanntonn.github.io/_posts/2021-07-02-start-react.md
-->
### 记录本菜鸡的react学习历程

---
> 生成react-app 模板
```JavaScript
$ npx create-react-app app-name
```
> react中 { 开头就会被识别为 JavaScript， < 开头就会被识别为HTML

> vscode react 添加emmet支持
```
# settings.json
"emmet.includeLanguages": {
  "javascript": "javascriptreact"
}

```
> react 与 Vue功能相同，写法不同的语法
- |react|vue|
  |-|-|
  | dangerouslySetInnerHTML={{__html: content}} | v-html|
  | className={}| :class="{}"|
  | constructor(props){super(props);this.state = { name: "xxx" }}| data() {return {name: "xxx"}}|
  | this.props.functionName() | this.$emit("functionName") |
> Hello world (创建父子组件，并在父组件引入子组件)
```javascript
// index.js
import React, {Components} from 'react';
import Hello from './Hello'
class index extends Components {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  render() {
    return(
      <Hello />
    )
  }
}

// Hello.js
import react, {Component, Fragment} from 'react';
// Fragment标签用做去除最外层标签用。
class HelloWorld extends Component {
  render() {
    return (
      <Fragment>
        <h1>Hello World!</h1>
      </Fragment>
    )
  }
}
```

> Hello world, I'm X! （父子组件之间的通信）
```javascript
// index.js
//... 此处省略部分代码
 constructor(props) {
    super(props);
    this.state = {
      name: "Wann"
    }
  }
 render() {
    return(
      <Hello name={this.state.name} toggleName={this.toggleName} />
    )
  }
  toggleName() {
    this.setState({
      name: "Tonn"
    })
  }

// Hello.js
...
render() {
    return (
      <Fragment>
        <h1 onClick="handleClick">Hello World! I'm {this.props.name}</h1>
      </Fragment>
    )
  }
  handleClick() {
    this.props.toggleName()
  }
...
```

> 在子组件的生命周期中，配置shouldComponentUpdate(),提升性能
```javascript
  // Hello.js
  ...
  shouldComponentUpdate(nextProps, nextState) {
    // 此处name为父组件传给子组件的字段
    return nextProps.name !== this.props.name;
  }
  ...
```

> 安装axios发起请求
```
$ npm install axios -save
```

> 安装react-router