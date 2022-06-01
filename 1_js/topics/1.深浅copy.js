// a = [4, [1, 2]]
// b = []
// 深度copy一层
// Object.assign(b, a)
// b[0] = 5; b[1][0] = 0
// console.log(a, b);

a = [4, [1, 2]]
b = [...a]
b[0] = 5; b[1][0] = 0
console.log(a, b);

