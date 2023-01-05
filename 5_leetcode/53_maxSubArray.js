/**
 * 53. 最大子数组和
 * https://leetcode.cn/problems/maximum-subarray/
 * 2023/1/5
 */

var maxSubArray = function(nums) {
    let ans = nums[0];
    // 以i为结尾最大的数, 这是动态规划？
    for (let i = 1; i < nums.length; i++) {
        if (nums[i - 1] > 0) {
            nums[i] += nums[i - 1] 
        }
        ans = Math.max(ans, nums[i])
    }
    return ans
};

console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]) == 6);