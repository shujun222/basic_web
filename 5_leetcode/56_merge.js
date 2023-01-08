/**
 * 56. 合并区间
 * https://leetcode.cn/problems/merge-intervals/
 * 
 * 2023/1/5
 */

// 1. 二维数组
var uniquePaths1 = function(m, n) {
    // 背包问题，一般来说得初始化多一行一列，但是几个特殊的题目也不用
    let paths = new Array(m).fill().map(p => new Array(n).fill(1))

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            // path[i][j] >= 1, 所以无所谓啦
            paths[i][j] = paths[i - 1][j] + paths[i][j - 1]
        }
    }
    return paths[m - 1][n - 1]
};

var uniquePaths = function(m, n) {
    // 一维数组
    let paths = new Array(n).fill(1)

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            paths[j] += paths[j - 1]
        }
    }
    return paths[n - 1]
};

console.log(merge([[1,3],[2,6],[8,10],[15,18]]));
