/**
 * 
 * 剑指 Offer 38. 字符串的排列
 * https://leetcode.cn/problems/zi-fu-chuan-de-pai-lie-lcof/
 * 2023/1/5
 * 
 * @param {string} s
 * @return {string[]}
 */
var permutation = function(s) {
    let sList = s.split("").sort()

    let ans = []
    let visited = new Array(s.length).fill(false)
    let temp = []

    function dfs() {
        if (temp.length === s.length) {
            ans.push(temp.join(""))
            return
        }

        for (let i = 0; i < sList.length; i++) {
            if (visited[i] || 
                 (i > 0 && sList[i] === sList[i - 1] && !visited[i-1])) {
                continue;
            }

            visited[i] = true
            temp.push(sList[i])
            dfs()
            temp.pop()
            visited[i] = false
        }
    }
    
    dfs()
    return ans
};