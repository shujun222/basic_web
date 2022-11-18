let MyPromise = require('./2_MyPromise')

/**
 * 功能点
 * 1. 即能支持同步，也能支持异步
 * 2. Promise只以第一次为准，第一次成功就永久为fulfilled，第一次失败就永远状态为rejected，一个Promise不可多次状态变更
 * 3. 关于reject
 *    a. Promise中有throw或者出现语法错误的话，就相当于执行了reject，所以要try...catch
 *    b. 也可以主动执行reject, Promise.status得成rejected
 *    c. then接收两个参数(成功回调, 失败回调), 需要根据status=fulfilled/rejected来区分调用什么函数
 */
let getLv = new MyPromise((resolve, reject) => {
    let lv = {
        color: 'orange',
        price: 'Y99'
    }

    // 1.1 同步任务：按顺序执行就好了，先resolve保存value，然后then里面执行传入的回调
    // resolve(lv)

    // 1.2 异步任务: 先执行then, 再执行resolve，那么先保存回调函数，然后再resolve中调用即可
    // setTimeout(() => resolve(lv), 2000)

    // 2 多次状态变更不可以, 只会执行第一次：通过status=[pending, fulfilled, rejected]来控制
    // resolve(lv)
    // resolve(666)
    // reject(222)


    // 3.1 语法错误
    // sbjun
    // throw "xxx"

    // 3.2 主动拒绝
    reject("你是个好人，但是我们不合适~")
    // 只能拒绝一次，下面这次不生效的
    reject("你一定可以找到很好的女孩子的")

    // 3.3 执行的是then里面的第二个回调

})

getLv.then(
    resp => console.log("resp", resp),
    err => console.log("err", err)
);

