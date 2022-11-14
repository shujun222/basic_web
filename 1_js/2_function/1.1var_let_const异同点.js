/**
https://blog.csdn.net/qq_65552364/article/details/124931254

1. 相同点：
   都可以申明任何数据类型，js是弱语言类型，只能用它们三申明
2. 不同点
   a. var函数作用域，let,const块级作用域
   b. var存在变量提升, 而let与const不存在变量提升
   c. var定义的变量可以在一个块内声明多次，let、const不可
   d. 非严格模式下也可对变量直接赋值，默认是var
   e. const是常量，不可修改
      a = 3;  ===  var a = 3

    汇总：var设计的不严谨，多人合作项目中容易出问题，所有推出let、const修复
 * 
 */

// 不同点
