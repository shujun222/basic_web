/**
 * 1. 异步调用
 * 2. 也能同步调用
 * 3. 优化一些点儿：
 *    a. 只能改变一次状态, 不能反复resolve/reject
 *    b. executor里增加reject, then里面也支持
 *    c. 对executor支持try catch捕获
 * 4. 链式调用, 同步
 *    a. 支持多次then, 那么then就得返回Promise对象
 *    b. 下一次then能获取当前then的return值
 *    
 */

// const Promise = require("../2_source/3_optimize")
const Promise = require("../2_source/4_chain")

new Promise((resolve, reject) => {
    resolve(100)
}).then(data => {
    console.log("data1", data);
    return 200
}).then(data => {
    console.log("data2", data);
    return 300
}).then(data => {
    console.log("data3", data);
});
