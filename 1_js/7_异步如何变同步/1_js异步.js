// 1. 异步执行初体验
function simple() {
    // console.log("1. ...");
    // $.get(url,
    //     function (data) {
    //         console.log(data);
    //         console.log("222... 做些事情...");
    //     }
    // );
    // console.log("3. ...");


    console.log('before setTimeout()');
    // 2秒钟后调用callback函数, 类似一个远程接口卡了2s
    setTimeout(() => {
        console.log('Done');
    }, 2000);
    console.log('after setTimeout()');
}
// simple()


// 2. 回调地狱
function callHell() {
    // 这种嵌套式的回调就是个灾难
    // doSomething1((data)=>{
    //     doSomething2(()=>{
    //         doSomething3(()=>{
    //             doSomething4()
    //         });
    //     }, failureCallBack2);
    // }, failureCallBack1);

    // 优雅改写为
    doSomething1()
    .then(data => doSomething2())
    .then(data => doSomething3())
    .then(data => doSomething4())
    .catch(failureCallBack)
}

// 3. 异步例子
function testAsynchronous() {
    const success = msg => console.log("success");
    const fail = msg => console.log("fail");
    function wait(time, success, fail) {
        setTimeout(() => {
            if (false) {
                success()
            } else {
                fail()
            }
        }, time)
    }

    console.log("1. start...");
    wait(3000, success, fail)
    console.log("3. end...");
}
testAsynchronous()

