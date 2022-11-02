// 1. 为什么有的编程规范要求用 void 0 代替 undefined?
// https://segmentfault.com/a/1190000020592191

// 1. undefined 是一个变量而非关键字。在旧的浏览器中，全局变量 undefined 可以被重写。
var value;
console.log("value === undefined: ", value === undefined); //true
console.log("value === null: ", value === null); //false
// 重写 undefined
undefined = 'hi'; // ie8中可以被修改; 这个问题在 ECMAScript 5 中被修复了，undefined不可修改
console.log(value === undefined); //false, 

// 2. void 运算符对给定的表达式进行求值，会忽略计算结果并始终返回 undefined。
// var value;
// console.log(value === void 0); //true
// console.log(value === void(0)); //true
// console.log(value === void("sb")); //true
// console.log(value === void "sb"); //true

/***
 *  结论：
 * 有的编程规范要求使用 void 0 代替 undefined，主要原因在于避免 undefined 值被重写带来的风险。
 * 现代浏览器中，全局变量 undefined 是不可写的，
 * 如果不考虑兼容旧的浏览器，那么这个问题就不用太过在意
*/ 


// Q2: 浮点数相加不相等
console.log("2..........");
console.log( 0.1 + 0.2 == 0.3);
console.log( Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON);
console.log(1 + 2 == 3);





