/**
 * https://leetcode.cn/problems/next-permutation/
 * 31. 下一个排列
 * 
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function(nums) {
    // 1. 从右往左，找到第一个该交互位置的i: i右边存在比nums[i]大的数
    // 1, 3, 5, 4, 2, 1  ->  1, 4, 1, 2, 3, 5
    let i = nums.length - 2
    while (i >= 0  && nums[i] >= nums[i + 1]) {
        i--
    }

    // 2. 找到i之后，找到第一个比i大的数，5, 4中，选4
    if (i >= 0) {
        for (let j = nums.length - 1; j > i; j--) {
            if (nums[j] > nums[i]) {
                [nums[i], nums[j]] = [nums[j], nums[i]]
                break;
            }
        }
    }

    // 3. nums[i + 1]排序
    let left = i + 1, right = nums.length - 1
    while (left < right) {
        [nums[left], nums[right]] = [nums[right], nums[left]]
        left++
        right--
    }
};


list = [1, 3, 5, 4, 2, 1]
nextPermutation(list)
console.log(list)  // [1,4,1, 2, 3, 5]

list = [1, 3, 2, 4, 5, 1]
nextPermutation(list)
console.log(list)  // [1, 3, 2, 5, 1, 4]