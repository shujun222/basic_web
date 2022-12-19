/**
 * 11. 盛最多水的容器
 * https://leetcode.cn/problems/container-with-most-water/
 */

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let left = 0, right = height.length - 1, areaResult = 0;
    while (left < right) {
        let area = Math.min(height[left], height[right]) * (right - left)
        areaResult = Math.max(areaResult, area)
        if (height[left] < height[right]) {
            left++
        } else {
            right--
        }
    }
    return areaResult
};

console.log(maxArea([1,8,6,2,5,4,8,3,7]) === 49);
console.log(maxArea([1,1]) === 1);