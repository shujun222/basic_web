/**
 * https://leetcode.cn/problems/letter-combinations-of-a-phone-number/
 * @param {string} digits
 * @return {string[]}
 * 
 * @Date 2022-12-29
 */


// 1. 递归
var letterCombinations1 = function (digits) {
    let res = []
    let phone_map = {
        "2": "abc", "3": "def",
        "4": "ghi", "5": "jkl", "6": "mno",
        "7": "pqrs", "8": "tuv", "9": "wxyz"
    }

    function dfs(i, str) {
        // 1. 递归终止条件 & 收集结果
        if (i == digits.length) {
            res.push(str)
            return
        }

        // 2. 单次执行
        let letters = phone_map[digits[i]]
        for (const letter of letters) {
            dfs(i + 1, str + letter)
        }
    }

    if (digits != "") {
        dfs(0, "")
    }

    return res;
};


// 2. 回溯比递归更节省空间
var letterCombinations2 = function (digits) {
    let res = [], path = [];
    let phone = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']


    function dfs(i) {
        // 1. 递归终止条件 & 收集结果
        if (i == digits.length) {
            res.push(path.join(""))
            return
        }

        // 2. 单次执行
        let letters = phone[digits[i]]
        for (const letter of letters) {
            path.push(letter)
            dfs(i + 1)
            path.pop(letter)
        }
    }

    if (digits != "") {
        dfs(0)
    }

    return res;
};


// 3. 队列
var letterCombinations = function (digits) {
    if (!digits) return [];

    let res = [''];
    let phone = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']

    for (const d of digits) {
        // 迭代每此res中的结果，拼接出新结果，重新push进入数组
        let len = res.length
        for (let i = 0; i < len; i++) {
            let str = res.shift()
            for (const letter of phone[d]) {
                res.push(str + letter)
            }
        }
    }

    return res;
};

console.log(letterCombinations("23").toString() ===
["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].toString());
