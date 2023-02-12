/**
 * 面试题 17.17. 多次搜索
 * https://leetcode.cn/problems/multi-search-lcci/
 */

/**
 * 1. by myself
 *    假设map:{首字母, 位置list}，位置list长度为x
 *    时间复杂度：o((x * y) * n)
 * @param {string} big: 长度m
 * @param {string[]} smalls: 长度n, 每个字符长度假设为y
 * @return {number[][]}
 */
var multiSearch1 = function (big, smalls) {
    // 1. 构造{首字母：[位置1，位置2, ...]}
    let ans = []
    let positionMap = {}
    for (let i = 0; i < big.length; i++) {
        let positionList = positionMap[big[i]]
        if (!positionList) {
            positionList = []
            positionMap[big[i]] = positionList
        }
        positionList.push(i)
    }

    // 2. smalls遍历
    for (let word of smalls) {
        let positionList = positionMap[word[0]] || []
        let ps = []
        for (let p of positionList) {
            let flag = true;
            // 滑动窗口比较每个字符
            for (let i = 0; i < word.length; i++) {
                if (p + i >= big.length || word[i] != big[p + i]) {
                    flag = false
                    break
                }
            }
            if (flag) {
                ps.push(p)
            }
        }
        ans.push(ps)
    }

    return ans;
};


// 2. 本以为KMP很牛，然而只超过6%
var multiSearch = function(big, smalls) {
    let ans = []
    for (let sub of smalls) {
        let indexs = []
        // "abc" [""],  j > 0: 防止这种case
        if (sub === "") {
            ans.push([])
            break;
        }
        let next = buildNext(sub)
        let i = 0; // 主字符串下标，绝不后退
        let j = 0
        while (i < big.length) {
            if (big[i] === sub[j]) {
                i++
                j++
            } else if (j === 0) {
                // 第一个就不相等
                i++
            } else {
                j = next[j - 1]
            }

            // 匹配到了一个            
            if (j === sub.length) {
                indexs.push(i - j)
                i = i - j + 1
                j = 0
            }
        }
        ans.push(indexs)
    }

    return ans;
};

function buildNext(sub) {
    let next = [0]
    let i = 1
    let pre_length = 0
    while (i < sub.length) {
        if (sub[pre_length] === sub[i]) {
            pre_length++
            next.push(pre_length)
            i++
        } else if (pre_length === 0) {
            next.push(0)
            i++
        } else {
            pre_length = next[pre_length - 1]
        }
    }
    return next
}


/**
 * 3. 参考网友答案：
 * 感觉啥bf, bm, kmp都是花里胡哨的, 还是api管用
 * 
 */
var multiSearch = function (big, smalls) {
    let indexMap = new Map()
    for (let i = 0, l = big.length; i < l; i++) {
        let c = big[i]
        let arr = indexMap.get(c) || []
        arr.push(i)
        indexMap.set(c, arr)
    }
    console.log("indexMap", indexMap);

    let ans = []
    for (let i in smalls) {
        let cur = []
        let str = smalls[i]
        let starts = indexMap.get(str[0])
        for (let j in starts) {
            if (str === big.slice(starts[j], starts[j] + str.length)) {
                cur.push(starts[j])
            }
        }
        ans.push(cur)
    }

    return ans
};

// 网友优秀答案
var multiSearch = function (big, smalls) {
    const ans = []

    for (let i = 0, n = smalls.length; i < n; i++) {
        let cur = [], index = 0
        while (index >= 0) {
            if (!smalls[i]) {
                break
            }
            const ind = big.indexOf(smalls[i], index)

            if (ind === -1) break

            cur.push(ind)
            index = ind + 1
        }
        ans.push(cur)
    }

    return ans
};


// [[1,4],[8],[],[3],[1,4,7,10],[5]]
console.log(multiSearch("mississippi", ["is", "ppi", "hi", "sis", "i", "ssippi"]));