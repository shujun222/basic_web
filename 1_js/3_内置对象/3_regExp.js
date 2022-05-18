/***
 * 正则表达式是一种用来匹配字符串的强有力的武器。
 * 它的设计思想是用一种描述性的语言来给字符串定义一个规则，凡是符合规则的字符串，我们就认为它“匹配”了，否则，该字符串就是不合法的。
 * 
 * Author: shujun
 * Date: 2022-5-9
 * 
 */

// 1. 创建正则方式1：双斜杠创建；var re1 = /ABC\-001/;
function test1() {
    // 1. 匹配
    var re = /\d{3}\-\d{3,8}$/;
    console.log(re.test('010-12345')); // true
    // test类似于search的感觉，只要能找到就返回true; 如果要全瓷，得 /^ ... $/
    console.log(re.test('0010-12345')); // true; 
    console.log(re.test('010-1234x')); // false
    console.log(re.test('010 12345')); // false

    // 2. 切割字符串，原来正则可以去空格，干的漂亮呀
    // console.log('a b   c'.split(' ')); // [ 'a', 'b', '', '', 'c' ]
    // console.log('a b   c'.split(/\s+/)); // [ 'a', 'b', 'c' ]

    // console.log('a, b,  c'.split(',')); // [ 'a', ' b', '  c' ]
    // console.log('a, b,  c'.split(/[\s,]/)); // [ 'a', '', 'b', '', '', 'c' ]
    // console.log('a, b,  c'.split(/[\s,]+/)); // [ 'a', 'b', 'c' ]

    // console.log('a, b,  c; d, f'.split(/[\s,;]+/)); // [ 'a', 'b', 'c' ]

    // 3. 分组功能
    var re = /(\d{3})-(\d{3,8})/;
    console.log(re.exec('010-12345')); // ['010-12345', '010', '12345']
    console.log(re.exec('010 12345')); // null

    // 4. 默认贪婪匹配
    var re = /^(\d+)(0*)$/;
    re.exec('102300'); // ['102300', '102300', '']

    var re = /^(\d+?)(0*)$/;
    re.exec('102300'); // ['102300', '1023', '00']

    // 5. 匹配规则 //g：全局；//i: 忽略大小写


}
test1();

// 方式二：new RegExp('test', 'g');
let reg = new RegExp('\\w+@\\w+.com');
console.log(reg.test("shujun@lu.com"))