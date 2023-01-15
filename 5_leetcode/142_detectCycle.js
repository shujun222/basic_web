/**
 * 142. 环形链表 II
 * https://leetcode.cn/problems/linked-list-cycle-ii/
 * 2023/1/13 
 */

var detectCycle = function(head) {
    let visitedSet = new Set()

    while (head) {
        if (visitedSet.has(head)) {
            return head
        }
        visitedSet.add(head)
        head = head.next
    }
    
    return null
};

// 2. 即便理解了原理，我也写不出程序，这代码还得多练，牛
var detectCycle = function(head) {
    let slow = head, fast = head;
    while (fast) {
        slow = slow.next
        fast = fast.next
        if (fast) {
            fast = fast.next
            if (slow === fast) {
                break
            }
        }
    }

    // 有环
    if (fast) {
        let pre = head;
        while(pre != slow) {
            pre = pre.next
            slow = slow.next
        }
        return pre
    } 

    // 五环
    return null
};

