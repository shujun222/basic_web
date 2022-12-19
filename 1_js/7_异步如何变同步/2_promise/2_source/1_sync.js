/**
 * 自定义异步Promise：
 * 执行顺序：
 * 1. Promise
 * 2. 保存then的回调函数callback到全局
 * 3. 定时器到了/异步接口返回了，自然会调用resolve, 我们只需在resolve里面调用callback即可
 * 
 * Date: 2022-11-17 找工作中
 *       2022-12-17 重写
 */
class Promise {
    constructor(executor) {
        this.onResolvedCallback = ""

        // 1. 给回调函数传递参数，并执行，这里是宏任务中的主任务
        executor(this.resolve)
    }

    // 定义成这样的函数是不对的
    // resolve(value) {console.log("this", this);}

    resolve = value => {
        console.log("resolve....");
        // 3. 异步结束后再调用
        this.onResolvedCallback(value)
    }

    then (onFulfilled) {
        console.log("then");
        // 2. 添加then里面的回调
        this.onResolvedCallback = onFulfilled
    }
}

module.exports = Promise