/**
 * https://leetcode.cn/problems/3sum/
 * 
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    // js数组的无参sort默认是对字符串进行排序，编码排序
    nums.sort((a, b) => a - b)
    console.log(nums);
    let res = []
    for (let first = 0; first < nums.length; first++) {
        // first去重
        if (first > 0 && nums[first] === nums[first - 1]) {
            continue;
        }

        let second = first + 1, third = nums.length - 1;
        while (second < third) {
            // second去重
            if (second - 1 > first && nums[second] === nums[second - 1]) {
                second++
                continue;
            }
            let sum = nums[first] + nums[second] + nums[third]
            if (sum < 0) {
                second++
            } else if (sum == 0) {
                res.push([nums[first], nums[second], nums[third]])
                second++
                third--
            } else {
                third--
            }
        }
    }
    return res;
};

// console.log(threeSum([-1, 0, 1, 2, -1, -4]).toString() == [[-1, -1, 2], [-1, 0, 1]].toString());
console.log(threeSum([-1,0,1,2,-1,-4,-2,-3,3,0,4]));