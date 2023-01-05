/**
 * 48. 旋转图像
 * https://leetcode.cn/problems/rotate-image/
 * 
 * 2023/1/2
 * 
 */
var rotate = function(matrix) {
    let n = matrix.length
    console.log("n", n)
    for (let i = 0; i < (n + 1) / 2; i++) {
        for (let j = i; j < n - i - 1; j ++) {
            // console.log("i, j", i, j)
            let temp = matrix[i][j]
            matrix[i][j] = matrix[n - 1 - j][i]
            matrix[n - 1 - j][i] = matrix[n - 1 - i][n - 1 - j]
            matrix[n - 1 - i][n - 1 - j] = matrix[j][n - 1 - i]
            matrix[j][n - 1 - i] = temp
            // console.log("matrix", matrix)
        }
    }
};