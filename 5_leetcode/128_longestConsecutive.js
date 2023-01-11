/**
 * 128. 最长连续序列
 * https://leetcode.cn/problems/longest-consecutive-sequence/
 * 
 * 2023/1/11
 */

var longestConsecutive = function(nums) {
    let set = new Set(nums)
    let longest = 0;

    for (let n of nums) {
        if (set.has(n - 1)) continue;

        let count = 1;
        while (set.has(n + 1)) {
            count++
            n++
        }
        longest = Math.max(longest, count)
    }

    return longest
};