/**
 * 链接：https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/solution/zai-pai-xu-shu-zu-zhong-cha-zhao-yuan-su-de-di-3-4/

 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    // 不是找到target之后线性查找，找到target之后继续二分有点麻烦了，干脆一开始就直接二分查找
    function binarySearch(equals) {
        let left = 0, right = nums.length - 1;
        // let ans = -1; // 细节之魔呀，
        let ans = nums.length
        while (left <= right) {
            let mid = Math.floor((left + right) / 2)
            if (nums[mid] > target || (equals && nums[mid] === target)) {
                right = mid - 1;
                ans = mid;
            } else {
                left = mid + 1
            }
        }
        return ans;
    }

    let leftIndex = binarySearch(true)
    let rightIndex = binarySearch(false) - 1
    console.log(leftIndex, rightIndex)

    if (leftIndex <= rightIndex && rightIndex < nums.length && nums[leftIndex] == nums[rightIndex] && nums[leftIndex] === target) {
        return [leftIndex, rightIndex]
    }

    return [-1, -1]


};
