/**
 * 挨个字符串进行比较
 * 2023/2/5  
 */
function search(str, sub) {
    for (let i = 0; i < str.length - sub.length + 1; i++) {
        let same = true;
        for (let j = 0; j < sub.length; j++) {
            if (str[i + j] != sub[j]) {
                same = false;
                break;
            }
        }
        if (same) {
            return i;
        }
    }

    return -1
}

console.log(search("abcdefgh", "cdef"));
console.log(search("abgh", "gh"));
console.log(search("abgh", "ab"));
console.log(search("abgh", "gha"));
console.log(search("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab", "aaaaaaaaaaaaaaab"));