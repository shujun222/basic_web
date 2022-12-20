// https://www.cnblogs.com/jyk/p/15632822.html
// https://www.bilibili.com/video/BV1y44y1a7Ho?from=search&seid=11230263871955938816&spm_id_from=333.337.0.0

/**
 * 1. 函数和对象的关系
 * a. 函数是对象，对象都是通过函数创建的
 * b. 函数和对象并不是简单的包含与被包含的关系
 * 
 * 2. 原型的类型
 * a. 显示原型：prototype, 每个function独有的属性
 * b. 隐式原型：_proto_，是每个对象都具有的属性
 * 
 * 3. 原型和原型链
 * a. 原型：
 *    一个函数可以看成一个类，原型是所有类都有的一个属性，原型的作用就是给这个类的一个对象都添加一个统一的方法
 * b. 原型链
 *    每个对象都有一个 _proto_, 它指向它的prototype原型对象；它的prototype原型对象又有一个_proto_指向它的prototype原型对象，就这样层层向上直到找到最顶层的Object的prototype, 这个查询路径就是原型链
 * 
 */


function testFn(){}
var testObj = new testFn();

var testArr = new Array(1, 2, 3);

console.log(testObj instanceof Function);
console.log(testObj instanceof Object);

console.log(testArr instanceof Function);
console.log(testArr instanceof Object);

console.log(Array instanceof Function);
console.log(testFn instanceof Function);