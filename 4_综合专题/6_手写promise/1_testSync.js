/**
 * 最简单的异步调用
 */

let MyPromise = require('./1_MyPromise')

let getLv = new MyPromise((resolve, reject) => {
    let lv = {
        color: 'orange',
        price: 'Y99'
    }

    // 1. 同步任务在这个例子中不支持, reject也不支持
    // resolve(lv)

    // 2. 异步任务
    setTimeout(() => resolve(lv), 2000)
})

getLv.then(resp => console.log("resp", resp));

