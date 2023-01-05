/**
 * 55. 跳跃游戏
 * https://leetcode.cn/problems/jump-game/
 * 
 * 2023/1/5
 */

// 递归打印出所有路径
var canJump = function(nums) {
    let canReach = false
    function dfs(i, path) {
        if (i >= nums.length - 1) {
            if (i === nums.length - 1) {
                canReach = true
                console.log(path)
            }
            return
        }

        for (let step = 1; step <= nums[i]; step++) {
            dfs(i + step, [...path, i + step])
        }
    }

    dfs(0, [0])

    return canReach;
};

// 贪心算法
var canJump = function(nums) {
    let maxReach = 0
    for (let i = 0; i < nums.length; i++) {
        if (maxReach < i) continue;

        maxReach = Math.max(maxReach, i + nums[i])
        if (maxReach >= nums.length - 1) {
            return true
        }
    }

    return false;
};


console.log(canJump([2,3,1,1,4]));
