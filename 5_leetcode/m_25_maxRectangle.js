/**
 * 面试题 17.25. 单词矩阵
 * https://leetcode.cn/problems/word-rectangle-lcci/submissions/
 */

// 1. by myself 递归一个一个试: 超时
/**
 * @param {string[]} words
 * @return {string[]}
 */
var maxRectangle0 = function(words) {
    // 1. 方便提升查找效率
    let wordsSet = new Set()
    let preSet = new Set()
    let maxLength = 1
    for (let w of words) {
        wordsSet.add(w)
        maxLength = Math.max(maxLength, w.length)

        for (let i = 2; i <= w.length; i++) {
            preSet.add(w.substring(0, i))
        }
    }

    // 2. 一个一个试验？
    let ans = [] // 临时结果
    let preColumnWord = new Array(maxLength).fill("") // 临时结果的列拼接成的单词
    let maxArea = 0; // 遍历过程中，最大面积值
    let area = []; // 最终结果
    
    function dfs(i) {
        // 1. 是个合法的矩阵
        if (isValidRect()) {
            let tempArea = ans[0].length * ans.length
            if (tempArea > maxArea) {
                maxArea = tempArea
                area = [...ans]
            }
        }

        // 2. 一个一个单词试验
        for (let i = 0; i < words.length; i++) {
            // 可以放进去
            if (isValidWord(words[i])) {
                for (let j = 0; j < words[i].length; j++) {
                    preColumnWord[j] += words[i][j]
                }
                ans.push(words[i])
                
                dfs(i + 1)
                
                ans.pop()
                for (let j = 0; j < words[i].length; j++) {
                    preColumnWord[j] = preColumnWord[j].substring(0, preColumnWord[j].length - 1)
                }
            }
        }
    }

    function isValidWord(word) {
        if (ans.length === 0) return true;
        if (ans[0].length != word.length) return false;
        for (let i = 0; i < word.length; i++) {
            if (!preSet.has(preColumnWord[i] + word[i])) {
                return false
            }
        }
        return true;
    }

    function isValidRect() {
        if (ans.length === 0) return false;

        for (let i = 0; i < ans[0].length; i++) {
            if (!wordsSet.has(preColumnWord[i])) {
                return false
            }
        }
        return true;
    }

    dfs(0)

    return area;
};


/**
 * 2. 前缀树
 *    前缀树节省空间了，我自己之前的set需要o(n^2)才能存下来
 *    每次都需要遍历前缀树去判断
 */
var maxRectangle2 = function(words) {
    // 1. 将单词按长度分组；构造前缀树
    let maxLength = 1;  // 最长单词长度, 为了剪枝
    let lenMap = new Map() // {len: [w1, w2]}, 为了方便遍历，每次只能push同等长度单词
    let root = new PreTree() // 构造一颗前缀树
    for (let w of words) {
        let len = w.length
        maxLength = Math.max(maxLength, len)
        
        let lenList = lenMap.get(len)
        if (!lenList) {
            lenList = []
            lenMap.set(len, lenList)
        }
        lenList.push(w)

        root.buildPreTree(w)
    }

    // 2. 深度遍历
    let path = [];
    let maxArea = 0;
    let ans = []
    for (let [len, lenList] of lenMap) {
        if (len * maxLength < maxArea) continue;
        dfs(len, lenList)
    }

    function dfs(len, lenList) {
        // 1. 剪枝
        
        // 2. 是一棵完整树
        for (let word of lenList) {
            const [wordValid, allLeaf] = root.isValid(path, word)
            // 这一层是ok的
            if (wordValid) {
                path.push(word)

                if (allLeaf) {
                    let tempArea = len * path.length
                    
                    if (tempArea > maxArea) {
                        maxArea = tempArea
                        ans = [...path]
                    }
                }

                dfs(len, lenList)

                path.pop()
            }
        }
    }

    return ans;
};


class PreTree2 {
    constructor () {
        this.children = new Array(26)
        this.isLeaf = false;
    }
    
    // 只给root使用
    buildPreTree(word) {
        let node = this 
        for (let c of word) {
            let i = c.charCodeAt() - 97
            if (!node.children[i]) {
                node.children[i] = new PreTree()
            }
            node = node.children[i]
        }
        node.isLeaf = true;
    }

    // 继续添加word，是否是合法的
    isValid(path, word) {
        // 整个path符合最终结果
        let allLeaf = true;
        for (let i = 0; i < word.length; i++) {
            // 1. 获取之前的node指针 
            // 这些每次都需要遍历吗？能预先存下来吗
            let node = this
            for (let j = 0; j < path.length; j++) {
                let c = path[j][i]
                let p = c.charCodeAt() - 97
                node = node.children[p]
            }

            // 2. 考虑word
            let p = word[i].charCodeAt() - 97
            node = node.children[p]
            if (!node) return [false, false];
            
            allLeaf = allLeaf && node.isLeaf
        }

        return [true, allLeaf]
    }
}



/**
 * 3. 优化前缀树preNodes，不要每次都去遍历前缀树了
 * @param {string[]} words
 * @return {string[]}
 */
var maxRectangle = function(words) {
    // 1. 将单词按长度分组；构造前缀树
    let maxLength = 1;  // 最长单词长度, 为了剪枝
    let lenMap = new Map() // {len: [w1, w2]}, 为了方便遍历，每次只能push同等长度单词
    let root = new PreTree() // 构造一颗前缀树
    for (let w of words) {
        let len = w.length
        maxLength = Math.max(maxLength, len)
        
        let lenList = lenMap.get(len)
        if (!lenList) {
            lenList = []
            lenMap.set(len, lenList)
        }
        lenList.push(w)

        root.buildPreTree(w)
    }

    // 2. 深度遍历
    let path = [];
    let preNodes = []
    let maxArea = 0;
    let ans = []
    for (let [len, lenList] of lenMap) {
        if (len * maxLength < maxArea) continue;
        dfs(len, lenList)
    }

    function dfs(len, lenList) {
        // 1. 剪枝
        
        // 2. 是一棵完整树
        for (let word of lenList) {
            const [wordValid, allLeaf] = root.isValid(path, preNodes, word)
            // 这一层是ok的
            if (wordValid) {
                path.push(word)

                if (allLeaf) {
                    let tempArea = len * path.length
                    
                    if (tempArea > maxArea) {
                        maxArea = tempArea
                        ans = [...path]
                    }
                }

                dfs(len, lenList)

                path.pop()
                preNodes.pop()
            }
        }
    }

    return ans;
};


class PreTree {
    constructor () {
        this.children = new Array(26)
        this.isLeaf = false;
    }
    
    // 只给root使用
    buildPreTree(word) {
        let node = this 
        for (let c of word) {
            let i = c.charCodeAt() - 97
            if (!node.children[i]) {
                node.children[i] = new PreTree()
            }
            node = node.children[i]
        }
        node.isLeaf = true;
    }

    // 继续添加word，是否是合法的
    isValid(path, preNodes, word) {
        // 整个path符合最终结果
        let allLeaf = true;
        let tempNodes = []
        for (let i = 0; i < word.length; i++) {
            // 1. 获取之前的node指针 
            // 这些每次都需要遍历吗？能预先存下来吗
            let node = this
            if (preNodes.length) {
                node = preNodes.at(-1)[i]
            }

            // 2. 考虑word
            let p = word[i].charCodeAt() - 97
            node = node.children[p]
            if (!node) return [false, false];

            tempNodes[i] = node
            allLeaf = allLeaf && node.isLeaf
        }
        preNodes.push(tempNodes)

        return [true, allLeaf]
    }
}

console.log(maxRectangle(["ah", "hc", "w","a", "h", "uc", "kh", "zw", "iz", "gc", "kg", "tt"]));
console.log(maxRectangle(["this", "real", "hard", "trh", "hea", "iar", "sld"]));
console.log(maxRectangle(["aa"]));
console.log(maxRectangle(["aaa"]));

