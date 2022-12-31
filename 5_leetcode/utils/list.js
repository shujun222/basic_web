// Definition for singly-linked list.
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

function initList(list) {
    let head = p = new ListNode
    for (const n of list) {
        p.next = new ListNode(n)
        p = p.next
    }
    return head.next
}

function visitList(head) {
    let result = []
    while (head) {
        result.push(head.val)
        head = head.next
    }
    return result
}

// 这样是错误的, 真有意思
// exports = {
//     ListNode,
//     initList,
//     visitList
// }

// 这样是对的
// exports.ListNode = ListNode
// exports.initList = initList
// exports.visitList = visitList

module.exports = {
    ListNode,
    initList,
    visitList
}

// console.log("module.exports", module.exports);
// console.log("exports", exports);
// console.log(exports == module.exports);


