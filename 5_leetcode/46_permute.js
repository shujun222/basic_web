/**
 * 46. 全排列
 * https://leetcode.cn/problems/permutations/
 * 2023/1/3
 * 
 */


var permute = function(nums) {
    let res = []
    function dfs(nextNums, tempList) {
        if (tempList.length === nums.length) {
            res.push(tempList)
            return
        }

        for (let i = 0; i<nextNums.length; i++) {
            let temp = [...nextNums]
            let ele = temp.splice(i, 1)
            dfs(temp, [...tempList, ...ele])
        }
    }

    dfs(nums, [])
    return res;
};

var permute = function(nums) {
    let res = [], visited = new Array(nums.length).fill(0)
    function dfs(tempList) {
        if (tempList.length === nums.length) {
            res.push(tempList)
        }

        for (let i = 0; i<nums.length; i++) {
           if (visited[i] === 1) {
               continue;
           }

           visited[i] = 1
           dfs([...tempList, nums[i]])
           visited[i] = 0
        }
    }
    
    dfs([])
    return res;
};

console.log(permute([1,2,3]));