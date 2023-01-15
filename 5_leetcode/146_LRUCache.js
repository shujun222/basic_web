/**
 * 146. LRU 缓存
 * https://leetcode.cn/problems/lru-cache/
 * 
 * 2023/1/13
 */

/**
 * @param {number} capacity
 */
/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
    this.capacity = capacity; // 容量
    this.map = new Map() // key, value存储
    this.head = new Node("head", 0); // 双向链表的头部
    // 难点1: 单链表的插入操作得维护一个空节点；双链表的操作得维护两个空节点
    this.tail = new Node("tail", 0); // 刚用的、新的都放在尾巴上
    this.head.next = this.tail
    this.tail.prev = this.head
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
    // 1. 先获得节点
    let node = this.map.get(key)

    if (node) {
        // 2. 使用了，放到队尾去
        this.moveNodeToTail(node)
        // 3. 返回值
        return node.val
    }

    return -1
};


/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
    // 1. 命中
    if (this.map.has(key)) {
        let node = this.map.get(key)
        node.val = value;
        this.moveNodeToTail(node)
    } else {
        // 2. 新增的key呀
        let node = new Node(key, value)
        this.map.set(key, node)
        // 尾部插入
        this.addTail(node)

        // 满了
        if (this.map.size > this.capacity) {
            let first = this.head.next
            deleteNode(first)
            this.map.delete(first.key)
        }   
    }
};

function Node(key, val) {
    this.key = key;
    this.val = val;
    this.prev = null;
    this.next = null;
}

// 难点2：为了函数内获取到this, 得this.addTail, 函数还得定义在原型链上
LRUCache.prototype.addTail = function (node) {
    this.tail.prev.next = node;
    node.prev = this.tail.prev;

    node.next = this.tail
    this.tail.prev = node
}

LRUCache.prototype.moveNodeToTail = function (node) {
    if (node.next != this.tail) {
        deleteNode(node)
        this.addTail(node)
    }
}

function deleteNode(node) {
    node.prev.next = node.next
    node.next.prev = node.prev
}


var obj = new LRUCache(2)
obj.put(1, 1)
obj.put(2, 2)
console.log(obj.get(1));






