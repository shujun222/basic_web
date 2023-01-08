/**
 * 64. 最小路径和
 * https://leetcode.cn/problems/minimum-path-sum/
 * 2023/1/5
 * 
 */

var minPathSum = function(grid) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (i === 0 && j === 0){
                continue
            } else if (i === 0) {
                grid[0][j] += grid[0][j-1]
            } else if (j === 0) {
                grid[i][0] += grid[i - 1][0]
            } else {
                grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1])
            }
        }
    }
    return grid[grid.length - 1][grid[0].length - 1]
};

console.log(minPathSum([[1,3,1],[1,5,1],[4,2,1]]));