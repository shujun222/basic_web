// 遍历Array可以采用下标循环，遍历Map和Set就无法使用下标。为了统一集合类型，ES6标准引入了新的iterable类型，Array、Map和Set都属于iterable类型。

// 具有iterable类型的集合可以通过新的for ... of循环来遍历。

// 1. 原本访问方式
function origin() {
    stars = ["jay", "leehom", "messi"]
    // 1. 分别是什么 及 为什么是这样的
    for (let key in stars) {
        console.log(key);
    }
    for (let key of stars) {
        console.log(key);
    }
}
// origin()

// 2. set Map得用迭代器访问
function es6() {
    s = new Set([1, 2, 3, 3, '3']);
    for (let key of s) {
        console.log(key);
    }

    m = new Map([["name",'周杰伦'], ["name", "messi"], ["age", 43], ["skill", "sing"]])
    for (let key of m) {
        console.log(key);
    }

    // 当然也可以用forEach
    s.forEach(element => {
        console.log(element);
    });

    m.forEach((value, key) => {
        console.log(value, key);
    });
}
es6()