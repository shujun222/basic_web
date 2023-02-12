/**
 * 179. 最大数
 * https://leetcode.cn/problems/largest-number/
 * 
 * 2022/12 字节海外电商笔试题
 */

// 最大数
// let array = [10, 2]  "210"
// let array2 = [3, 30, 5, 9, 43]  "9543330" 

function transfer(nums) {
    // nums.sort((a, b) => {
    //     if (String(a) + String(b) > String(b) + String(a) ) {
    //         return -1
    //     } else {
    //         return 1
    //     }
    // })

    nums.sort((a, b) => (b + "" + a) - (a + "" + b))
    return nums.join("")
}



// console.log(transfer([10, 2]));
// console.log(transfer([3, 30, 5, 9, 43]));

console.log("10" - "2");
