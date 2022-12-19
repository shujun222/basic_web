/**
 * 42. 接雨水
 * https://leetcode.cn/problems/trapping-rain-water/
 * Date: 2022-12-14
 */

var trap = function(height) {
    let sum = 0
    for (let i = 1; i< height.length - 1; i++) {
        let leftMax = Math.max(...height.slice(0, i + 1))
        let rightMax = Math.max(...height.slice(i))
        let area = Math.min(leftMax, rightMax) - height[i]
        sum += area
    }
    return sum
};

console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1]) === 6);
console.log(trap([4,2,0,3,2,5]) === 9);