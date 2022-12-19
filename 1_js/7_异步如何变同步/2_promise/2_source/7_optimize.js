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
        console.log("then,  promise index", ps.indexOf(this));
        
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