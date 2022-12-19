/**
 * 1. 异步调用
 * 2. 也能同步调用
 */

const Promise = require("../2_source/1_sync")
// const Promise = require("../2_source/2_sync_async")

new Promise((resolve, reject) => {
    // 1. 异步的
    // setTimeout(() => resolve(100), 2000)

    // 2. 同步立即执行的
    resolve(100)
}).then(data => {
    console.log("data", data);
})

