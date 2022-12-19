const { resolve } = require("../PromiseTemplate");

let ps = [];

/**
 * 
 */
class Promise {
    constructor(executor) {
        ps.push(this)
        // console.log("constructor", ps.length);
        this.onResolvedCallbacks = []
        this.onRejectedCallbacks = []
        this.status = "pending"
        this.value = ""
        this.reason = ""

        try {
            executor(this.resolve, this.reject)
        } catch (e) {
            this.reject(e)
        }

    }

    resolve = value => {

        // 只能放进去一次
        if (this.status === "pending") {
            this.status = "fulfilled"
            this.value = value
            this.onResolvedCallbacks.forEach(fn => fn());
        }
    }

    reject = reason => {
        console.log("reject....");

        if (this.status === "pending") {
            this.status = "rejected"
            this.reason = reason

            this.onRejectedCallbacks.forEach(fn => fn());
        }
    }

    then(onFulfilled, onRejected) {
        // console.log("then,  promise index", ps.indexOf(this));

        let nextPromise = new Promise((resolve, reject) => {
            // 1. 先then, 后resolve
            if (this.status === "pending") {
                this.onResolvedCallbacks.push(() => {
                    let next = onFulfilled(this.value)
                    resolvePromise(next, resolve, reject)
                })

                this.onRejectedCallbacks.push(() => {
                    let next = onRejected(this.reason)
                    resolvePromise(next, resolve, reject)
                })
            } else if (this.status === "fulfilled") {
                let next = onFulfilled(this.value)
                resolvePromise(next, resolve, reject)
            } else if (this.status === "rejected") {
                let next = onRejected(this.reason)
                resolvePromise(next, resolve, reject)
            }
        });

        return nextPromise
    }


    // static方法区
    static resolve(value) {
        return new Promise(resolve => resolve(value))
    }

    static reject(reason) {
        return new Promise((_, reject) => reject(reason))
    }

    static race(promises) {
        // 遍历promises，看谁先满足条件就先处理
        // Promise的状态只能改变一次，只要第一个修改了，后续再改也没用
        return new Promise((resolve, reject) =>
            promises.forEach(pro => pro.then(resolve, reject))
        )
    }

    // all：等待原则，传入多个promise，等所有的promise都满足条件，返回所有的成功结果
    static all0 = function (promises) {
        let results = []

        return new Promise(resolve => {
            for (const p of promises) {
                p.then(data => {
                    results.push(data)
                    if (results.length === promises.length) {
                        resolve(results)
                    }
                })
            }
        })
    };

    static all1 = function (promises) {
        let results = []

        return new Promise(resolve => {
            for (let index = 0; index < promises.length; index++) {
                console.log("I", index);
                promises[index].then(data => {
                    console.log("index", index);
                    results[index] = data
                    if (results.length === promises.length) {
                        resolve(results)
                    }
                })
            }
        })
    };

    static all = function (promises) {
        let ans = []
        let count = 0

        return new Promise(resolve => {
            for (let index = 0; index < promises.length; index++) {
                promises[index].then(data => {
                    ans[index] = data
                    count++
                    if (count === promises.length) {
                        resolve(ans)
                    }
                })
            }
        })
    };
}

const resolvePromise = (next, resolve, reject) => {
    if (next instanceof Promise) {
        next.then(resolve, reject)
    } else {
        // 普通值
        resolve(next)
    }
}

module.exports = Promise