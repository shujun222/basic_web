/**
 * 106. 从中序与后序遍历序列构造二叉树
 * https://leetcode.cn/problems/construct-binary-tree-from-inorder-and-postorder-traversal/
 * 
 * 2023/1/11
 */

//1. 最推崇的，简单做法
var buildTree = function(inorder, postorder) {
    if (postorder.length === 0) return null;

    let root = new TreeNode(postorder.at(-1))
    let rootIndex = inorder.indexOf(postorder.at(-1))
    // let leftTreeSize = rootIndex

    root.left = buildTree(inorder.slice(0, rootIndex), postorder.slice(0, rootIndex))
    root.right = buildTree(inorder.slice(rootIndex + 1), postorder.slice(rootIndex, postorder.length - 1))

    return root
};

//2. 改进递归
var buildTree = function(inorder, postorder) {
    // 1. 构造map代替indexOf
    let inMap = {}
    for (let i = 0; i < inorder.length; i++) {
        inMap[inorder[i]] = i
    }

    // 2. 依旧递归
    function helper(inStart, inEnd, postStart, postEnd) {
        if (inStart > inEnd) return null;

        let root = new TreeNode(postorder[postEnd])
        let rootIndex = inMap[postorder[postEnd]]
        let leftTreeSize = rootIndex - inStart
        root.left = helper(inStart, rootIndex - 1, postStart, postStart + leftTreeSize - 1)
        root.right = helper(rootIndex + 1, inEnd, postStart + leftTreeSize, postEnd - 1)

        return root;
    } 

    return helper(0, inorder.length - 1, 0, postorder.length - 1)
};

//3. 迭代
var buildTree = function (inorder, postorder) {
    let root = new TreeNode(postorder.at(-1))
    // 1. 栈保存一路往右的节点
    let stack = [root]
    // 2. 当前遍历节点往左能达到的最终节点
    let nodeIndex = inorder.length - 1

    for (let i = postorder.length - 2; i >= 0; i--) {
        let postVal = postorder[i]
        let node = stack.at(-1)
        if (node.val != inorder[nodeIndex]) {
            node.right = new TreeNode(postVal)
            stack.push(node.right)
        } else {
            while (stack.length > 0 && stack.at(-1).val === inorder[nodeIndex]) {
                node = stack.pop()
                nodeIndex--
            }
            node.left = new TreeNode(postVal)
            stack.push(node.left)
        }
    }
}
