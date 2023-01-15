/**
 * 141. 环形链表
 * https://leetcode.cn/problems/linked-list-cycle/
 * 
 * 2023/1/13
 */

// 1. set求解
var hasCycle = function(head) {
    let visitedSet = new Set()
    while (head) {
        if (visitedSet.has(head)) {
            return true;
        }
        visitedSet.add(head)
        head = head.next
    }
    return false
};


// 2. 快慢指针
var hasCycle = function(head) {
    // 快慢指针写法就这么背吧
    let fast = head, slow = head;
    while (fast) {
        slow = slow.next
        fast = fast.next
        if (fast) {
            fast = fast.next
            if (fast === slow) {
                return true;
            }
        }
    }

    return false
};
