class Promise {
    constructor(executor) {
        this.onResolvedCallbacks = []
        this.onRejectedCallbacks = []
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
        console.log("resolve....", value);

        // 只能放进去一次
        if (this.status === "pending") {
            this.status = "fulfilled"
            this.value = value
            
            this.onResolvedCallbacks.forEach(fn => {
                value = fn(value)
            });
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
        console.log("then");

        // 1. 先then, 后resolve
        if (this.status === "pending") {
            // 把回调保存起来
            this.onResolvedCallbacks.push(onFulfilled)
            this.onRejectedCallbacks.push(onRejected)
        } else if (this.status === "fulfilled") {
            // 2.1 先在executor中执行了同步的resolve, 再来到这儿
            this.value = onFulfilled(this.value)
            console.log("this.value", this.value);
        } else if (this.status === "rejected") {
            // 2.2 先在executor中执行了同步的reject，再来的这儿
            onRejected(this.reason)
        }

        // 返回当前对象
        return this
    }
}

module.exports = Promise