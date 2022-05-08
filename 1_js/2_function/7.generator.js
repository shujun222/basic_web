/**
 * 生成器generator
 * https://www.liaoxuefeng.com/wiki/1022910821149312/1023024381818112
 * 
 * Author: shujun620
 * Date: 2022-04-26
 */

// 1. 基本用法
// 1.1 普通函数只能又一次返回值，generator是有多个返回值的函数
function fun0() {
    return 1;
}
// console.log(fun0());  

function* fun1() {
    yield 1;
    yield 2;
    return 3;
    // return 之后的不会再出现了
    yield 4;
    yield 5;    
}

gen = fun1();
console.log(gen); // Object [Generator] {}
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3
console.log(gen.next().value); // 没有了
console.log(gen.next().value); // 没有了
console.log(fun1().next().value); // 这是生成了一个新的Generator，从头开始

// 访问方式2：for ... of
console.log("访问方式2：for ... of");
for (const value of fun1()) { // 迭代不到return 3;
    console.log(value);
}


// 不知道有啥好处
// 1. 异步变得看起来像同步？
function request() {
    // try {
    //     r1 = yield ajax('http://url-1', data1);
    //     r2 = yield ajax('http://url-2', data2);
    //     r3 = yield ajax('http://url-3', data3);
    //     success(r3);
    // }
    // catch (err) {
    //     handle(err);
    // }
}


console.log("练习题：生成下一个id");
function* next_id() {
    var current_id = 1;
    while (true) 
        yield current_id++;
    
} 
g = next_id()
console.log(g.next().value);
console.log(g.next().value);
console.log(g.next().value);