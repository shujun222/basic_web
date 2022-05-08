/**
 * 闭包（Closure): 相关参数和变量都保存在返回的函数中
 * 高阶函数参数可以为函数，同样函数的返回值也能为函数, 这种属于高阶函数吗？
 * 
 * 闭包就是能够读取其他函数内部变量的函数, 返回的那个子函数
   由于在Javascript语言中，只有函数内部的子函数才能读取局部变量，因此可以把闭包简单理解成"定义在一个函数内部的函数"。
   在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。
 * 
 * References: 
 * https://www.runoob.com/js/js-function-closures.html
 * https://www.liaoxuefeng.com/wiki/1022910821149312/1023021250770016
 * https://www.cnblogs.com/huanxiongs02/p/14698192.html
 * 
 * Author: shujun
 * Date: 2022-4-17
 */


/**
 * 1. 引子：计数器困境
设想下如果你想统计一些数值，且该计数器在所有函数中都是可用的。
你可以使用全局变量，函数设置计数器递增：
计数器数值在执行 add() 函数时发生变化。
但问题来了，页面上的任何脚本都能改变计数器，即便没有调用 add() 函数。

如果我在函数内声明计数器，如果没有调用函数将无法修改计数器的值：
 */
function counter() {
    function add() {
        var counter = 0;
        function plus() { return counter += 1; }
        return plus;
    }

    /**
     * 闭包是一种保护私有变量的机制，在函数执行时形成私有的作用域，保护里面的私有变量不受外界干扰。
       直观的说就是形成一个不销毁的栈环境
     */
    plus = add();
    // 1. 调用的时候再被执行，一开始只是返回了一个函数；2. 但是内部的counter不会被销毁，因为plus依赖于函数add
    plus()
    plus()
    console.log(plus()) // 3
}

// counter()

/**
 * 2. 闭包需要注意的地方
 */

// 2.1. 返回函数不要引用任何循环变量，或者后续会发生变化的变量
function question1() {
    function count() {
        var arr = [];
        for (var i = 1; i <= 3; i++) {
            arr.push(function () {
                return i * i;
            });
        }
        return arr;
    }

    // 如果非要使用局部变量呢？ “创建一个匿名函数并立刻执行”
    function count1() {
        var arr = [];
        for (var i = 1; i <= 3; i++) {
            arr.push((function (n) {
                return function () {
                    return n * n;
                }
            })(i));
        }
        return arr;
    }

    var results = count();
    var f1 = results[0];
    var f2 = results[1];
    var f3 = results[2];
    // 并不是期待的1 4 9; 因为f1只是返回了函数，只有f1()才会被执行, 此时i已经加到4了
    console.log(f1()); // 16
    console.log(f2()); // 16
    console.log(f3()); // 16
}

// question1()


/**
 * 2.2 内存泄露
 * 由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，
 * 否则会造成网页的性能问题，在IE中可能导致内存泄露。
 * 解决方法是，在退出函数之前，将不使用的局部变量全部删除？
 */
// 待续。。。
function question2() {
    //这段代码会导致内存泄露
    window.onload = function(){
        var el = document.getElementById("id");
        el.onclick = function(){
            alert(el.id);
        }
    }

//解决方法为
    window.onload = function(){
        var el = document.getElementById("id");
        var id = el.id; //解除循环引用
        el.onclick = function(){
            alert(id); 
        }
        el = null; // 将闭包引用的外部函数中活动对象清除
    }
}

// question2();


/**
 * 3. 闭包有非常强大的功能
 * 
 */
// 3.1 借助闭包，可以封装一个私有变量; 类似开头的计时器


/**
 * 闭包还可以把多参数的函数变成单参数的函数。
 * 例如，要计算xy可以用Math.pow(x, y)函数，不过考虑到经常计算x2或x3，
 * 我们可以利用闭包创建新的函数pow2和pow3：
 */
function minusParam() {
    function make_pow(n) {
        return function (x) {
            return Math.pow(x, n);
        }
    }

    // 创建两个新函数:
    var pow2 = make_pow(2);
    var pow3 = make_pow(3);

    console.log(pow2(5)); // 25
    console.log(pow3(7)); // 343
}

minusParam()