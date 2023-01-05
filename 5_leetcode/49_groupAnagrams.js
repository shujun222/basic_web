/**
 * 49. 字母异位词分组
 * https://leetcode.cn/problems/group-anagrams/
 * 
 */

var groupAnagrams1 = function(strs) {
    let lettersMap = {}
    for (let letter of strs) {
        let key = letter.split("").sort().join("")
        let values = lettersMap[key]
        if (!values) {
            values = []
            lettersMap[key] = values
        }
        values.push(letter)
    }
    return Object.values(lettersMap)
};

var groupAnagrams = function(strs) {
    let lettersMap = new Map()
    for (let letter of strs) {
        let key = letter.split("").sort().join("")
        let values = lettersMap.get(key)
        if (!values) {
            values = []
            // 这样写是错误的
            // lettersMap[key] = values
            lettersMap.set(key, values)
        }
        values.push(letter)
    }
    return Array.from(lettersMap.values())
};

console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));