class MyPromise{
    constructor(excutor){
        // 初始化参数
        this.initValue()
        // 执行对应方法
        try {
            excutor(this.resolve,this.reject)
        } catch (err) {
            this.reject(err.message)
        }
        // 初始化回调函数
        this.onFulfilledSync = []
        this.onRejectedSync = []
    }

    initValue = () =>{
        this.PromiseState = 'pending'
        this.PromiseResult = null
    }

    // resolve 方法
    resolve = (value) =>{
        if(this.PromiseState !== 'pending') return 
        this.PromiseState = 'fulfilled'
        this.PromiseResult = value
        // 判断是否有then执行回调
        while(this.onFulfilledSync.length){
            this.onFulfilledSync.shift()(this.PromiseResult)
        }
    }

    // reject 方法
    reject = (reason) =>{
        if(this.PromiseState !== 'pending') return 
        this.PromiseState = 'rejected'
        this.PromiseResult = reason
        // 判断是否有then执行回调
        while(this.onRejectedSync.length){
            this.onRejectedSync.shift()(this.PromiseResult)
        }
    }

    // then 方法回调
    then = (onFulfilled,onRejected)=>{
        // 首先确保传进来的是函数
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
        onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason}

        // 创建一个then返回的Promise
        const thenPromise = new MyPromise((resolve,reject)=>{
            // 创建 then 回调函数的执行函数
            const resultPromise = cb =>{
                setTimeout(()=>{
                    // 执行then回调函数，并用try，catch隐式捕捉错误
                    try {
                        // 调用cb（onFulfilled） // cb（onRejected）
                        const result = cb(this.PromiseResult)
                        //确保不是自身调用
                        if(result === thenPromise) throw new Error('不能调用自身')
                        // 如果返回的结果还是promise
                        if(result instanceof MyPromise){
                            // 要判断它的状态，到底是resolve 还是 reject 只有调用它自身的then方法才得知
                            // 将要返回的resolve，reject，作为它then的回调，这样就能保持一致的状态
                            result.then(resolve,reject)
                        }
                        // 如果不是返回的promise
                        else{
                            resolve(result)
                        }
                    } catch (err) {
                        // 抛出的错误，在此捕获并reject掉
                        reject(err.message)
                    }
                })
            }
            // 开始执行then回调
            if(this.PromiseState === 'fulfilled'){
                resultPromise(onFulfilled)
            }
            else if(this.PromiseState === 'rejected'){
                resultPromise(onRejected)
            }
            else if(this.PromiseState === 'pending'){
                this.onFulfilledSync.push(onFulfilled)
                this.onRejectedSync.push(onRejected)
            }

        })

        // 调用then后返回处理果的结果
        return thenPromise
    }
}


module.exports = MyPromise

