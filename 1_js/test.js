var arr = [1, 2, 3];
arr[5] = 'x';
console.log(arr);    ; // arr变为[1, 2, 3, undefined, undefined, 'x']
console.log(arr[66]);
console.log(arr[-1]);