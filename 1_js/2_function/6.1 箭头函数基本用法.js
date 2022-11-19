/**
 * 箭头函数作用有二：
 * 1. 匿名函数简化的写法
 * 2. this可以继承上一级作用域
 */

// 复习下之前的this缺陷
var obj = {
  birth: 1990,
  getAge: function () {
    var b = this.birth; // 1990
    console.log("b", b);
    // var fn = function () {
    //     console.log("b in fn", b);
    //     return this.birth; // this指向window或undefined
    // };
    // return fn();

    // 之前的解决办法1，this传递下去
    // var fn = function (that) {
    //     return that.birth; // this指向window或undefined
    // };
    // return fn(this);

    // 2. 解决办法2，call或者apply改变this指向，或者bind?
    // var fn = function () {
    //   return this.birth;
    // }
    // return fn.call({ birth: this.birth })
  }
};

// this获取不到
// console.log("normal function", obj.getAge());


// 自从有了箭头函数之后，情况大大简化了
// 在浏览器内，下面这两个值是一样的，都是window
global.birth = 1988 
this.birth = 1989
var obj2 = {
  birth: 1990,
  getAge: function () {
    // console.log("this", this);
    // 继承的是getAge的this
    var fn = () => this.birth; // this没有？没关系，this指向父级的this？
    return fn();
  },
  // 箭头函数不会创建自己的this,它只会从自己的作用域链的上一层继承this。
  // 这里是最难理解的了，obj2没有this? obj2.getAge才有this？（对象调用者本身）
  getAge2: () => this.birth
};
// console.log("arrow function1", obj2.getAge()); // 1990 
// this指向了当前文件/类？
// console.log("arrow function2", obj2.getAge2()); // 1989 
const getAge = obj2.getAge
// getAge会生产作用域this：global, 所以fn里面的this指向了global
// 这个例子说明是找执行时的外层，不是定义时的外层
// console.log("arrow function3", getAge());
const getAge3 = () => this.birth
// console.log("getAge3", getAge3());

const test_arrow_this = () => {
  console.log("test_arrow_this", this); 
}
// test_arrow_this()


this.age = 1
global.age = 11
function Person() {
  this.age = 32; 

  function add1() {
    this.age++; 
    console.log("setInterval", this.age);
  }
  // setInterval(add1, 2000);

  const add2 = ()=> {
    this.age++; 
    console.log("setInterval", this.age);
  }
  // 搞不懂定时器，为什么执行时外层是Person呢，add2是由谁调用的呢
  setInterval(add2, 2000);


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
    var fn = () => this.birth;
    // return fn()
    return fn.call({ birth: 2000 });
  },
};
// console.log("call 传参改变this没有效果了", obj3.getAge());


// 再练一个吧
global.id = 21;
function Foo() {
  let id = 22;
  setTimeout(() => {
    // console.log("this", this);
    console.log(this.id)
  }, 100);
}
Foo()
Foo.call({ id: 42 })
