/**
 * 自定义异步Promise：
 * 执行顺序：
 * 1. Promise
 * 2. 保存then的回调函数callback到全局
 * 3. 定时器到了/异步接口返回了，自然会调用resolve, 我们只需在resolve里面调用callback即可
 * 
 * Date: 2022-11-17 找工作中
 */
module.exports = function MyPromise(executeFn) {
    let self = this
    this.callback;

    function resolve(value) {
        console.log("resolve....");
        self.callback(value)
    }

    // 1. 给回调函数传递参数，并执行，这里是宏任务中的主任务
    executeFn(resolve)

    // 2. 添加then函数
    MyPromise.prototype.then = function (onFulfilled) {
        this.callback = onFulfilled
    }
}
