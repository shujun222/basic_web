/**
300. 最长递增子序列
给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。
子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。
例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。

https://leetcode-cn.com/problems/longest-increasing-subsequence/

 */

var lengthOfLIS = function (nums) {
    let dp = []
    for (let i = 0; i < nums.length; i++) {
        dp[i] = 1
        for (let j = 0; j <= i; j++) {
            if (nums[i] > nums[j] && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1
            }
        }
    }
    // console.log(dp);
    return Math.max(...dp)
};

console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]) === 4);
console.log(lengthOfLIS([0, 1, 0, 3, 2, 3]) === 4);
console.log(lengthOfLIS([7, 7, 7, 7, 7, 7, 7]) === 1);