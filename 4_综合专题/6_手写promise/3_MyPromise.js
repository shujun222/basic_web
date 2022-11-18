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
    // this.onFulfilledSync;
    // this.onRejectedSync;

    this.onFulfilledSync = [];
    this.onRejectedSync = [];


    function resolve(value) {
        if (self.status === 'pending') {
            console.log(1111111, value);
            self.value = value
            // 状态控制，保证resolve、reject只能执行一次
            self.status = 'fulfilled'

            // 异步调用
            // self.onFulfilledSync && self.onFulfilledSync(value)
            // console.log("self.onFulfilledSync", self.onFulfilledSync);

            while(self.onFulfilledSync.length){
                self.onFulfilledSync.shift()(this.PromiseResult)
            }
        }
    }

    function reject(reason) {
        if (self.status === 'pending') {
            self.value = reason
            self.status = 'rejected'
            // self.onRejectedSync && self.onRejectedSync(reason)

            while(self.onRejectedSync.length){
                self.onRejectedSync.shift()(this.PromiseResult)
            }
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
        // 1 首先确保传进来的是函数
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }


        // 2. 要让then能继续链式，那必须保证then的返回值是MyPromise
        const thenPromise = new MyPromise((resolve, reject) => {
            // 2.1 对cb进行包裹的函数：入参是cb, 根据cb执行的结果判断是否继续递归调用then
            const tellCbResult = cb => {
                // 执行then回调函数，并用try，catch隐式捕捉错误
                try {
                    // 要判断它的状态，到底是resolve 还是 reject 只有调用它自身的then方法才得知
                    const result = cb(this.value)
                    // console.log("result", result);
                    // 如果返回的结果还是promise
                    if (result instanceof MyPromise) {
                        // 将要返回的resolve，reject，作为它then的回调，这样就能保持一致的状态
                        result.then(resolve, reject)
                    } else {
                        resolve(result)
                    }
                } catch (err) {
                    // 抛出的错误，在此捕获并reject掉
                    reject(err.message)
                }
            }

            // 2.2 判断promise的状态执行对应回调
            if (this.status === 'fulfilled') {
                // console.log("then fulfilled");
                // 若是成功则执行成功的回调，传入成功的值
                tellCbResult(onFulfilled)
            } else if (this.status === 'rejected') {
                // 若是成功则执行成功的回调，传入成功的值
                tellCbResult(onRejected)
            } else if (this.status === 'pending') {
                // console.log("pending", this);
                // status还是pending, 说明new Promise中没有同步的resolve, reject，必定以及肯定是异步，那么将回调函数保存起来
                // this.onFulfilledSync = onFulfilled
                // this.onRejectedSync = onRejected

                this.onFulfilledSync.push(onFulfilled)
                this.onRejectedSync.push(onRejected)
            }
        })

        // 3. 返回
        return thenPromise

    }
}
