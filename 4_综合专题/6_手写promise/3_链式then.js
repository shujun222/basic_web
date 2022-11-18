// let MyPromise = require('./3_MyPromise')
let MyPromise = require('./MyPromise')

/**
 * then支持链式调用，下一次then执行受上一次then返回值的影响
 *  1. 如果返回值是promise对象，返回值为成功，新promise就是成功将调用下个then的成功回调
    2. 如果返回值是promise对象，返回值为失败，新promise就是失败将调用下个then的失败回调
    3. 如果返回值非promise对象，新promise对象就是成功，值为此返回值
    4. 如果返回值非promise对象，并手动抛出错误，新promise对象就是失败，值为此错误信息
 */
// let getLv = new MyPromise((resolve, reject) => {
//     let lv = {
//         color: 'orange',
//         price: 'Y99'
//     }
//     // setTimeout(() => resolve(lv), 2000)
// })

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

    // 3. 真正的写法
    return new MyPromise(resolve => {
        setTimeout(_ => resolve(msg), 2000)
    })
}

// getLv
// // .then(buyLip)
// .then(
//     resp => {console.log("resp", resp); return 666},
//     err => console.log("err", err)
// ).then(resp => console.log("2then", resp))


// 1. 同步调用
// new MyPromise((resolve, reject) => {
//     resolve(100)
// }).then(res => 2 * res, err => console.log(err))
//     .then(res => console.log(res), err => console.log(err))

// 2. 异步调用
new MyPromise((resolve, reject) => {
    setTimeout(_ => resolve(100), 3000)
})
.then(res => {
    console.log(666, res);
    return 2 * res
}, err => console.log(err))
.then(res => console.log("res", res), err => console.log(err))


// let p2 = new MyPromise((resolve,reject)=>{
//     resolve(2)})
// .then(res=> {console.log("222"); throw Error('失败')})  //  这里在第一个then里手动reject  
// .then(res=>{},err=>{console.log("err", err);})  // 最后也会第二个失败回调里输出 失败


//  链式加延迟调用
// let p3 = new MyPromise((resolve,reject)=>{
//     resolve(2)})
// .then(res=>{
//     return new MyPromise((resolve,reject)=>{
//         setTimeout(()=>{resolve(res*2)},1000)
//     })
// })
// .then(res=>{console.log(res);},err=>{console.log(err);})  //  4