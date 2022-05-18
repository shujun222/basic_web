/**
 * 古人云：“君子一诺千金”，这种“承诺将来会执行”的对象在JavaScript中称为Promise对象。
 * Author: shujun
 * Date: 2022-05-18
 * */

// 1. 修改上篇的例子，嵌套变链式
function testPromise() {
    const success = msg => console.log("success");
    const fail = msg => console.log("fail");

    function wait(time) {
        return new Promise((resolve, reject) => setTimeout(resolve, time));
    }

    console.log("1. start...");
    wait(3000).then(success).catch(fail)
    console.log("3. end...");
}

// testPromise()


// 2. 简洁版本Promise
function simplePromise() {
    console.log("1. start");

    // 里面的参数的都是function
    new Promise((resolve, reject) => {
        setTimeout(()=>{
            if (true) {
                resolve([1, 2, 3, 4])
                // return [1, 2, 3, 4]
            } else {
                reject(999)
            }
        }, 2000)
    })
    .then(data => {
        console.log("2 ", data); 
        return [2, 3]
    })
    .then(data => console.log("3 ", data))
    .catch(function(error){
        console.log("fail", error);
    })

    console.log("3. end");
}

simplePromise()
