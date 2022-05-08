/**
 * 一个很奇怪的现象，js为啥搞这么多循环方式，五花八门
   不过感觉只要掌握for && map就好
   for foreach while some every filter map

   对比点：
   1. 如何退出循环 return && break
   2. 每个函数的侧重点是干吗的 

    author: shujun
    date: 2020-08-15 / 2022-04-17
 */



let array = [1, 2, 3, 4];
console.log("我们来研究下怎么把数组内的元素值翻倍并生成一个新数组");
console.log("原始数组：" + array);

// 1. for 循环
console.log();
console.log("1. for 循环");
let arr_for = []
// for (let n = 0; n < array.length; n++)
// for (const n in array) // n返回的是序号：0, 1, 2, 3; 因为数组的原型也是对象：{"0":1, "1":2, ...}, 所有array["0"]也能取值
for (const n of array) {
    // for 循环和java中一样，break, return是可以生效的
    // if (n === 2)
    //     break;
    // if (n === 2)
    //     return;
    arr_for.push(2 * n)
}
console.log("arr_for", arr_for); // [ 2, 4, 6, 8 ]

console.log();
console.log("while循环就不写了，太熟悉了，和for差不多");

console.log();
console.log("开启高阶函数...");
console.log("2 非常常用的map，每个元素都执行，每个元素对应有返回值");
const arr_map = array.map(element => {
    //map里面怎么return都是没有退出的，
    if (element === 1) {
        return false;
        // break; // break是违法的
    }
    return element * 2;
});
console.log("arr_map: ", arr_map); // [ false, 4, 6, 8 ]

console.log();
console.log("3. foreach其实就像map的阉割版。不过虽然可以结果赋值，但是没用，返回值是undefined。");
const arr_forEach = array.forEach(element => {
    if (element === 1) {
        return 333;
    }
    return element * 2;
});
console.log("arr_forEach", arr_forEach); // undefined

console.log();
console.log("4. every的作用, 相比map没啥用吧，只返回true||false;");
console.log(" 判断每个元素都要符合条件");
let arr_every = array.every(element => {
    if (element === 2) {
        // 好像单个元素的判断是没用的，但是也不报错； break就直接报错了
        return true;
    }
    return element > 5;
});
console.log("arr_every: ", arr_every); // false

console.log();
console.log("5 some和every类似，返回boolean，只要有元素符合就true");
let arr_some = array.some(element => {
    if (element === 2) {
        // 但是，but; 此处单个元素的判断是有用的； break就直接报错了
        // return false;
        // break;
    }
    return element > 5;
});
console.log("arr_some: ", arr_some); // false

console.log();
console.log("6. filer作用，类似map返回元素集合，但是是符合条件的元素");
const arr_filter = array.filter(element => element > 2);
console.log("arr_filter: ", arr_filter); // [ 3, 4 ]



