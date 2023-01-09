/**
 * 98. 验证二叉搜索树
 * https://leetcode.cn/problems/validate-binary-search-tree/
 * 
 * 2023/1/9
 */

/**
 * [5,4,6,null,null,3,7]这个例子不了，
 * val < node.right, 而且得小于整颗right树
 */
var isValidBST0 = function(root) {

    let currentValid = true
    let leftValid = rightValid = true
    if (root.left) {
        if (root.left.val >= root.val) {
            currentValid = false
        }
        leftValid = isValidBST(root.left)
    }

    if (root.right) {
        if (root.right.val <= root.val) {
            currentValid = false
        }
        rightValid = isValidBST(root.right)
    }

    return currentValid && leftValid && rightValid
};


/**
 * 从下往上汇聚最大值、最小值还是很难的，函数return多个值了，多个值不如从参数往下传
 */
var isValidBST1 = function(root) {
    // 
    function helper(node) {
        if (node.left && node.left >= node.val) {
            return false
        }
        // 返回子树[flag, 最小值，最大值]
        return [true, lower, upper]
    }   
};

// 递归 抄的答案
var isValidBST = function(root) {
    function helper(node, lower, upper) {
        if (!node) return true;
        if (node.val <= lower || node.val >= upper) {
            return false
        }

        return helper(node.left, lower, node.val) && helper(node.right, node.val, upper)
    }

    return helper(root, -Infinity, Infinity)
};

// 中序遍历
var isValidBST = function(root) {
    function visit(node) {
        if (!node || !valid) return;
        
        visit(node.left)
        if (node.val <= lastValue) {
            valid = false;
        } 
        lastValue = node.val
        visit(node.right)
    }

    let valid = true, lastValue = -Infinity
    visit(root)
    return valid;
};