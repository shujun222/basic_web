/**
 * 1. 异步调用
 * 2. 也能同步调用
 * 3. 优化一些点儿：
 *    a. 只能改变一次状态, 不能反复resolve/reject
 *    b. executor里增加reject, then里面也支持
 *    c. 对executor支持try catch捕获
 * 
 *    
 */

// const Promise = require("../2_source/2_sync_async")
const Promise = require("../2_source/3_optimize")

new Promise((resolve, reject) => {
    // 1. 异步的
    // setTimeout(() => resolve(100), 2000)
    
    // 2. 同步立即执行的
    // resolve(100)

    // 3.a 只能改变一次状态
    // resolve(100)
    // resolve(666)

    // 3.b reject上线
    // reject(500)
    // 只能拒绝一次，下面这次不生效的
    // reject("你是个好人，但是我们不合适~")
    // reject("你一定可以找到比我更好的")

    // setTimeout(() => reject(500), 2000)

    // 3.c 语法错误
    // sbjun
    // throw "sbjun is not defined"

}).then(data => {
    console.log("data", data);
}, err => {
    console.log("err: ", err);
})

