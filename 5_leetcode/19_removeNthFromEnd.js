/**
 * https://leetcode.cn/problems/remove-nth-node-from-end-of-list/
 * 19. 删除链表的倒数第 N 个结点
 * 
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */

let listUitl = require("./utils/list")
let ListNode = listUitl.ListNode

var removeNthFromEnd = function(head, n) {
    let empty = new ListNode(0, head)
    let p1 = p2 = empty;
    while (n > 0) {
        p2 = p2.next
        n--;
    }

    while(p2.next) {
        p1 = p1.next;
        p2 = p2.next;
    }

    p1.next = p1.next.next;
    return empty.next;
};

head = listUitl.initList([1,2,3,4,5])
res = removeNthFromEnd(head, 2)
console.log(listUitl.visitList(res).toString() == [1,2,3,5].toString());