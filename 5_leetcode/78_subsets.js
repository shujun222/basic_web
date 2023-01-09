/**
 * 78. 子集
 * https://leetcode.cn/problems/subsets/
 * 2023/1/8
 * 
 */

// 1. 递归1, 两次dfs: 取或者不取
var subsets = function(nums) {
    let ans = []

    function dfs(index, tempList) {
        if (index === nums.length) {
            ans.push(tempList)
            return
        }

        // for (let i = index; i < nums.length; i++) {
            dfs(index + 1, tempList)
            dfs(index + 1, [...tempList, nums[index]])
        // }
    }

    dfs(0, [])
    return ans
}; 

// 2. for循环递归
var subsets = function(nums) {
    let ans = []

    function dfs(index, tempList) {
        ans.push(tempList)

        for (let i = index; i < nums.length; i++) {i
            dfs(i + 1, [...tempList, nums[i]])
        }
    }

    dfs(0, [])
    return ans
};