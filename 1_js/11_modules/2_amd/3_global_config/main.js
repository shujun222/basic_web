/**
 * 上面的例子中重复出现了require.config配置，如果每个页面中都加入配置，必然显得十分不雅，
 * requirejs提供了一种叫"主数据"的功能，
 */
require.config({
    paths : {
        // 配置了data-main="./main"之后，网络请求就失效了？
        "jquery" : ["http://libs.baidu.com/jquery/2.0.3/jquery"],
        "a" : "./a"   
    }
})