/**
 * 102. 二叉树的层序遍历
 * https://leetcode.cn/problems/binary-tree-level-order-traversal/
 * 
 * 2023/1/10
 */

// 1. 队列
var levelOrder = function(root) {
    if (!root) return []
    
    let ans = []
    let queue = [root]
    
    while (queue.length > 0) {
        let len = queue.length
        let temp = []
        for (let i = 0; i < len; i++) {
            let node = queue.shift()
            temp.push(node.val)
            if (node.left) {
                queue.push(node.left)
            }
            if (node.right) {
                queue.push(node.right)
            }
        }
        ans.push(temp)
    }
    return ans;
};

// 2. 递归时传递level，太巧妙了
var levelOrder = function(root) {
    let ans = []
    function dfs(node, level) {
        if (!node) return;

        if (!ans[level]) {
            ans[level] = []
        } 
        ans[level].push(node.val)

        dfs(node.left, level + 1)
        dfs(node.right, level + 1)
    }

    dfs(root, 0)
    return ans;
};
