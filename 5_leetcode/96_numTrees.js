/**
 * 96. 不同的二叉搜索树
 * https://leetcode.cn/problems/unique-binary-search-trees/
 * 2023/1/9
 */

// 1. 递归
var numTrees = function(n) {
    if (n === 0 || n === 1) return 1
    let count = 0
    for (let i = 1; i <= n; i++) {
        count += numTrees(i - 1) * numTrees(n - i)
    }
    return count
};

// 2. for循环改造递归
var numTrees = function(n) {
    let g = new Array(n + 1).fill(0)
    g[0] = g[1] = 1
    // g[n] = sum(g[i - 1] * g[n - i])(i: 2 -> n)
    for (let i = 2; i <= n; i++) {
        for (let j = 1; j <= i; j++) {
            g[i] += g[j - 1] * g[i - j]
        }
    }
    return g[n]
};

console.log(numTrees(3) == 5);