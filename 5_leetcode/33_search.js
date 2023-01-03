/**
 * 33. 搜索旋转排序数组
 * https://leetcode.cn/problems/search-in-rotated-sorted-array/
 * 
 * 这要认真去分析有点头疼，
 * 
0, 1, 2, 3, 4, 5, 6, 7
middle = 3,  target = 5
1) nums[middle] < target:  left左移, left = middle + 1
   但是不能简单这么做, 因为不能判断nums[middle]左边的数都是递增的，不能一把排除它们
   
   a. 5, 6, 7, 0, 1, 2, 3, 4, 4.5
   middle = 1, target=5; left不能左移，这个时候有特点：数组最小数在middle左边
   
   b. 4, 5, 6, 7, 0, 1, 2
   middle = 7, target = 8; left可以左移，因为middle左边的数递增，全部小于nums[middle],自然全部小于target

   总结：
   1. if nums[middle] > nums[0], 左边递增的，最小值点在右边；left = middle + 1
   2. if nums[middle] < nums[0], 最小值是左边，左右两边还都有可能
      if nums[right] < target, target在右边半段，left = middle + 1
      else  right = middle - 1

2) nums[middle] > target: 舍去右边半段， right = middle - 1
    a. 5, 6, 7, 0, 1, 2, 3, 4, 4.5
    middle = 1, target=0;  right可以右移，右边是递增的
    right = middle - 1

    b. 4, 5, 6, 7, 8, 0, 1, 2
    middle = 7, target = 8; right就不能右移了

    总结：
    1. if nums[middle] > nums[0], 左边递增的，最小值点在右边；找一个比middle小的数，左右两边都可能
        
    2. if nums[middle] < nums[0], 最小值是左边，右边可以直接舍去
       right = middle - 1

    
    所以不如只关系有序数组那一部分，不在有序数组内，就在另外一部分了
 * 
 */

var search = function (nums, target) {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        let middle = Math.floor((left + right) / 2)
        if (nums[middle] == target) {
            return middle
        }

        // 左边是有序的
        // 这个等号也太玄机了吧，[3, 1], 1  只能进这个循环？ 
        if (nums[middle] >= nums[0]) {
            // 落在左边的有序里面
            if (nums[middle] > target && nums[left] <= target) {
                right = middle - 1
            } else {
                left = middle + 1
            }

            console.log("middle1", middle);
            console.log("left1", left);
            console.log("right1", right);
            // 右边是有序的
        } else {
            
            // 落在右边的有序里面
            if (nums[middle] < target && nums[right] >= target) {
                left = middle + 1
            } else {
                right = middle - 1
            }
            console.log("middle", middle);
            console.log("left", left);
            console.log("right", right);
        }
    }

    return -1;
};


console.log(search([3, 1], 1));