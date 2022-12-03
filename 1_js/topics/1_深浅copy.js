// 1. 话分两段，如果是基本数据类型，那就不存在这个问题，都算深度copy
function testBasic() {
    a = 3
    b = a
    b = 4;
    console.log("a", a); // 该是多少就是多少
    console.log("b", b);
}
// testBasic()

// 2. 对象
// 浅copy是引用地址/指针copy; 深copy是数据的完全copy，与原来数据独立不相关了
function testObj() {
    // 1. 赋值是浅copy
    // a = [4, [1, 2]]
    // b = a
    // b[0] = 5
    // console.log("a", a); 
    // console.log("b", b); 

    // 2 深度copy一层, 里面嵌套的是浅copy
    // 2.1. Object.assign
    // a = [4, [1, 2]]
    // let b = []
    // Object.assign(b, a)
    // b[0] = 5; 
    // b[1][0] = 0
    // console.log("a", a);
    // console.log("b", b);

    // 2.2 es6的...展开运算符
    // a = [4, [1, 2]]
    // b = [...a]
    // b[0] = 5;
    // b[1][0] = 0
    // console.log("a", a);
    // console.log("b", b);

    // 3. 完全的深度copy
    // 工作之中貌似没啥用吧？
    // 3.1 JSON, 但是必须保证为json吧？
    a = [4, [1, 2]]
    b = JSON.parse(JSON.stringify(a))
    b[0] = 5;
    b[1][0] = 0
    console.log("a", a);
    console.log("b", b);

    // 3.2 自己写递归

    // 3.3 利用插件
}
// testObj()


// 3. 手写递归 深度copy
// 3.1 只能copy数组
function deepCopy(source) {
    let target = []
    for (let k in source) {
        if (typeof source[k] === 'object') {
            target.push(deepCopy(source[k]))
        } else {
            target.push(source[k])
        }
    }
    return target
}

function testdeepCopy() {
    let a = [4, [1, 2, [3, 4]]]
    let b = deepCopy(a)
    console.log("b", b);
    b[1][2][0] = 333
    console.log("b", b);
    console.log("a", a);
}
// testdeepCopy()


function deepCopy2(source) {
    // 判断是否为数组
    // let target = source instanceof Array ? [] : {}
    let target = Array.isArray(source) ? [] : {}
    for (let key in source) {
        // if (!source.hasOwnProperty(key)) {
        //     return
        // }
        if (typeof source[key] === 'object') {
            target[key] = deepCopy2(source[key])
        } else {
            target[key] = source[key]
        }
    }
    return target
}

function testDeepCopy2() {
    // let a = [4, [1, 2, [3, 4]]]
    let a = { key1: [4, [1, 2]], key2: [2, 3] }
    let b = deepCopy2(a)
    console.log("b", b);
    // b[1][2][0] = 333
    b.key1[1][0] = 333
    console.log("b", b);
    console.log("a", a);
}
testDeepCopy2()





