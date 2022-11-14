
// 'use strict'

// 1. 作用域
// 1.1. 不是局部作用域，叫做函数作用域
function onlyInFunction() {
    var x = 1;
    function bar() {
        var y = x + 1; // bar可以访问foo的变量x! 这个号理解呀
    }
    // var z = y + 1; // ReferenceError! foo不可以访问bar的变量y! 这个也好理解的

    if (true) {
        // 不申明类型，难道默认是var，var不是局部的，而是函数类型作用域的
        c = 3 // 如果'use strict' 这一句也不行了: 只能修复变量未定义，不可修复2.变量提升
        var c1 = 3;
        // let c2 = 3;
    }
    console.log("c", c);
    console.log("c1", c1);
    // console.log(c2); // c2 is not defined
}

onlyInFunction()

// 2. 奇葩点，申明自动提升；
function foo() {
    // 得自己养成好习惯，先申明再使用
    var x = 'Hello, ' + y;
    console.log(x);
    // 如果在底下申明了，就不报错，会自动提升到最上面: var y;
    var y = "what"
    x = 'Hello, ' + y;
    console.log(x);
}

// foo();


// 3 全局作用域， let const应该都一样
// var course = 'Learn JavaScript';
// console.log(course); // 'Learn JavaScript'
// console.log(window.course); // 'Learn JavaScript'

// // 多个文件都上升到window，必然冲突，所以需要命名空间
// // 唯一的全局变量MYAPP:
// var MYAPP = {};
// // 其他变量:
// MYAPP.name = 'myapp';
// MYAPP.version = 1.0;

