/**
 * 
 * 39. 组合总和
 * https://leetcode.cn/problems/combination-sum/
 * Date: 2023-1-1
 * 
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    let ans = []
    let path = []
    function dfs(i, sum) {
        if (sum >= target) {
            if (sum === target) {
                ans.push([...path])
            }
            return
        }

        for (let j = i; j < candidates.length; j++) {
            path.push(candidates[j])
            dfs(j, sum + candidates[j])
            path.pop()
        }
    }

    dfs(0, 0)

    return ans
};


var combinationSum2 = function(candidates, target) {
    let ans = []
    let path = []
    function dfs(i, sum) {
        if (i >= candidates.length || sum >= target) {
            if (sum === target) {
                ans.push([...path])
            }
            return
        }

        // 不选i
        dfs(i + 1, sum)

        // 一定选i
        path.push(candidates[i])
        dfs(i, sum + candidates[i])
        path.pop()


    }

    dfs(0, 0)

    return ans
};

// 不用回溯
var combinationSum3 = function(candidates, target) {
    let ans = []
    function dfs(i, sum, tempList) {
        if (i >= candidates.length || sum >= target) {
            if (sum === target) {
                ans.push(tempList)
            }
            return
        }

        // 不选i
        dfs(i + 1, sum, tempList)

        // 一定选i
        dfs(i, sum + candidates[i], [...tempList, candidates[i]])
    }

    dfs(0, 0, [])
    return ans
};
