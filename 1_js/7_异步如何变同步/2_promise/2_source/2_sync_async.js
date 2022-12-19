class Promise {
    constructor(executor) {
        this.onResolvedCallback = ""
        this.status = "pending"
        this.value = ""

        executor(this.resolve)
    }

    resolve = value => {
        console.log("resolve....");

        // 先resolve，后then
        this.status = "fulfilled"
        this.value = value

        // 3. 只有异步onResolvedCallback才会有值
        this.onResolvedCallback && this.onResolvedCallback(value)
    }

    then (onFulfilled) {
        console.log("then");

        // 1. 先then, 后resolve
        if (this.status === "pending") {
            // 把回调保存起来
            this.onResolvedCallback = onFulfilled
        } else if (this.status === "fulfilled") {
            // 2. 先在executor中执行了同步的resolve, 再来到这儿
            onFulfilled(this.value)
        }
    }
}

module.exports = Promise