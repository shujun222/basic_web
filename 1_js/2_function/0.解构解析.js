
// 1 基本用法
function resolveAssign() {
    // 1. 最简单的
    var [x, y, z] = ['hello', 'JavaScript', 'ES6'];
    console.log(x, y, z);

    // 嵌套的
    let [x1, [y1, z1]] = ['hello', ['JavaScript', 'ES6']];

    // 两个好用的语法： ： =
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

// 2 进阶用法
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
