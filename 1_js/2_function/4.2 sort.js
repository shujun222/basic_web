// 看上去正常的结果:
['Google', 'Apple', 'Microsoft'].sort(); // ['Apple', 'Google', 'Microsoft'];

// apple排在了最后:
console.log(['Google', 'apple', 'Microsoft'].sort()); // ['Google', 'Microsoft", 'apple']

// 无法理解的结果:
console.log([10, 20, 1, 2].sort()); // [1, 10, 2, 20]

// js的排序是按照字母顺序的，对数值排序就非常坑了
// 改进办法:好在sort是高阶函数，重写sort比较函数

var arr = [10, 20, 1, 2];
// arr.sort(function (x, y) {
//     if (x < y) {
//         return -1;
//     }
//     if (x > y) {
//         return 1;
//     }
//     return 0;
// });
arr.sort((x, y) => x - y)
console.log(arr); // [1, 2, 10, 20]
