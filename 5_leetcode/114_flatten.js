/**
 * 114. 二叉树展开为链表
 * https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/
 * 
 * 2023/1/11
 */

// 1. 先先序遍历一遍，把结果存在list；再遍历list
var flatten = function(root) {
    // 1. 记录先序遍历的顺序
    let order = []
    function visit(node) {
        if (!node) return;
        order.push(node)
        visit(node.left)
        visit(node.right)
    }

    // 2. 进行先序遍历，结果记录在order
    visit(root)

    // 3. 遍历ordfer
    for (let i = 0; i < order.length - 1; i++) {
        order[i].left = null
        order[i].right = order[i+1]
    }
};

// 2. 官方非要秀一把迭代，即便空间复杂度也是o(n), 但是确实只遍历了一遍
var flatten = function(root) {
    if (!root) return
    
    // 把当前节点的右、左依次存下来
    let stack = [root]
    let current;
    let prev; // 结果树上的最后节点
    while (stack.length) {
        current = stack.pop()
        if (prev) {
            prev.left = null;
            prev.right = current
        }

        current.right && stack.push(current.right)
        current.left && stack.push(current.left)
        prev = current
    }
};

// 3. o(1)的空间复杂度原地旋转，感觉没有啥算法，完全靠编码能力
var flatten = function(root) {
    // 1. 当前遍历节点
    let current = root;
    while (current) {
        if (current.left) {
            // 2. 一路往右走到黑的, 它的右边接纳current.right, 所以需要它
            let predecessor = current.left;
            while (predecessor.right) {
                predecessor = predecessor.right
            }

            predecessor.right = current.right
            current.right = current.left
            current.left = null
        }

        current = current.right
    }
    
};

