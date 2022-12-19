let ps = [];

/**
 * 
 */
class Promise {
    constructor(executor) {
        ps.push(this)
        // console.log("constructor", ps.length);
        this.onResolvedCallbacks = ""
        this.onRejectedCallback = ""
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
            this.onResolvedCallbacks && this.onResolvedCallbacks();
        }
    }

    reject = reason => {
        console.log("reject....");

        if (this.status === "pending") {
            this.status = "rejected"
            this.reason = reason

            this.onRejectedCallback && this.onRejectedCallback();
        }
    }

    then(onFulfilled, onRejected) {
        console.log("then,  promise index", ps.indexOf(this));
        
        let nextPromise = new Promise((resolve, reject) => {
            // 1. 先then, 后resolve
            if (this.status === "pending") {
                // 把回调保存起来, 这样不好报错值了,得借助下面的闭包
                // this.onResolvedCallback = onFulfilled

                this.onResolvedCallbacks = () => {
                    let next = onFulfilled(this.value)
                    if (next instanceof Promise) {
                        next.then(resolve, reject)
                    } else {
                        resolve(next)
                    }
                }

                this.onRejectedCallback = onRejected
            } else if (this.status === "fulfilled") {
                // 2.1 先在executor中执行了同步的resolve, 再来到这儿
                let result = onFulfilled(this.value)
                if (result instanceof Promise) {
                    // 不能同步立刻执行resolve, 需要等Promise result 自己回调: 即then
                    console.log("a is Promise");
                    // resolve(result)
                    result.then(resolve, reject)
                } else {
                    // 返回值是普通数值, 正常resolve就好:status->fulfilled; 然后then
                    resolve(result)
                }
            } else if (this.status === "rejected") {
                // 2.2 先在executor中执行了同步的reject，再来的这儿
                onRejected(this.reason)
            }
        });

        return nextPromise
    }
}

module.exports = Promise