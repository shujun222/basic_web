/**
 * 139. 单词拆分
 * https://leetcode.cn/problems/word-break/
 * 
 * 2023/1/12
 */

// 1. 递归所有可能组合, 时间复杂度：wordDict.length ^ n 次方, n是递归树的高度：s / 最短的单词
var wordBreak = function(s, wordDict) {
    let flag = false;

    function dfs(temp) {
        if (flag || temp === s) {
            flag = true
            return
        }

        for (let word of wordDict) {
            let tempStr = temp + word;
            if (s.startsWith(tempStr)) {
                 dfs(tempStr)
            }
        }

    }

    dfs("")
    return flag;
};

// 2. 动态规划
var wordBreak = function(s, wordDict) {
    let wordSet = new Set(wordDict)

    //dp[i]: 0到以i结尾字符可拼接
    // 不可懒，得附上默认值，否则dp.at(-1)默认为undefined
    let dp = new Array(s.length).fill(false) 
    for (let i = 0; i < s.length; i++) {
        for (let j = 0; j <= i; j++) {
            // 如果从0开始，前面没东西了，可以默认为true； slice包头不包尾
            if ((j === 0 || dp[j - 1]) && wordSet.has(s.slice(j, i + 1))) {
                dp[i] = true
                break
            }
        }
    }
    return dp.at(-1)
};

