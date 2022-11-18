/**
 * 自定义异步Promise：
 * 执行顺序：
 * 1. Promise
 * 2. 保存then的回调函数callback到全局
 * 3. 定时器到了/异步接口返回了，自然会调用resolve, 我们只需在resolve里面调用callback即可
 */
module.exports = function MyPromise(executeFn) {
    let self = this
    // 已经执行过的 resolve 或 reject 我们就应该终止执行，为了它的不可逆性，需要引入pending
    this.status = 'pending'
    this.value = null

    // 初始化回调函数
    this.onFulfilledSync;
    this.onRejectedSync;

    function resolve(value) {
        if (self.status === 'pending') {
            self.value = value
            // 状态控制，保证resolve、reject只能执行一次
            self.status = 'fulfilled'
            // 异步调用
            self.onFulfilledSync && self.onFulfilledSync(value)
        }
    }

    function reject(reason) {
        if (self.status === 'pending') {
            self.value = reason
            self.status = 'rejected'
            self.onRejectedSync && self.onRejectedSync(reason)
        }
    }

    // 1. 给回调函数传递参数，并执行，这里是宏任务中的主任务
    try {
        executeFn(resolve, reject)
    } catch (exception) {
        reject(exception)
    }


    // 2. 添加then函数
    MyPromise.prototype.then = function (onFulfilled, onRejected) {
        // 首先确保传进来的是函数
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

        //判断promise的状态执行对应回调
        if (this.status === 'fulfilled') {
            // 若是成功则执行成功的回调，传入成功的值
            onFulfilled(this.value)
        } else if (this.status === 'rejected') {
            // 若是成功则执行成功的回调，传入成功的值
            onRejected(this.value)
        } else if (this.status === 'pending') {
            // status还是pending, 说明new Promise中没有同步的resolve, reject，必定以及肯定是异步，那么将回调函数保存起来
            this.onFulfilledSync = onFulfilled
            this.onRejectedSync = onRejected
        }

    }
}
