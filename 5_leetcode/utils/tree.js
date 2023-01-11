
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

function createTree(values) {
    root = TreeNode(values[0])
    let queue = [root]
    i = 1
    // while (queue.length > 0) {
    //     let node = queue.pop()
    //     if (i < values.length) {
    //         node.left = 
    //     }
    // }

    return root
}
module.exports = {
    createTree, 
    TreeNode,
}