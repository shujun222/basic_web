//1. slice vs 直接修改
let array = [0, 1, 2, 3, 4];
console.log(array.slice(1));  //一个参数 = slice(1, N)  [1, 2, 3, 4]
console.log(array.slice(0, 2)); //带头不带尾  [0, 1]

//2. push vs contact
array = [1, 2, 3, 4, 5];
array.push(6);        //一个参数
console.log(array);   //[1, 2, 3, 4, 5, 6]

array.push(6, 7);      //两个参数
console.log(array);   //[1, 2, 3, 4, 5, 6, 7]

array.push([6, 7]);    //参数为数组
console.log(array);   //[1, 2, 3, 4, 5, 6, Array(2)]


/*concat()方法*/
array = [1, 2, 3, 4, 5];

console.log(array);   //[1, 2, 3, 4, 5]

var array2 = array.concat(6);    //一个参数
console.log(array);    //[1, 2, 3, 4, 5]
console.log(array2);   //[1, 2, 3, 4, 5, 6]

array2 = array.concat(6, 7);    //两个参数
console.log(array);    //[1, 2, 3, 4, 5]
console.log(array2);   //[1, 2, 3, 4, 5, 6，7]

array2 = array.concat([6, 7]);    //参数为数组
console.log(array);    //[1, 2, 3, 4, 5]
console.log(array2);   //[1, 2, 3, 4, 5, 6, 7]

    // 1. push 改变了原来对象，contact有点类似上面的slice，复制一个新的对象，在新对象上修改；
    // 2. push多个参数，不会展开的，contact会自动展开

