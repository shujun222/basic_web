/**
112. 路径总和
给你二叉树的根节点 root 和一个表示目标和的整数 targetSum 。判断该树中是否存在 根节点到叶子节点 的路径，这条路径上所有节点值相加等于目标和 targetSum 。如果存在，返回 true ；否则，返回 false 。
叶子节点 是指没有子节点的节点。

https://leetcode.cn/problems/path-sum/
 */




/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
    function dfs(node, sum) {
        if (!node || find) {
            return
        }

        sum += node.val
        if (!node.left && !node.right && targetSum === sum) {
            flag = true
        }

        dfs(node.left, sum)
        dfs(node.right, sum)
    }

    let find = false
    dfs(root, 0)
    return find
};

console.log(hasPathSum());