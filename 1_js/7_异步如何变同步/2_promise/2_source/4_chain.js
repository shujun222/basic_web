class Promise {
    constructor(executor) {
        this.onResolvedCallback = ""
        this.onResolvedCallback = ""
        this.status = "pending"
        this.value = ""
        this.reason = ""

        try {
            executor(this.resolve, this.reject)
        } catch(e) {
            this.reject(e)
        }
        
    }

    resolve = value => {
        console.log("resolve....");

        // 只能放进去一次
        if (this.status === "pending") {
            this.status = "fulfilled"
            this.value = value

            // 只有异步onResolvedCallback才会有值
            this.onResolvedCallback && this.onResolvedCallback(value)
        }
    }

    reject = reason => {
        console.log("reject....");

        if (this.status === "pending") {
            this.status = "rejected"
            this.reason = reason

            this.onRejectedCallback && this.onRejectedCallback(reason)
        }
    }

    then(onFulfilled, onRejected) {
        console.log("then");

        // 1. 先then, 后resolve
        if (this.status === "pending") {
            // 把回调保存起来
            this.onResolvedCallback = onFulfilled
            this.onRejectedCallback = onRejected
        } else if (this.status === "fulfilled") {
            // 2.1 先在executor中执行了同步的resolve, 再来到这儿
            this.value = onFulfilled(this.value)
        } else if (this.status === "rejected") {
            // 2.2 先在executor中执行了同步的reject，再来的这儿
            onRejected(this.reason)
        }

        // 返回当前对象
        return this
    }
}

module.exports = Promise