let listUtil = require("./utils/list")
let ListNode = listUtil.ListNode

/**
 * https://leetcode.cn/problems/add-two-numbers/
 * 
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    let head = p = new ListNode()

    let last = 0; // 上一个导致的十位 
    while (l1 && l2) {
        let sum = l1.val + l2.val + last
        p.next = new ListNode(sum % 10)
        p = p.next
        last = sum >= 10 ? 1 : 0
        l1 = l1.next
        l2 = l2.next
    }

    let rest = l1 ? l1 : l2
    while (rest) {
        let sum = rest.val + last
        p.next = new ListNode(sum % 10)
        p = p.next
        last = sum >= 10 ? 1 : 0
        rest = rest.next
    }

    //    最后还有点
    if (last == 1) {
        p.next = new ListNode(1)
    }

    return head.next

};

let l1 = [2,4,3], l2 = [5,6,4]
l1 = listUtil.initList(l1)
l2 = listUtil.initList(l2)
let r = addTwoNumbers(l1, l2)
console.log(listUtil.visitList(r).toString() == [ 7, 0, 8 ].join());