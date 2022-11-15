function test1() {
    var length = 10;
    function t1() {
        console.log("this.length", this.length);
    }
    var obj = {
        length: 100,
        action: function (fn) {
            fn()
            console.log("arguments", arguments);
            arguments[0]()
        }
    }

    obj.action(t1, 1, [2, 3], 4)
}
// test1();

var a = 1
function test2() {
    var a = 10
    function t1() {
        console.log(a);
        a = 100
        // console.log("this", this);
        // 在node里面没有，在浏览器里面是window.a, 即1
        console.log(this.a);
        var a;
        console.log(a);
    }

    t1()
}
// test2()


var a = 10
function test3() {
    var b = 2 * a
    var a = 20
    var c = a + 1
    console.log(b);
    console.log(c);
}
test3();

