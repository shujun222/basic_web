function fn(a, c) {
    console.log(a);
    var a = 123
    console.log(a);
    console.log(c);
    function a(params) {
    }
    if (false) {
        var d = 666
    }
    console.log(d);
    console.log(b);
    var b = function (params) {
    }
    console.log(b);
    function c(params) {
    }
    console.log(c);
}

fn(1, 2)


/**
1. 创建ao对象 AO{}
2. 找形参和变量声明,将变量和形参名, 当作AO属性,赋值undefined
3. 实参形参相统一
4. 在函数体里面找到函数申明, 值赋予函数体

{
    a: undefined 1 function a
    b: undefined 
    c: undefined 2 function c
    d: undefined 
}

 */