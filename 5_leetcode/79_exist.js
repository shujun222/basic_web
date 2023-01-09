/**
 * 79. 单词搜索
 * https://leetcode.cn/problems/word-search/
 * 2023/1/8
 * 
 */

// 1. 自己写的
var exist = function(board, word) {
    let flag = false;
    let row = board.length
    let col = board[0].length
    let visited = new Array(row).fill().map(_ => new Array(col).fill(false))

    function find(i, j, restWord) {
        // 成功了
        if (flag || restWord === "") {
            flag = true
            return
        }

        // 上 右 下 左
        let directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]
        let firstLetter = restWord[0]
        restWord = restWord.substr(1)

        visited[i][j] = true
        for (let [dx, dy] of directions) {
            let x = i + dx
            let y = j + dy
            
            if (x < 0 || x === row || y === -1 || y === col || visited[x][y]) {
                // 越界了 || 已经被访问过了
                continue
            }

            // 为什么不能在这里回溯呢？
            // visited[x][y] = true
            if (firstLetter === board[x][y]) {
                find(x, y, restWord)
                // visited[x][y] = false
            }
        }

        visited[i][j] = false
    }

    // find(0, 0, word.substr(1))
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (board[i][j] === word[0]) {
                find(i, j, word.substr(1))
            }
            if (flag) {
                return true
            }
        }
    }

    return flag
};


// 2. 优化官方答案
var exist = function(board, word) {
    let flag = false;
    let row = board.length
    let col = board[0].length
    let visited = new Array(row).fill().map(_ => new Array(col).fill(false))

    function find(i, j, index) {
        // 这一步牛，两处的判断合二为一了
        if (board[i][j] != word[index]) {
            return
        }
        // 成功了
        if (flag || index === word.length - 1) {
            flag = true
            return
        }

        // 上 右 下 左
        let directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]
        visited[i][j] = true
        for (let [dx, dy] of directions) {
            let x = i + dx, y = j + dy
           
            if (0 <= x && x < row && 0 <= y && y < col && !visited[x][y]) {
                find(x, y, index + 1)
            }
        }

        visited[i][j] = false
    }

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            find(i, j, 0)
            
            if (flag) {
                return true
            }
        }
    }

    return flag
};

