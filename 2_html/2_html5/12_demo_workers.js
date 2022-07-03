var i = 0;

// 方法一：递归
// function timedCount() {
//     i = i + 1;
//     // 重要的部分, 用于向 HTML 页面传回一段消息
//     postMessage(i);
//     this.timer = setTimeout("timedCount()", 1000);
//     // 这是在不断新建的
//     console.log("this.timer", timer);
// }

// timedCount();


// 方法二：
this.timer = setInterval(_ => {
    i += 1
    postMessage(i)
    // 只有一个的
    console.log("this.timer", timer);
}, 1000)




