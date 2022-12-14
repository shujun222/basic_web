/**
 * https://leetcode.cn/problems/longest-substring-without-repeating-characters/
 * 2022-12-5 拼多多面试
 * 
 * 3. 无重复字符的最长子串
       给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
 */

//1. 暴力破解，枚举所有字符串
var lengthOfLongestSubstring1 = function (s) {
    let maxLength = 0
    for (let i = 0; i < s.length; i++) {
        let end = i;
        let exited = new Set()
        while (end < s.length && !exited.has(s[end])) {
            exited.add(s[end])
            end++
        }
        maxLength = Math.max(maxLength, end - i)
    }
    console.log("maxLength", maxLength);
    return maxLength
};


// 2. 滑动窗口
// 如果碰到重复字符，a直接跳跃到重复位置开始计数，pwwkewa有错: wke -> wa, 这样会漏掉kewa
var lengthOfLongestSubstring = function (s) {
    let maxLength = 0
    let start = end = 0
    windowSet = new Set()
    while (end < s.length) {
        if (!windowSet.has(s[end])) {
            windowSet.add(s[end])
            end++
        } else {
            // maxLength = Math.max(maxLength, end - start)
            windowSet.delete(s[start])
            start++
        }
        maxLength = Math.max(maxLength, end - start)
    }
    console.log("maxLength", maxLength);
    return maxLength
};

console.log(lengthOfLongestSubstring("abcabcbb") === 3);
console.log(lengthOfLongestSubstring("bbbbb") === 1);
console.log(lengthOfLongestSubstring("pwwkew") === 3);
console.log(lengthOfLongestSubstring(" ") === 1);
console.log(lengthOfLongestSubstring("b") === 1);
console.log(lengthOfLongestSubstring("") === 0);