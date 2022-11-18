/**
 * 基本用法
 */

let isRemember = false
let getLv = new Promise((resolve, reject) => {
    if (isRemember) {
        let lv = {
            color: 'orange',
            price: 'Y99'
        }
        resolve(lv)
    } else {
        let err = new Error("我加班去了，忘记了")
        // 什么都没有了，也不会往后继续then了
        reject(err)
    }
})

let buyLip = (lv) => {
    let lip = {
        brand: '迪奥',
        color: 'pink'
    }

    let msg = {
        message: `我买的口红是${lip.brand}，搭配我的${lv.color} lv`,
        lip,
        lv
    }

    // 1. 同步返回数据没啥测试的吧，那就不需要链式then了
    // return msg;

    // 2. 这样也是不行的，整个函数先返回了undefined, 再执行异步
    // setTimeout(()=>{
    //     console.log(666);
    //     return new Promise(resolve => resolve(msg))
    // }, 2000)

    // 3. 真正的写法
    return new Promise(resolve => {
        setTimeout(_ => resolve(msg), 2000)
    })
    // return Promise.resolve(msg)
}


// 1. 简单调用
// getLv.then(resp => {
//     console.log(resp);
// }).catch(exception => {
//     console.log(exception.message);
// })

// 2. 多层then
getLv
    .then(buyLip)
    .then(resp => {
        console.log(resp);
    }).catch(exception => {
        console.log(exception.message);
    })
