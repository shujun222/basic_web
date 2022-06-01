/**
 * 1. 弱语言类型，只有let var const
 * 2. 非strict模式，可以不定义let/var, 类似于python，又不像python
 * 3. strict模式，局部变量，全局变量类似java
 * 
 * shujun 2022-05-27
 */

// 1. 非严格模式
a = 3
b = "sj"
d = true
// console.log(c); // 没赋值还是不能直接用的
console.log(d);

// 非严格模式下，不用 var/let修饰的变量aa会到全局
function test() {
    a = 4
    console.log("a in test", a);
    aa = 66
}
test()
console.log("a in outer", a);
// 缺点1：局部定义的咋都成全局了
console.log("aa in outer", aa);

function test2() {
    // 缺点2：函数里能调用到其它函数内的变量？
    console.log("aa in test2", aa);
    aa = 6;
}
test2();
console.log("aa in outer", aa);


