// 'use strict'

/**
 * https://www.runoob.com/js/js-this.html
 面向对象语言中 this 表示当前对象的一个引用。
 但在 JavaScript 中 this 不是固定不变的，它会随着执行环境的改变而改变，有点当前对象的感觉
 1. 直接访问：window(浏览器), {}(nodejs)
 2. 事件中：接收事件的元素
 3. 函数：谁调用就指向谁
 * 
 */
// 

// console.log("this", this);

var xiaoming = {
    name: '小明',
    birth: 1990,
    age: function () {
        // this是一个特殊变量，它始终指向当前对象，也就是xiaoming这个变量。
        console.log("this", this);
        return this.birth;
    },
    school: function () {
        console.log("school this", this);
        function goToShcool() {
            // console.log("goToShcool this", this);
            return this.birth
        }
        return goToShcool();
    },

    school1: function () {
        function goToShcool() {
            console.log("school1 in goToShcool", this);
            return this.birth
        }
        return goToShcool;
    },
};

// 1.1 this.birth指向xiaoming这个对象本身
// console.log(xiaoming.age());

var fn = xiaoming.age; // 先拿到xiaoming的age函数
// 1.2 this指向全局对象，也就是window
// fn(); // NaN

// 1.3 对于内嵌函数goToShcool，内部的this指向的是调用者：不知道是谁，反正不是xiaoming直接调用的
// console.log("school", xiaoming.school());
// 比如闭包吧？ 闭包在对象中不好用呀，子函数不用this又取不到this
// console.log("school1", xiaoming.school1()());


let env = {
    birth: 19,
    goToShcool: xiaoming.school1(),
    goToShcool1: function() {
        console.log("school1 in goToShcool", this);
        return this.birth
    }
}
// console.log("env", env.goToShcool());


// 1. 小结：非strict模式下，谁调用函数，this就指向谁 
//  a. obj.func(), 指向的是obj
//  b. 直接调用func(),实际上是window在调用，那就指向window了
//  c  内嵌函数调用；可能也是window在调用

// 2. 如果开启了第一行的 严格模式，会提前暴露错误
// Cannot read property 'birth' of undefined
// 上面情况中的b，c，即函数内的this，不指向window了，而是undefined, 只能是对象本身了


// 3. 初步体验apply, call: 改变上面的问题，this指向
var fn = xiaoming.age; // 先拿到xiaoming的age函数
// console.log(fn()); // NaN
// console.log(fn.apply(xiaoming));
// console.log(fn.call(xiaoming));

// apply， call其实是一样的，只不过apply以字母a开头，所以把所有参数都整合成了一个，即数组[]
// console.log(fn.apply(xiaoming, []));
// console.log(fn.call(xiaoming, 1, 2, 4, 5)); 


// class 或者 函数中的this? 不懂。。。。 
// 申明东西都需要this吗
function Person() {
    birth:  1990;
    this.age = 33
    getAge = ()=> this.birth;
    function getAge2() {
        return this.birth
    }
}

// let p = new Person()
// console.log(p.birth, p.age);
// console.log(Person.birth, Person.age);
// console.log(p.getAge);
// console.log(p.getAge2);
