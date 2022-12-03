/**
 * 1. let const
 * 2. set map
 * 3. 为什么有object, 还引入map
 *    https://www.jb51.net/article/224097.htm
 *    1、可能通过原型链访问到未定义的属性
      2、对象的 Key 只能是字符串
 *
 */

// 2.1. set
var array = [1, 2, 3, 4, 4, 2, 3, 4, 5]
const set1 = new Set(array);
console.log(set1);
let array1 = [...set1]
console.log(array1);

// 2.2 map
const m = new Map()
m.set("a", 1)
m.set("b", 2)
m.set("c", 2)
for (const [key, value] of m) {
    console.log(key, value);
}

