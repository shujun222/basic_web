/**
 * 75. 颜色分类
 * https://leetcode.cn/problems/sort-colors/
 * 2023/1/8
 */

// 1. 计数排序
var sortColors = function(nums) {
    let count = new Array(3).fill(0)
    for (let n of nums) {
        count[n]++
    }

    let i = 0;
    while (i < count[0]) {
        nums[i] = 0
        i++
    }

    while (i < count[0] + count[1]) {
        nums[i] = 1
        i++
    }

    while (i < count[0] + count[1] + count[2]) {
        nums[i] = 2
        i++
    }
};

// 2. 单指针p1
// 第一次扫描，把所有为0的全部交换到p1左侧；第二次扫描，把所有为1的全部交换到p2左侧
var sortColors = function(nums) {
    let p1 = 0;

    // 1. 第一次扫描，交换0到p1左侧
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) {
            [nums[p1], nums[i]] = [nums[i], nums[p1]]
            p1++
        }
    }

    // 2. 第二次扫描，交换1到p1左侧
    for (let i = p1; i < nums.length; i++) {
        if (nums[i] === 1) {
            [nums[p1], nums[i]] = [nums[i], nums[p1]]
            p1++
        }
    }
};


// 3. 双指针，都从头开始
var sortColors = function(nums) {
    let p0 = p1 = 0
    for (let i in nums) {
        if (nums[i] === 0) {
            [nums[i], nums[p0]] = [nums[p0], nums[i]]
            if (p0 < p1) {
                [nums[i], nums[p1]] = [nums[p1], nums[i]]
            }
            p0++
            p1++
        } else if (nums[i] === 1) {
            [nums[i], nums[p1]] = [nums[p1], nums[i]]
            p1++
        }
    }
};

// 4. 双指针，左右同时开工
var sortColors = function(nums) {
    let p0 = 0, p2 = nums.length - 1;
    let i = 0;
    while (i <= p2) {
        if (nums[i] === 0) {
            [nums[i], nums[p0]] = [nums[p0], nums[i]]
            p0++
            i++
        } else if (nums[i] === 1) {
            i++
        } else if (nums[i] === 2) {
            [nums[i], nums[p2]] = [nums[p2], nums[i]]
            p2--
        }

        console.log(i, p0, p2)
        console.log(nums)
    }
};

console.log(sortColors([2,0,2,1,1,0]));