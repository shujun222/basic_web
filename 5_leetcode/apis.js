//1. 字符串
function testStr() {
    let a = "abc"
    // 长度属性
    console.log(a.length);

    // 是否包含
    console.log(a.includes("a"));
    console.log(a.indexOf("a"));

    // 取字符
    console.log(a[0], a.charAt(0));

    // 截取字符串
    console.log(a.slice(1, 2), a);
    console.log(a.slice(1), a);
    console.log(a.substring(1, 2), a);
    console.log(a.substring(1), a);
    // 仅适合数组
    // console.log(a.splice(1), a);
}
// testStr()

// 2. js循环
// 1_js\2_function\4.3 array_cycle.js
function testCycle() {
    for (let a in "abc") {
        console.log(a);
    }

    for (let a of "abc") {
        console.log(a);
    }

    console.log("..... array ....");
    // for(let a in ["a", "b", "c"]) {
    //     console.log(a);
    // }

    // for(let a of ["a", "b", "c"]) {
    //     console.log(a);
    // }
}
// testCycle()


// 3. es6
// 1_js\topics\3_es6.js

