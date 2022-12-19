/**
 * 1. 异步调用
 * 2. 也能同步调用
 * 3. 优化一些点儿：
 *    a. 只能改变一次状态, 不能反复resolve/reject
 *    b. executor里增加reject, then里面也支持
 *    c. 对executor支持try catch捕获
 * 4. 链式调用, executor同步
 *    a. 支持多次then, 那么then就得返回Promise对象
 *    b. 下一次then能获取当前then的return值
 * 5. 链式调用，executor异步也行
 * 6. then异步
 * 
 *       
 */

// const Promise = require("../2_source/6_0_then_sync")
const Promise = require("../2_source/6_then_sync")


new Promise((resolve, reject) => {
    resolve(100)
    // setTimeout(() => resolve(100), 3000)
}).then(data => {  // p0
    console.log("data1", data); // 100
    // return 200

    // 直接这么异步,即便原生的也不行的
    // setTimeout(() => 200, 2000)
    
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(200), 3000)
    })
}).then(data => {  // p1
    console.log("data2", data); // 200
    return 300;
}).then(data => { // p4
    console.log("data3", data); // 300
});


// 先来点简单的理解下 then里面 new Promise
// new Promise((resolve, reject) => {
//     resolve(100)
// }).then(data => { // p0
//     console.log("data1", data); // 100
//     return 200
// }).then(data => { // p1
//     console.log("data2", data); // 200
//     return 300
// })

