/**
 * 1. 基本类型； symbol待续...
 * 2. 类型转换
 * 3. 装箱与拆箱： 待续
 * 
 * Author: shujun
 * Date: 2022-01-07
 */

// 1. JavaScript 是一种弱类型或者说动态语言。
var a = "sb"
a = 222
console.log(a);


// 2. 判断数据类型
/**
 * 基本类型就用typeof
 * 但是根据typeof判断对象不够细致
 * 
 * 
表达式                          返回值
1. 七种原始类型: number, boolean, string, 其它
typeof undefined           'undefined'
typeof null                   'object'         需要注意的
typeof true                   'boolean'
typeof 123                   'number'
typeof bigint               'bigint'
typeof "abc"               'string'
typeof symbol               symbol

2. object
typeof {}                   'object'           需要区别的
typeof []                   'object'           需要区别的

3. 其它特别的
typeof function() {}       'function'
tpyeof ""                  'string'            需要注意的
 
*/
function tellType(a) {
    console.log(a);
    console.log("typeof: ", typeof a);
    // typeof写的不好呀，object 和 array都返回 ‘object’, 还需要再判断
    if ("object" === typeof a) {
        if (Array.isArray(a)) {
            console.log("is array")
        } else {
            console.log("is object");
        }
    }
    return typeof a;
}

// tellType("shujun");
// tellType(123)
// tellType({"a": 2});
// tellType([1,2, 3]);

// n可以表示bigint
const x = 2n ** 153n
console.log(x);
const y = 2 ** 153
console.log(y);


// symbol, 看不懂有啥用
// https://developer.mozilla.org/zh-CN/docs/Glossary/Symbol
Symbol("foo") !== Symbol("foo")
const foo = Symbol()
const bar = Symbol()
typeof foo === "symbol"
typeof bar === "symbol"
let obj = {}
obj[foo] = "foo"
obj[bar] = "bar"
JSON.stringify(obj) // {}
Object.keys(obj) // []
Object.getOwnPropertyNames(obj) // []
Object.getOwnPropertySymbols(obj) // [ foo, bar ]



// 3. 基本类型转换
console.log("3 -----------");
// 3.1 StringToNumber, js不能进行java,python那般强转 (int) a
a = "666"
console.log(typeof parseInt(a)); // number
console.log(typeof parseFloat(a)); //number
console.log(typeof Number(a)); //number; 这种转换更简单通用
b = "66.6"
console.log(typeof Number(b), Number(b) === 66.6); //number; 
console.log("parseInt", parseInt(b)); // 66

// 3.2 NumberToString
a = 66
b = a + ""
console.log(typeof b);
console.log(typeof a.toString());

// 4. 装箱转换 & 拆箱转换
// 每一种基本类型 Number、String、Boolean、Symbol 在对象中都有对应的类，所谓装箱转换，正是把基本类型转换为对应的对象，它是类型转换中一种相当重要的种类。
console.log("4---------");

