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
 * 7. 优化:
 *    a. p可以分开多次调用
 *       let p = new Promise();
 *       p.then()  p.then()
 *       所以callback需要数组
 *    b. reject加上
 * 
 *    c. 不能循环依赖, then里面不能返回this  // 就不实现了, 参考 PromiseTemplate
 *    d. 其它细节: PromiseTemplate
 *       
 */

// const Promise = require("../2_source/6_then_sync")
const Promise = require("../2_source/7_optimize");
// const Promise = require("../PromiseTemplate");


// 7.1 多次then
// let p = new Promise((resolve, reject) => {
//     setTimeout(() => resolve(100))
// })

// p.then(data => {
//     console.log("data1", data);
// })

// p.then(data => {
//     console.log("data2", data);
// })



new Promise((resolve, reject) => {
    setTimeout(() => resolve(100))
}).then(data => {
    console.log("data1", data);
    return 200
}).then(data => {
    console.log("data2", data);
    return new Promise(resolve => {
        setTimeout(() => resolve(300))
    })
}).then(data => {
    console.log("data3", data);
})
