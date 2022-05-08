// 'use strict'

/**
 * 箭头函数作用有二：
 * 1. 匿名函数简化的写法
 * 2. this可以继承上一级作用域
 */

var obj = {
  birth: 1990,
  getAge: function () {
    var b = this.birth; // 1990
    console.log("b", b);
    // var fn = function () {
    //     console.log("b in fn", b);
    //     return new Date().getFullYear() - this.birth; // this指向window或undefined
    // };
    // return fn();

    // 之前的解决办法1，this传递下去
    // var fn = function (that) {
    //     return new Date().getFullYear() - that.birth; // this指向window或undefined
    // };
    // return fn(this);

    // 2. 解决办法2，call或者apply改变this指向，或者bind?
    var fn = function () {
      return new Date().getFullYear() - this.birth;
    }
    return fn.call({ birth: this.birth })
  }
};

// this获取不到
// console.log("normal function", obj.getAge());


// 自从有了箭头函数之后，情况大大简化了
var obj2 = {
  birth: 1990,
  getAge: function () {
    // 继承的是getAge的this
    var fn = () => new Date().getFullYear() - this.birth; // this没有没关系，会向上指向调用层？
    return fn();
  },
  // 箭头函数不会创建自己的this,它只会从自己的作用域链的上一层继承this。
  // 这里是最难理解的了，obj2没有this? obj2.getAge才有this？（对象调用者本身）
  getAge2: () => this.birth
};
// console.log("arrow function", obj2.getAge()); // 32 
// console.log("arrow function", obj2.getAge2()); // undefined 

const test_arrow_this = () => {
  // 从自己的作用域链的上一层继承this, 
  // 之前模式应该是window, 严格模式是undefined, 但是箭头函数把它改为了{}
  console.log("test_arrow_this", this); 
}
// test_arrow_this()


function Person() {
  this.age = 32; 

  setInterval(() => {
    this.age++; // |this| 正确地指向 p 实例
    console.log("setInterval", this.age);
  }, 5000);

  // 应该Person()是构造函数(类class也可以), 所以它有this；
  // 看来是函数，对象obj中不适合用this
  this.getAge = () => this.age
}

// var p = new Person();
// console.log("p.getAge()", p.getAge()); 


var obj3 = {
  birth: 1990,
  getAge: function () {
    // this.birth仍是1990， 已经被绑定死了
    var fn = () => new Date().getFullYear() - this.birth;
    return fn.call({ birth: 2000 }, 2022);
  },
};
// console.log("call 传参改变this没有效果了", obj3.getAge()); // 25


