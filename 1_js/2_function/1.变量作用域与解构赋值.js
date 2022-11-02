
// 'use strict'

// 1. 作用域
// 1.1. 局部作用域
function onlyInFunction() {
    var x = 1;
    function bar() {
        var y = x + 1; // bar可以访问foo的变量x! 这个号理解呀
    }
    // var z = y + 1; // ReferenceError! foo不可以访问bar的变量y! 这个也好理解的

    if (true) {
        // 不申明类型，难道默认是var，var不是局部的，而是函数类型作用域的
        c = 3 // 如果'use strict' 这一句也不行了
        var c1 = 3;
        let c2 = 3;
    }
    console.log(c);
    console.log(c1);
    // console.log(c2); // c2 is not defined
}

// onlyInFunction()

// 奇葩点，申明自动提升；
function foo() {
    // 得自己养成好习惯，先申明再使用
    var x = 'Hello, ' + y;
    console.log(x);
    // 如果在底下申明了，就不报错，会自动提升到最上面，这么说，那也不说绝对一句一句执行的
    // 可能是一个函数执行一次？
    var y = "what"
}

// foo();


// 1.2 全局作用域
// var course = 'Learn JavaScript';
// console.log(course); // 'Learn JavaScript'
// console.log(window.course); // 'Learn JavaScript'

// // 多个文件都上升到window，必然冲突，所以需要命名空间
// // 唯一的全局变量MYAPP:
// var MYAPP = {};
// // 其他变量:
// MYAPP.name = 'myapp';
// MYAPP.version = 1.0;



// 2. 解构赋值
// 2.1 基本用法
function resolveAssign() {
    // 1. 最简单的
    var [x, y, z] = ['hello', 'JavaScript', 'ES6'];
    console.log(x, y, z);

    // 嵌套的
    let [x1, [y1, z1]] = ['hello', ['JavaScript', 'ES6']];

    // 两个好用的语法：：& =
    var person = {
        name: '小明',
        pasid: 'dsafsdf',
        address: {
            city: 'Beijing',
            street: 'No.1 Road',
        }
    };
    var { name,
        address: { city, street },
        pasid: id,
        single = true, // 如果没有single属性，默认为undefined, 则给其赋值上true，如果single原来为null，此处是赋值不成功的
    } = person;
    // console.log(address); // 为啥address就不能用了呢, 因为":"可能是改名字的意思
    console.log(name, city, id, single);
}
// resolveAssign()

// 2.2 进阶用法
function secondUse() {
    var a, b;
    [a, b] = ["jay", "leehome"]
    console.log(a, b);


    let data = { name: '小明', x: 100, y: 200 }
    // 这样是不报错的，当成对象的解析赋值
    var { x, y } = data
    console.log(x, y);

    // 这一句为什么会报错呢？{}会解析成代码段吗？
    // {x, y} = data;  // 语法错误: Uncaught SyntaxError: Unexpected token =
    ({ x, y } = data)
    console.log(x, y);

}

// secondUse()

// 3. 妙用之处
// 3.1 交换数值
function niceUse() {
    var x = 1, y = 2;
    // [x, y] = [y, x]
    // console.log(x, y); // 2, 1
    x, y = y, x // 这一句在python可行，为什么在这里不行呢？
    console.log(x, y); // 1, 2


}
// niceUse()

// 3.2 函数传递参数，很方便的就解析出来了
function buildDate({year, month, day, hour=0, minute=0, second=0}) {
    return new Date(year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second);
}

// date = buildDate({ year: 2017, month: 1, day: 1 });
// console.log(date);
