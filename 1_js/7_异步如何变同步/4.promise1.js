// 微任务优先于红任务
function test1() {
    setTimeout(() => console.log("d"), 0)

    var r = new Promise(function (resolve, reject) {
        resolve()
    });

    r.then(() => {
        var begin = Date.now();
        while (Date.now() - begin < 5000);
        console.log("c1")
        new Promise(function (resolve, reject) {
            // setTimeout(resolve, 2000)
            resolve()
        }).then(() => console.log("c2"))
    });
}

// test1() // c1 c2 d

/**
 * 1. 我们分析有多少个宏任务；
 * 2. 在每个宏任务中，分析有多少个微任务；
 * 3. 根据调用次序，确定宏任务中的微任务执行次序；
 * 4. 根据宏任务的触发规则和调用次序，确定宏任务的执行次序；
 */


function test2() {
    function sleep(duration) {
        return new Promise(function (resolve, reject) {
            console.log("b");
            setTimeout(resolve, duration);
        })
    }
    console.log("a");
    sleep(5000).then(() => console.log("c"));
    console.log("d");

    // 可以用await来改进Promise
    async function foo() {
        console.log("a2")
        await sleep(2000)
        console.log("b2")
    }
    foo()
}

// test2();

// 这个老外讲的比winter好
// https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/?utm_source=html5weekly&utm_medium=email

function test3() {
    console.log('script start');

    setTimeout(function () {
        console.log('setTimeout 1s');
    }, 1000);

    setTimeout(function () {
        console.log('setTimeout 0s');
    }, 0);

    Promise.resolve()
    // new Promise(resolve => {
    //     console.log(666);
    //     setTimeout(resolve, 500)
    // })
        .then(function () {
            console.log('promise1');
        })
        .then(function () {
            console.log('promise2');
        });

    console.log('script end');
}

test3()
