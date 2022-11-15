/**
 * 
 */

// 1. 用法篇
function fn(a, b) {
    console.log("this.name", this.name);
    console.log("sum", (a + b));
}
// fn()

const obj = { name: "sj" }
// 1.1 简单：(作用域对象, 参数1, 参数2, 参数3, ...)
// fn.call(obj, 1, 2) 

// 1.2 apply (作用域对象, [参数1, 参数2, 参数3, ...])
// apply可以理解为和call一样，只是apply只传递一个参数，调用的时候再自己散开
// fn.apply(obj, 1, 2) // 报错
// fn.apply(obj, [1, 2]) 

// 1.3 bind绑定后不执行，而是生成一个新的函数
// fn.bind(obj)
// fn()
// fn.bind(obj)()


// 2. 原理篇
// 2.1. bind
// https://blog.csdn.net/qq_39148344/article/details/90173640
// https://www.cnblogs.com/echolun/p/12178655.html
// 2.1.1 最简洁版
Function.prototype.myBind1 = function (obj) {
    var fn = this;
    return function () {
        fn.apply(obj);
    };
};
// fn.myBind1(obj)()

// 2.1.2 增加传递参数
Function.prototype.myBind2 = function (obj) {
    //第0位是this，所以得从第一位开始裁剪
    var args = Array.prototype.slice.call(arguments, 1);
    var fn = this;
    return function () {
        fn.apply(obj, args);
    };
};

// 2.1.3 bind还是还能支持柯里化，bind(args1)(args2)
Function.prototype.myBind3 = function (obj) {
    //第0位是this，所以得从第一位开始裁剪
    var args = Array.prototype.slice.call(arguments, 1);
    var fn = this;
    return function () {
        //二次调用我们也抓取arguments对象
        var params = Array.prototype.slice.call(arguments);
        //注意concat的顺序
        fn.apply(obj, args.concat(params));
    };
};

// 2.1.4 没看懂，好像是bind还能支持 new之类的特性
Function.prototype.myBind4 = function () {
    if (typeof this !== 'function')
        throw 'caller must be a function'
    let self = this
    let context = arguments[0]
    let args = Array.prototype.slice.call(arguments, 1) // 旧：参数
    let fn = function () {
        let fnArgs = Array.prototype.slice.call(arguments) // 新：参数
        // bind 函数的参数 + 延迟函数的参数
        // 用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上
        self.apply(this instanceof self ? this : context, args.concat(fnArgs))
    }
    fn.prototype = Object.create(self.prototype) // 维护原型
    return fn
}
// fn.myBind4(obj, 1, 2)()


// 2.2 call & apply
Function.prototype.newApplyOrCall = function () {
    let obj = arguments[0] || window

    // 参数处理
    let callArgs = [...arguments].slice(1)
    let applyArgs = arguments[1]
    // 通用写法
    let args = [...arguments].flat().slice(1)

    obj._newApplyOrCallFn = this
    // 太庙了
    console.log("this就是调用newApplyOrCall这个函数的方法", this);
    const res = obj._newApplyOrCallFn(...args)
    delete obj._newApplyOrCallFn
    return res
}

fn.newApplyOrCall(obj, [1, 2])