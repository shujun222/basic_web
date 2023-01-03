function search(nums, target) {
    let left = 0, right = nums.length - 1
    while (left <= right) {
        let middle = Math.floor((left + right) / 2)
        if (nums[middle] === target) {
            return middle
        } else if (nums[middle] < target) {
            left = middle + 1
        } else {
            right = middle - 1
        }
    }
    return -1;
}

nums = [1, 3, 5, 6, 7, 8, 9, 10]
console.log(search(nums, 6) === 3);
console.log(search(nums, 1) == 0);
console.log(search(nums, 10) == 7);

console.log(search(nums, 11) == -1);
console.log(search(nums, 0) == -1);



