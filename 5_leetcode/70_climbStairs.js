/**
 * https://leetcode.cn/problems/climbing-stairs/
 * 70. 爬楼梯
 * 
 */

/**
 * 1. 递归
 * @param {number} n
 * @return {number}
 */
var climbStairs0 = function (n) {
    if (n === 1) return 1
    if (n == 2) return 2
    return climbStairs(n - 1) + climbStairs(n - 2)
};

// 2. 打印出所有跨法
var climbStairs2 = function (n) {
    let paths = []
    let count = 0
    function visit(i, path) {
        console.log(i);
        path.push(i)
        if (i === n || i === n - 1) {
            count++
            paths.push(path)
            return
        }

        visit(i + 1, [...path])
        visit(i + 2, [...path])
    }

    visit(0, [])
    console.log("count", count);
    console.log("paths", paths);
    return count
};

// 3. 类似fibnaci方法
var climbStairs = function (n) {
    let n1 = 0, n2 = 1, temp;

    for (let i = 0; i < n; i++) {
        // temp = n2
        // n2 = n1 + n2
        // n1 = temp
        [n2, n1] = [n1 + n2, n2]
    }

    return n2
}

console.log(climbStairs(2) === 2);
console.log(climbStairs(3) === 3);

