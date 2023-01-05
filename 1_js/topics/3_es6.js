// 1. set
// https://www.w3school.com.cn/js/js_object_sets.asp
function testSet(params) {
    // 0. 创建
    var array = [1, 2, 3, 4, 4, 2, 3, 4, 5]
    const set1 = new Set(array);
    console.log(set1);

    // 1. 增
    set1.add(6)
    set1.add(7)
    console.log("add", set1);

    // 2. 删
    set1.delete(6)
    // set1.clear()
    console.log("delete", set1);

    // 3. 查
    console.log("has 2?", set1.has(2));
    console.log("has 6?", set1.has(6));

    // 4. 改
    set1.add(2)
    set1.add(2)
    console.log("替换", set1);

    // 5. 循环
    console.log(set1.keys);
    console.log(Array.from(set1.keys()));
    console.log(set1.values);
    // 为什么是属性，不是方法呢？
    console.log("set1.size", set1.size);
    for (let k of set1.entries()) {
        console.log(k);
    }

    for (let k of set1.values()) {
        console.log(k);
    }

    console.log("for each");
    set1.forEach((k, v) => console.log(k, v))


    // 其它： set -> array
    // let array1 = [...set1]
    // console.log(array1);
}
// testSet()


// 2 map
/**
 * 为什么有object, 还引入map
 *    https://www.jb51.net/article/224097.htm
 *    1、可能通过原型链访问到未定义的属性
      2、对象的 Key 只能是字符串
 *
 */
function testMap() {
    // 0. 创建
    const m = new Map()

    // 1. 增
    m.set("a", 1)
    m.set("b", 2)
    m.set("c", 2)
    console.log("set", m);

    // 2. 删除
    m.delete("a")
    // m.clear()
    console.log("set", m);

    // 3. 查
    console.log("b:", m.get("b"));
    console.log("c:", m.get("c"));
    // 不能用吗？
    console.log("b in m:", "b" in m);

    // 4. 改
    m.set("a", 111)
    console.log("改", m);

    // 5. 循环
    console.log("5. cycle...");
    console.log(m.keys);
    console.log(Array.from(m.keys()));
    console.log(m.values);
    // 为什么是属性，不是方法呢？
    console.log("m.size", m.size);
    for (let k of m.keys()) {
        console.log("k", k);
    }
    for (let v of m.values()) {
        console.log("v", v);
    }

    console.log("for each");
    m.forEach((k, v) => console.log(k, v))

    for (const [key, value] of m) {
        console.log(key, value);
    }
}
// testMap()


/**
 * 这里有坑呀，[]和Array用法一样
 * 但是map和{}可不一样哦，难道是为了方便迭代？map的数据堵在[[entries]]中
 */
function testMap2() {
    let map = new Map()
    map.a = "a"
    console.log(map.get("a"));

    map.set("b", "b")
    console.log(map.b);
    console.log(map.get("b"));
}
testMap2()

// 3 list
function testList() {
    // 0. 创建
    var mycars = new Array();

    // 1. 新增
    mycars[0] = "Saab";
    mycars[1] = "Volvo";
    mycars[2] = "BMW";
    console.log("新增", mycars);

    // 2. 删
    // mycars.delete(1)  // 报错
    mycars.splice(1, 1)
    console.log("删除", mycars);

    // 3. 查
    console.log(mycars.includes("BMW"));

    // 4. 改
    mycars[0] = "TSL"
    
    // 5. 循环， 那可太多了
    // 5.1 数组特有的
    console.log("5. 循环");
    mycars.map(item => console.log(item))
    // filter some foreach 

    for (let i in mycars) {
        console.log("in", i);
    }

    for (let i of mycars) {
        console.log("of", i);
    }
}
// testList()

// 4. Array静态方法
/**
 * Array.from() 将类数组对象/迭代对象转为数组
   用于将两类对象转为真正的数组：类似数组的对象（array-like object）
   和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。

   Array.of()：将传入的参数初始化数组，对构造函数new Array()的一个补充

 */
function testArray() {
    // 1. Array.from()
    // 1.1 类似数组的对象
    let arrayLike = {
        '0': 'a',
        '1': 'b',
        '2': 'c',
        length: 3
    };
    
    // ES5的写法
    var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']
    // ES6的写法
    let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
    console.log(arr1);
    console.log(arr2);

    // 1.2 可遍历（iterable）的对象
    console.log(Array.from('hello'));
    let namesSet = new Set(['a', 'b'])
    console.log(Array.from(namesSet));


    // 2. Array.of
    // Array.of基本上可以用来替代Array()或new Array()，
    // Array方法没有参数、一个参数、三个参数时，返回结果都不一样。
    // 只有当参数个数不少于 2 个时，Array()才会返回由参数组成的新数组。
    // 参数个数只有一个时，实际上是指定数组的长度。
    console.log(Array()) // []
    console.log(Array(3)) // [, , ,]
    console.log(Array(3, 11, 8)) // [3, 11, 8]
    
    // Array.of总是返回参数值组成的数组。如果没有参数，就返回一个空数组。
    console.log(Array.of()) // []
    console.log(Array.of(3)) // [3]
    console.log(Array.of(3, 11, 8)) // [3, 11, 8]
}
// testArray()