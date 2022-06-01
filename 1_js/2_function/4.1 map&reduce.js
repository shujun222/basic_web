/**
 * 题目1： 比如我们有一个函数f(x)=x ** 2，
 * 要把这个函数作用在一个数组[1, 2, 3, 4, 5, 6, 7, 8, 9], 再返回一个新数组
 */
function testMap() {
    function pow(x) {
        return x ** 2;
    }

    let data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    // 解法一：
    let newData = []
    for (const n of data) {
        newData.push(pow(n))
    }
    console.log(newData);

    /**
     * 解法二：map()作为高阶函数，事实上它把运算规则抽象了，每个子元素都进行func函数运算
     * 解法一无法让我们一眼看明白“把f(x)作用在Array的每一个元素并把结果生成一个新的Array”。
     */
    let newData2 = data.map(pow)
    console.log(newData2);

    let newData3 = data.map(function (data, index, array) { return data ** 2 })
    console.log("newData3", newData3);

    // newData = data.map(n => n *n)
}
// testMap();
/**
 * map的作用
 * 1. 分开单独映射，调用函数
 * 2. 组合成新数组
 */


/**
 * 题目2：数组求和
 * reduce()把结果继续和序列的下一个元素做累积计算
 * [x1, x2, x3, x4].reduce(f) = f(f(f(x1, x2), x3), x4)
 */
function testReduce() {
    var arr = [1, 3, 5, 7, 9];

    // 解法1
    let sum = 0;
    for (const n of arr) {
        sum += n;
    }
    console.log("sum", sum);

    // 解法2：至少得两个参数
    let sum2 = arr.reduce(function (x, y) {
        return x + y;
    });
    console.log("sum2", sum2);

    let sum3 = arr.reduce((x, y) => x + y)
    console.log("sum3", sum3);
}
// testReduce()


/**
 * 题目3：string2int
 * 不要使用JavaScript内置的parseInt()函数，利用map和reduce操作实现一个string2int()函数
 */
function string2int(s) {
    // return s * 1
    // s转为List，可以使用：s.split(""), 或者Array.from(s)
    return s.split("").map(x => x * 1).reduce((x, y) => 10 * x + y)
}

// 测试:
if (string2int('0') === 0 && string2int('12345') === 12345 && string2int('12300') === 12300) {
    if (string2int.toString().indexOf('parseInt') !== -1) {
        console.log('请勿使用parseInt()!');
    } else if (string2int.toString().indexOf('Number') !== -1) {
        console.log('请勿使用Number()!');
    } else {
        console.log('测试通过!');
    }
}
else {
    console.log('测试失败!');
}


/**
 * 题目4：首字母大写，其他小写的规范名字
 * 输入：['adam', 'LISA', 'barT']，输出：['Adam', 'Lisa', 'Bart']。
 */
 function normalize(arr) {
     return arr.map(ele => ele[0].toUpperCase() + ele.slice(1).toLowerCase())
 }

 // 测试:
if (normalize(['adam', 'LISA', 'barT']).toString() === ['Adam', 'Lisa', 'Bart'].toString()) {
    console.log('测试通过!');
}
else {
    console.log('测试失败!');
}


/**
 * 题目5：帮小明改代码
 * 小明希望利用map()把字符串变成整数，他写的代码很简洁：
 * 结果竟然是1, NaN, NaN，小明百思不得其解，请帮他找到原因并修正代码。
 * 提示：map的默认传参
 */
 function parseIntByXiaoming(arr) {
    // return arr.map(parseInt)
    // return arr.map(x => parseInt(x))
    return arr.map(Number)
 }

 if (parseIntByXiaoming(['1', '2', '3']).toString() ==  ['1', '2', '3'].toString()){
    console.log("测试通过!");
 } else {
    console.log("测试失败!");
 }



