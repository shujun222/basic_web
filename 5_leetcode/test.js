/**
 * 
 */

// 最大数
// let array = [10, 2]  "210"
// let array2 = [3, 30, 5, 9, 43]  "9543330" 

function transfer(nums) {
    nums.sort((a, b) => {
        if (String(a) + String(b) > String(b) + String(a) ) {
            return -1
        } else {
            return 1
        }

    })
    return nums.join("")
}

console.log(transfer([10, 2]));
console.log(transfer([3, 30, 5, 9, 43]));