/**
 * JSON是JavaScript Object Notation的缩写，它是一种数据交换格式。
 * 
 * Author: shujun
 * Date: 2022-05-10
 */

// 1. 序列化
function test1() {
    var xiaoming = {
        name: '小明',
        age: 14,
        gender: true,
        height: 1.65,
        grade: null,
        'middle-school': '\"W3C\" Middle School',
        skills: ['JavaScript', 'Java', 'Python', 'Lisp']

        // 还能还javaBean一样，有toJson方法
        // ,toJSON: function () {
        //     return { // 只输出name和age，并且改变了key：
        //         'Name': this.name,
        //         'Age': this.age
        //     };
        // }
    };
    
    // 我去，竟然还能这么玩：过滤的key值，缩进
    let a = JSON.stringify(xiaoming, ["name", "skills"], " ")
    console.log(a);

    // 2. 还可以传入一个函数，这样对象的每个键值对都会被函数先处理：
    a = JSON.stringify(xiaoming, (key, value) => typeof value === 'string' ? value.toUpperCase() : value, " ")
    console.log(a);
}
// test1()


// 2. 反序列化
function test2(){
    // JSON.parse()还可以接收一个函数，用来转换解析出的属性：
    var obj = JSON.parse('{"name":"小明","age":14}', function (key, value) {
        if (key === 'name') {
            return value + '同学';
        }
        return value;
    });
    console.log(JSON.stringify(obj)); // {name: '小明同学', age: 14}

}
test2()