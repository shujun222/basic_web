/**
 * 
 */

// 1. 用法篇
function fn(a, b) {
    console.log(a, b, this);
}

fn(1, 2) // 1, 2, window

const obj = {name: "sj"}
fn.call(obj, 1, 2) // 1, 2, {name: sj} 
// apply可以理解为和call一样，只是apply只传递一个参数，调用的时候再自己散开
// fn.apply(obj, 1, 2) // 报错
fn.apply(obj, [1, 2]) // 1, 2, {name: sj}


// 2. 原理篇

