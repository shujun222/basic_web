/**
 * 面试题 17.22. 单词转换
 * https://leetcode.cn/problems/word-transformer-lcci/
 * 2023/1/22 正月初一晚上
 * 
 * 2023/2/4 
 */

/**
 * 1. 暴力破解 深度优先遍历，超时
 * 需要剪枝
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {string[]}
 */
var findLadders1 = function(beginWord, endWord, wordList) {
    if (!wordList.includes(endWord)) return [];

    let ans = []
    let findPath = false;
    let visited = new Array(wordList.length).fill(false)

    function dfs(temp) {
        // 剪枝和收集结果
        if (findPath) return;
        if (temp.at(-1) === endWord) {
            // console.log(temp)
            ans = [...temp]
            findPath = true
            return
        }

        // 仿造全排列的作法，访问过的不再收集
        for (let i = 0; i < wordList.length; i++) {
            if (!visited[i] && isNext(temp.at(-1), wordList[i])) {
                visited[i] = true
                dfs([...temp, wordList[i]])
                visited[i] = false
                // 此处其实可以剪枝, 基于wordList[i]往下是不可能达到的
                // canotReach: {wordList[i], true}
            }
        }
    }

    function isNext(lastWord, word) {
        let diff = 0;
        for (let i = 0; i < word.length; i++) {
            if (lastWord[i] != word[i]) {
                diff++
                if (diff > 1) {
                    return false
                }
            }
        }
        return true;
    }

    let beginIndex = wordList.indexOf(beginWord)
    if (beginIndex > -1) {
        visited[beginIndex] = true
    }
    dfs([beginWord])
    return ans;
};

//2. 深度遍历剪枝; 时间复杂度  JavaScript 提交中击败了25.93%
var findLadders2 = function(beginWord, endWord, wordList) {
    if (!wordList.includes(endWord)) return [];

    let ans = []
    let findPath = false;
    let visited = new Array(wordList.length).fill(false)
    let badPath = new Map()

    function dfs(temp) {
        // 剪枝和收集结果
        if (findPath) return;
        if (temp.at(-1) === endWord) {
            // console.log(temp)
            ans = [...temp]
            findPath = true
            return
        }

        // 仿造全排列的作法，访问过的不再收集
        for (let i = 0; i < wordList.length; i++) {
            let word = wordList[i]
            if (!visited[i] && !badPath.get(word) && isNext(temp.at(-1), word)) {
                visited[i] = true
                dfs([...temp, word])
                visited[i] = false
                badPath.set(word, true)
            }
        }
    }

    function isNext(lastWord, word) {
        let diff = 0;
        for (let i = 0; i < word.length; i++) {
            if (lastWord[i] != word[i]) {
                diff++
                if (diff > 1) {
                    return false
                }
            }
        }
        return true;
    }

    let beginIndex = wordList.indexOf(beginWord)
    if (beginIndex > -1) {
        visited[beginIndex] = true
    }
    dfs([beginWord])
    return ans;
};

// 3. 广度优先遍历
var findLadders3 = function(beginWord, endWord, wordList) {
    function isNext(lastWord, word) {
        let diff = 0;
        for (let i = 0; i < word.length; i++) {
            if (lastWord[i] != word[i]) {
                diff++
                if (diff > 1) {
                    return false
                }
            }
        }
        return true;
    }

    if (!wordList.includes(endWord)) return [];

    
    let queue = [beginWord]
    let findPath = false;
    let visited = new Array(wordList.length).fill(false)
    let preMap = new Map()

    while (queue.length) {
        let head = queue.shift()
        if (head == endWord) {
            findPath = true
            break
        }
        for (let i = 0; i < wordList.length; i++) {
            if (!visited[i] && isNext(head, wordList[i])) {
                visited[i] = true
                queue.push(wordList[i])
                preMap.set(wordList[i], head)
            }
        }
    }
    
    let ans = []
    if (!findPath) return ans;
    
    let word = endWord
    while (word != beginWord) {
        ans.unshift(word)
        word = preMap.get(word)
    }
    ans.unshift(beginWord)

    return ans;
};

// 4. 广度优先遍历2：一边遍历，一边存储所有paths
// 寻找其中一个解就可以，最短路径，应该用bfs更好
var findLadders = function(beginWord, endWord, wordList) {
    function isNext(lastWord, word) {
        let diff = 0;
        for (let i = 0; i < word.length; i++) {
            if (lastWord[i] != word[i]) {
                diff++
                if (diff > 1) {
                    return false
                }
            }
        }
        return true;
    }

    if (!wordList.includes(endWord)) return [];

    
    let queue = [[beginWord]]
    let visited = new Array(wordList.length).fill(false)

    while (queue.length) {
        let len = queue.length
        for (let k = 0; k < len; k++) {
            let headList = queue.shift()
            let head = headList.at(-1)
            
            for (let i = 0; i < wordList.length; i++) {
                let word = wordList[i]
                if (!visited[i] && isNext(head, word)) {
                    visited[i] = true
                    let path = [...headList, word]
                    queue.push(path)
                    if (word === endWord) {
                        return path
                    }
                }
            }
        }
    }

    return [];
};

console.log(findLadders("a", "c", ["a","b","c"]));
console.log(findLadders("hot", "dog", ["hot","dog"]));