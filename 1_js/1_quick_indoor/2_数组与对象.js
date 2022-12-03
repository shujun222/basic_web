// 1. 数组
// 1.1 slice()就是对应String的substring()版本，它截取Array的部分元素，然后返回一个新的Array：

function testSlice() {
    var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    console.log(arr.slice(0, 3)); // 从索引0开始，到索引3结束，但不包括索引3: ['A', 'B', 'C']
    console.log(arr.slice(3)); // 从3往后截取
    console.log(arr); // slice不改变原数组
    console.log(arr.slice()); // 什么都不传就是相当于复制了一个新数组
    console.log([...arr]);
}
// testSlice()


// 1.2 splice(粘接)改变原数组，是个修改数组的万能方法
function testSplice() {
    var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    console.log(arr.splice(0, 3));
    console.log(arr);
    // 新增元素
    arr.splice(0, 0, "s", "J")
    console.log(arr);
}
// testSplice()



// 2. 对象
function testObj() {
    var jay = {
        name: '周杰伦',
        birth: 1990,
        school: 'No.1 Middle School',
    };
    console.log("sing" in jay);
    console.log("toString" in jay, jay.hasOwnProperty("toString"));

    Object.setPrototypeOf(jay, { sing: "nice" })
    console.log("jay", jay);
    console.log("sing" in jay);
    console.log("toString" in jay);

    // in能打出所有固有属性，包括父级的
    for (let key in jay) {
        console.log(key);
    }

    // // 对象没有迭代器哦 TypeError: jay is not iterable， map有哦
    // for (let key of jay) {
    //     console.log(key);
    // }

    // const m = new Map()
    // m.set("a", 1)
    // m.set("b", 2)
    // m.set("c", 2)
    // for (const [key, value] of m) {
    //     console.log(key, value);
    // }
}
testObj()