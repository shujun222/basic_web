var o = {
    a: 1,
    f() { console.log(this.a); },
    f2: () => 666
}
// 对象定义完了之后，还能继续添加属性，真是绝了哈, java就不能这么玩
o.b = 2
console.log(o.a, o.b);
// console.log(o.f);
// console.log(o.f2);
// console.log(o.f2());

//a和b皆为数据属性 
// {value: 1, writable: true, enumerable: true, configurable: true}
console.log(Object.getOwnPropertyDescriptor(o, "a"));
// {value: 2, writable: true, enumerable: true, configurable: true}
console.log(Object.getOwnPropertyDescriptor(o, "b"));



var o = { a: 1 };
Object.defineProperty(o, "b", {value: 2, writable: false, enumerable: false, configurable: true});
//a和b都是数据属性，但特征值变化了
Object.getOwnPropertyDescriptor(o,"a"); // {value: 1, writable: true, enumerable: true, configurable: true}
Object.getOwnPropertyDescriptor(o,"b"); // {value: 2, writable: false, enumerable: false, configurable: true}
o.b = 3;
console.log(o.b); // 2


// 其实属性默认对应的就是get方法呀
var o = { get a() { return 1 } };
console.log(o.a); // 1



