const PENDING = 'pending' // 等待
const FULFILLED = 'fulfilled' // 成功
const REJECTED = 'rejected' // 失败
class MyPromise {
    constructor(executor) {
        // 执行器当中的代码执行过程中发生错误时，状态变为错误状态
        try {
            executor(this.resolve, this.reject)
        } catch (e) {
            this.reject(e)
        }

    }

    // 状态定义成常量，为了复用和有提示
    status = PENDING
    // 成功之后的值
    value = undefined
    // 失败的原因
    reason = undefined
    // 成功回调
    successCallback = []
    // 失败回调
    failCallback = []

    resolve = value => {
        // 如果状态不是等待，阻止程序向下执行
        if (this.status !== PENDING) return
        // 将状态改为成功
        this.status = FULFILLED
        // 保存成功之后的值
        this.value = value
        // 判断成功回调是否存在，如果存在，调用
        while (this.successCallback.length) this.successCallback.shift()()
    }

    reject = reason => {
        // 如果状态不是等待，阻止程序向下执行
        if (this.status !== PENDING) return
        // 将状态改为失败
        this.status = REJECTED
        // 保存失败的原因
        this.reason = reason
        // 判断失败回调是否存在，如果存在，调用
        while (this.failCallback.length) this.failCallback.shift()()
    }

    then(successCallback, failCallback) {
        // console.log("then");
        // then 方法的链式调用 --> 返回 promise 对象
        successCallback = successCallback ? successCallback : value => value
        failCallback = failCallback ? failCallback : reason => { throw reason }
        
        
        const promise2 = new Promise((resolve, reject) => {
            // 判断状态
            if (this.status === FULFILLED) {
                // setTimeout(() => {
                    try {
                        // 后面 then 方法的回调函数拿到的值是上一个 then 方法的回调函数的返回值
                        const x = successCallback(this.value)
                        console.log("x", x);
                        // 判断 x 的值是普通值还是 promise 对象
                        // 如果是普通值，直接调用 resolve
                        // 如果是 promise 对象，查看 promise 对象返回的结果
                        // 再根据 promise 对象返回的结果，决定调用 resolve 还是 reject

                        // 使用异步代码，获取到 promise2
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                // }, 0)
            } else if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        // 后面 then 方法的回调函数拿到的值是上一个 then 方法的回调函数的返回值
                        const x = failCallback(this.reason)
                        // 判断 x 的值是普通值还是 promise 对象
                        // 如果是普通值，直接调用 resolve
                        // 如果是 promise 对象，查看 promise 对象返回的结果
                        // 再根据 promise 对象返回的结果，决定调用 resolve 还是 reject

                        // 使用异步代码，获取到 promise2
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            } else {
                // 等待
                // 将成功回调和失败回调存储起来
                this.successCallback.push(() => {
                    setTimeout(() => {
                        try {
                            // 后面 then 方法的回调函数拿到的值是上一个 then 方法的回调函数的返回值
                            const x = successCallback(this.value)
                            // 判断 x 的值是普通值还是 promise 对象
                            // 如果是普通值，直接调用 resolve
                            // 如果是 promise 对象，查看 promise 对象返回的结果
                            // 再根据 promise 对象返回的结果，决定调用 resolve 还是 reject

                            // 使用异步代码，获取到 promise2
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                })

                this.failCallback.push(() => {
                    setTimeout(() => {
                        try {
                            // 后面 then 方法的回调函数拿到的值是上一个 then 方法的回调函数的返回值
                            const x = failCallback(this.reason)
                            // 判断 x 的值是普通值还是 promise 对象
                            // 如果是普通值，直接调用 resolve
                            // 如果是 promise 对象，查看 promise 对象返回的结果
                            // 再根据 promise 对象返回的结果，决定调用 resolve 还是 reject

                            // 使用异步代码，获取到 promise2
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                })
            }
        })

        return promise2

    }

    finally(callback) {
        // 无论当前 promise 对象最终是成功还是失败，都会被调用
        // 后面可以用 then 方法，得到最终的值
        // finally 方法的回调函数中可以 return 一个 promise 对象，此时应该等待这个 promise 对象执行完成之后，再执行下一个 then
        return this.then(value => {
            return MyPromise.resolve(callback()).then(() => value)
        }, reason => {
            return MyPromise.resolve(callback()).then(() => { throw reason })
        })
    }

    catch(failCallback) {
        return this.then(undefined, failCallback)
    }

    static all(array) {
        const result = []
        let index = 0
        return new Promise((resolve, reject) => {
            const addData = (key, value) => {
                result[key] = value
                index++
                if (index === array.length) {
                    resolve(result)
                }
            }
            for (let i = 0; i < array.length; i++) {
                let current = array[i]
                if (current instanceof MyPromise) {
                    // promise 对象
                    current.then(value => addData(i, value), reason => reject(reason))
                } else {
                    // 普通值
                }
            }
            resolve()
        })
    }

    static resolve(value) {
        // 判断参数是否为一个 promise
        // 如果是，直接返回这个 promise 对象
        // 如果不是，把值包裹起来，返回一个 promise 对象
        if (value instanceof MyPromise) return value
        return new MyPromise(resolve => resolve(value))
    }
}

const resolvePromise = (promise2, x, resolve, reject) => {
    if (promise2 === x) {
        // 自己返回自己
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    if (x instanceof MyPromise) {
        // promise 对象
        // x.then(value => resolve(value), reason => reject(reason))
        x.then(resolve, reject)
    } else {
        // 普通值
        resolve(x)
    }
}

module.exports = MyPromise
