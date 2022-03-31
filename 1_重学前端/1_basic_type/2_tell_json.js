// 2. 判断是否为json格式化数据
function testJson(str) {
    try {
        let jsonObj = JSON.parse(str);
        console.log("jsonObj tpyeof: ", typeof jsonObj);
        if ("string" === typeof str && "object" === typeof jsonObj) {
            return true;
        }
    } catch (error) {
        console.log(error);
    }
    return false;
}

console.log(testJson('{"a":1, "b":2}'));
console.log(testJson('[1, 2, 3]'));
console.log(testJson('[1, 2, 3],2'));
console.log(testJson(123));
console.log(testJson("123"));
console.log(testJson("null"));  //这里还是有bug，厉害，厉害
console.log(testJson(null));