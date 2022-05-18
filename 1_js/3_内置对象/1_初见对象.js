/**
 * js对象初认识
 * 其实这节没啥意思：
 * https://www.liaoxuefeng.com/wiki/1022910821149312/1023021722631296
 * 
 * Author: shujun
 * Date: 2022-04-27
 */

// 1. typof 判断
 typeof 123; // 'number'
 typeof NaN; // 'number'
 typeof 'str'; // 'string'
 typeof true; // 'boolean'
 typeof undefined; // 'undefined'
 typeof Math.abs; // 'function'

 typeof null; // 'object'
 typeof []; // 'object'
 typeof {}; // 'object'

 // typeof 没法区分Array, 得Array.isArray(a)


// 2. 包装对象
// js包装对象非常不好用，不会自动装箱拆箱
typeof new Number(123); // 'object'
new Number(123) === 123; // false

typeof new String('str'); // 'object'
new String('str') === 'str'; // false

// Number()、Boolean和String()被当做普通函数，把任何类型的数据转换为number、boolean和string类型
var n = Number('123'); // 123，相当于parseInt()或parseFloat()
typeof n; // 'number'
var s = String(123.45); // '123.45'
typeof s; // 'string'

// 123.toString(); // SyntaxError
123..toString(); // '123', 注意是两个点！
(123).toString(); // '123'

const n = 123; n.toString();

/**
 * 总结：
 * 1. string -> number: 
 * parsetInt(), parseFloat(), Number(str)
 * 
 * 2. number -> string; 
 * (n).toString(); n + ""; String(n)
 */