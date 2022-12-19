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
 * 8. 新增static方法:
 *    Promise.resolve()
 *    Promise.reject()
 *    Promise.race()
 *    Promise.all()
 *    
 *       
 */

const Promise = require("../2_source/8_static");
const { resolve } = require("../PromiseTemplate");

// Promise.resolve(100)
// .then(data => {
//     console.log("data", data);
// })

// Promise.reject(500)
// .then(
//     data=> console.log(data),
//     err => console.log("err", err)
// )

let p1 = new Promise(resolve => setTimeout(() => resolve(100), 0))
let p2 = new Promise(resolve => setTimeout(() => resolve(200), 5000))
let p3 = new Promise(resolve => setTimeout(() => resolve(300), 3000))

// Promise.race([p1, p2, p3])
// .then(data => console.log("data", data))

// 这样顺序不对: [ 300, 100, 200 ]
// Promise.all0([p1, p2, p3])
// .then(data => console.log("data all0", data))

Promise.all([p1, p2, p3])
.then(data => console.log("data all", data))


// new Promise(resolve => {
//     setTimeout(() => resolve(100), 2000)
// }).then(data => {
//     console.log("data", data);
// })

// 并没有实现微任务哦
new Promise(resolve => resolve(100))
.then(data => console.log("go", data))
console.log("end");