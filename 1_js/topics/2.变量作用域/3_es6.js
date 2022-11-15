/**
 * 1. let const
 * 2. set map
 *  
 *
 */

// 1. set
var array = [1, 2, 3, 4, 4, 2, 3, 4, 5]
const set1 = new Set(array);
console.log(set1);
let array1 = [...set1]
console.log(array1);

// 2. map
const m = new Map()
m.set("a", 1)
m.set("b", 2)
m.set("c", 2)
for (const [key, value] of m) {
    console.log(key, value);
}