/**
 * 1. 异步调用， 结果显示在then里面
 */

const Promise = require("../2_source/1_sync")

new Promise((resolve, reject) => {
    setTimeout(() => resolve(100), 2000)
}).then(data => {
    console.log("data", data);
})

