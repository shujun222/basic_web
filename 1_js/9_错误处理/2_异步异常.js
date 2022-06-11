/**
 * 异步异常捕获
 * 
 * shujun 2022-06-09
 */

/**
 * try...catch... 捕获不了异步函数中的异常的
 * JavaScript引擎是一个事件驱动的执行引擎，代码总是以单线程执行，
 * 而回调函数的执行需要等到下一个满足条件的事件出现后，才会被执行，等那时候，黄花菜都凉了
 * try-catch代码都执行完成了
 */
const test1 = ()=> {
    function printTime() {
        throw new Error("I am sbjun");
    }
    
    try {
        setTimeout(printTime, 1000);

        console.log('done');
        // 只有主线的这些同步代码才能try-catch;
        // throw new Error("hahaha")
    } catch (e) {
        console.log('error', e);
    }
}

test1();

