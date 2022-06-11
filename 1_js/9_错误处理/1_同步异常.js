/**
 * js错误处理和java一样
 * shujun 2022-06-09
 */

 var r1, r2, s = null;
 try {
    // 主动抛出错误，不叫Exception, 叫Error; 还是java的名字更好
    // if (isNaN("sj")) {
    //     throw new Error('输入错误');
    // }

     r1 = s.length; // 此处应产生错误
     r2 = 100; // 该语句不会执行
 } catch (e) {
     console.log('出错了：' + e);
 } finally {
     console.log('finally');
 }
 console.log('r1 = ' + r1); // r1应为undefined
 console.log('r2 = ' + r2); // r2应为undefined

