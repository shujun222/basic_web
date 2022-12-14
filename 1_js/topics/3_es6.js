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