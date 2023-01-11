/**
 * 105. 从前序与中序遍历序列构造二叉树
 * https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
 * 2023/1/10
 * 
 * 拓展：
 * https://blog.csdn.net/destiny_balabala/article/details/99352715
 * 为什么前序、后序不能确定二叉树结构呢？
 * 1. 前序 1 2; 后续2 1
 *    根左右； 左右根; 没法判断2是左还是右
 * 2. 前序 123；后续：231；可以唯一确定
 * 3. 前序 123；后续：321；又没办法唯一确定了
 *    2和1之间如果有节点，那么它们必定是右节点，2必定是左节点，如果一路递归下去，都是这样的，那么就可以区分了；
 *    形象化：图中节点的度都是2和叶子节点，没有度为1的节点，那么单凭前序、后续就可以确定的
 * 
 */

/**
 * 1. 简洁递归
 * indexOf查找，会变成o(n^2)吗？
 * 搞个map优化
 * 
 * slice让计算位置简单太多了，但是空间复杂度是多少呢？非叶子简单x, o(2x), o(n)级别
 * 这种比较位置的，好像index比创建数据更节省空间
 */
let treeUtil = require("./utils/tree");
let TreeNode = treeUtil.TreeNode

// 1. 简单迭代
var buildTree0 = function (preorder, inorder) {
    if (preorder.length === 0) return null;

    let root = new TreeNode(preorder[0])
    let rootIndex = inorder.indexOf(preorder[0])

    root.left = buildTree(preorder.slice(1, rootIndex + 1), inorder.slice(0, rootIndex))
    root.right = buildTree(preorder.slice(rootIndex + 1), inorder.slice(rootIndex + 1))
    return root
};

// 2. 优化迭代
var buildTree1 = function(preorder, inorder) {
    // 1. 构建map，替代inorder.indexOf
    let inMap = {}
    for (let i = 0; i < inorder.length; i++) {
        inMap[inorder[i]] = i
    }

    function build(preStart, preEnd, inStart, inEnd) {
        if (preEnd === preStart) return null;
    
        let root = new TreeNode(preorder[preStart])
        let rootIndex = inMap[preorder[preStart]]

        let leftTreeSize = rootIndex - inStart
        root.left = build(preStart + 1, preStart + 1 + leftTreeSize, inStart, rootIndex)
        root.right = build(preStart + 1 + leftTreeSize, preEnd, rootIndex + 1, inEnd)
        return root 
    }
    
    return build(0, preorder.length, 0, inorder.length)
};

/**
 * 迭代做法，巧妙吗？没感觉，只感觉到了复杂，但是佩服佩服，这规律也能发现
 * 
 * 这样的写法有问题，写不下去了
 * 难道stack，queue的都默认初始化一个root节点进去？
 */
var buildTree3 = function(preorder, inorder) {
    // 栈保存一路向左的节点(没有处理过右节点的节点)
    let stack = []
    // 当前遍历的那个节点，往左能走到的最终位置
    let inorderIndex = 0
    let root;

    for (let preVal of preorder) {
        let node = new TreeNode(preVal)
        if (!root) {
            root = node;
        }

        if (preVal != inorder[inorderIndex]) {
            if (stack.length > 0) {
                stack.at(-1).left = node;
            }
            stack.push(node)
        } else {
            if (stack.length > 0) {
                stack[stack.length - 1].left = node;
            }

        }
    }

    return root;
}

var buildTree = function(preorder, inorder) {
    let root = new TreeNode(preorder[0]);

    // 栈保存一路向左的节点(没有处理过右节点的节点)
    let stack = [root]
    // 当前遍历的那个节点，往左能走到的最终位置
    let inorderIndex = 0
    
    for (let i = 1; i < preorder.length; i++) {
        let preVal = preorder[i]
        let node = stack.at(-1)

        if (node.val != inorder[inorderIndex]) {
            node.left = new TreeNode(preVal)
            stack.push(node.left)
        } else {
            // 得依次出栈了
            while (stack.length > 0 && stack.at(-1).val == inorder[inorderIndex]) {
                node = stack.pop()
                inorderIndex++
            }

            node.right = new TreeNode(preVal)
            stack.push(node.right)
        }
    }

    return root;
}

console.log(buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]));

// console.log(buildTree([3, 9, 8, 5, 4, 10, 20, 15, 7], [4, 5, 8, 10, 9, 3, 15, 20, 7]));

