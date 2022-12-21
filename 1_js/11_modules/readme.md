https://www.bilibili.com/video/BV1RP411u7m1

# 0. 原始加载方式有局限性：
1. 为了保证运行时变量都有，设计为了上一个script阻塞下一个的加载
2. 需要注意加载顺序

# 1. commmonjs
为了将js引入后端，nodejs基于此实现模块化

# 2. requireJs
https://requirejs.org/
https://www.runoob.com/w3cnote/requirejs-tutorial-1.html
解决前端模块化问题

# 3. sealjs
https://www.zhihu.com/topic/19673599/hot
对requirejs进行了点优化
1. 更偏向于commonjs的语法，module.exports
2. requirejs是把依赖一下引入，再执行，require
   require(["jquery", "xx", "x1", "x2"], fn(){...})
   sealJs则是什么时候用，就什么时候再引入

# 4. es6模块化
1. 前端引入：<script type="module"></script>
   貌似是异步的，不阻塞dom渲染
2. 后端引入：
   a. package.json  type: module
   b. js -> mjs后缀
   b. package.json  引入babel
3. 疑问：这些异步调用怎么控制的呢？
   

 