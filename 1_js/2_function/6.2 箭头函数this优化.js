// 'use strict'

/**
 * 箭头函数this优化：
 * mdn官网更靠谱：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions#%E6%8F%8F%E8%BF%B0
 * 
 * Author: shujun
 * Date: 2022-04-25
 */

// 1. 先回顾 2.糟糕的this指向.js

// 2.1 this的☞向问题再回顾
var o = {
  scope: this,
  // {}
  fn: () => { console.log("this", this); }, 
  fn2() {
    // o.fn2(): o对象本身; fn2(): 严格模式undefined, 非严格模式windows
    console.log("this2", this);
  }

};

// console.log(o, o.fn());
// console.log(o.fn2());
// let fn2 = o.fn2
// console.log(fn2());


// 这个例子太全了。。。。  先不研究Person中的this, 而是obj的
let name = "window222";
var obj = {
  name: "obj222",
  func0: () => {
    console.log("func0", this.name);
    return () => console.log(this.name);
  },
  func1: function () {
    console.log("func1", this.name);
    return function () { console.log(this.name); };
  },
  func2: () => {
    console.log("func2", this.name);
    return function () { console.log(this.name); };
  },
  func3: function () {
    console.log("func3", this.name);
    return () => console.log(this.name);
  },

  school1: function () {
    function goToShcool() {
        console.log("school1 in goToShcool", this);
        return this.name + "_666"
    }
    return goToShcool;
},
}

var env = {
  name: "env",
  func0: obj.func0(), // window
  func1: obj.func1(), // obj
  func2: obj.func2(), // window
  func3: obj.func3()  // obj
}

console.log();
env.func0(); // window
env.func1(); // env, 谁调用，指向谁
// obj.func1()(); // 闭包这么嵌套调用，又是undefined
env.func2(); // env
env.func3(); // obj

// console.log(window.name);

