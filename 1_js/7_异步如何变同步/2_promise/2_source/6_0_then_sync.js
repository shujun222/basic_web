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
        // console.log("resolve....", value);

        // 只能放进去一次
        if (this.status === "pending") {
            this.status = "fulfilled"
            this.value = value
            
            this.onResolvedCallbacks.forEach(fn => {
                let result = fn(value)
                if (result instanceof Promise) {
                    console.log("is Promise");
                    // 需要卡住: 问题现在转换为
                    // 1.  value = Promise的 resolve(value), 2. 下一个then得基于当前Promise才行,不能依赖于最顶上那个了
                    // so: then里面返回this, 想只用一个Promise行不通; 必须像多级火箭🚀那样一级一级脱落,换新的接力
                    result.then(data => { 
                        console.log("新的Promise", data)
                        // 赋值已经晚了
                        value = data;
                    })
                } else {
                    value = result
                }
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
        // console.log("then");

        // 1. 先then, 后resolve
        if (this.status === "pending") {
            // 把回调保存起来
            this.onResolvedCallbacks.push(onFulfilled)
            this.onRejectedCallbacks.push(onRejected)
        } else if (this.status === "fulfilled") {
            // 2.1 先在executor中执行了同步的resolve, 再来到这儿
            this.value = onFulfilled(this.value)
            // console.log("this.value", this.value);
        } else if (this.status === "rejected") {
            // 2.2 先在executor中执行了同步的reject，再来的这儿
            onRejected(this.reason)
        }

        // 返回当前对象
        return this
    }
}

module.exports = Promise