/**
 * 面试题45. 把数组排成最小的数
 * https://leetcode.cn/problems/ba-shu-zu-pai-cheng-zui-xiao-de-shu-lcof/
 * 
 * 2023/1/15
 */

/**
 * @param {number[]} nums
 * @return {string}
 */
var minNumber = function(nums) {
    nums.sort((a, b) => (a + "" + b) - (b + "" + a))

    return nums.join("")
};