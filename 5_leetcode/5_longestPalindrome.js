/**
 * 5. 最长回文子串
 * https://leetcode.cn/problems/longest-palindromic-substring/
 * 
 * 2022-12-14
 */

/**
 * 中心扩散法
 * @param {string} s
 * @return {string}
 */
var longestPalindrome1 = function (s) {
    function spread(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--
            right++
        }
        return right - left - 1
    }

    let begin = 0, maxLength = 0;
    for (let i = 0; i < s.length; i++) {
        let oddLength = spread(i, i)
        let evenLength = spread(i, i + 1)
        let len = Math.max(oddLength, evenLength)
        if (len > maxLength) {
            maxLength = len
            // 这个规律怎么找出来的，牛呀
            begin = i - parseInt((len - 1) / 2)
        }
    }
    console.log(s.substring(begin, begin + maxLength));
    return s.substring(begin, begin + maxLength)
};


var longestPalindrome = function (s) {
    function spread(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--
            right++
        }
        return [left + 1, right]
    }

    let begin = 0, end = 0;
    for (let i = 0; i < s.length; i++) {
        let [oddBegin, oddEnd] = spread(i, i)
        let [evenBegin, evenEnd] = spread(i, i + 1)

        if (oddEnd - oddBegin > end - begin) {
            begin = oddBegin
            end = oddEnd
        }

        if (evenEnd - evenBegin > end - begin) {
            begin = evenBegin
            end = evenEnd
        }
    }
    console.log(s.substring(begin, end));
    return s.substring(begin, end)
};

console.log(longestPalindrome("babad") === "bab");
console.log(longestPalindrome("cbbd") === "bb");
console.log(longestPalindrome("c") === "c");