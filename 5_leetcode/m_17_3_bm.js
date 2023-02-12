/**
 * BM算法利用了坏后缀 & 好后缀
 * 1. 简单版，只使用了坏后缀
 * 2023/2/6
 */
function search(str, sub) {
    let start = 0;
    while (start <= str.length - sub.length) {
        // 1. 坏字符(str才有)对齐字串的位置，为了后面的相减
        let i; 
        for (i = sub.length - 1; i >= 0; i--) {
            // 在str中寻找的坏字符
            if (str[start + i] != sub[i]) {
                break;
            }
        }
        // 本轮没有坏字符串：即匹配成功啦
        if (i === -1) {
            return start
        }

        // 2. 寻找坏字符串是否在子串中也出现
        let j;
        for (j = i - 1; j >= 0; j--) {
            if (sub[j] === str[i]) {
                break
            }
        }

        // 3. 计算偏移量
        let offset = j === -1 ? (i + 1) : (i - j)
        start += offset
        // console.log("start", start);
    }
    return -1;
}

// 2. 把好后缀也使用上
function search2(str, sub) {
    
}


// console.log(search("GTTATAGCTGGTAGCGGCGAA", "GTAGCGGCG"));
// console.log(search("abcdefgh", "cdef"));
// console.log(search("abgh", "gh"));
// console.log(search("abgh", "ab"));
// console.log(search("abgh", "gha"));

// 本例中坏字符其实是str中的，所以一直是"a", 效率和bf算法是一样的
console.log(search("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab", "aaaaaaaaaaaaaaab"));