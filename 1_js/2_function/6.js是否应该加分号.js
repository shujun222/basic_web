// 这是个有趣的问题，哈哈

/**
 * 
遇到换行时就会自动换行，
除非与下一句开头连起来不符合语法，那就不加分号，
如果一直加不上分号，就报错了

尤雨溪曾经在知乎说：真正会导致上下行解析出问题的 token 有 5 个：
括号，方括号，正则开头的斜杠，加号，减号。其实还有个反义号：
我还从没见过实际代码中用正则、加号、减号作为行首的情况，所以总结下来就是一句话：
一行开头是括号或者方括号的时候加上分号就可以了，其他时候全部不需要。
哦当然再加个反引号。

 */


// 不加分号需要注意的几个情况, 会被解析成不加入分号也是符合语法的
// 1. 以括号开头的
function test1() {

    (function (a) {
        console.log(a);
    })()/*这里没有被自动插入分号*/
        (function (a) {
            console.log(a);
        })()
}
// test1()

function test2() {
    var a = [["a", "b", "c", "d"]]/*这里没有被自动插入分号*/
    [3, 2, 1, 0].forEach(e => console.log(e))
}
test2()

function test3(){
    // 会报错: Cannot access 't' before initialization
    let t = 2
    `${t}ss`
}
test3()
