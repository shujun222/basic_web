/**
 * 148. 排序链表
 * https://leetcode.cn/problems/sort-list/
 * 2023/1/13
 */

// 1. 冒泡排序 o(n^2)
var sortList = function(head) {
    // 1. 统计有多少个节点
    let n = 0;
    let p = head
    while (p) {
        n++
        p = p.next
    }

    let empty = new ListNode(0, head)
    // 2. 冒泡 n - 1 次
    while (n > 1) {
        let p = empty
        for (let i = 0; i < n - 1; i++) {
            let p1 = p.next;
            let p2 = p.next.next;
            if (p1.val > p2.val) {
                p.next = p2;
                p1.next = p2.next
                p2.next = p1;
            }
            p = p.next
        }
        n--
    }

    return empty.next
};

// 2. 从顶往下递归
var sortList = function(head) {
    function sortSub(head, tail) {
        // 专门对付测试数据: []
        if (!head) {
            return null
        }

        // 1. 递归终止条件
        if (head.next === tail) {
            head.next = null
            return head
        }

        // 2. 寻找中点
        // 递归里面千万不能这么定义， slow默认成var了
        // let fast = slow = head;
        // let fast = head;
        // let slow = head;
        let fast = head, slow = head; 
        while (fast != tail) {
            slow = slow.next;
            fast = fast.next;
            if (fast != tail) {
                fast = fast.next
            }
        }

        let left = sortSub(head, slow)
        let right = sortSub(slow, tail)
        return mergeSortedList(left, right)
    }

    return sortSub(head, null)
};


// 3. 从低往上递归
var sortList = function(head) {
    // 1. 获取总长度
    let length = 0;
    let p = head;
    while (p) {
        length++
        p = p.next
    }

    // 产生新链表时一般需要建个空的头节点
    let emptyNode = new ListNode()
    emptyNode.next = head
    let subLength = 1;
    // 合并完成
    while (subLength < length) {
        // 当前在merge的区间
        let current = emptyNode.next;
        // 当前merge区间的前一个，最后用来prev.next = merged
        let prev = emptyNode;
        
        // 对于一轮subLength合并, 合并一个区间，current往后再指向下一个区间
        while (current) {
            // 1. 搞定head1
            let head1 = current

            // 2. 搞定head2
            let head2 = getNextPoint(current, subLength)

            // 3. 搞定下一任继承者
            current = head2
            let successor = getNextPoint(current, subLength);
            
            // 3. head1、head2都是有序的，合并他们, 用prev把区间们连续起来
            let merged = mergeSortedList(head1, head2)
            prev.next = merged
            while (prev.next) {
                prev = prev.next
            }

            // 4. 下一个区间继续
            current = successor
        }
        subLength *= 2
    }

    return emptyNode.next
};

// 力扣第21题就是这个
function mergeSortedList(list1, list2) {
    let first = p = new ListNode()
    while (list1 && list2) {
        if (list1.val < list2.val) {
            p.next = list1
            list1 = list1.next
        } else {
            p.next = list2;
            list2 = list2.next
        }
        p = p.next
    }

    p.next = (list1 ? list1 : list2)
    return first.next
}
 
// 给h1断链，返回h2
function getNextPoint(current, subLength) {
    if (!current) return null;

    // 这也太难了吧，移动 subLength - 1 步
    for (let i = 0; i < subLength - 1; i++) {
        if (!current.next) {
            break
        }
        current = current.next
    }
    let head2 = current.next
    // head1指向的那链表末尾置为null
    current.next = null
    return head2;
}
